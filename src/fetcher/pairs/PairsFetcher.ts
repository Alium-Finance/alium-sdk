import { JsonRpcProvider } from '@ethersproject/providers'
import { ChainId, wrappedCurrency } from '../..'
import { getExchangeConfig } from '../../lib/getExchangeConfig'
import { PairsArgs } from './args/Pairs.args'
import { PairsService } from './Pairs.service'

/**
 * Factory for get pairs by PairsService
 */
export class PairsFetcher {
  constructor(private readonly provider: JsonRpcProvider, private readonly chainId: ChainId) {}

  async getPairs(args: PairsArgs) {
    const currencyA = wrappedCurrency(args.currencyA, this.chainId)
    const currencyB = wrappedCurrency(args.currencyB, this.chainId)

    const service = new PairsService(this.provider, this.chainId)
    const account = args.account
    const amount = args.amount

    const aliumConfig = getExchangeConfig(this.chainId, 'alium')
    const sideConfig = getExchangeConfig(this.chainId, 'side')

    try {
      const aliumPairs = await service.findPairs(currencyA, currencyB, aliumConfig)
      const sidePairs = await service.findPairs(currencyA, currencyB, sideConfig)

      return {
        aliumPairs,
        sidePairs,
        pairsData: {
          currencyA,
          currencyB,
          amount,
          chainId: this.chainId,
          account
        }
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
