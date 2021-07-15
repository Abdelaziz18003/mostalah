class Translation {
  constructor({ id, termId, value }) {
    if (!id || !termId || !value) {
      throw new Error(
        'Translation required fields (id, termId or value) are missing'
      )
    }
    this.id = id
    this.termId = termId
    this.value = value
  }
}

module.exports = Translation
