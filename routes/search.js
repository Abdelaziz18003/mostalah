const express = require('express')
const router = express.Router()

const InMemoryStore = require('../store/InMemoryStore')
const TermService = require('../domain/term/TermService')
const TranslationService = require('../domain/translation/TranslationService')

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
  res.render('search', { terms })
})

module.exports = router
