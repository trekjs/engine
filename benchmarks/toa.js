'use strict'

// https://github.com/koajs/koa/pull/751
if (process.env.OVERRIDE_PROMISE) {
  global.Promise = require('bluebird')
}

const toa = require('toa')

const app = toa()

// Number of middleware

let n = parseInt(process.env.MW || '1', 10)
console.log(`  ${n} middleware`)

while (n--) {
  app.use(function * () {})
}

app.use(function () {
  this.body = 'Hello World'
})

app.listen(7003)
