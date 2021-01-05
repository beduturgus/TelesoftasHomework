const fs = require('fs')
const readline = require('readline')
const {Readable} = require('stream')
const {InputGenerator} = require("./InputGenerator");
const {update_stream} = require("./services/transform_streams_service")
const {write_to_files_stream} = require('./services/write_stream_service')


const BIG_FILE_PATH = 'output/big.file'

const days_count = 2

//Generate big file
const inputGenerator = new InputGenerator()
const output = fs.createWriteStream(BIG_FILE_PATH)
inputGenerator.pipe(output)

const read_interface = readline.createInterface({
  input: fs.createReadStream('output/big.file')
})

const run_stream = () => {
  const in_stream = new Readable({
    read() {}
  })
  in_stream.pipe(update_stream).pipe(write_to_files_stream)
  read_interface.on('line', line => {
    in_stream.push(line + '#' + days_count)
  })
}



run_stream()