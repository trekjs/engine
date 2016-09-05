import test from 'ava'
import { response } from '../helpers/context'

test.beforeEach(t => {
  t.context = response()
})

test('should not modify an etag with quotes', t => {
  const res = t.context
  res.etag = '"asdf"'
  t.is(res.header.etag, '"asdf"')
})

test('should not modify a weak etag', t => {
  const res = t.context
  res.etag = 'W/"asdf"'
  t.is(res.header.etag, 'W/"asdf"')
})

test('should add quotes around an etag if necessary', t => {
  const res = t.context
  res.etag = 'asdf'
  t.is(res.header.etag, '"asdf"')
})

test('should return etag', t => {
  const res = t.context
  res.etag = '"asdf"'
  t.is(res.etag, '"asdf"')
})
