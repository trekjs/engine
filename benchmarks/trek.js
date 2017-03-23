'use strict'

// https://github.com/koajs/koa/pull/751
if (process.env.OVERRIDE_PROMISE) {
  global.Promise = require('bluebird')
}

const Trek = require('..')

const app = new Trek()

// Number of middleware

let n = parseInt(process.env.MW || '1', 10)
console.log(`  ${n} middleware`)

while (n--) {
  app.use((ctx, next) => next())
}

const body = Buffer.from('Hello World')

app.use(({ res }, next) => next().then(() => {
  res.status = 200
  res.body = body
}))

app.run(7004)
