import { STATUS_CODES as statuses } from 'http'
import test from 'ava'
import { response } from '../helpers/context'

test.beforeEach(t => {
  t.context = response()
})

test('when a status code and valid should set the status', t => {
  const res = t.context
  res.status = 403
  t.is(res.status, 403)
})

test('when a status code and valid should not throw', t => {
  const res = t.context
  t.notThrows(() => {
    res.status = 403
  })
})

test('when a status string should throw', t => {
  const res = t.context
  t.throws(() => {
    res.status = 'forbidden'
  }, 'status code must be a number')
})

test('when a status code and invalid should throw', t => {
  const res = t.context
  t.throws(() => {
    res.status = 999
  }, 'invalid status code: 999')
})

test.before(() => {
  statuses['700'] = 'custom status'
})

test('when a status code and custom status should set the status', t => {
  const res = t.context
  res.status = 700
  t.is(res.status, 700)
})

test('when a status code and custom status should not throw', t => {
  const res = t.context
  t.notThrows(() => {
    res.status = 700
  })
})
