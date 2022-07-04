import { TokensResponse } from './types'

const ALIUM_API = process.env.ALIUM_API

export const getTokensList = async () => {
  const response = await fetch(ALIUM_API + 'tokens')
  const result: TokensResponse = await response.json()
  return result.tokens
}
