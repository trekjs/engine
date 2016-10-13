'use strict'

// https://github.com/koajs/koa/pull/751
if (process.env.OVERRIDE_PROMISE) {
  global.Promise = require('bluebird')
}

const Koa = require('koa')

const app = new Koa()

// number of middleware

let n = parseInt(process.env.MW || '1', 10)
console.log(`  ${n} middleware`)

while (n--) {
  app.use((ctx, next) => next())
}

const body = new Buffer('Hello World')

app.use((ctx, next) => next().then(() => {
  ctx.body = body
}))

app.listen(7002)
