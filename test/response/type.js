import test from 'ava'
import { response } from '../helpers/context'

test.beforeEach(t => {
  t.context = response()
})

test('with a mime should set the Content-Type', t => {
  const res = t.context
  res.type = 'text/plain'
  t.is(res.type, 'text/plain')
  t.is(res.headers['content-type'], 'text/plain; charset=utf-8')
})

test('with an extension should lookup the mime', t => {
  const res = t.context
  res.type = 'json'
  t.is(res.type, 'application/json')
  t.is(res.headers['content-type'], 'application/json; charset=utf-8')
})

test('without a charset should default the charset', t => {
  const res = t.context
  res.type = 'text/html'
  t.is(res.type, 'text/html')
  t.is(res.headers['content-type'], 'text/html; charset=utf-8')
})

test('with a charset should not default the charset', t => {
  const res = t.context
  res.type = 'text/html; charset=foo'
  t.is(res.type, 'text/html')
  t.is(res.headers['content-type'], 'text/html; charset=foo')
})

test('with an unknown extension should not set a content-type', t => {
  const res = t.context
  res.type = 'asdf'
  t.is(res.type, '')
  t.true(res.headers['content-type'] === undefined)
})

test('with no Content-Type should return ""', t => {
  const res = t.context
  t.is(res.type, '')
})

test('with a Content-Type should return the mime', t => {
  const res = t.context
  res.type = 'json'
  t.is(res.type, 'application/json')
})
