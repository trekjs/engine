import test from 'ava'
import { request } from '../helpers/context'

test('when X-Forwarded-For is present and proxy is not trusted should be ignored', t => {
  const req = request()
  req.config.set('trust proxy', false)
  req.headers['x-forwarded-for'] = '127.0.0.1,127.0.0.2'
  t.deepEqual(req.ips, [])
})

test('when X-Forwarded-For is present and proxy is trusted should be used', t => {
  const req = request()
  req.config.set('trust proxy', true)
  req.headers['x-forwarded-for'] = '127.0.0.1,127.0.0.2'
  t.deepEqual(req.ips, ['127.0.0.1', '127.0.0.2'])
})
