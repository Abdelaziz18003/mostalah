const Term = require('../domain/Term')
const User = require('../domain/User')

function getUniqueId() {
  return parseInt(Math.random() * 10 ** 14)
}

function hashPassword(password) {
  return password
}

class AppService {
  constructor(store) {
    this.store = store
  }

  async signUpUser({ username, email, password }) {
    let user = await this.store.getUser({ email })
    if (user) {
      return Promise.reject(null)
    } else {
      user = new User({
        id: getUniqueId(),
        username,
        email,
        passwordHash: hashPassword(password),
      })
      await this.store.addUser(user)
      return Promise.resolve(user)
    }
  }

  async signInUser({ email, password }) {
    const hashedPassword = hashPassword(password)
    const user = await this.getUser({ email })
    if (user && user.passwordHash == hashedPassword) {
      return Promise.resolve(user)
    } else {
      return Promise.resolve(null)
    }
  }

  async getUser({ id, email }) {
    if (id && email) throw new Error('Can\'t get user with both id and email')
    if (!id && !email) throw new Error('id or email are required')
    const user = await this.store.getUser({ id, email })
    return Promise.resolve(user || null)
  }

  async addTerm({ original, translation }) {
    try {
      const termId = getUniqueId()
      const newTerm = new Term({ id: termId, original, translation })
      await this.store.addTerm(newTerm)
      return Promise.resolve(termId)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async getTerm(termId) {
    try {
      const term = await this.store.getTerm(termId)
      return Promise.resolve(term)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async updateTerm(termInfo) {
    try {
      const term = new Term(termInfo)
      const result = await this.store.updateTerm(term)
      return Promise.resolve(result)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async deleteTerm(termId) {
    try {
      const deleted = await this.store.deleteTerm(termId)
      return Promise.resolve(deleted)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async listTerms() {
    try {
      const result = await this.store.listTerms()
      return Promise.resolve(result)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async searchTerms(query) {
    try {
      let results = await this.store.searchTerms(query)
      results.sort((t1, t2) => {
        return t1.original.length - t2.original.length
      })
      results = results.slice(0, 50)
      return Promise.resolve(results)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

module.exports = AppService
