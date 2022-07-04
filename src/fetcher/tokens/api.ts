import { ALIUM_API } from '../..'
import { TokensResponse } from './types'

export const getTokensList = async () => {
  const response = await fetch(ALIUM_API + 'tokens')
  const result: TokensResponse = await response.json()
  return result.tokens
}
