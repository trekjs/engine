import test from 'ava'
import { response } from '../helpers/context'

test.beforeEach(t => {
  t.context = response()
})

test('with no response.res present should return null', t => {
  const res = t.context
  res.status = 200
  delete res.raw
  t.true(undefined === res.inspect())
})

test('should return a json representation', t => {
  const res = t.context
  res.status = 200

  t.deepEqual(res.inspect(), {
    status: 200,
    message: 'OK'
  })
})
