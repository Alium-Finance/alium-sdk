import { Provider } from '@ethersproject/providers'
import { BigNumber } from 'ethers'

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// add 30% to default gas price
export async function calculateGasPrice(provider: Provider): Promise<BigNumber> {
  const defaultGasPrice = await provider.getGasPrice()

  return defaultGasPrice.mul(BigNumber.from(10000).add(BigNumber.from(3000))).div(BigNumber.from(10000))
}
