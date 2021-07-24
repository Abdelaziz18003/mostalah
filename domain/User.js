class User {
  constructor({
    id,
    displayName,
    email,
    passwordHash,
    description,
    isVerified,
    createdAt
  }) {
    if(!id) throw new Error('id is required')
    if(!email) throw new Error('email is required')
    if(!passwordHash) throw new Error('passwordHash is required')
    this.id = id
    this.email = email
    this.displayName = displayName || ''
    this.description = description || ''
    this.passwordHash = passwordHash
    this.isVerified = isVerified || false
    this.createdAt = createdAt || Date.now()
  }

  verify() {
    this.isVerified = true
  }
}

module.exports = User