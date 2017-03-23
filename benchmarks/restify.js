'use strict'

// https://github.com/koajs/koa/pull/751
if (process.env.OVERRIDE_PROMISE) {
  global.Promise = require('bluebird')
}

const restify = require('restify')

const app = restify.createServer()

// Number of middleware

let n = parseInt(process.env.MW || '1', 10)
console.log(`  ${n} middleware`)

while (n--) {
  app.pre((req, res, next) => next())
}

const body = Buffer.from('Hello World')

app.pre((req, res) => res.sendRaw(200, body))

app.listen(7005)
