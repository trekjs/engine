'use strict'

// https://github.com/koajs/koa/pull/751
if (process.env.OVERRIDE_PROMISE) {
  global.Promise = require('bluebird')
}

const http = require('http')
const express = require('express')

const app = express()

// number of middleware

let n = parseInt(process.env.MW || '1', 10)
console.log(`  ${n} middleware`)

while (n--) {
  app.use((req, res, next) => next())
}

const body = new Buffer('Hello World')

app.use((req, res, next) => res.send(body))

app.listen(7001)
