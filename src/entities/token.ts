import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { BASECURRENCIES, Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string | null

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = address && address !== '' ? validateAndParseAddress(address) : null
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    if (!other.address || !this.address) {
      return other.symbol === this.symbol || other.name === this.name || this === other
    }
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
    if (!other.address || !this.address) {
      // @ts-ignore
      return Boolean(this.symbol?.toLowerCase() < other.symbol?.toLowerCase())
    }
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

export const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '',
    18,
    BASECURRENCIES[ChainId.MAINNET].symbol,
    BASECURRENCIES[ChainId.MAINNET].name
  ),
  [ChainId.BSCTESTNET]: new Token(
    ChainId.BSCTESTNET,
    '',
    18,
    BASECURRENCIES[ChainId.BSCTESTNET].symbol,
    BASECURRENCIES[ChainId.BSCTESTNET].name
  ),
  [ChainId.HECOMAINNET]: new Token(
    ChainId.HECOMAINNET,
    '',
    18,
    BASECURRENCIES[ChainId.HECOMAINNET].symbol,
    BASECURRENCIES[ChainId.HECOMAINNET].name
  ),
  [ChainId.HECOTESTNET]: new Token(
    ChainId.HECOTESTNET,
    '',
    18,
    BASECURRENCIES[ChainId.HECOTESTNET].symbol,
    BASECURRENCIES[ChainId.HECOTESTNET].name
  ),
  [ChainId.MATIC_MAINNET]: new Token(
    ChainId.MATIC_MAINNET,
    '',
    18,
    BASECURRENCIES[ChainId.MATIC_MAINNET].symbol,
    BASECURRENCIES[ChainId.MATIC_MAINNET].name
  ),
  [ChainId.MATIC_TESTNET]: new Token(
    ChainId.MATIC_TESTNET,
    '',
    18,
    BASECURRENCIES[ChainId.MATIC_TESTNET].symbol,
    BASECURRENCIES[ChainId.MATIC_TESTNET].name
  ),
  [ChainId.ETHER_MAINNET]: new Token(
    ChainId.ETHER_MAINNET,
    '',
    18,
    BASECURRENCIES[ChainId.ETHER_MAINNET].symbol,
    BASECURRENCIES[ChainId.ETHER_MAINNET].name
  ),
  [ChainId.ETHER_TESTNET]: new Token(
    ChainId.ETHER_TESTNET,
    '',
    18,
    BASECURRENCIES[ChainId.ETHER_TESTNET].symbol,
    BASECURRENCIES[ChainId.ETHER_TESTNET].name
  )
}
