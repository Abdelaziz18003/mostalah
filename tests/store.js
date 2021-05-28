class Store {
  constructor({ terms = [], translations = [] }) {
    this.terms = terms
    this.translations = translations
  }

  addTerm(term) {
    this.terms.push(term)
  }

  getTerm(termId) {
    return this.terms.find((term) => term.id === termId)
  }

  updateTerm(term) {
    let index = null
    this.terms.forEach((t, i) => {
      if (t.id == term.id) {
        index = i
      }
    })
    this.terms.splice(index, 1, term)
  }

  deleteTerm(termId) {
    let index = null
    this.terms.forEach((t, i) => {
      if (t.id == termId) {
        index = i
      }
    })
    this.terms.splice(index, 1)
  }

  listTerms() {
    return this.terms
  }
}

module.exports = Store
