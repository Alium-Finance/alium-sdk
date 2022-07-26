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
    return (
      currencyA.decimals === currencyB.decimals &&
      currencyA.name === currencyB.name &&
      currencyA.symbol === currencyB.symbol
    )
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
  ),
  [ChainId.OKC]: new Token(ChainId.OKC, '0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15', 18, 'WOKT', 'Wrapped OKT'),
  [ChainId.OKC_TESTNET]: new Token(
    ChainId.OKC_TESTNET,
    '0x3379b4a4Fc0E1614c0687C9F613024E83FE0E8b5',
    18,
    'WOKT',
    'Wrapped OKT'
  ),
}

export const ALM_TOKENS = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0x7c38870e93a1f959cb6c533eb10bbc3e438aac11', 18, 'ALM', 'AliumToken'),
  [ChainId.BSCTESTNET]: new Token(
    ChainId.BSCTESTNET,
    '0x6f58aCfaEB1BfDC9c4959c43aDdE7a3b63BF019f',
    18,
    'ALM',
    'AliumToken'
  ),
  [ChainId.HECOMAINNET]: new Token(
    ChainId.HECOMAINNET,
    '0x1581929770be3275a82068c1135b6dd59c5334ed',
    18,
    'ALM',
    'AliumToken on HECO'
  ),
  [ChainId.HECOTESTNET]: new Token(
    ChainId.HECOTESTNET,
    '0xfe681ad91bbb8b531623a7cb8c658e4afe500fd9',
    18,
    'ALM',
    'AliumToken on HECO testnet'
  ),
  [ChainId.MATIC_MAINNET]: new Token(
    ChainId.MATIC_MAINNET,
    '0x1581929770be3275a82068c1135b6dd59c5334ed',
    18,
    'ALM',
    'AliumToken on Polygon'
  ),
  [ChainId.MATIC_TESTNET]: new Token(
    ChainId.MATIC_TESTNET,
    '0x58b06772603ad67223bef63ab578f7cb3215771b',
    18,
    'ALM',
    'AliumToken on Polygon'
  ),
  [ChainId.ETHER_MAINNET]: new Token(
    ChainId.ETHER_MAINNET,
    '0x1581929770be3275a82068c1135b6dd59c5334ed',
    18,
    'ALM',
    'AliumToken on Ethereum'
  ),
  [ChainId.ETHER_TESTNET]: new Token(
    ChainId.ETHER_TESTNET,
    '0x05418f9e8a71a96d9bb58fa6d71533033dc23ac6',
    18,
    'ALM',
    'AliumToken on RINKEBY testnet'
  ),
  [ChainId.FANTOM]: new Token(
    ChainId.FANTOM,
    '0x38540b4613d2e57ecf190d3486ae6f74591eb8a9',
    18,
    'ALM',
    'AliumToken on Fantom'
  ),
  [ChainId.FANTOM_TESTNET]: new Token(
    ChainId.FANTOM_TESTNET,
    '0x91dc5712460550849a7664a6177b407eeb833d9d',
    18,
    'ALM',
    'AliumToken on FANTOM testnet'
  ),
  [ChainId.METIS]: new Token(
    ChainId.METIS,
    '0x1581929770bE3275a82068c1135b6dD59c5334Ed',
    18,
    'ALM',
    'AliumToken on METIS'
  ),
  [ChainId.METIC_TESTNET]: new Token(
    ChainId.METIC_TESTNET,
    '0x9aB518232d32A0711ecB39F940D107d61e37c5d0',
    18,
    'ALM',
    'AliumToken on METIS testnet'
  ),
  [ChainId.MOONRIVER]: new Token(
    ChainId.MOONRIVER,
    '0x1581929770be3275a82068c1135b6dd59c5334ed',
    18,
    'ALM',
    'AliumToken on Moonriver'
  ),
  [ChainId.MOONBASE_ALPHA]: new Token(
    ChainId.MOONBASE_ALPHA,
    '0x8ab7a1fc6bc09e04837f2aa4786cc8cbfc281481',
    18,
    'ALM',
    'AliumToken on Moonriver testnet'
  ),
  [ChainId.MOONBEAM]: new Token(
    ChainId.MOONBEAM,
    '0x1581929770be3275a82068c1135b6dd59c5334ed',
    18,
    'ALM',
    'AliumToken on Moonbeam'
  ),
  [ChainId.AURORA]: new Token(
    ChainId.AURORA,
    '0xe8532E5514d9F80C7d0B1F29948873ee59Fb5B06',
    18,
    'ALM',
    'AliumToken on Aurora testnet'
  ),
  [ChainId.AURORA_TESTNET]: new Token(
    ChainId.AURORA_TESTNET,
    '0x05418f9e8A71A96D9Bb58Fa6D71533033DC23aC6',
    18,
    'ALM',
    'AliumToken on Aurora'
  ),
  [ChainId.OKC]: new Token(ChainId.OKC, '0x5252d84f12942a997387168df6da55ebf827378e', 18, 'ALM', 'AliumToken on OKX'),
  [ChainId.OKC_TESTNET]: new Token(
    ChainId.OKC_TESTNET,
    '0x1581929770be3275a82068c1135b6dd59c5334ed',
    18,
    'ALM',
    'AliumToken on OKEx'
  ),
}
