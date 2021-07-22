const express = require('express')
const router = express.Router()

const { searchTerms, listTranslations } = require('../app/index')

router.get('/', async function (req, res) {
  const query = req.query.q
  const terms = await searchTerms(query)
  for (const term of terms) {
    const translations = await listTranslations(term.id)
    term.translations = translations
  }
  res.render('search', { terms, query })
})

module.exports = router
