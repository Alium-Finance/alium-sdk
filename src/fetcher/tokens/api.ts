import { ALIUM_API } from '../..'
import { TokensResponse } from './types'

export interface GetTokensListArgs {
  auth: string
  proxy: string
}
export const getTokensList = async ({ auth, proxy }: GetTokensListArgs) => {
  const url = proxy ? `${proxy}/${ALIUM_API}tokens` : `${ALIUM_API}tokens`
  const response = await fetch(
    url,
    auth
      ? {
          method: 'GET',
          credentials: 'same-origin',
          headers: new Headers({
            Authorization: auth,
            Origin: ALIUM_API
          })
        }
      : {}
  )
  const result: TokensResponse = await response.json()
  return result.tokens
}
