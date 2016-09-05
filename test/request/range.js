import test from 'ava'
import Request from '../../lib/request'

function req (ret) {
  return {
    get: () => ret,
    __proto__: Request.prototype
  }
}

test('should return parsed ranges', t => {
  const ranges = [{ start: 0, end: 50 }, { start: 51, end: 100 }]
  ranges.type = 'bytes'
  t.deepEqual(req('bytes=0-50,51-100').range(120), ranges)
})

test('should cap to the given size', t => {
  const ret = [{ start: 0, end: 74 }]
  ret.type = 'bytes'
  t.deepEqual(req('bytes=0-100').range(75), ret)
})

test('should have a .type', t => {
  const ret = [{ start: 0, end: Infinity }]
  ret.type = 'users'
  t.deepEqual(req('users=0-').range(Infinity), ret)
})

test('should return undefined if no range', t => {
  const ret = [{ start: 0, end: 50 }, { start: 60, end: 100 }]
  ret.type = 'bytes'
  t.true(req('').range(120) === undefined)
})

test('with "combine: true" option should return combined ranges', t => {
  const ranges = [{ start: 0, end: 100 }]
  ranges.type = 'bytes'
  t.deepEqual(req('bytes=0-50,51-100').range(120, { combine: true }), ranges)
})
