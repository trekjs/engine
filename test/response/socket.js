import Stream from 'stream'
import test from 'ava'
import { response } from '../helpers/context'

test.beforeEach(t => {
  t.context = response()
})

test('should return the request socket object', t => {
  const res = t.context
  t.true(res.socket instanceof Stream)
})
