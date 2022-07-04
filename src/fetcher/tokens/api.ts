import { ALIUM_API } from '../..'
import { TokensResponse } from './types'

export interface GetTokensListArgs {
  auth: string
  proxy: string
  uri?: string
}
export const getTokensList = async ({ auth, proxy, uri }: GetTokensListArgs) => {
  const baseUrl = uri ? uri : ALIUM_API
  const url = proxy ? `${proxy}/${baseUrl}tokens` : `${baseUrl}tokens`
  const response = await fetch(
    url,
    auth
      ? {
          method: 'GET',
          credentials: 'same-origin',
          headers: new Headers({
            Authorization: auth,
            Origin: baseUrl
          })
        }
      : {}
  )
  const result: TokensResponse = await response.json()
  return result.tokens
}
