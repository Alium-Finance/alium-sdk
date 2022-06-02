import { ChainId, ExchangeOptions, EXCHANGE_CONFIG } from '..'
import { ExchangeConfigT } from '../constants'

export const getExchangeConfig = (currentChainId: ChainId, platform: keyof ExchangeConfigT): ExchangeOptions => {
  const router = EXCHANGE_CONFIG[platform].router[currentChainId] || EXCHANGE_CONFIG.alium.router[currentChainId]
  const initCodeHash =
    EXCHANGE_CONFIG[platform].initCodeHash[currentChainId] || EXCHANGE_CONFIG.alium.initCodeHash[currentChainId]
  const factory = EXCHANGE_CONFIG[platform].factory[currentChainId] || EXCHANGE_CONFIG.alium.factory[currentChainId]

  return { router, initCodeHash, factory, type: platform }
}
