import { getExchangeConfig } from 'lib/getExchangeConfig'
import { tryParseAmount } from 'lib/tryParseAmount'
import { ChainId, Currency, Trade, tradeComparator, wrappedCurrency } from '../..'
import { adapterRawPairs } from './adapters'
import { PairsArgs } from './args/Pairs.args'
import { getSwapCallArguments } from './lib/getSwapCallArguments'
import { PairsService } from './Pairs.service'
import { RawPair } from './types'

export const Pairshandler = async (args: PairsArgs) => {
  const chainId = args.chainId
  const currencyA = wrappedCurrency(args.currencyA, chainId)
  const currencyB = wrappedCurrency(args.currencyB, chainId)

  const service = new PairsService()
  const account = '0xf420c822e7849A71d06F6aB6c0a4D1A043FAA26E'
  const amount = '0.0001'

  const aliumConfig = getExchangeConfig(chainId, 'alium')
  const sideConfig = getExchangeConfig(chainId, 'side')

  try {
    const aliumPairs = await service.findPairs(currencyA, currencyB, chainId, aliumConfig)
    const sidePairs = await service.findPairs(currencyA, currencyB, chainId, sideConfig)
    const bestTrade = calcTrade('bestTradeExactIn', currencyA, currencyB, amount, aliumPairs, sidePairs, chainId)
    const callData = getSwapCallArguments(bestTrade, chainId, account)

    return { aliumPairs, sidePairs, callData }
  } catch (error) {
    console.error(error)
  }
}

// взято из useTrade
const calcTrade = (
  method: 'bestTradeExactIn' | 'bestTradeExactOut',
  currencyA: Currency,
  currencyB: Currency,
  amount: string,
  aliumPairs: RawPair[],
  sidePairs: RawPair[],
  chainId: ChainId
) => {
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
