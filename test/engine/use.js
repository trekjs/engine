import test from 'ava'
import request from 'request-promise'
import HttpError from 'trek-http-error'
import Engine from '../../lib/engine'
import { listen } from '../helpers/context'

test('should compose middleware', async t => {
  const app = new Engine()
  const calls = []

  /* eslint ava/prefer-async-await: 0 */
  app.use((ctx, next) => {
    calls.push(1)
    return next().then(() => {
      calls.push(6)
    })
  })

  app.use((ctx, next) => {
    calls.push(2)
    return next().then(() => {
      calls.push(5)
    })
  })

  app.use((ctx, next) => {
    calls.push(3)
    return next().then(() => {
      calls.push(4)
    })
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })

  t.is(res.statusCode, 200)
  t.deepEqual(calls, [1, 2, 3, 4, 5, 6])
})

test('should compose mixed middleware', async t => {
  process.once('deprecation', () => {}) // Silence deprecation message
  const app = new Engine()
  const calls = []

  app.use((ctx, next) => {
    calls.push(1)
    return next().then(() => {
      calls.push(6)
    })
  })

  app.use(async (ctx, next) => {
    calls.push(2)
    await next()
    calls.push(5)
  })

  app.use((ctx, next) => {
    calls.push(3)
    return next().then(() => {
      calls.push(4)
    })
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })

  t.is(res.statusCode, 200)
  t.deepEqual(calls, [1, 2, 3, 4, 5, 6])
})

// https://github.com/koajs/koa/pull/530#issuecomment-148138051
test('should catch thrown errors in non-async functions', async t => {
  const app = new Engine()

  app.use(() => {
    throw new HttpError(404, 'Not found')
  })

  app.on('error', err => {
    t.true(err !== null)
  })

  const uri = await listen(app)
  try {
    await request(uri)
  } catch (err) {
    t.true(err.statusCode === 404)
  }
})

test('should throw error for non function', t => {
  const app = new Engine()
  ;[null, undefined, 0, false, 'not a function'].forEach(v => {
    const err = t.throws(() => app.use(v))

    t.is(err.message, 'middleware must be a function!')
  })
})
