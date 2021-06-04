const TermRepository = require('../domain/term/TermRepository')

class TermService {
  constructor(store) {
    const repository = new TermRepository(store)
    if (!(repository instanceof TermRepository)) {
      throw new Error('repository should be an instance of TermRepository')
    }
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

  searchTerms(query) {
    return this.repository.searchTerms(query)
  }
}

module.exports = TermService
