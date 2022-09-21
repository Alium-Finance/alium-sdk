import { ExchangeOptions, SwapCall, Trade } from 'entities'
import { GetSwapCallArgsParams } from 'entities/swap/lib'
import { PairsArgs } from 'fetcher/pairs'

export type SwapV2Pairs = ExchangeOptions[]

export type SwapV2CalculateArgs = PairsArgs &
  Pick<GetSwapCallArgsParams, 'allowedSlippage' | 'deadline'> & {
    routes: SwapV2Pairs
  }

export type DetailedTrade = {
  trade: Trade
  calldata: SwapCall[]
  config: ExchangeOptions
} | null
