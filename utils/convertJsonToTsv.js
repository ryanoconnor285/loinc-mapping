const fs = require('fs')
const items = require('../src/outputs/loinc-table-output.json')


const columnDelimiter = '\t'
const lineDelimiter = '\n'
const outputDestination = '../src/outputs/loinc-final-output.tsv'

//Create labels
const keys = Object.keys(items[0])
const label = keys.join(columnDelimiter) + lineDelimiter

fs.writeFile(outputDestination, label, (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log("Items written to ", outputDestination)
})

// Fill in each row
items.map(item => {
  const values = Object.values(item)
  let output;
  output = values.join(columnDelimiter) + lineDelimiter
  fs.appendFile(outputDestination, output, (err) => {
    if (err) throw err;
  });
})

