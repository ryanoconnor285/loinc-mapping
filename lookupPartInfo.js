const customLoincTable = require('./src/outputs/loinc-table-output.json');
const loincPart = require('./src/lookup-tables/loinc-part.json');
const writeToJson = require('./utils/write-json');

const outputLoinc = customLoincTable.map(loinc => {
  const matchingLoinc = loincPart.find(part => part.LoincNumber === loinc.loinc_code);
  loinc.part_number = matchingLoinc.PartNumber
  loinc.part_name = matchingLoinc.PartName
  loinc.part_type = matchingLoinc.PartTypeName
  return loinc
});

console.log(outputLoinc)

writeToJson(outputLoinc, "./src/outputs/loinc-table-output.json")