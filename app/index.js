const FakeStore = require('../infrastructure/store/fake')
const AppService = require('./AppService')

const store = new FakeStore({
  terms: [],
  translations: [],
})

module.exports = new AppService(store)
