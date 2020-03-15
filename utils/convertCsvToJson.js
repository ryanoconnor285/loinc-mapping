const csvFilePath='../src/lookup-tables/LoincPartLink.csv'
const csv=require('csvtojson')
const writeToJson = require('./write-json')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    writeToJson(jsonObj, "../src/lookup-tables/loinc-part.json");
})