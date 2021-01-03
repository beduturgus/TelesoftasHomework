const get_sellIn = (chunk) => {
  const res =  chunk.toString().match(/\d+/g)
  return res[res.length-3]
}

const get_quality = (chunk) => {
  const res =  chunk.toString().match(/\d+/g)
  return res[res.length-2]
}

const get_name = (chunk) => {
  return chunk.toString().split("#")[0]
}

const get_day_count = (chunk) => {
  const res =  chunk.toString().match(/\d+/g)
  return res[res.length-1]
}

const get_type = (name) => {
  let result = 'other'
  const special_items_names = ['conjured', 'backstage passes', 'sulfuras', 'aged brie']
  special_items_names.forEach(type => {
    if(name.toString().toLowerCase().includes(type)) {
      result = type
    }
  })
  return result
}

module.exports = {
  get_sellIn,
  get_quality,
  get_name,
  get_day_count,
  get_type
}