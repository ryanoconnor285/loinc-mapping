const customLoincTable = require('./src/outputs/loinc-table-output.json');
const axios = require('axios')
const cheerio = require('cheerio')

// Method for scraping html from loinc.org
// gets html for each loinc code and returns the value for part description 
// example:
// Given a loinc code: 2132-9
// This specific loinc code is for a lab test for a 'part' named Cobalamins'
// This function should scrape a description of that part
// part_desc: 'Cobalamins, or reduced levels of vitamin B12 may indicate the presence...'
const loincPartScraping = async loinc => {
  try {
    const res = await axios.get(`https://loinc.org/` + loinc.loinc_code);
    if (res.status === 200) {
      const $ = cheerio.load(res.data)
      const partInfo = $('#part-descriptions')
      const partDesc = partInfo
      .find('p')
      .text()
      .replace(loinc.part_number, '')
      .replace(loinc.part_name, '')
      .replace( /[\r\n]+/gm, '')
      .replace(/\t/g, '')
      .trim()
      loinc.part_desc = partDesc
    }
  } catch (error) {
    console.error(error);
  }
  return loinc
}

async function f() {
  process.stdout.write("Iterating over ./src/outputs/loinc-table-output.json.  This may take a couple of minutes.")
  const outputLoinc = customLoincTable.map(loinc => loincPartScraping(loinc))
  const promise = await Promise.all(outputLoinc)
  console.log(promise)
}
f()

module.exports = loincPartScraping;