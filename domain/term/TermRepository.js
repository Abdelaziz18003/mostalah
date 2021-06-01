class TermRepository {
  constructor(store) {
    this.store = store
  }

  addTerm(term) {
    this.store.addTerm(term)
  }

  getTerm(termId) {
    return this.store.getTerm(termId)
  }

  updateTerm(term) {
    this.store.updateTerm(term)
  }

  deleteTerm(termId) {
    this.store.deleteTerm(termId)
  }

  listTerms() {
    return this.store.listTerms()
  }

  searchTerms(query) {
    return this.store.searchTerms(query)
  }
}

module.exports = TermRepository
