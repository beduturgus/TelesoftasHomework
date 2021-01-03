const apply_special_item_rules = (item) => {
  const name = item.name.toString().trim().toLowerCase()
  Object.keys(actions).forEach((key) => {
    if(name.includes(key)) {
      actions[key](item)
    }
  })
  return item
}

const actions = {
  'aged brie': () => {
    console.log("briiiiiiiiiii")
  },
  'backstage passes': () => {
    console.log("baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaack")
  },
  'conjured': () => {
    console.log("conjuuuuuuuuuuuuuuuuuuuuuuuurs")
  }
}


module.exports = {apply_special_item_rules}