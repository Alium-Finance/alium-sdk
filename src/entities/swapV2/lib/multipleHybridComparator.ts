import { maxBy } from 'lodash'
import { DetailedTrade } from '../types'

export function multipleHybridComparator(detailedTrades: DetailedTrade[]) {
  const bestTrade = maxBy(detailedTrades, detailedTrade => {
    return detailedTrade?.trade?.outputAmount?.raw
  })
  return { bestTrade, all: detailedTrades }
}
