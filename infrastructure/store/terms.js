const termsArabeyes = require('./terms-arabeyes.json')
const termsMozilla = require('./terms-mozilla.json')

const terms = [].concat(termsArabeyes, termsMozilla)

module.exports = terms
