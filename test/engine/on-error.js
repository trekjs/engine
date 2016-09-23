import fs from 'fs'
import test from 'ava'
import request from 'request-promise'
import Engine from '../../lib/engine'
import HTTPError from '../../lib/http-error'
import { listen } from '../helpers/context'

test('handle catch should response and throws 500', async t => {
  const app = new Engine()

  app.use(() => {
    throw new HTTPError()
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
    throw new HTTPError(404, 'Not found')
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
