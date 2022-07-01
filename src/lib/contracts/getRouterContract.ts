import { ROUTER_ABI } from '../..'
import { getContract, GetContractArgs } from './getContract'

export const getRouterContract = (args: Omit<GetContractArgs, 'abi'>) => {
  return getContract({
    ...args,
    abi: ROUTER_ABI
  })
}
