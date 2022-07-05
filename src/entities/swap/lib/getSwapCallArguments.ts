import { JsonRpcProvider } from '@ethersproject/providers'
import JSBI from 'jsbi'
import { ChainId, getRouterContract, Percent, Router, Trade, TradeType } from '../../..'
import { BIPS_BASE, DEFAULT_DEADLINE_FROM_NOW, INITIAL_ALLOWED_SLIPPAGE } from '../../../fetcher/pairs/pairs.constants'

export type GetSwapCallArgsParams = {
  trade: Trade | null // trade to execute, required
  chainId: ChainId
  recipient: string
  allowedSlippage: number // in bips
  deadline: number // in seconds from now
  provider: JsonRpcProvider
}

export function getSwapCallArguments({
  trade,
  chainId,
  recipient,
  allowedSlippage = INITIAL_ALLOWED_SLIPPAGE,
  deadline = DEFAULT_DEADLINE_FROM_NOW,
  provider
}: GetSwapCallArgsParams) {
  if (!trade || !recipient || !chainId || !provider) return []

  const contract = getRouterContract({
    address: trade?.config?.router,
    provider
  })

  const swapMethods = []

  swapMethods.push(
    Router.swapCallParameters(
      chainId,
      trade,
      {
        feeOnTransfer: false,
        allowedSlippage: new Percent(JSBI.BigInt(Math.floor(allowedSlippage)), BIPS_BASE),
        recipient,
        ttl: deadline
      },
      trade?.config?.type
    )
  )

  if (trade.tradeType === TradeType.EXACT_INPUT) {
    swapMethods.push(
      Router.swapCallParameters(
        chainId,
        trade,
        {
          feeOnTransfer: true,
          allowedSlippage: new Percent(JSBI.BigInt(Math.floor(allowedSlippage)), BIPS_BASE),
          recipient,
          ttl: deadline
        },
        trade?.config?.type
      )
    )
  }

  return swapMethods.map(parameters => ({ parameters, contract }))
}
