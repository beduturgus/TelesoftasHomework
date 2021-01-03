const apply_special_item_rules = (item) => {
  const name = item.name.toString().trim().toLowerCase()
  let result = null
  Object.keys(actions).forEach((key) => {
    if(name.includes(key)) {
      result = actions[key](item)
    }
  })
  return result !== null ? result : item
}

const actions = {
  'aged brie': (item) => {
    //There was no information given if quality of brie increase twice faster when sellIn is <= 0, so left default of +1 daily
    const quality = parseInt(item.quality) < 50 ? parseInt(item.quality) + 1 : 50
    const sellIn = parseInt(item.sellIn) > 0 ? parseInt(item.sellIn) - 1 : 0
    item.quality = quality.toString()
    item.sellIn = sellIn.toString()
    return item
  },
  'backstage passes': (item) => {
    let sellIn = parseInt(item.sellIn)
    let quality = parseInt(item.quality)

    if(sellIn > 10) quality += 1
    if(sellIn <= 10 && sellIn > 5) quality += 2
    if(sellIn <= 5 && sellIn > 0) quality += 3
    if(sellIn <= 0) quality = 0

    item.sellIn = parseInt(item.sellIn) > 0 ? sellIn - 1 : 0
    item.quality = quality > 50 ? 50 : quality
    return item
  },
  'conjured': (item) => {
    let quality = parseInt(item.quality)
    let sellIn = parseInt(item.sellIn)
    if(sellIn > 0) quality -= 2
    if(sellIn <= 0) quality -= 4
    sellIn -= 1
    item.quality = quality < 0 ? 0 : quality
    item.sellIn = sellIn < 0 ? 0 : sellIn
    return item
  }
}


module.exports = {apply_special_item_rules}