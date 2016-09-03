'use strict'

const toa = require('toa')

const app = toa()

// number of middleware

let n = parseInt(process.env.MW || '1', 10)
console.log(`  ${n} middleware`)

while (n--) {
  app.use(function * () {})
}

app.use(function * () {
  this.body = 'Hello World'
})

app.listen(7003)
