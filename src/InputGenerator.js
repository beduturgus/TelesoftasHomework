const {Readable} = require('stream');
const fs = require('fs')

const ITEM_NAMES = ['Backstage passes to a TAFKAL80ETC concert', 'Aged Brie',
  'Sulfuras', 'Hand of Ragnaros', 'foo', 'Conjured Mana Cake'];
const QUALITY_INTERVAL = [0, 50];
const SELLINS_INTERVAL = [0, 10];
const MAX_ITEM_COUNT = 9;

class InputGenerator extends Readable {
  constructor(options) {
    super(options);
    this.count = 0;
    this.moreData = true;
  }

  _read(size) {
    let mayPush = true;
    do {
      mayPush = this.push(generateInputLine());
      if (this.count++ >= MAX_ITEM_COUNT) {
        this.moreData = false;
      }
    } while (mayPush && this.moreData);
    if (mayPush) {
      this.push(null);
    }
  }
}

const generateInputLine = () => {
  return `${ITEM_NAMES[random(0, 6)]}#${random(QUALITY_INTERVAL[0],
      QUALITY_INTERVAL[1])}#${random(SELLINS_INTERVAL[0],
      SELLINS_INTERVAL[1])}\n`;
}

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = { InputGenerator: InputGenerator }

