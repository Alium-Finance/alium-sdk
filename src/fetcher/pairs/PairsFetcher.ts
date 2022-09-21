import { JsonRpcProvider } from '@ethersproject/providers'
import { SwapV2CalculateArgs } from 'entities/swapV2/types'

import { ChainId, PairsRoutes } from '../..'
import { getExchangeConfig } from '../../lib/getExchangeConfig'
import { PairsArgs } from './args/Pairs.args'
import { PairsService } from './Pairs.service'

/**
 * Factory for get pairs by PairsService
 */

export class PairsFetcher {
  constructor(private readonly provider: JsonRpcProvider, private readonly chainId: ChainId) {}

  getPairsRoutes(args: SwapV2CalculateArgs) {
    const { routes, currencyA, currencyB } = args
    const service = new PairsService(this.provider, this.chainId)
    return routes?.reduce(async (memo, route) => {
      let next = await memo
      try {
        const result = await service.findPairs(currencyA, currencyB, route)
        const findedPairs = !!result?.length ? result : []
        next[route.router] = {
          pairs: [...(next[route.router]?.pairs || []), ...findedPairs],
          config: route
        }
      } catch (error) {
        next[route.router] = {
          pairs: [],
          config: route
        }
      }
      return await next
    }, Promise.resolve({}) as Promise<PairsRoutes>)
  }

  async getPairs(args: Omit<PairsArgs, 'method'>) {
    const currencyA = args.currencyA
    const currencyB = args.currencyB

    const service = new PairsService(this.provider, this.chainId)
    const account = args.account
    const amount = args.amount

    const aliumConfig = getExchangeConfig(this.chainId, 'alium')
    const sideConfig = getExchangeConfig(this.chainId, 'side')

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
  }
}
