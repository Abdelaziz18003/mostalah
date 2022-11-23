var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var nunjucks = require('nunjucks')

var domainRedirecter = require('./middlewares/domain-redirector')

var indexRouter = require('./routes/index')
var searchRouter = require('./routes/search')
var termRouter = require('./routes/term')

var app = express()

// set default express engine and extension
app.engine('njk', nunjucks.render)
app.set('view engine', 'njk')

// view engine setup
nunjucks.configure(path.join(__dirname, './views'), {
  autoescape: true,
  express: app,
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// this middleware is used to disable "mostalah.herokuapp.com" url
app.use(domainRedirecter)
app.use('/', indexRouter)
app.use('/search', searchRouter)
app.use('/term', termRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
