import { flatMap, uniqBy } from 'lodash'

import {
  getBasesToCheckTradesAgainst,
  ChainId,
  Currency,
  CUSTOM_BASES,
  ExchangeOptions,
  Pair,
  PairsFind,
  Token,
  TokensResponse,
  wrappedCurrency
} from '../../..'

export const createPairsCombinations = (
  currencyA: Currency,
  currencyB: Currency,
  config: ExchangeOptions,
  chainId: ChainId,
  DEFAULT_LIST: TokensResponse['tokens']
) => {
  const bases: Token[] = getBasesToCheckTradesAgainst(DEFAULT_LIST)[chainId]

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

  return uniqBy(createPairsForFind(allPairCombinations, config, chainId), 'address')
}

const createPairsForFind = (
  currencies: [Currency | undefined, Currency | undefined][],
  config: ExchangeOptions,
  chainId: ChainId
) => {
  const factory = config?.factory
  const initCodeHash = config?.initCodeHash

  const tokens = currencies.map(([currencyA, currencyB]) => [
    wrappedCurrency(currencyA, chainId),
    wrappedCurrency(currencyB, chainId)
  ])

  const pairsForFind = tokens
    .map(([tokenA, tokenB]) => {
      try {
        return {
          address:
            tokenA && tokenB && !tokenA.equals(tokenB)
              ? Pair.getAddress(tokenA, tokenB, factory, initCodeHash)
              : undefined,
          tokenA,
          tokenB
        }
      } catch (error) {
        console.error(error)
        return undefined
      }
    })
    .filter(token => !!token) as PairsFind[]
  return pairsForFind
}
