const fs = require('fs')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()

const dbFile = 'store/terms-mozilla.json'
const langFile = 'lang/mozilla.tmx'

const terms = fs.readFileSync(langFile, { encoding: 'utf-8' })
parser.parseString(terms, (err, result) => {
  if (err) {
    console.error(err)
    return
  } else {
    const terms = removeDuplicatedTerms(parseMicrosoftTerms(result))
    fs.writeFileSync(dbFile, JSON.stringify(terms))
  }
})

function parseMicrosoftTerms(rawJson) {
  return rawJson.tmx.body[0].tu.map((term) => ({
    id: term.$.id,
    original: term.tuv[0].seg[0],
    translation: term.tuv[1].seg[0],
    source: 'Mozilla',
    description: '',
  }))
}

function removeDuplicatedTerms(terms) {
  let uniqueTerms = []
  let addedStrings = []
  terms.forEach((term) => {
    const termString = `${term.original}_${term.translation}`
    if (!addedStrings.includes(termString)) {
      uniqueTerms.push(term)
      addedStrings.push(termString)
    }
  })
  return uniqueTerms
}
