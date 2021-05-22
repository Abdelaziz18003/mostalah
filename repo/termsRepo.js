const terms = require('./terms.json')

module.exports.list = function () {
  return terms
}

module.exports.search = function (query) {
  return terms.filter((term) => {
    const termString = term.en + term.ar
    return termString.includes(query)
  })
}
