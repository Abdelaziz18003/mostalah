const testTerms = require('./terms')

const latency = 10

class Store {
  constructor({ terms = [] }) {
    this.terms = terms.length ? terms : testTerms
    this.users = []
  }

  addUser(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.users.push(user)
        resolve(user)
      }, latency)
    })
  }

  getUser({ id, email }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (id) {
          const user = this.users.find((user) => user.id == id)
          resolve(user)
        } else if (email) {
          const user = this.users.find((user) => user.email == email)
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
            const termString = (term.original + term.translation)
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
}

module.exports = Store
