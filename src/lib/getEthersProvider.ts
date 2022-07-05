import { ethers } from 'ethers'
import { ChainId } from '..'

export const getEthersProvider = (chainId: ChainId, networkRpcUrlsList: { [key in ChainId]: string[] }) => {
  const rpc = networkRpcUrlsList[chainId]?.[0]
  if (!rpc) {
    return null
  }
  return new ethers.providers.JsonRpcProvider(networkRpcUrlsList[chainId]?.[0])
}
