import { JsonRpcProvider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { BigNumber, Contract } from 'ethers'

import {
  calculateGasMargin,
  calculateGasPrice,
  ChainId,
  Currency,
  getExchangeConfig,
  getRouterContract,
  hybridComparator,
  isZero,
  Pair,
  PairsArgs,
  PairsFetcher,
  SwapParameters,
  Trade,
  tryParseAmount
} from '../..'
import { GetSwapCallArgsParams, getSwapCallArguments } from './lib'

export type SwapArgs = Omit<PairsArgs, 'method'> & Pick<GetSwapCallArgsParams, 'allowedSlippage' | 'deadline'>

export interface SwapCall {
  parameters: SwapParameters
  contract: Contract | null
}

export interface SuccessfulCall {
  call: SwapCall
  gasEstimate: BigNumber
}

export interface FailedCall {
  call: SwapCall
  error: Error
}

export type EstimatedSwapCall = SuccessfulCall | FailedCall

export class Swap {
  constructor(private readonly provider: JsonRpcProvider, private readonly chainId: ChainId) {}

  swapExactIn(args: SwapArgs) {
    return this.swapFactory(args, 'bestTradeExactIn')
  }

  swapExactOut(args: SwapArgs) {
    return this.swapFactory(args, 'bestTradeExactOut')
  }

  private async swapFactory(args: SwapArgs, method: PairsArgs['method']) {
    const fetcher = new PairsFetcher(this.provider, this.chainId)
    const result = await fetcher.getPairs({
      ...args,
      method: 'bestTradeExactOut'
    })
    if (result) {
      const { amount, chainId, account } = result.pairsData
      const { aliumPairs, sidePairs } = result
      const trade = Swap.findBestTrade(method, args.currencyA, args.currencyB, amount, aliumPairs, sidePairs, chainId)
      const callData = Swap.getCallArgument({
        chainId,
        recipient: account,
        trade,
        provider: this.provider,
        allowedSlippage: args?.allowedSlippage,
        deadline: args?.deadline
      })
      return { aliumPairs, sidePairs, trade, callData }
    }
    return null
  }

  static findBestTrade(
    method: 'bestTradeExactIn' | 'bestTradeExactOut',
    currencyA: Currency,
    currencyB: Currency,
    amount: string,
    aliumPairs: Pair[],
    sidePairs: Pair[],
    chainId: ChainId
  ) {
    const aliumConfig = getExchangeConfig(chainId, 'alium')
    const sideConfig = getExchangeConfig(chainId, 'side')
    const amountedCurrencyB = tryParseAmount(chainId, amount, currencyB)

    const tradeA =
      (aliumPairs?.length &&
        amountedCurrencyB &&
        Trade[method](
          aliumPairs,
          currencyA,
          amountedCurrencyB,
          { maxHops: 3, maxNumResults: 1 },
          undefined,
          undefined,
          undefined,
          aliumConfig
        )[0]) ||
      null
    const tradeB =
      (sidePairs?.length &&
        amountedCurrencyB &&
        Trade[method](
          sidePairs,
          currencyA,
          amountedCurrencyB,
          { maxHops: 3, maxNumResults: 1 },
          undefined,
          undefined,
          undefined,
          sideConfig
        )[0]) ||
      null

    return hybridComparator(tradeA, tradeB)
  }

  static getCallArgument(args: GetSwapCallArgsParams): SwapCall[] {
    return getSwapCallArguments(args)
  }

  static estimateCalc(callArgumens: SwapCall[], provider: JsonRpcProvider, routerAddress: string, account: string) {
    if (!routerAddress || !provider || !account) return null

    const routerContract = getRouterContract({
      address: routerAddress,
      provider,
      account
    })

    if (!callArgumens?.length || !routerContract) {
      return null
    } else {
      return async () => {
        const estimatedCalls: EstimatedSwapCall[] = await Promise.all(
          callArgumens.map(async call => {
            const {
              parameters: { methodName, args, value }
            } = call
            const options = !value || isZero(value) ? {} : { value }

            try {
              const gasEstimate = await routerContract.estimateGas[methodName](...args, options)
              return {
                call,
                gasEstimate
              }
            } catch (gasError) {
              console.info('Gas estimate failed, trying eth_call to extract error', call)
              try {
                const result = await routerContract.callStatic[methodName](...args, options)
                console.info('Unexpected successful call after failed estimate gas', call, gasError, result)
                return { call, error: new Error('Unexpected issue with estimating the gas. Please try again.') }
              } catch (callError) {
                console.info('Call threw error', call, callError)
                let errorMessage: string
                switch ((callError as any)?.reason) {
                  case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
                  case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
                    errorMessage =
                      'This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.'
                    break
                  default:
                    errorMessage = `The transaction cannot succeed. This is probably caused by overrunning the slippage tolerance or expiring timeout.
                        Please try again or change these settings in the Settings menu.`
                }
                return { call, error: new Error(errorMessage) }
              }
            }
          })
        )

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        const successfulEstimation = estimatedCalls.find(
          (el, ix, list): el is SuccessfulCall =>
            'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1])
        )

        if (!successfulEstimation) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)
          if (errorCalls.length > 0) throw errorCalls[errorCalls.length - 1].error
          throw new Error('Unexpected error. Please contact support: none of the calls threw an error')
        }

        const gasPrice = await calculateGasPrice(routerContract.provider)
        const transactionFee = formatEther(gasPrice.mul(calculateGasMargin(successfulEstimation.gasEstimate)))

        return { successfulEstimation, transactionFee, gasPrice }
      }
    }
  }
}
