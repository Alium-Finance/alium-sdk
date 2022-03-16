import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH: { [key in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [ChainId.BSCTESTNET]: new Token(
    ChainId.BSCTESTNET,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [ChainId.HECOMAINNET]: new Token(
    ChainId.HECOMAINNET,
    '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f',
    18,
    'WHT',
    'Wrapped HT'
  ),
  [ChainId.HECOTESTNET]: new Token(
    ChainId.HECOTESTNET,
    '0x7aF326B6351C8A9b8fb8CD205CBe11d4Ac5FA836',
    18,
    'WHT',
    'Wrapped HT'
  ),
  [ChainId.MATIC_MAINNET]: new Token(
    ChainId.MATIC_MAINNET,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped Matic'
  ),
  [ChainId.MATIC_TESTNET]: new Token(
    ChainId.MATIC_TESTNET,
    '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    18,
    'WMATIC',
    'Wrapped Matic'
  ),
  [ChainId.ETHER_MAINNET]: new Token(
    ChainId.ETHER_MAINNET,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ETHER_TESTNET]: new Token(
    ChainId.ETHER_TESTNET,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.FANTOM]: new Token(ChainId.FANTOM, '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18, 'WFTM', 'Wrapped FTM'),
  [ChainId.FANTOM_TESTNET]: new Token(
    ChainId.FANTOM_TESTNET,
    '0x6cFe00906a2074F41788b8Dc4fa66a4c13C2A3a3',
    18,
    'WFTM',
    'Wrapped FTM'
  ),
  [ChainId.METIS]: new Token(
    ChainId.METIS,
    '0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481',
    18,
    'WMETIS',
    'Wrapped METIS'
  ),
  [ChainId.METIC_TESTNET]: new Token(
    ChainId.METIC_TESTNET,
    '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
    18,
    'WMETIS',
    'Wrapped METIS'
  ),
  [ChainId.MOONRIVER]: new Token(
    ChainId.MOONRIVER,
    '0xf50225a84382c74cbdea10b0c176f71fc3de0c4d',
    18,
    'WMOVR',
    'Wrapped MOVR'
  ),
  [ChainId.MOONBASE_ALPHA]: new Token(
    ChainId.MOONBASE_ALPHA,
    '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
    18,
    'WMOVR',
    'Wrapped MOVR'
  ),
  [ChainId.MOONBEAM]: new Token(
    ChainId.MOONBEAM,
    '0xAcc15dC74880C9944775448304B263D191c6077F',
    18,
    'WGLMR',
    'Wrapped GLMR'
  ),
  [ChainId.AURORA]: new Token(
    ChainId.AURORA,
    '0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB',
    18,
    'WaETH',
    'Wrapped aETH'
  ),
  [ChainId.AURORA_TESTNET]: new Token(
    ChainId.AURORA_TESTNET,
    '0x1041738e7c7696AFc08E3C05401aD504eE647aE4',
    18,
    'WaETH',
    'Wrapped aETH'
  )
}
