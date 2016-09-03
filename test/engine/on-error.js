import test from 'ava'
import request from 'request-promise'
import Engine from '../../lib/engine'
import { createError } from '../../lib/util'
import { listen } from '../helpers/context'

test.beforeEach(t => {
  t.context = new Engine()
})

test('handle catch should response and throws 500', async t => {
  const app = t.context

  app.use(() => {
    throw createError()
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
  const app = t.context

  app.use(() => {
    throw createError(404, 'Not found')
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
