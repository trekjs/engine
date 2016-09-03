'use strict'

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

app.listen(7004)
