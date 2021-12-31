class Term {
  constructor({ id, original, translation, source }) {
    if (!id || !translation) {
      throw new Error(
        'Term one or more required fields (id, original, translation) are missing'
      )
    }
    this.id = id
    this.original = original
    this.translation = translation
    this.source = source || 'community'
  }
}

module.exports = Term
