import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainId, Pair, PairsArgs, PairsFetcher } from '../..'
import { getExchangeConfig } from '../../lib/getExchangeConfig'
import { tryParseAmount } from '../../lib/tryParseAmount'
import { Currency } from '../currency'
import { Trade, hybridComparator } from '../trade'
import { GetSwapCallArgsParams, getSwapCallArguments } from './lib'

export type SwapArgs = Omit<PairsArgs, 'method'>

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
      const { currencyA, currencyB, amount, chainId, account } = result.pairsData
      const { aliumPairs, sidePairs } = result
      const trade = Swap.findBestTrade(method, currencyA, currencyB, amount, aliumPairs, sidePairs, chainId)
      const callData = this.getCallArgument({
        chainId,
        recipient: account,
        trade
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

  getCallArgument(args: GetSwapCallArgsParams) {
    return getSwapCallArguments(args)
  }
}
