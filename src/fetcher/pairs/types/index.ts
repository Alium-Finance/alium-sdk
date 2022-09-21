import { SwapV2Pairs } from 'entities/swapV2/types'
import { Pair, Token } from '../../../'

export interface Reserves {
  reserve0: number
  reserve1: number
  blockTimestampLast: number
}

export interface PairsFind {
  address: string
  tokenA: Token
  tokenB: Token
}

export type PairsRoutes = {
  [address: string]: {
    config: SwapV2Pairs[0]
    pairs: Pair[]
  }
}