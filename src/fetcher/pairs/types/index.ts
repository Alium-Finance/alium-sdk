import { Token } from '../../../'

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
