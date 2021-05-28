class TermService {
  constructor(repository) {
    this.repository = repository
  }

  addTerm(term) {
    this.repository.addTerm(term)
  }

  getTerm(termId) {
    return this.repository.getTerm(termId)
  }

  updateTerm(term) {
    this.repository.updateTerm(term)
  }

  deleteTerm(termId) {
    this.repository.deleteTerm(termId)
  }

  listTerms() {
    return this.repository.listTerms()
  }
}

module.exports = TermService
