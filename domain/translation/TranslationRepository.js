class TranslationRepository {
  constructor(store) {
    this.store = store
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
    return this.store.listTranslations(termId)
  }
}

module.exports = TranslationRepository
