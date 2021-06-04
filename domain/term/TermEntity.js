class TermEntity {
  constructor({ id, value }) {
    if (!id || !value) {
      throw new Error('Term required fields (id or value) are missing')
    }
    this.id = id
    this.value = value
  }
}

module.exports = TermEntity
