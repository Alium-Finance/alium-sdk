/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { getStaticTokensList } from './lib/getStaticTokensList'
import { TokensResponse } from './types'

let CACHE_TOKENS_LIST: any = null

export class TokensService {
  constructor() {}
  async getTokens() {
    const prevList = this.getCache()
    if (prevList) return prevList
    const tokens = await getStaticTokensList()
    this.setCache(tokens)
    return tokens
  }

  private setCache(tokens: TokensResponse['tokens']) {
    CACHE_TOKENS_LIST = tokens
  }

  private getCache(): TokensResponse['tokens'] {
    return CACHE_TOKENS_LIST
  }
}
