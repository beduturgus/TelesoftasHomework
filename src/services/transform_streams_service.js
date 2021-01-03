const {get_name, get_sellIn, get_quality} = require("../utils");
const {Item} = require('../item')
const {Transform} = require('stream')
const {apply_special_item_rules} = require('./special_item_logic_service')

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
    const item = new Item(get_name(chunk), get_sellIn(chunk), get_quality(chunk))
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

module.exports = {
  special_items_transform,
  daily_transform,
  object_mapping_transform
}