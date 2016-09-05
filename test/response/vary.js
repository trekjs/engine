import test from 'ava'
import { response } from '../helpers/context'

test.beforeEach(t => {
  t.context = response()
})

test('when Vary is not set should set it', t => {
  const res = t.context
  res.vary('Accept')
  t.is(res.header.vary, 'Accept')
})

test('when Vary is set should append', t => {
  const res = t.context
  res.vary('Accept')
  res.vary('Accept-Encoding')
  t.is(res.header.vary, 'Accept, Accept-Encoding')
})

test('when Vary already contains the value should not append', t => {
  const res = t.context
  res.vary('Accept')
  res.vary('Accept-Encoding')
  res.vary('Accept')
  res.vary('Accept-Encoding')
  t.is(res.header.vary, 'Accept, Accept-Encoding')
})
