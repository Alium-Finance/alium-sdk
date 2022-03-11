import { ChainId, Currency, Token } from '..'

const BASECURRENCIES: { [key in ChainId]: Currency } = {
  [ChainId.MAINNET]: new Currency(18, 'BNB', 'Binance'),
  [ChainId.BSCTESTNET]: new Currency(18, 'BNB', 'Binance'),
  [ChainId.HECOMAINNET]: new Currency(18, 'HT', 'Huobi'),
  [ChainId.HECOTESTNET]: new Currency(18, 'HT', 'Huobi'),
  [ChainId.ETHER_MAINNET]: new Currency(18, 'ETH', 'Ether'),
  [ChainId.ETHER_TESTNET]: new Currency(18, 'ETH', 'Ether'),
  [ChainId.MATIC_MAINNET]: new Currency(18, 'MATIC', 'Polygon'),
  [ChainId.MATIC_TESTNET]: new Currency(18, 'MATIC', 'Polygon'),
  [ChainId.FANTOM]: new Currency(18, 'FTM', 'Fantom'),
  [ChainId.FANTOM_TESTNET]: new Currency(18, 'FTM', 'Fantom'),
  [ChainId.METIS]: new Token(ChainId.METIS, '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000', 18, 'METIS', 'METIS'),
  [ChainId.METIC_TESTNET]: new Currency(18, 'METIS', 'METIS'),
  [ChainId.MOONRIVER]: new Currency(18, 'MOVR', 'MOVR'),
  [ChainId.MOONBASE_ALPHA]: new Currency(18, 'MOVR', 'MOVR'),
  [ChainId.MOONBEAM]: new Currency(18, 'GLMR', 'GLMR'),
  [ChainId.AURORA]: new Currency(18, 'aETH', 'aETH'),
  [ChainId.AURORA_TESTNET]: new Currency(18, 'aETH', 'aETH'),
}

const getEther = (chainId: ChainId) => {
  return BASECURRENCIES[chainId]
}

export { getEther, BASECURRENCIES }
