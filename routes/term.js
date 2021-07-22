var express = require('express')
var router = express.Router()

const {
  addTerm,
  getTerm,
  listTranslations,
  addTranslation
} = require('../app/index')

router.post('/', async (req, res) => {
  const {en, ar} = req.body
  const termId = await addTerm({ en, ar})
  res.redirect(`./${termId}`)
})

router.get('/new', function (req, res) {
  res.render('./term/new')
})

router.get('/:id', async (req, res) => {
  const term = await getTerm(req.params.id)
  const translations = await listTranslations(req.params.id)
  res.render('./term/_id', { term: { ...term, translations } })
})

router.post('/:id', async (req, res) => {
  await addTranslation({
    termId: req.params.id,
    value: req.body.translation,
  })
  const term = await getTerm(req.params.id)
  const translations = await listTranslations(req.params.id)
  res.render('./term/_id', { term: { ...term, translations } })
})

module.exports = router
