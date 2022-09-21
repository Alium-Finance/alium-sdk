import { JsonRpcProvider } from '@ethersproject/providers'
import { GetSwapCallArgsParams, getSwapCallArguments } from 'entities/swap/lib'

import { ChainId, PairsFetcher, PairsRoutes, SwapCall, Trade, tryParseAmount } from '../..'
import { multipleHybridComparator } from './lib/multipleHybridComparator'
import { DetailedTrade, SwapV2CalculateArgs } from './types'

export class SwapV2 {
  constructor(private readonly provider: JsonRpcProvider, private readonly chainId: ChainId) {}

  async calculate(args: SwapV2CalculateArgs) {
    const fetcher = new PairsFetcher(this.provider, this.chainId)
    const result = await fetcher.getPairsRoutes(args)
    if (!!Object.values(result)?.length) {
      return SwapV2.rateRoutes(args, result, this.chainId, this.provider)
    }
    return null
  }

  static rateRoutes(
    args: SwapV2CalculateArgs,
    pairsRoutes: PairsRoutes,
    chainId: ChainId,
    provider: JsonRpcProvider
  ) {
    const { amount, account, currencyA, currencyB, method } = args

    const parsedAmountB = tryParseAmount(chainId, amount, currencyB)

    const trades = Object.keys(pairsRoutes)
      .map(key => {
        const routeDetails = pairsRoutes[key]

        if (!routeDetails?.pairs?.length || !parsedAmountB) return null
        const trade = Trade[method](
          routeDetails.pairs,
          currencyA,
          parsedAmountB,
          { maxHops: 3, maxNumResults: 1 },
          undefined,
          undefined,
          undefined,
          routeDetails.config
        )?.[0]
        const calldata = SwapV2.getCallArgument({
          chainId: chainId,
          recipient: account,
          trade,
          provider,
          allowedSlippage: args?.allowedSlippage,
          deadline: args?.deadline
        })
        if (!trade) return null

        const detailedTrade: DetailedTrade = { trade, calldata, config: routeDetails.config }
        return detailedTrade
      })
      .filter(a => !!a)

    return multipleHybridComparator(trades)
  }

  static getCallArgument(args: GetSwapCallArgsParams): SwapCall[] {
    return getSwapCallArguments(args)
  }
}
