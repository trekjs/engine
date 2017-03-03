import test from 'ava'
import { request } from '../helpers/context'

test.beforeEach(t => {
  t.context = request()
})

test('should return length in content-length', t => {
  const req = t.context
  req.headers['content-length'] = '10'
  t.is(req.length, 10)
})

test('with no content-length present', t => {
  const req = t.context
  t.true(undefined === req.length)
})
