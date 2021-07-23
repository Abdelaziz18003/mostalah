var express = require('express')
var router = express.Router()

const appService = require('../../../app/index')

router.post('/', async (req, res) => {
  const {en, ar} = req.body
  const termId = await appService.addTerm({ en, ar})
  res.redirect(`./${termId}`)
})

router.get('/new', function (req, res) {
  res.render('./term/new')
})

router.get('/:id', async (req, res) => {
  const term = await appService.getTerm(req.params.id)
  const translations = await appService.listTranslations(req.params.id)
  res.render('./term/_id', { term: { ...term, translations } })
})

router.post('/:id', async (req, res) => {
  await appService.addTranslation({
    termId: req.params.id,
    value: req.body.translation,
  })
  const term = await appService.getTerm(req.params.id)
  const translations = await appService.listTranslations(req.params.id)
  res.render('./term/_id', { term: { ...term, translations } })
})

module.exports = router
