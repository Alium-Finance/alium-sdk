import { Fragment, Interface } from '@ethersproject/abi'
import { getAddress } from '@ethersproject/address'

import { BigNumber, BigNumberish, BytesLike, Contract } from 'ethers'

export interface MultiExecutableCall {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
  value?: number[] | BigNumber[] // Function values
  contract?: Contract
}
export interface InputDataStruct {
  dest: string
  data: BytesLike
  value: BigNumberish
}

export const getMulticallExecutableCallData = (
  contracts: Contract[],
  calls: MultiExecutableCall[]
): InputDataStruct[] => {
  const itf = combineInterfaces(contracts)

  return calls
    ?.filter(call => !!call)
    .map(call => ({
      dest: getAddress(call?.address),
      data: itf.encodeFunctionData(call?.name, call?.params),
      value: BigNumber.from(call?.value || '0')
    }))
}

export function combineInterfaces(args: Contract[]) {
  const fragments = args?.length
    ? args?.reduce((fragments: Fragment[], contract) => {
        const current = contract?.interface?.fragments
        if (current) {
          fragments.push(...current)
        }
        return fragments
      }, [])
    : []
  return new Interface(fragments)
}
