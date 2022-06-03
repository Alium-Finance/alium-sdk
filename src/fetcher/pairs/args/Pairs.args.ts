import { ChainId, Currency } from '../../../'

export interface PairsArgs {
  currencyA: Currency
  currencyB: Currency
  chainId: ChainId
  networkRpcUrlsList: { [key in ChainId]: string[] }
  account: string
  amount: string
  method: 'bestTradeExactIn' | 'bestTradeExactOut'
}
