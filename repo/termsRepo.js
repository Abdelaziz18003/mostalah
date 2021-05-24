const terms = require('./terms.json')

module.exports.list = function () {
  return terms
}

module.exports.search = function (query) {
  const queryString = String(query).trim().toLowerCase()
  if (queryString) {
    return terms.filter((term) => {
      const termString = (term.en + term.ar).trim().toLowerCase()
      return termString.includes(queryString)
    })
  } else {
    return []
  }
}
