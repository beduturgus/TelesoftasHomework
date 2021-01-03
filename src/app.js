const fs = require('fs')
const readline = require('readline')
const {Readable} = require('stream')
const {InputGenerator} = require("./InputGenerator");
const {daily_transform} = require("./services/transform_streams_service")
const {write_to_files_stream} = require('./services/write_stream_service')



const BIG_FILE_PATH = 'big_file.txt'

const days_count = 3

const line_reader = readline.createInterface({
  input: fs.createReadStream('../big_file.txt')
})

const inputGenerator = new InputGenerator()
const output = fs.createWriteStream(BIG_FILE_PATH)
inputGenerator.pipe(output)

const run_stream = () => {
  const in_stream = new Readable({
    read() {}
  })
  in_stream.pipe(daily_transform).pipe(write_to_files_stream)
  //needs attention still streams cached values from big_file.txt
  line_reader.on('line', line => {
    console.log(line + '#' + days_count)
    in_stream.push(line + '#' + days_count)
  })
}



run_stream()