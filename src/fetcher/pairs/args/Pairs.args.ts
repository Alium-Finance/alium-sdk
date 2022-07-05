import { Currency } from '../../../'

export interface PairsArgs {
  currencyA: Currency
  currencyB: Currency
  account: string
  amount: string
  method: 'bestTradeExactIn' | 'bestTradeExactOut'
}
