import test from 'ava'
import { request } from '../helpers/context'

test.beforeEach(t => {
  t.context = request()
})

test('should return host with port', t => {
  const req = t.context
  req.headers.host = 'foo.com:3000'
  t.is(req.host, 'foo.com:3000')
})

test('with no host present', t => {
  const req = t.context
  t.is(req.host, '')
})

test('when X-Forwarded-Host is present and proxy is not trusted', t => {
  const req = t.context
  req.headers['x-forwarded-host'] = 'bar.com'
  req.headers.host = 'foo.com'
  t.is(req.host, 'foo.com')
})

test('when X-Forwarded-Host is present and proxy is trusted', t => {
  const req = t.context
  req.config.set('trust proxy', true)
  req.headers['x-forwarded-host'] = 'bar.com, baz.com'
  req.headers.host = 'foo.com'
  t.is(req.host, 'bar.com')
})
