import { Currency, CurrencyAmount, JSBI, Token, TokenAmount } from '../'
import { parseUnits } from '@ethersproject/units'
import { getCurrencyEther } from './getCurrencyEther'

// try to parse a user entered amount for a given token
export function tryParseAmount(chainId: number, value?: string, currency?: Currency): CurrencyAmount | undefined {
  if (!value || !currency) {
    return undefined
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString()
    if (typedValueParsed !== '0') {
      const { calcAmount } = getCurrencyEther(chainId)

      const token =
        currency instanceof Token
          ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
          : calcAmount(typedValueParsed)

      return token
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.info(`Failed to parse input amount: "${value}"`, error)
  }
  // necessary for all paths to return a value
  return undefined
}
