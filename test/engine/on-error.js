import fs from 'fs'
import test from 'ava'
import request from 'request-promise'
import HttpError from 'trek-http-error'
import Engine from '../../lib/engine'
import { listen } from '../helpers/context'

test('handle catch should response and throws 500', async t => {
  const app = new Engine()

  app.use(() => {
    throw new HttpError()
  })

  app.on('error', err => {
    t.true(err !== null)
  })

  const url = await listen(app)
  try {
    await request(url)
  } catch (err) {
    t.true(err.statusCode === 500)
  }
})

test('handle catch should response and throws 404', async t => {
  const app = new Engine()

  app.use(() => {
    throw new HttpError(404, 'Not found')
  })

  app.on('error', err => {
    t.true(err !== null)
  })

  const url = await listen(app)
  try {
    await request(url)
  } catch (err) {
    t.true(err.statusCode === 404)
  }
})

test('should handle errors when no content status', async t => {
  const app = new Engine()

  app.use(({ res }) => {
    res.status = 204
    res.body = fs.createReadStream('does not exist')
  })

  app.on('error', err => {
    t.true(err !== null)
  })

  const url = await listen(app)
  try {
    await request(url)
  } catch (err) {
    t.true(err.statusCode === 204)
  }
})

test('should handle all intermediate stream body errors', async t => {
  const app = new Engine()

  app.use(({ res }) => {
    res.body = fs.createReadStream('does not exist')
    res.body = fs.createReadStream('does not exist')
    res.body = fs.createReadStream('does not exist')
  })

  app.on('error', err => {
    t.true(err !== null)
  })

  const url = await listen(app)
  try {
    await request(url)
  } catch (err) {
    t.true(err.statusCode === 404)
  }
})

test('should expose message', async t => {
  const app = new Engine()
  app.dev = false

  app.use(() => {
    throw new HttpError(404, 'Nothing', undefined, true)
  })

  app.on('error', err => {
    t.true(err !== null)
  })

  const uri = await listen(app)
  const res = await request({
    uri,
    resolveWithFullResponse: true,
    simple: false
  })
  t.is(res.statusCode, 404)
  t.is(res.body, 'Nothing')
})

test('should expose status', async t => {
  const app = new Engine()
  app.dev = false

  app.use(() => {
    throw new HttpError(404, 'Nothing', undefined)
  })

  app.on('error', err => {
    t.true(err !== null)
  })

  const uri = await listen(app)
  const res = await request({
    uri,
    resolveWithFullResponse: true,
    simple: false
  })
  t.is(res.statusCode, 404)
  t.is(res.body, '404')
})

test.cb('should ignore error after headerSent', t => {
  const app = new Engine()

  app.use(async ({ res }) => {
    res.status = 200
    res.set('X-FOO', 'bar')
    res.flush()
    await Promise.reject(new Error('mock error'))
    res.body = 'response'
  })

  app.on('error', err => {
    t.is(err.message, 'mock error')
    t.is(err.headersSent, true)
    t.end()
  })

  listen(app)
    .then(uri => request({ uri, resolveWithFullResponse: true, simple: false }))
    .then(res => t.is(res.statusCode, 200))
})
