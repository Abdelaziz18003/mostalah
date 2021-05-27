var express = require('express')
var router = express.Router()
const termsRouter = require('../controllers/term.controller')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
})

router.use(termsRouter)

module.exports = router
