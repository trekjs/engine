import test from 'ava'
import { response } from '../helpers/context'

test.beforeEach(t => {
  t.context = response()
})

test('should has a field', t => {
  const res = t.context
  res.set('x-foo', 'bar')
  t.is(res.has('X-FOO'), true)
})

test('should has not field', t => {
  const res = t.context
  res.set('x-foo', 5)
  t.is(res.has('X-BAR'), false)
})
