function getUniqueId() {
  return parseInt(Math.random() * 10 ** 14)
}

class AppService {
  constructor(store) {
    this.store = store
  }

  addTerm(term) {
    const termId = getUniqueId()
    this.store.addTerm({ id: termId, value: term.en })
    this.store.addTranslation({
      termId: termId,
      id: getUniqueId(),
      value: term.ar,
    })
    return termId
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

  addTranslation(translation) {
    this.store.addTranslation(translation)
  }

  getTranslation(translationId) {
    return this.store.getTranslation(translationId)
  }

  updateTranslation(translation) {
    this.store.updateTranslation(translation)
  }

  deleteTranslation(translationId) {
    this.store.deleteTranslation(translationId)
  }

  listTranslations(termId) {
    if (!termId) {
      throw new Error('termId is required to list translations')
    }
    return this.store.listTranslations(termId)
  }
}

module.exports = AppService
