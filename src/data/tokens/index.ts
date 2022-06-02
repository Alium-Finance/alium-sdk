import { ChainId } from '../..'
import tokensAuroraMainnet from './tokensAuroraMainnet.json'
import tokensAuroraTestnet from './tokensAuroraTestnet.json'
import tokensBinanceMainnet from './tokensBinanceMainnet.json'
import tokensBinanceTestnet from './tokensBinanceTestnet.json'
import tokensEthereumMainnet from './tokensEthereumMainnet.json'
import tokensEthereumTestnet from './tokensEthereumTestnet.json'
import tokensFantomMainnet from './tokensFantomMainnet.json'
import tokensFantomTestnet from './tokensFantomTestnet.json'
import tokensHecoMainnet from './tokensHecoMainnet.json'
import tokensHecoTestnet from './tokensHecoTestnet.json'
import tokensMaticMainnet from './tokensMaticMainnet.json'
import tokensMaticTestnet from './tokensMaticTestnet.json'
import tokensMetisMainnet from './tokensMetisMainnet.json'
import tokensMetisTestnet from './tokensMetisTestnet.json'
import tokensMoonbase from './tokensMoonbase.json'
import tokensMoonbeam from './tokensMoonbeam.json'
import tokensMoonriver from './tokensMoonriver.json'

const DEFAULT_LIST: { [chainId in ChainId]: any } = {
  [ChainId.MAINNET]: tokensBinanceMainnet,
  [ChainId.BSCTESTNET]: tokensBinanceTestnet,
  [ChainId.HECOMAINNET]: tokensHecoMainnet,
  [ChainId.HECOTESTNET]: tokensHecoTestnet,
  [ChainId.ETHER_MAINNET]: tokensEthereumMainnet,
  [ChainId.ETHER_TESTNET]: tokensEthereumTestnet,
  [ChainId.MATIC_MAINNET]: tokensMaticMainnet,
  [ChainId.MATIC_TESTNET]: tokensMaticTestnet,
  [ChainId.FANTOM]: tokensFantomMainnet,
  [ChainId.FANTOM_TESTNET]: tokensFantomTestnet,
  [ChainId.METIS]: tokensMetisMainnet,
  [ChainId.METIC_TESTNET]: tokensMetisTestnet,
  [ChainId.MOONRIVER]: tokensMoonriver,
  [ChainId.MOONBASE_ALPHA]: tokensMoonbase,
  [ChainId.MOONBEAM]: tokensMoonbeam,
  [ChainId.AURORA]: tokensAuroraMainnet,
  [ChainId.AURORA_TESTNET]: tokensAuroraTestnet
}

export default DEFAULT_LIST
