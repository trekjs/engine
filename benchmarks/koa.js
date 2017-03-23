'use strict'

// https://github.com/koajs/koa/pull/751
if (process.env.OVERRIDE_PROMISE) {
  global.Promise = require('bluebird')
}

const Koa = require('koa')

const app = new Koa()

// Number of middleware

let n = parseInt(process.env.MW || '1', 10)
console.log(`  ${n} middleware`)

while (n--) {
  app.use((ctx, next) => next())
}

const body = Buffer.from('Hello World')

app.use((ctx, next) => next().then(() => {
  ctx.body = body
}))

app.listen(7002)
