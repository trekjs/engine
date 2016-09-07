import test from 'ava'
import { response } from '../helpers/context'

test.beforeEach(t => {
  t.context = response()
})

test('should return the response header object', t => {
  const res = t.context
  res.set('X-Foo', 'bar')
  t.deepEqual(res.header, { 'x-foo': 'bar' })
})

test('when res._headers not present should return empty object', t => {
  const res = t.context
  res.raw._headers = null
  t.deepEqual(res.header, {})
})
