import JSBI from 'jsbi'

import { ChainId, SolidityType } from '../constants'
import { validateSolidityTypeInstance } from '../utils'

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export class Currency {
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  constructor(decimals: number, symbol?: string, name?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)

    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }

  getETHER(chainId: ChainId) {
    return BASECURRENCIES[chainId]
  }
}

const BASECURRENCIES: { [key in ChainId]: Currency } = {
  [ChainId.MAINNET]: new Currency(18, 'BNB', 'Binance'),
  [ChainId.BSCTESTNET]: new Currency(18, 'BNB', 'Binance'),
  [ChainId.HECOMAINNET]: new Currency(18, 'HT', 'Huobi'),
  [ChainId.HECOTESTNET]: new Currency(18, 'HT', 'Huobi'),
  [ChainId.ETHER_MAINNET]: new Currency(18, 'ETH', 'Ether'),
  [ChainId.ETHER_TESTNET]: new Currency(18, 'ETH', 'Ether'),
  [ChainId.MATIC_MAINNET]: new Currency(18, 'MATIC', 'Polygon'),
  [ChainId.MATIC_TESTNET]: new Currency(18, 'MATIC', 'Polygon'),
  [ChainId.FANTOM]: new Currency(6, 'FTM', 'Fantom'),
  [ChainId.FANTOM_TESTNET]: new Currency(18, 'FTM', 'Fantom')
}

const getEther = (chainId: ChainId) => {
  return BASECURRENCIES[chainId]
}

export { getEther }
