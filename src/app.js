const {InputGenerator} = require("./services/input_generator_service");
const {object_mapping_transform, daily_transform, special_items_transform} = require("./services/transform_streams_service")
const {write_to_files_stream} = require('./services/write_stream_service')

const run_stream = () => {
  const inputGenerator = new InputGenerator()
  inputGenerator
  .pipe(object_mapping_transform)
  .pipe(daily_transform)
  .pipe(special_items_transform)
  .pipe(write_to_files_stream)
}

run_stream()