import { TokensResponse } from './types'

const ALIUM_API = 'http://localhost:3000/api/'

export const getTokensList = async () => {
  const response = await fetch(ALIUM_API + 'tokens')
  const result: TokensResponse = await response.json()
  return result.tokens
}
