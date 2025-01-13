var http = require('http')
const app = require('./web/app')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))
const PORT = argv.port || process.env.PORT || 3000

const server = http.createServer(app)
server.listen(PORT, () => {
  console.log('running on port', PORT)
})
