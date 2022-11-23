const express = require('express')
const router = express.Router()

const appService = require('../../app/index')

router.get('/', async function (req, res) {
  const query = req.query.q
  const terms = await appService.searchTerms(query)
  res.render('search', { terms, query })
})

module.exports = router
