const actualDomain = 'mostalah.org'

module.exports = function (req, res, next) {
  if (req.hostname != actualDomain && req.hostname != 'localhost') {
    res.redirect(301, `https://${actualDomain}`)
  } else {
    next()
  }
}
