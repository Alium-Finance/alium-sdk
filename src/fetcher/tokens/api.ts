import axios from 'axios'
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
  const response = await axios.get<TokensResponse>(url, {
    headers: auth
      ? {
          Authorization: auth,
          Origin: baseUrl
        }
      : {}
  })

  const result = await response.data
  return result.tokens
}
