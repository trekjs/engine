import fs from 'fs'
import path from 'path'
import test from 'ava'
import request from 'request-promise'
import Engine from '../../lib/engine'
import { listen } from '../helpers/context'

test('when body is null', async t => {
  const app = new Engine()

  app.use(({ res }) => {
    res.send(200, null)
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const url = await listen(app)
  const res = await request(url)
  t.deepEqual(res, '')
})

test('when body is buffer', async t => {
  const app = new Engine()

  app.use(({ res }) => {
    res.send(200, Buffer.from('trek'))
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const url = await listen(app)
  const res = await request(url)
  t.deepEqual(res, 'trek')
})

test('when body is stream', async t => {
  const app = new Engine()
  const file = path.join(__dirname, '../../package.json')

  app.use(({ res }) => {
    res.send(200, fs.createReadStream(file))
    res.set('content-type', 'application/json; charset=utf-8')
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const url = await listen(app)
  const res = await request(url, { json: true })
  t.deepEqual(res, require(file))
})

test('when body is object', async t => {
  const app = new Engine()
  const body = { name: 'trek engine' }

  app.use(({ res }) => {
    res.send(200, body)
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const url = await listen(app)
  const res = await request(url, { json: true })
  t.deepEqual(res, body)
})

test('when HEAD is used', async t => {
  const app = new Engine()

  app.use(({ res }) => {
    res.body = 'Hello'
  })

  const url = await listen(app)
  const res = await request({ url, method: 'head', resolveWithFullResponse: true })
  t.is(res.statusCode, 200)
  t.is(res.body, '')
})
