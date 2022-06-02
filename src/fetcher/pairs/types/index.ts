import { ChainId, Token } from '../../../'

export interface Reserves {
  reserve0: number
  reserve1: number
  blockTimestampLast: number
}
export enum ReversesStatus {
  FAILURE = 'FAILURE',
  EXIST = 'EXIST'
}
export interface ReservesState {
  reserves: Reserves | null
  status: ReversesStatus
}

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID
}
export interface RawPair {
  token0: Token
  token1: Token
  reserve0: string
  reserve1: string
  factory: string
  initCodeHash: string
  liquidityTokenAddress: string
  chainId: ChainId
}
export interface PairsResult {
  aliumPairs: RawPair[]
  sidePairs: RawPair[]
}
