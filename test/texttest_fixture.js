const {InputGenerator} = require("../src/input_generator");
const {object_mapping_transform, daily_transform, special_items_transform} = require("../src/transform_streams")

const days = Number(process.argv[2]) || 2;
const inputGenerator = new InputGenerator()


inputGenerator
.pipe(object_mapping_transform)
.pipe(daily_transform)
.pipe(special_items_transform)
.pipe(process.stdout)
// for (let day = 0; day < days; day++) {
  // console.log(`\n-------- day ${day} --------`);
  // console.log("name, sellIn, quality");
  // items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));

  // Shop.updateQuality(items)
// }