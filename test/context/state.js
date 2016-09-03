import test from 'ava'
import request from 'request-promise'
import Engine from '../../lib/engine'
import { listen } from '../helpers/context'

test('ctx.state should provide a ctx.state namespace', async t => {
  const app = new Engine()

  app.use(({ state, res }) => {
    t.deepEqual(state, {})
    res.end()
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const url = await listen(app)
  try {
    await request(url)
  } catch (err) {
    t.true(err.statusCode === 404)
  }
})
