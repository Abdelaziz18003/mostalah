const fs = require('fs')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()

const dbFile = 'store/terms-microsoft.json'
const langFile = 'lang/microsoft.tbx'

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
  return rawJson.martif.text[0].body[0].termEntry.map((term) => ({
    id: term.$.id,
    original: term.langSet[0].ntig[0].termGrp[0].term[0]._,
    translation: term.langSet[1].ntig[0].termGrp[0].term[0]._,
    source: 'Microsoft',
    description: term.langSet[0].descripGrp[0].descrip[0]._,
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
