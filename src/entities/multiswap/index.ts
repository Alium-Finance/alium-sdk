import { JsonRpcProvider } from '@ethersproject/providers'
import { ALM_TOKENS, ChainId, Swap, SwapArgs, WETH, wrappedCurrency } from '../..'

export class Multiswap {
  constructor(private readonly foreignProvider: JsonRpcProvider, private readonly foreignChainId: ChainId) {}

  public async rateForeignChain(args: Omit<SwapArgs, 'currencyA' | 'comparator'>) {
    const { currencyB } = args

    const swap = new Swap(this.foreignProvider, this.foreignChainId)
    const STABLE_FOREIGN = this.getStable()
    const ALM_FOREIGN = ALM_TOKENS[this.foreignChainId]
    const receiveTokenIsCore = currencyB && wrappedCurrency(currencyB, this.foreignChainId)?.equals?.(STABLE_FOREIGN)

    if (!receiveTokenIsCore) {
      // Calc receive stable token of alm token (only alium liquidity)
      const tradeToStable = await swap.swapExactIn({
        ...args,
        currencyA: STABLE_FOREIGN,
        currencyB: ALM_FOREIGN,
        comparator: 'onlyA'
      })
      // Calc receive token of core token (hybrid strategy)
      const tradeToErc20 = await swap.swapExactIn({
        ...args,
        currencyA: currencyB,
        currencyB: STABLE_FOREIGN,
        amount: tradeToStable?.trade?.outputAmount?.toSignificant(6) || '0',
        comparator: 'hybrid'
      })

      return {
        tradeToStable,
        tradeToErc20,
        targetStable: STABLE_FOREIGN
      }
    } else {
      const tradeToErc20 = await swap.swapExactIn({
        ...args,
        currencyA: args?.currencyB,
        currencyB: ALM_FOREIGN,
        comparator: 'hybrid'
      })

      return {
        tradeToStable: null,
        tradeToErc20,
        targetStable: null
      }
    }
  }

  // take from tokens list later
  private getStable() {
    return WETH[this.foreignChainId]
  }
}
