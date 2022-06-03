import { getExchangeConfig } from '../../lib/getExchangeConfig'
import { adapterRawPairs, ChainId, PairsArgs, PairsFetcher, RawPair } from '../..'
import { Currency } from '../currency'
import { tryParseAmount } from '../../lib/tryParseAmount'
import { Trade, tradeComparator } from '../trade'
import { getSwapCallArguments, GetSwapCallArgsParams } from './lib'

export type TradeV2Args = Omit<PairsArgs, 'method' | 'networkRpcUrlsList'>

export class TradeV2 {
  constructor(private readonly networkRpcUrlsList: PairsArgs['networkRpcUrlsList']) {}

  swapExactIn(args: TradeV2Args) {
    return this.swapFactory(args, 'bestTradeExactIn')
  }

  swapExactOut(args: TradeV2Args) {
    return this.swapFactory(args, 'bestTradeExactOut')
  }

  private async swapFactory(args: TradeV2Args, method: PairsArgs['method']) {
    const fetcher = new PairsFetcher()
    const result = await fetcher.getPairs({
      ...args,
      networkRpcUrlsList: this.networkRpcUrlsList,
      method: 'bestTradeExactOut'
    })
    if (result) {
      const { currencyA, currencyB, amount, chainId, account } = result.pairsData
      const { aliumPairs, sidePairs } = result
      const trade = TradeV2.findBestTrade(method, currencyA, currencyB, amount, aliumPairs, sidePairs, chainId)
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
    aliumPairs: RawPair[],
    sidePairs: RawPair[],
    chainId: ChainId
  ) {
    const aliumConfig = getExchangeConfig(chainId, 'alium')
    const sideConfig = getExchangeConfig(chainId, 'side')
    const amountedCurrencyB = tryParseAmount(chainId, amount, currencyB)

    const parsed = adapterRawPairs({ sidePairs, aliumPairs })
    const tradeA =
      (aliumPairs?.length &&
        amountedCurrencyB &&
        Trade[method](
          parsed.aliumPairs,
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
          parsed.sidePairs,
          currencyA,
          amountedCurrencyB,
          { maxHops: 3, maxNumResults: 1 },
          undefined,
          undefined,
          undefined,
          sideConfig
        )[0]) ||
      null

    return tradeComparator(tradeA, tradeB)
  }

  getCallArgument(args: GetSwapCallArgsParams) {
    return getSwapCallArguments(args)
  }
}
