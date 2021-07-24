const testTerms = [
  { id: 1, value: 'tag' },
  { id: 2, value: 'attribute' },
]

const testTranslations = [
  { id: 1, termId: 1, value: 'وسم' },
  { id: 2, termId: 2, value: 'خاصية' },
  { id: 3, termId: 2, value: 'سمة' },
]

const latency = 10

class Store {
  constructor({ terms = [], translations = [] }) {
    this.terms = terms.length ? terms : testTerms
    this.translations = translations.length ? translations : testTranslations
    this.users = []
  }

  addUser(user) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.users.push(user)
        resolve(user)
      }, latency)
    })
  }

  getUser({id, email }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (id) {
          const user = this.users.find((user) => user.id == id )
          resolve(user)
        } else if (email) {
          const user = this.users.find((user) => user.email == email )
          resolve(user)
        }
      }, latency)
    })
  }

  addTerm(term) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.terms.push(term)
        resolve(term)
      }, latency)
    })
  }

  getTerm(termId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const term = this.terms.find((term) => term.id == termId)
        resolve(term)
      }, latency)
    })
  }

  updateTerm(term) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let index = null
        this.terms.forEach((t, i) => {
          if (t.id == term.id) {
            index = i
          }
        })
        this.terms.splice(index, 1, term)
        resolve(term)
      }, latency)
    })
  }

  deleteTerm(termId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let index = null
        this.terms.forEach((t, i) => {
          if (t.id == termId) {
            index = i
          }
        })
        const term = this.terms[index]
        this.terms.splice(index, 1)
        resolve(term)
      }, latency)
    })
  }

  listTerms() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.terms)
      }, latency)
    })
  }

  searchTerms(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const queryString = String(query).trim().toLowerCase()
        if (queryString) {
          const filteredTerms = this.terms.filter((term) => {
            const termString = (
              term.value +
              (term.translations ? term.translations.toString() : '')
            )
              .trim()
              .toLowerCase()
            return termString.includes(queryString)
          })
          resolve(filteredTerms)
        } else {
          resolve([])
        }
      }, latency)
    })
  }

  addTranslation(translation) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.translations.push(translation)
        resolve(translation)
      }, latency)
    })
  }

  getTranslation(translationId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const translation = this.translations.find((t) => t.id == translationId)
        resolve(translation)
      }, latency)
    })
  }

  updateTranslation(translation) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let index = null
        this.translations.forEach((t, i) => {
          if (t.id == translation.id) {
            index = i
          }
        })
        this.translations.splice(index, 1, translation)
        resolve(translation)
      }, latency)
    })
  }

  deleteTranslation(translationId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let index = null
        this.translations.forEach((t, i) => {
          if (t.id == translationId) {
            index = i
          }
        })
        const translation = this.translations[index]
        this.translations.splice(index, 1)
        resolve(translation)
      }, latency)
    })
  }

  listTranslations(termId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.translations.filter((t) => t.termId == termId)
        resolve(filtered)
      }, latency)
    })
  }
}

module.exports = Store
