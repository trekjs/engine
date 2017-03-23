import net from 'net'
import test from 'ava'
import Trek from '../../lib/engine'
import { listen } from '../helpers/context'

test.beforeEach(t => {
  t.context = new Trek()
})

test('when response finished should not writable', async t => {
  const request = async url => {
    const port = url.match(/[^:]+$/)[0]
    const buf = Buffer.from('GET / HTTP/1.1\r\nHost: localhost:' + port + '\r\nConnection: keep-alive\r\n\r\n')
    const client = net.connect(port)
    setImmediate(() => {
      client.write(buf)
    })
    await new Promise(resolve => {
      setTimeout(() => {
        client.end()
        resolve()
      }, 100)
    })
  }

  const app = t.context

  app.use(({ res }) => {
    t.true(res.writable)
    res.end()
    t.false(res.writable)
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const url = await listen(app)
  await request(url)
})

