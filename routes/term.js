var express = require('express')
var router = express.Router()

const termsRepo = require('../repo/termsRepo')

router.get('/:id', function (req, res) {
  const term = termsRepo.getTermById(req.params.id)
  res.render('term', { term })
})

module.exports = router
