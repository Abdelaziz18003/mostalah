var express = require('express')
var router = express.Router()
const termsRepo = require('../repo/termsRepo')

router.get('/', function (req, res, next) {
  const query = req.query.q
  const terms = termsRepo.search(query)
  res.render('search', { terms, query })
})

module.exports = router
