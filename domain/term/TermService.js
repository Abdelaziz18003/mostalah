class TermService {
  constructor(repository) {
    this.repository = repository
  }

  addTerm(term) {
    this.repository.addTerm(term)
  }

  getTerm(termId) {
    this.repository.getTerm(termId)
  }

  updateTerm(term) {
    this.repository.updateTerm(term)
  }

  deleteTerm(termId) {
    this.repository.deleteTerm(termId)
  }

  listTerms() {
    this.repository.listTerms()
  }
}

module.exports = TermService
