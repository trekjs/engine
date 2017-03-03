import test from 'ava'
import { response } from '../helpers/context'

test.beforeEach(t => {
  t.context = response()
})

test('should set a field value', t => {
  const res = t.context
  res.set('x-foo', 'bar')
  t.is(res.headers['x-foo'], 'bar')
})

test('should coerce to a string', t => {
  const res = t.context
  res.set('x-foo', 5)
  t.is(res.headers['x-foo'], '5')
})

test('should set a field value of array', t => {
  const res = t.context
  res.set('x-foo', ['foo', 'bar'])
  t.deepEqual(res.headers['x-foo'], ['foo', 'bar'])
})

test('should set multiple fields', t => {
  const res = t.context

  res.set({
    foo: '1',
    bar: '2'
  })

  t.is(res.headers.foo, '1')
  t.is(res.headers.bar, '2')
})
