const express = require('express')
const router = express.Router()

const FakeStore = require('../infrastructure/store/fake')
const AppService = require('../app/AppService')

const store = new FakeStore({
  terms: [],
  translations: [],
})

const appService = new AppService(store)

router.get('/', async function (req, res) {
  const query = req.query.q
  const terms = await appService.searchTerms(query)
  for (const term of terms) {
    const translations = await appService.listTranslations(term.id)
    term.translations = translations
  }
  res.render('search', { terms, query })
})

module.exports = router
