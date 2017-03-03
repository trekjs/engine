import test from 'ava'
import { request } from '../helpers/context'

test.beforeEach(t => {
  t.context = request()
})

test('when encrypted', t => {
  const req = t.context
  req.raw.socket = { encrypted: true }
  t.is(req.protocol, 'https')
})

test('when unencrypted', t => {
  const req = t.context
  req.raw.socket = {}
  t.is(req.protocol, 'http')
})

test('when X-Forwarded-Proto is set and proxy is trusted', t => {
  const req = t.context
  req.config.set('trust proxy', true)
  req.raw.socket = {}
  req.headers['x-forwarded-proto'] = 'https, http'
  t.is(req.protocol, 'https')
})

test('when X-Forwarded-Proto is set and X-Forwarded-Proto is empty', t => {
  const req = t.context
  req.config.set('trust proxy', true)
  req.raw.socket = {}
  req.headers['x-forwarded-proto'] = ''
  t.is(req.protocol, 'http')
})

test('when X-Forwarded-Proto is set and proxy is not trusted', t => {
  const req = t.context
  req.raw.socket = {}
  req.headers['x-forwarded-proto'] = 'https, http'
  t.is(req.protocol, 'http')
})
