const loincTable = require('./src/lookup-tables/loinc-table.json') 

const inputHandler = (loinc) => {
  const output = {}
  const matchingLoinc = loincTable.find(table => table.LOINC_NUM === loinc.code)
  output.loinc_code = matchingLoinc.LOINC_NUM
  output.name = matchingLoinc.LONG_COMMON_NAME
  output.display_name = matchingLoinc.DisplayName
  output.range = matchingLoinc.UnitsAndRange
  output.scale_type = matchingLoinc.SCALE_TYP
  return output
}