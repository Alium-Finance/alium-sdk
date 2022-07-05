import { BASECURRENCIES, BigintIsh, ChainId, CurrencyAmount } from '..'

export const getCurrencyEther = (chainId: ChainId) => {
  const Ether = BASECURRENCIES[chainId]
  const id = chainId

  const toCurrencyAmount = (amount: BigintIsh) => {
    return CurrencyAmount.ether(amount, id)
    // return CurrencyAmount.@alium-official/sdk(amount)
  }

  return { Ether, calcAmount: toCurrencyAmount }
}
