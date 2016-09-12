import test from 'ava'
import request from 'request-promise'
import Engine from '../../lib/engine'
import { listen } from '../helpers/context'

test.beforeEach(t => {
  t.context = new Engine()
})

test('should sent header', async t => {
  const app = t.context

  app.use(({ res }) => {
    t.false(res.headerSent)
    res.redirect('http://bing.com')
    t.true(res.headerSent)
  })

  const url = await listen(app)
  await request(url)
})
