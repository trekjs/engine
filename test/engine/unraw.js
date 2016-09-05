import { IncomingMessage, OutcomingMessage } from 'http'
import test from 'ava'
import Engine from '../../lib/engine'
import Request from '../../lib/request'
import Response from '../../lib/response'
import { listen } from '../helpers/context'

test('should return true', t => {
  const app = new Engine()
  t.true(app.unraw)
})

test('when unraw is true and req and res should instanceof Request and Response', async t => {
  const app = new Engine()

  app.use(async ({ req, res }, next) => {
    t.true(req instanceof Request)
    t.true(res instanceof Response)
    await next()
  })

  await listen(app)
})

test('when unraw is false and req and res should be raw req and raw res', async t => {
  const app = new Engine()
  app.unraw = false

  app.use(async ({ req, res }, next) => {
    t.true(req instanceof IncomingMessage)
    t.true(res instanceof OutcomingMessage)
    await next()
  })

  await listen(app)
})
