class TermEntity {
  constructor({ id, value }) {
    this.id = id
    this.value = value
  }

  getId() {
    return this.id
  }

  setId(id) {
    this.id = id
  }

  getValue() {
    return this.value
  }

  setValue(value) {
    this.value = value
  }
}

module.exports = TermEntity
