import { IPAIR_ABI } from 'data/abis'
import { Contract } from 'ethers'
import { Interface } from 'ethers/lib/utils'
import { getEthersProvider } from 'lib/getEthersProvider'
import flatMap from 'lodash.flatmap'
import { ChainId, Currency, ExchangeOptions, Pair, Token, wrappedCurrency } from '../..'
import { BASES_TO_CHECK_TRADES_AGAINST, CUSTOM_BASES } from './pairs.constants'
import { RawPair, Reserves, ReservesState, ReversesStatus } from './types'

export class PairsService {
  async findPairs(
    currencyA: Currency,
    currencyB: Currency,
    chainId: ChainId,
    config: ExchangeOptions
  ): Promise<RawPair[]> {
    // Base tokens for building intermediary trading routes
    const bases: Token[] = BASES_TO_CHECK_TRADES_AGAINST[chainId]

    // All pairs from base tokens
    const basePairs: [Token, Token][] = flatMap(bases, (base): [Token, Token][] =>
      bases.map(otherBase => [base, otherBase])
    ).filter(([t0, t1]) => t0?.address !== t1?.address)

    const [tokenA, tokenB] = chainId
      ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
      : [undefined, undefined]

    const allPairCombinations: [Token, Token][] =
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs
          ]
            .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
            // This filter will remove all the pairs that are not supported by the CUSTOM_BASES settings
            // This option is currently not used on Alium swap
            .filter(([t0, t1]) => {
              if (!chainId) return true
              const customBases = CUSTOM_BASES[chainId]
              if (!customBases) return true

              const customBasesA: Token[] | undefined = customBases[t0.address]
              const customBasesB: Token[] | undefined = customBases[t1.address]

              if (!customBasesA && !customBasesB) return true
              if (customBasesA && !customBasesA.find(base => t1.equals(base))) return false
              if (customBasesB && !customBasesB.find(base => t0.equals(base))) return false

              return true
            })
            // Take only tokenA and tokenB pairs
            .filter(([t0, t1]) => {
              return t0?.equals(tokenA) || t0?.equals(tokenB) || t1?.equals(tokenA) || t1?.equals(tokenB)
            })
        : []

    console.log(allPairCombinations?.length, 'Check bases')
    const { pairs: allPairs } = await this.getPairs(allPairCombinations, config, chainId)

    // only pass along valid pairs, non-duplicated pairs
    const validPairs = Object.values(
      allPairs
        // filter out invalid pairs
        .filter(result => !!result)
        // filter out duplicated pairs
        .reduce<{ [pairAddress: string]: RawPair }>((memo, curr) => {
          memo[curr.liquidityTokenAddress] = memo[curr.liquidityTokenAddress] ?? curr
          return memo
        }, {})
    )
    return validPairs
  }

  async getPairs(
    currencies: [Currency | undefined, Currency | undefined][],
    config: ExchangeOptions,
    chainId: ChainId
  ): Promise<{
    pairs: RawPair[]
  }> {
    const factory = config?.factory
    const initCodeHash = config?.initCodeHash

    const tokens = currencies.map(([currencyA, currencyB]) => [
      wrappedCurrency(currencyA, chainId),
      wrappedCurrency(currencyB, chainId)
    ])

    const pairAddresses = tokens.map(([tokenA, tokenB]) => {
      try {
        return tokenA && tokenB && !tokenA.equals(tokenB)
          ? Pair.getAddress(tokenA, tokenB, factory, initCodeHash)
          : undefined
      } catch (error) {
        console.error(error)
        return undefined
      }
    })

    const results = await Promise.all(pairAddresses.map(address => this.fetchReserves(address || '', chainId)))

    const pairs = results
      .map((result, i) => {
        const reserves = result
        const tokenA = tokens[i][0]
        const tokenB = tokens[i][1]

        if (!tokenA || !tokenB || tokenA.equals(tokenB)) return null
        if (!reserves) return null
        const { reserve0, reserve1 } = reserves
        const [token0, token1] = tokenA?.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
        const RawPair: RawPair = {
          token0,
          token1,
          reserve0: reserve0.toString(),
          reserve1: reserve1.toString(),
          factory,
          initCodeHash,
          liquidityTokenAddress: Pair.getAddress(token0, token1, factory, initCodeHash),
          chainId
        }
        return RawPair
      })
      .filter(pair => !!pair) as RawPair[]

    return { pairs }
  }

  async fetchReserves(address: string, chainId: ChainId) {
    const cacheKey = `${address}/${chainId}`
    const prevReverses: any = this.getReservesState(cacheKey)
    try {
      if (prevReverses && prevReverses?.status === ReversesStatus.EXIST) return prevReverses.reserves
      if (prevReverses && prevReverses?.status === ReversesStatus.FAILURE) return null

      const ethersProvider = getEthersProvider(chainId)
      if (!ethersProvider) return null
      const contract = new Contract(address, new Interface(IPAIR_ABI), ethersProvider)
      const reserves: Reserves = await contract.getReserves()
      this.setReservesState({ reserves, status: ReversesStatus.EXIST }, cacheKey)

      return reserves
    } catch (error) {
      this.setReservesState({ reserves: null, status: ReversesStatus.FAILURE }, cacheKey)
      return null
    }
  }

  // Manage Cache
  private getReservesState(key: string) {
    // if (isDev) {
    //   return this.cacheManger.getCache(key) as ReservesState
    // }
    return null
  }

  private setReservesState(arg: ReservesState, key: string) {
    // if (isDev) {
    //   this.cacheManger.setCache(key, arg, CacheTTL.FIVE_MINUTES)
    // }
  }
}
