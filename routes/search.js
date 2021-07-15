const express = require('express')
const router = express.Router()

const FakeStore = require('../infrastructure/store/fake')
const AppService = require('../app/AppService')

const store = new FakeStore({
  terms: [],
  translations: [],
})

const appService = new AppService(store)

router.get('/', function (req, res) {
  const query = req.query.q
  const terms = appService.searchTerms(query)
  terms.forEach((term) => {
    const translations = appService.listTranslations(term.id)
    term.translations = translations
  })
  res.render('search', { terms, query })
})

module.exports = router
