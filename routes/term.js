var express = require('express')
var router = express.Router()

const TranslationEntity = require('../domain/translation/TranslationEntity')

const InMemoryStore = require('../store/InMemoryStore')
const TermService = require('../app/TermService')
const TranslationService = require('../app/TranslationService')

const store = new InMemoryStore({
  terms: [],
  translations: [],
})

const termService = new TermService(store)
const translationService = new TranslationService(store)

router.post('/', function (req, res) {
  const term = termService.getTerm(req.params.id)
  const translations = translationService.listTranslations(req.params.id)
  res.render('term', { term: { ...term, translations } })
})

router.get('/:id', function (req, res) {
  const term = termService.getTerm(req.params.id)
  const translations = translationService.listTranslations(req.params.id)
  res.render('term', { term: { ...term, translations } })
})

router.post('/:id', function (req, res) {
  const translation = new TranslationEntity({
    id: 2, // should be a UUID
    termId: req.params.id,
    value: req.body.translation,
  })
  translationService.addTranslation(translation)
  const term = termService.getTerm(req.params.id)
  const translations = translationService.listTranslations(req.params.id)
  res.render('term', { term: { ...term, translations } })
})

module.exports = router
