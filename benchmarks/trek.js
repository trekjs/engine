'use strict'

// https://github.com/koajs/koa/pull/751
if (process.env.OVERRIDE_PROMISE) {
  global.Promise = require('bluebird')
}

const Trek = require('..')

const app = new Trek()

// number of middleware

let n = parseInt(process.env.MW || '1', 10)
console.log(`  ${n} middleware`)

while (n--) {
  app.use((ctx, next) => next())
}

const body = new Buffer('Hello World')

app.use(({ res }, next) => next().then(() => res.send(200, body)))

app.run(7004)
