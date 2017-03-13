import test from 'ava'
import { response } from '../helpers/context'

test.beforeEach(t => {
  t.context = response()
})

test('should return the response header object', t => {
  const res = t.context
  res.set('X-Foo', 'bar')
  t.deepEqual(res.headers, { 'x-foo': 'bar' })
})

test('should return empty object', t => {
  const res = t.context
  t.deepEqual(res.headers, {})
})
