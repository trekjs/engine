import test from 'ava'
import { request } from '../helpers/context'

test('should return type void of parameters', t => {
  const req = request()
  req.headers['content-type'] = 'text/html; charset=utf-8'
  t.is(req.type, 'text/html')
})

test('should with no host present', t => {
  const req = request()
  t.true(req.type === '')
})
