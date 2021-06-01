const testTerms = [
  { id: 1, value: 'tag' },
  { id: 2, value: 'attribute' },
]

const testTranslations = [
  { id: 1, termId: 1, value: 'وسم' },
  { id: 2, termId: 2, value: 'خاصية' },
  { id: 3, termId: 2, value: 'سمة' },
]

class Store {
  constructor({ terms = [], translations = [] }) {
    this.terms = terms.length ? terms : testTerms
    this.translations = translations.length ? translations : testTranslations
  }

  addTerm(term) {
    this.terms.push(term)
  }

  getTerm(termId) {
    return this.terms.find((term) => term.id == termId)
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

  searchTerms(query) {
    const queryString = String(query).trim().toLowerCase()
    if (queryString) {
      return this.terms.filter((term) => {
        const termString = (
          term.value + (term.translations ? term.translations.toString() : '')
        )
          .trim()
          .toLowerCase()
        return termString.includes(queryString)
      })
    } else {
      return []
    }
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

  listTranslations(termId) {
    return this.translations.filter((t) => t.termId == termId)
  }
}

module.exports = Store
