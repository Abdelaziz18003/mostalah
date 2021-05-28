class TranslationService {
  constructor(repository) {
    this.repository = repository
  }

  addTranslation(translation) {
    this.repository.addTranslation(translation)
  }

  getTranslation(translationId) {
    this.repository.getTranslation(translationId)
  }

  updateTranslation(translation) {
    this.repository.updateTranslation(translation)
  }

  deleteTranslation(translationId) {
    this.repository.deleteTranslation(translationId)
  }

  listTranslations(termId) {
    this.repository.listTranslations(termId)
  }
}

module.exports = TranslationService
