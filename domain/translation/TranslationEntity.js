class TranslationEntity {
  constructor({ id, termId, value }) {
    this.id = id
    this.termId = termId
    this.value = value
  }

  getId() {
    return this.id
  }

  setId(id) {
    this.id = id
  }

  getTermId() {
    return this.termId
  }

  setTermId(termId) {
    this.term = termId
  }

  getValue() {
    return this.value
  }

  setValue(value) {
    this.value = value
  }
}

module.exports = TranslationEntity
