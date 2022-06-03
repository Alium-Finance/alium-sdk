import { wrappedCurrency } from '../..'
import { getExchangeConfig } from '../../lib/getExchangeConfig'
import { PairsArgs } from './args/Pairs.args'
import { PairsService } from './Pairs.service'

export class PairsFetcher {
  constructor() {}

  async getPairs(args: PairsArgs) {
    const chainId = args.chainId
    const currencyA = wrappedCurrency(args.currencyA, chainId)
    const currencyB = wrappedCurrency(args.currencyB, chainId)

    const service = new PairsService(args.networkRpcUrlsList)
    const account = args.account
    const amount = args.amount

    const aliumConfig = getExchangeConfig(chainId, 'alium')
    const sideConfig = getExchangeConfig(chainId, 'side')

    try {
      const aliumPairs = await service.findPairs(currencyA, currencyB, chainId, aliumConfig)
      const sidePairs = await service.findPairs(currencyA, currencyB, chainId, sideConfig)

      return {
        aliumPairs,
        sidePairs,
        pairsData: {
          currencyA,
          currencyB,
          amount,
          chainId,
          account
        }
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
