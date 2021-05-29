class Store {
  constructor({ terms = [], translations = [] }) {
    this.terms = terms
    this.translations = translations
  }

  addTerm(term) {
    this.terms.push(term)
  }

  getTerm(termId) {
    return this.terms.find((term) => term.id === termId)
  }

  updateTerm(term) {
    let index = null
    this.terms.forEach((t, i) => {
      if (t.id == term.id) {
        index = i
      }
    })
    this.terms.splice(index, 1, term)
  }

  deleteTerm(termId) {
    let index = null
    this.terms.forEach((t, i) => {
      if (t.id == termId) {
        index = i
      }
    })
    this.terms.splice(index, 1)
  }

  listTerms() {
    return this.terms
  }

  addTranslation(translation) {
    this.translations.push(translation)
  }

  getTranslation(translationId) {
    return this.translations.find(
      (translation) => translation.id == translationId
    )
  }

  updateTranslation(translation) {
    let index = null
    this.translations.forEach((t, i) => {
      if (t.id == translation.id) {
        index = i
      }
    })
    this.translations.splice(index, 1, translation)
  }

  deleteTranslation(translationId) {
    let index = null
    this.translations.forEach((t, i) => {
      if (t.id == translationId) {
        index = i
      }
    })
    this.translations.splice(index, 1)
  }

  listTranslations() {
    return this.translations
  }
}

module.exports = Store
