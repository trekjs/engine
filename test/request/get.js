import test from 'ava'
import { request } from '../helpers/context'

test.beforeEach(t => {
  t.context = request()
})

test('should return the field value', t => {
  const req = t.context
  req.headers.host = 'http://google.com'
  req.headers.referer = 'http://google.com'
  t.is(req.get('HOST'), 'http://google.com')
  t.is(req.get('Host'), 'http://google.com')
  t.is(req.get('host'), 'http://google.com')
  t.is(req.get('referer'), 'http://google.com')
  t.is(req.get('referrer'), 'http://google.com')
})
