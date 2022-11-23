const fs = require('fs')
const path = require('path')

let terms = []
fs.readdirSync(__dirname, { withFileTypes: true })
  .map((f) => f.name)
  .filter((f) => f.includes('.json'))
  .forEach((fileName) => {
    const fileTerms = fs.readFileSync(path.join(__dirname, fileName))
    terms = terms.concat(JSON.parse(fileTerms))
  })

module.exports = terms
