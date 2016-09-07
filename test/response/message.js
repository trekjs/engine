import test from 'ava'
import { response } from '../helpers/context'

test.beforeEach(t => {
  t.context = response()
})

test('should return the response status message', t => {
  const res = t.context
  res.status = 200
  t.is(res.message, 'OK')
})

test('when res.message not present should look up in statuses', t => {
  const res = t.context
  res.raw.statusCode = 200
  t.is(res.message, 'OK')
})

test('should set response status message', t => {
  const res = t.context
  res.message = 'OK'
  t.is(res.raw.statusMessage, 'OK')
})
