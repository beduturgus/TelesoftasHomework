const {Writable} = require('stream')
const fs = require('fs')
const {get_type} = require("../utils");

const aged_brie_file = fs.createWriteStream("./output/aged_brie_items.txt")
const backstage_passes_file = fs.createWriteStream("./output/backstage_passes_items.txt")
const sulfuras_file = fs.createWriteStream("./output/sulfuras_items.txt")
const conjured_file = fs.createWriteStream("./output/conjured_items.txt")
const other_items_file = fs.createWriteStream("./output/other_items.txt")

const write_to_files_stream = new Writable({
  write(chunk, encoding, callback) {
    const item = JSON.parse(chunk)
    if(get_type(item.name) === 'other') {
      other_items_file.write(JSON.stringify(item) + '\n')
    } else {
      write_special_items_object[get_type(item.name)](JSON.stringify(item))
    }
    callback();
  }
})

const write_special_items_object = {
  'aged brie': (item) => {
    aged_brie_file.write(item + '\n')
  },
  'backstage passes': (item) => {
    backstage_passes_file.write(item + '\n')
  },
  'sulfuras': (item) => {
    sulfuras_file.write(item + '\n')
  },
  'conjured': (item) => {
    conjured_file.write(item + '\n')
  }
}



module.exports = {write_to_files_stream}