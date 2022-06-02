import DEFAULT_LIST from 'data/tokens'
import JSBI from 'jsbi'
import { getListChainIds } from 'utils'
import { ChainId, Percent, Token, WETH } from '../..'

const isDev = true

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))

type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

const WETH_ONLY = getListChainIds().reduce((list, key) => {
  return { ...list, [key]: [WETH[(key as unknown) as ChainId]] }
}, {}! as ChainTokenList)

export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = isDev
  ? getListChainIds().reduce((list, key) => {
      const checkSummedTokens = DEFAULT_LIST[(key as unknown) as ChainId]?.tokens?.map(
        (token: Token) => new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
      )
      return { ...list, [key]: checkSummedTokens }
    }, { ...WETH_ONLY }! as ChainTokenList)
  : { ...WETH_ONLY }

type CustomBases = { [chainId in ChainId]: { [tokenAddress: string]: Token[] } }

export const CUSTOM_BASES: CustomBases = {
  ...getListChainIds().reduce((list, key) => {
    return { ...list, [key]: {} }
  }, {}! as CustomBases)
}
