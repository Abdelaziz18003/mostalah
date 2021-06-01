const express = require('express')
const router = express.Router()

const InMemoryStore = require('../store/InMemoryStore')
const TermRepository = require('../domain/term/TermRepository')
const TermService = require('../domain/term/TermService')

const TranslationRepository = require('../domain/translation/TranslationRepository')
const TranslationService = require('../domain/translation/TranslationService')

const store = new InMemoryStore({
  terms: [],
  translations: [],
})
const termRepository = new TermRepository(store)
const termService = new TermService(termRepository)

const translationRepository = new TranslationRepository(store)
const translationService = new TranslationService(translationRepository)

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
