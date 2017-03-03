import test from 'ava'
import { request } from '../helpers/context'

test.beforeEach(t => {
  t.context = request()
})

test('with no content-type present', t => {
  const req = t.context
  t.is(req.charset, '')
})

test('with charset present', t => {
  const req = t.context
  req.headers['content-type'] = 'text/plain'
  t.is(req.charset, '')
})

test('with a charset', t => {
  const req = t.context
  req.headers['content-type'] = 'text/plain; charset=utf-8'
  t.is(req.charset, 'utf-8')
})

test('should return "" if content-type is invalid', t => {
  const req = t.context
  req.headers['content-type'] = 'application/json; application/text; charset=utf-8'
  t.is(req.charset, '')
})
