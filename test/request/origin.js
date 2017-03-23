import Stream from 'stream'
import test from 'ava'
import { request } from '../helpers/context'

test('should return the origin of url', t => {
  const socket = new Stream.Duplex()
  const rawReq = {
    url: '/users/1?next=/dashboard',
    headers: {
      host: 'localhost'
    },
    socket
  }
  Reflect.setPrototypeOf(rawReq, Stream.Readable.prototype)
  const req = request(rawReq)
  t.is(req.origin, 'http://localhost')
  // Change it also work
  req.url = '/foo/users/1?next=/dashboard'
  t.is(req.origin, 'http://localhost')
})
