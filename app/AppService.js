const TermRepository = require('../domain/term/TermRepository')
const TranslationRepository = require('../domain/translation/TranslationRepository')

function getUniqueId() {
  return parseInt(Math.random() * 10 ** 14)
}

class AppService {
  constructor(store) {
    this.termRepository = new TermRepository(store)
    this.translationRepository = new TranslationRepository(store)
  }

  addTerm(term) {
    const termId = getUniqueId()
    this.termRepository.addTerm({ id: termId, value: term.en })
    this.translationRepository.addTranslation({
      termId: termId,
      id: getUniqueId(),
      value: term.ar,
    })
    return termId
  }

  getTerm(termId) {
    return this.termRepository.getTerm(termId)
  }

  updateTerm(term) {
    this.termRepository.updateTerm(term)
  }

  deleteTerm(termId) {
    this.termRepository.deleteTerm(termId)
  }

  listTerms() {
    return this.termRepository.listTerms()
  }

  searchTerms(query) {
    return this.termRepository.searchTerms(query)
  }

  addTranslation(translation) {
    this.translationRepository.addTranslation(translation)
  }

  getTranslation(translationId) {
    return this.translationRepository.getTranslation(translationId)
  }

  updateTranslation(translation) {
    this.translationRepository.updateTranslation(translation)
  }

  deleteTranslation(translationId) {
    this.translationRepository.deleteTranslation(translationId)
  }

  listTranslations(termId) {
    if (!termId) {
      throw new Error('termId is required to list translations')
    }
    return this.translationRepository.listTranslations(termId)
  }
}

module.exports = AppService
