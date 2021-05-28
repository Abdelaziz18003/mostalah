class TranslationRepository {
  constructor(store) {
    this.store = store
  }

  addTranslation(translation) {
    this.store.addTranslation(translation)
  }

  getTranslation(translationId) {
    this.store.getTranslation(translationId)
  }

  updateTranslation(translation) {
    this.store.updateTranslation(translation)
  }

  deleteTranslation(translationId) {
    this.store.deleteTranslation(translationId)
  }

  listTranslations(termId) {
    this.store.listTranslations(termId)
  }
}

module.exports = TranslationRepository
