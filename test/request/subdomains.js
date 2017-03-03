import test from 'ava'
import { request } from '../helpers/context'

test('should return subdomain array', t => {
  const req = request()
  req.headers.host = 'tobi.ferrets.example.com'
  req.config.set('subdomain offset', 2)
  t.deepEqual(req.subdomains, ['ferrets', 'tobi'])

  req.config.set('subdomain offset', 3)
  t.deepEqual(req.subdomains, ['tobi'])
})

test('with no host present', t => {
  const req = request()
  t.deepEqual(req.subdomains, [])
})

test('should work with no host present', t => {
  const req = request()
  t.deepEqual(req.subdomains, [])
})

test('should check if the host is an ip address, even with a port', t => {
  const req = request()
  req.headers.host = '127.0.0.1:3000'
  t.deepEqual(req.subdomains, [])
})
