var http = require('http')
const app = require('./infrastructure/web/app')

const PORT = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(PORT, () => {
  console.log('running on port', PORT)
})
