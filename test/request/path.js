import test from 'ava'
import parse from 'parseurl'
import { request } from '../helpers/context'

test.beforeEach(t => {
  t.context = request()
})

test('should return the pathname', t => {
  const req = t.context
  req.url = '/login?next=/dashboard'
  t.is(req.path, '/login')
})

test('should set the pathname', t => {
  const req = t.context
  req.url = '/login?next=/dashboard'

  req.path = '/logout'
  t.is(req.path, '/logout')
  t.is(req.url, '/logout?next=/dashboard')
})

test('should change .url but not .originalUrl', t => {
  const req = request({ url: '/login' })
  req.path = '/logout'
  t.is(req.url, '/logout')
  t.is(req.originalUrl, '/login')
  t.is(req.raw.originalUrl, '/login')
})

test('should not affect parseurl', t => {
  const req = request({ url: '/login?foo=bar' })
  req.path = '/login'
  const url = parse(req)
  t.is(url.path, '/login?foo=bar')
})
