import JSBI from 'jsbi'

export function maxJSBItBy<T>(items: T[], select: (item: T) => JSBI | undefined): T | null {
  let maxItem: T | null | undefined = null

  items.forEach(item => {
    if (!maxItem) {
      maxItem = item
    } else {
      const maxItemValue = select(maxItem)
      const itemValue = select(item)
      if (itemValue && maxItemValue && JSBI.greaterThan(itemValue, maxItemValue)) {
        maxItem = item
      }
    }
  })

  return maxItem
}

export function minJSBIBy<T>(items: T[], select: (item: T) => JSBI | undefined): T | null {
  let minItem: T | null = null

  items.forEach(item => {
    if (!minItem) {
      minItem = item
    } else {
      const minItemValue = select(minItem)
      const itemValue = select(item)
      if (itemValue && minItemValue && JSBI.lessThan(itemValue, minItemValue)) {
        minItem = item
      }
    }
  })

  return minItem
}
