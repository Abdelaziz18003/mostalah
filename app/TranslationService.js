const TranslationRepository = require('../domain/translation/TranslationRepository')

class TranslationService {
  constructor(store) {
    this.repository = new TranslationRepository(store)
  }

  addTranslation(translation) {
    this.repository.addTranslation(translation)
  }

  getTranslation(translationId) {
    return this.repository.getTranslation(translationId)
  }

  updateTranslation(translation) {
    this.repository.updateTranslation(translation)
  }

  deleteTranslation(translationId) {
    this.repository.deleteTranslation(translationId)
  }

  listTranslations(termId) {
    if (!termId) {
      throw new Error('termId is required to list translations')
    }
    return this.repository.listTranslations(termId)
  }
}

module.exports = TranslationService
