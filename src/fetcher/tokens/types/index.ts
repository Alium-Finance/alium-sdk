import { ChainId } from '../../..'

interface TokenInfo {
  readonly chainId: number
  readonly address: string
  readonly name: string
  readonly decimals: number
  readonly symbol: string
  readonly logoURI?: string
  readonly tags?: string[]
  readonly extensions?: {
    readonly [key: string]: string | number | boolean | null
  }
}

export interface TokenList {
  readonly name: string
  readonly timestamp: string
  readonly version: {
    readonly major: number
    readonly minor: number
    readonly patch: number
  }
  readonly tokens: TokenInfo[]
  readonly keywords?: string[]
  readonly tags?: string[]
  readonly logoURI?: string
}

export interface TokensResponse {
  tokens: {
    [chainId in ChainId]: TokenList
  }
}
