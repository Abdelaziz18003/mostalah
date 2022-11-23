const fs = require('fs')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()

const terms = fs.readFileSync('lang/microsoft.tbx', { encoding: 'utf-8' })
parser.parseString(terms, (err, result) => {
  if (err) {
    console.error(err)
    return
  } else {
    fs.writeFileSync(
      'store/terms-microsoft.json',
      JSON.stringify(parseMicrosoftTerms(result))
    )
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
