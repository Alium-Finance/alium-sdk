
import { BLOCKED_PRICE_IMPACT_NON_EXPERT } from '../../../'
import { maxBy, minBy } from 'lodash'
import { DetailedTrade } from '../types'

export function multipleHybridComparator(detailedTrades: DetailedTrade[]) {
  const bestByReceive = maxBy(detailedTrades, detailedTrade => {
    return detailedTrade?.trade?.outputAmount?.raw
  })
  const priceImactIsHigh = !bestByReceive?.trade?.priceImpact?.lessThan(BLOCKED_PRICE_IMPACT_NON_EXPERT)

  const minByPriceImpact = minBy(detailedTrades, detailedTrade => {
    return detailedTrade?.trade?.priceImpact?.numerator
  })

  return { bestTrade: priceImactIsHigh ? minByPriceImpact : bestByReceive, all: detailedTrades }
}
