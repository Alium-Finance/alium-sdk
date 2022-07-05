import axios, { AxiosResponse } from 'axios'
import { TokenList, TokensResponse } from '../types'

const staticLink = 'https://raw.githubusercontent.com/Alium-Finance/tokens-list/main/lists/'
const API_GITHUB_TREE = 'https://api.github.com/repos/Alium-Finance/tokens-list/git/trees/main?recursive=1'

const getFilesLinks = async () => {
  const response = await axios.get<{
    tree: { path: string }[]
  }>(API_GITHUB_TREE)
  return response?.data?.tree
    .filter(tree => tree?.path?.startsWith('lists/'))
    .map(tree => tree.path.replace('lists/', ''))
    .map(network => `${staticLink}${network}`)
}

export const getStaticTokensList = async () => {
  const links = await getFilesLinks()
  const results = await links?.reduce(async (acc, link) => {
    const arr = await acc
    arr.push(await axios.get<TokenList>(link))
    return arr
  }, Promise.resolve([] as AxiosResponse<TokenList>[]))
  return results.reduce((lists, list) => {
    let nextLists = lists
    const data = list.data
    nextLists = {
      ...lists,
      [data?.tokens[0].chainId]: data
    }
    return nextLists
  }, ({} as unknown) as TokensResponse['tokens'])
}
