const express = require('express')
const router = express.Router()

const InMemoryStore = require('../store/InMemoryStore')
const TermService = require('../app/TermService')
const TranslationService = require('../app/TranslationService')

const store = new InMemoryStore({
  terms: [],
  translations: [],
})

const termService = new TermService(store)
const translationService = new TranslationService(store)

router.get('/', function (req, res) {
  const query = req.query.q
  const terms = termService.searchTerms(query)
  terms.forEach((term) => {
    const translations = translationService.listTranslations(term.id)
    term.translations = translations
  })
  res.render('search', { terms, query })
})

module.exports = router
