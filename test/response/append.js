import test from 'ava'
import { response } from '../helpers/context'

test.beforeEach(t => {
  t.context = response()
})

test('should append multiple headers', t => {
  const res = t.context
  res.append('x-foo', 'bar1')
  res.append('x-foo', 'bar2')
  t.deepEqual(res.headers['x-foo'], ['bar1', 'bar2'])
})

test('should accept array of values', t => {
  const res = t.context

  res.append('Set-Cookie', ['foo=bar', 'fizz=buzz'])
  res.append('Set-Cookie', 'hi=again')
  t.deepEqual(res.headers['set-cookie'], ['foo=bar', 'fizz=buzz', 'hi=again'])
})

test('should get reset by res.set(field, val)', t => {
  const res = t.context

  res.append('Link', '<http://localhost/>')
  res.append('Link', '<http://localhost:80/>')

  res.set('Link', '<http://127.0.0.1/>')

  t.is(res.headers.link, '<http://127.0.0.1/>')
})

test('should work with res.set(field, val) first', t => {
  const res = t.context

  res.set('Link', '<http://localhost/>')
  res.append('Link', '<http://localhost:80/>')

  t.deepEqual(res.headers.link, [
    '<http://localhost/>',
    '<http://localhost:80/>'
  ])
})
