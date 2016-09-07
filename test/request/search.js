import test from 'ava'
import { request } from '../helpers/context'

test('should replace the search', t => {
  const req = request({ url: '/store/shoes' })
  req.search = '?page=2&color=blue'
  t.is(req.url, '/store/shoes?page=2&color=blue')
  t.is(req.search, '?page=2&color=blue')
})

test('should update req.querystring and req.query', t => {
  const req = request({ url: '/store/shoes' })
  req.search = '?page=2&color=blue'
  t.is(req.url, '/store/shoes?page=2&color=blue')
  t.is(req.querystring, 'page=2&color=blue')
  t.is(req.query.page, '2')
  t.is(req.query.color, 'blue')
})

test('should change .url but not .originalUrl', t => {
  const req = request({ url: '/store/shoes' })
  req.search = '?page=2&color=blue'
  t.is(req.url, '/store/shoes?page=2&color=blue')
  t.is(req.originalUrl, '/store/shoes')
  t.is(req.raw.originalUrl, '/store/shoes')
})

test('when missing should return ""', t => {
  const req = request({ url: '/store/shoes' })
  t.is(req.search, '')
})
