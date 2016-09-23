import http from 'http'
import { PassThrough } from 'stream'
import test from 'ava'
import request from 'request-promise'
import Trek from '../../lib/engine'
import { listen } from '../helpers/context'

test('should set headersSent', async t => {
  const app = new Trek()

  app.use(({ res }) => {
    res.status = 200
    res.body = 'Body'
    res.flushHeaders()
    res.flushHeaders() // Should be idempotent.
    t.true(res.headerSent)
    t.true(res.raw.headersSent)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.statusCode, 200)
  t.is(res.body, 'Body')
})

test('should allow a response afterwards', async t => {
  const app = new Trek()

  app.use(({ res }) => {
    res.status = 200
    res.raw.setHeader('foo', 'bar')
    res.flushHeaders()
    res.body = 'Body'
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.statusCode, 200)
  t.is(res.headers.foo, 'bar')
  t.is(res.body, 'Body')
})

test('should send the correct status code', async t => {
  const app = new Trek()

  app.use(({ res }) => {
    res.status = 401
    res.raw.setHeader('foo', 'bar')
    res.flushHeaders()
    res.body = 'Body'
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true, simple: false })
  t.is(res.statusCode, 401)
  t.is(res.headers.foo, 'bar')
  t.is(res.body, 'Body')
})

test('should fail to set the headers after flushHeaders', async t => {
  const app = new Trek()

  app.use(({ res }) => {
    res.status = 401
    res.raw.setHeader('content-type', 'text/plain')
    res.flushHeaders()
    let body = ''
    try {
      res.set('X-Shouldnt-Work', 'Value')
    } catch (err) {
      body += 'res.set fail '
    }
    try {
      res.status = 200
    } catch (err) {
      body += 'res.status fail '
    }
    try {
      res.length = 10
    } catch (err) {
      body += 'res.length fail'
    }
    res.body = body
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true, simple: false })
  t.is(res.statusCode, 401)
  t.is(res.headers['content-type'], 'text/plain')
  t.is(res.body, 'res.set fail res.status fail res.length fail')
})

test.cb('should flush headers first and delay to send data', t => {
  const app = new Trek()

  app.use(({ req, res }) => {
    res.type = 'json'
    res.status = 200
    req.header.link = '</css/mycss.css>; as=style; rel=preload, <https://img.craftflair.com>; rel=preconnect; crossorigin'
    const stream = new PassThrough()
    res.body = stream
    res.flushHeaders()

    setTimeout(() => {
      stream.end(JSON.stringify({ message: 'hello!' }))
    }, 10000)
  })

  const done = t.end

  app.run(function (err) {
    if (err) return done(err)

    const port = this.address().port

    http.request({
      port
    })
    .on('response', res => {
      const onData = () => done(new Error('boom'))
      res.on('data', onData)

      // shouldn't receive any data for a while
      setTimeout(() => {
        res.removeListener('data', onData)
        done()
      }, 1000)
    })
    .on('error', done)
    .end()
  })
})
