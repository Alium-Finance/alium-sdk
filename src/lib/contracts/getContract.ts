import { isAddress } from '@ethersproject/address'
import { JsonRpcProvider } from '@ethersproject/providers'
import { Contract, ContractInterface } from 'ethers'

export interface GetContractArgs {
  address: string
  abi: ContractInterface
  provider: JsonRpcProvider
  account?: string
}
export const getContract = ({ address, abi, provider, account }: GetContractArgs) => {
  if (!isAddress(address)) {
    console.error(address, 'cannot be create in getContract, bad address')
    return null
  }
  if (!provider) {
    console.error(address, 'cannot be create in getContract, bad provider')
    return null
  }
  const providerOrSigner = account ? provider.getSigner(account).connectUnchecked() : provider
  return new Contract(address, abi, providerOrSigner)
}
