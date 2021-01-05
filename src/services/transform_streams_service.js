const {get_name, get_sellIn, get_quality, get_day_count} = require("../utils");
const {Item} = require('../item')
const {Transform} = require('stream')
const {apply_special_item_rules} = require('./special_item_logic_service')

const SPECIAL_ITEMS = ['sulfuras', 'aged brie', 'backstage passes', 'conjured']

const update_stream = new Transform({
  transform(chunk, encoding, callback) {
    const chunk_string = chunk.toString()
    const item = new Item(get_name(chunk_string), get_sellIn(chunk_string), get_quality(chunk_string))
    const result = perform_update(item, get_day_count(chunk_string))
    this.push(JSON.stringify(result))
    callback()
  }
})

const perform_update = (item, days = 1, counter = 0) => {
  if(!SPECIAL_ITEMS.some(str => item.name.toString().toLowerCase().includes(str))) {
    perform_daily_reduction(item)
  }
  const res = apply_special_item_rules(item)
  counter++
  if(counter < days) {
    return perform_update(res, days, counter)
  } else {
    return res
  }
}

const perform_daily_reduction = (item) => {
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
}

module.exports = {
  update_stream,
  perform_daily_reduction,
  perform_update
}