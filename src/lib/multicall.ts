import { Interface } from '@ethersproject/abi'
import { JsonRpcProvider } from '@ethersproject/providers'


import { Contract } from 'ethers'

import { ChainId, MULTICALL_ABI, MULTICALL_ADDRESS } from '..'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

interface AggregateResult {
  returnData: string
  success: boolean
}

export const multicall = async <T = any>(
  abi: any[],
  calls: Call[],
  ethersProvider: JsonRpcProvider,
  chainId: ChainId
): Promise<T> => {
  try {
    const multi = new Contract(MULTICALL_ADDRESS[chainId], MULTICALL_ABI, ethersProvider)
    const itf = new Interface(abi)
    const calldata = calls.map(call => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])

    const result: AggregateResult[] = await multi.tryAggregate(false, calldata)

    const res = result.map((call, i) => {
      if (call.success) return itf.decodeFunctionResult(calls[i].name, call.returnData)
      return null
    })

    return (res as unknown) as T
  } catch (error) {
    throw new Error((error as any)?.message || 'unknown multicall error')
  }
}
