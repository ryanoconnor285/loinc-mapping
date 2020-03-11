const inputLoinc = require('./input-loinc.json')

const mappedLoinc = inputLoinc.map(loinc => {
  console.log(loinc.code)
})