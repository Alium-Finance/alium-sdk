import JSBI from 'jsbi'
import { ChainId, Percent, Router, Trade, TradeType } from '../../..'
import { BIPS_BASE, DEFAULT_DEADLINE_FROM_NOW, INITIAL_ALLOWED_SLIPPAGE } from '../pairs.constants'

export function getSwapCallArguments(
  trade: Trade | null, // trade to execute, required
  chainId: ChainId,
  recipient: string,
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
  deadline: number = DEFAULT_DEADLINE_FROM_NOW // in seconds from now
) {
  if (!trade || !recipient || !chainId) return []

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

  return swapMethods.map(parameters => ({ parameters }))
}
