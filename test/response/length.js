import fs from 'fs'
import test from 'ava'
import request from 'request-promise'
import Trek from '../../lib/engine'
import { listen } from '../helpers/context'

test('when Content-Length is defined should return a number', async t => {
  const app = new Trek()

  app.use(({ res }) => {
    res.set('Content-Length', '1024')
    res.send(200)
    t.is(res.length, 1024)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.statusCode, 200)
})

test('when Content-Length is not defined and a .body is set to string should return a number', async t => {
  const app = new Trek()

  app.use(({ res }) => {
    res.body = 'foo'
    t.is(res.length, 3)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.statusCode, 200)
})

test('when Content-Length is not defined and a .body is set to buffer should return a number', async t => {
  const app = new Trek()

  app.use(({ res }) => {
    res.body = new Buffer('foo bar')
    t.is(res.length, 7)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.statusCode, 200)
})

test('when Content-Length is not defined and a .body is set to JSON object should return a number', async t => {
  const app = new Trek()

  app.use(({ res }) => {
    res.body = { hello: 'world' }
    t.is(res.length, 17)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.statusCode, 200)
})

test('when Content-Length is not defined and a .body is set to stream should return a number', async t => {
  const app = new Trek()

  app.use(({ res }) => {
    res.body = fs.createReadStream('../../package.json')
    t.is(res.length, undefined)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.statusCode, 200)
})

test('when Content-Length is not defined and a .body is set to null should return a number', async t => {
  const app = new Trek()

  app.use(({ res }) => {
    res.body = null
    t.is(res.length, undefined)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.statusCode, 200)
})

test('when Content-Length is not defined and .body is not should return undefined', async t => {
  const app = new Trek()

  app.use(({ res }) => {
    res.send(200)
    t.is(res.length, undefined)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.statusCode, 200)
})
