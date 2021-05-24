const terms = require('./terms.json')

module.exports.list = function () {
  return terms
}

module.exports.search = function (query) {
  if (String(query).trim()) {
    return terms.filter((term) => {
      const termString = (term.en + term.ar).trim()
      return termString.includes(query)
    })
  } else {
    return []
  }
}
