const Term = require('../domain/Term')
const Translation = require('../domain/Translation')

function getUniqueId() {
  return parseInt(Math.random() * 10 ** 14)
}

class AppService {
  constructor(store) {
    this.store = store
  }

  async addTerm({en, ar}) {
    if (!en || !ar) {
      throw new Error('en and ar properties are required')
    }
    try {
      const termId = getUniqueId()
      const newTerm = new Term({ id: termId, value: en })
      await this.store.addTerm(newTerm)
      await this.store.addTranslation({
        termId,
        value: ar
      })
      return Promise.resolve(termId)
    } catch(e) {
      return Promise.reject(e)
    }
  }

  async getTerm(termId) {
    try {
      const term = await this.store.getTerm(termId)
      return Promise.resolve(term)
    } catch(e) {
      return Promise.reject(e)
    }
  }

  async updateTerm(termInfo) {
    try {
      const term = new Term(termInfo)
      const result = await this.store.updateTerm(term)
      return Promise.resolve(result)
    } catch(e) {
      return Promise.reject(e)
    }
  }

  async deleteTerm(termId) {
    try {
      const deleted = await this.store.deleteTerm(termId)
      return Promise.resolve(deleted)
    } catch(e) {
      return Promise.reject(e)
    }
  }

  async listTerms() {
    try {
      const result = await this.store.listTerms()
      return Promise.resolve(result)
    } catch(e) {
      return Promise.reject(e)
    }
  }

  async searchTerms(query) {
    try {
      const results = await this.store.searchTerms(query)
      return Promise.resolve(results)
    } catch(e) {
      return Promise.reject(e)
    }
  }

  async addTranslation(translationInfo) {
    try {
      const translation = new Translation({
        id: getUniqueId(),
        termId: translationInfo.termId,
        value: translationInfo.value
      })
      await this.store.addTranslation(translation)
      return Promise.resolve(translation)
    } catch(e) {
      return Promise.reject(e)
    }
  }

  async getTranslation(translationId) {
    try {
      const translation = await this.store.getTranslation(translationId)
      return Promise.resolve(translation)
    } catch(e) {
      return Promise.reject(e)
    }
  }

  async updateTranslation(translation) {
    try {
      const updated = await this.store.updateTranslation(translation)
      return Promise.resolve(updated)
    } catch(e) {
      return Promise.reject(e)
    }
    
  }

  async deleteTranslation(translationId) {
    try {
      const deleted = await this.store.deleteTranslation(translationId)
      return Promise.resolve(deleted)
    } catch(e) {
      return Promise.reject(e)
    }
  }

  async listTranslations(termId) {
    try {
      if (!termId) {
        throw new Error('termId is required to list translations')
      }
      const results = await this.store.listTranslations(termId)
      return Promise.resolve(results)
    } catch(e) {
      return Promise.reject(e)
    }
  }
}

module.exports = AppService
