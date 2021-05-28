class TermRepository {
  constructor(store) {
    this.store = store
  }

  addTerm(term) {
    this.store.addTerm(term)
  }

  getTerm(termId) {
    this.store.getTerm(termId)
  }

  updateTerm(term) {
    this.store.updateTerm(term)
  }

  deleteTerm(termId) {
    this.store.deleteTerm(termId)
  }

  listTerms() {
    this.store.listTerms()
  }
}

module.exports = TermRepository
