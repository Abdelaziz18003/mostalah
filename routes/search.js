const express = require('express')
const router = express.Router()

const InMemoryStore = require('../infra/store/InMemoryStore')
const AppService = require('../app/AppService')

const store = new InMemoryStore({
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
