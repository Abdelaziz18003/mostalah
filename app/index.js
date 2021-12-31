const InMemoryStore = require('../infrastructure/store/in-memory')
const AppService = require('./AppService')

const store = new InMemoryStore({
  terms: [],
  translations: [],
})

module.exports = new AppService(store)
