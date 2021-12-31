const InMemoryStore = require('../infrastructure/store/in-memory')
const AppService = require('./AppService')

const store = new InMemoryStore({
  terms: [],
})

module.exports = new AppService(store)
