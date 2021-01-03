const {Item} = require('./gilded_rose')
const {Transform} = require('stream')
const {apply_special_item_rules} = require('./special_item_logic')

const SPECIAL_ITEMS = ['sulfuras', 'aged brie', 'backstage passes', 'conjured']

const special_items_transform = new Transform({
  transform(chunk, encoding, callback) {
    const result = apply_special_item_rules(JSON.parse(chunk))
    this.push(JSON.stringify(result))
    callback()
  }
})

const object_mapping_transform = new Transform({
  transform(chunk, encoding, callback) {
    console.log(chunk.toString())
    const item = new Item(getName(chunk), getSellIn(chunk), getQuality(chunk))
    this.push(JSON.stringify(item))
    callback()
  }
})

const daily_transform = new Transform({
  transform(chunk, encoding, callback) {
    const item = JSON.parse(chunk)
    const name = item.name.toString().toLowerCase()
    if(!SPECIAL_ITEMS.some(str => name.includes(str))) {
      performDailyReduction(item)
    }
    this.push(JSON.stringify(item))
    callback()
  }
})

const performDailyReduction = (item) => {
  let quality = parseInt(item.quality)
  let sellIn = parseInt(item.sellIn)

  if(sellIn > 0) {
    sellIn -= 1
    quality -= 1
  } else {
    quality = quality - 2
  }
  item.quality = (quality < 0 ? 0 : quality).toString()
  item.sellIn = sellIn.toString()
  return item
}

const getSellIn = (chunk) => {
  const res =  chunk.toString().match(/\d+/g)
  return res[res.length-2]
}

const getQuality = (chunk) => {
  const res =  chunk.toString().match(/\d+/g)
  return res[res.length-1]
}

const getName = (chunk) => {
  return chunk.toString().split("#")[0]
}

const between = (x, min, max) => {
  return x >= min && x <= max
}

module.exports = {
  special_items_transform,
  daily_transform,
  object_mapping_transform
}