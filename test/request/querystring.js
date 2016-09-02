import test from 'ava'
import parseurl from 'parseurl'
import { request } from '../helpers/context'

test('should return the querystring', t => {
  const req = request({ url: '/store/shoes?page=2&color=blue' })
  t.is(req.querystring, 'page=2&color=blue')
})

test('when req.req not present should return an empty string', t => {
  const req = request()
  req.req = null
  t.is(req.querystring, '')
})

test('req.querystring= should replace the querystring', t => {
  const req = request({ url: '/store/shoes' })
  req.querystring = 'page=2&color=blue'
  t.is(req.url, '/store/shoes?page=2&color=blue')
  t.is(req.querystring, 'page=2&color=blue')
})

test('req.querystring= should update req.search and req.query', t => {
  const req = request({ url: '/store/shoes' })
  req.querystring = 'page=2&color=blue'
  t.is(req.url, '/store/shoes?page=2&color=blue')
  t.is(req.search, '?page=2&color=blue')
  t.is(req.query.page, '2')
  t.is(req.query.color, 'blue')
})

test('req.querystring= should change .url but not .originalUrl', t => {
  const req = request({ url: '/store/shoes' })
  req.querystring = 'page=2&color=blue'
  t.is(req.url, '/store/shoes?page=2&color=blue')
  t.is(req.originalUrl, '/store/shoes')
  t.is(req.req.originalUrl, '/store/shoes')
})

test('req.querystring= should not affect parseurl', t => {
  const req = request({ url: '/login?foo=bar' })
  req.querystring = 'foo=bar'
  const url = parseurl(req.req)
  t.is(url.path, '/login?foo=bar')
})
