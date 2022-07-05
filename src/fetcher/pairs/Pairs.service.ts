import { ChainId, Currency, ExchangeOptions, IPAIR_ABI, multicall, Pair, TokenAmount, TokensService } from '../..'

import { PairsFind, Reserves } from './types'

import { JsonRpcProvider } from '@ethersproject/providers'

import { createPairsCombinations } from './lib/createPairsCombinations'

/**
 * Search for the liquidity of pairs,data collection of all possible pairs.
 * @constructor provider - for multicall
 * @constructor chainId - for create pairs and get configs
 */
export class PairsService {
  private readonly tokensService: TokensService
  constructor(private readonly provider: JsonRpcProvider, private readonly chainId: ChainId) {
    this.tokensService = new TokensService()
  }

  async findPairs(currencyA: Currency, currencyB: Currency, config: ExchangeOptions) {
    const defaultList = await this.tokensService.getTokens()
    // Base tokens for building intermediary trading routes
    const pairs = createPairsCombinations(currencyA, currencyB, config, this.chainId, defaultList)

    const { pairs: allPairs } = await this.getPairs(pairs, config)

    return allPairs
  }

  private async getPairs(pairsForFind: PairsFind[], config: ExchangeOptions) {
    const factory = config?.factory
    const initCodeHash = config?.initCodeHash

    const results = await this.fetchReserves(pairsForFind)

    const pairs = results
      ?.map(result => {
        const { reserves, pair } = result
        const tokenA = pair.tokenA
        const tokenB = pair.tokenB

        if (!tokenA || !tokenB || tokenA.equals(tokenB)) return null
        if (!reserves) return null
        const { reserve0, reserve1 } = reserves
        const [token0, token1] = tokenA?.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

        return new Pair(
          new TokenAmount(token0, reserve0?.toString()),
          new TokenAmount(token1, reserve1?.toString()),
          factory,
          initCodeHash
        )
      })
      .filter(pair => !!pair) as Pair[]

    return { pairs }
  }

  private async fetchReserves(pairs: PairsFind[]) {
    const results = await multicall<Reserves[]>(
      IPAIR_ABI,
      pairs?.map(({ address }) => ({
        address,
        name: 'getReserves'
      })),
      this.provider,
      this.chainId
    )

    return pairs.map((pair, index) => {
      const reserves = results[index]
      return {
        reserves,
        pair
      }
    })
  }
}
