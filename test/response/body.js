import fs from 'fs'
import test from 'ava'
import request from 'request-promise'
import Trek from '../../lib/engine'
import { listen } from '../helpers/context'

test.beforeEach(t => {
  t.context = new Trek()
})

test('when Content-Type is set should not override', async t => {
  const app = t.context

  app.use(({ res }) => {
    t.is(res.body, undefined)
    res.type = 'png'
    res.body = new Buffer('something')
    t.deepEqual(res.body, new Buffer('something'))
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.headers['content-type'], 'image/png')
  t.is(res.body, 'something')
})

test('when Content-Type is set when body is an object should override as json', async t => {
  const app = t.context

  app.use(({ res }, next) => {
    t.is(res.body, undefined)
    res.type = 'html'
    res.body = '<em>hey</em>'
    t.deepEqual(res.body, '<em>hey</em>')
    return next()
  })

  app.use(({ res }) => {
    res.body = { foo: 'bar' }
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true, json: true })
  t.is(res.headers['content-type'], 'text/html; charset=utf-8')
  t.deepEqual(res.body, { foo: 'bar' })
})

test('when Content-Type is set should override length', async t => {
  const app = t.context

  app.use(({ res }) => {
    t.is(res.body, undefined)
    res.type = 'html'
    res.body = 'something'
    t.deepEqual(res.body, 'something')
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.headers['content-length'], '9')
  t.is(res.body.length, 9)
})

test('when a string is given should default to undefined', async t => {
  const app = t.context

  app.use(({ res }) => {
    res.body = 'Tobi'
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.headers['content-type'], undefined)
})

test('when a string is given should set length', async t => {
  const app = t.context

  app.use(({ res }) => {
    res.body = 'Tobi'
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.headers['content-length'], '4')
})

test('when an html string is given should set length', async t => {
  const string = '<h1>Tobi</h1>'
  const app = t.context

  app.use(({ res }) => {
    res.body = string
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.body, string)
  t.is(res.headers['content-length'], String(string.length))
})

test('when an xml string is given should get html', async t => {
  /**
  * ctx test is to show that we're not going
  * to be stricter with the html sniff
  * or that we will sniff other string types.
  * You should `.type=` if ctx simple test fails.
  */
  const app = t.context

  app.use(({ res }) => {
    res.type = 'html'
    res.body = '<?xml version="1.0" encoding="UTF-8"?>\n<俄语>данные</俄语>'
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.headers['content-type'], 'text/html; charset=utf-8')
})

test('when a stream is given should default to an octet stream', async t => {
  const app = t.context

  app.use(({ res }) => {
    res.body = fs.createReadStream('../../LICENSE')
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.headers['content-type'], 'application/octet-stream')
})

test('when a buffer is given should default to an octet stream', async t => {
  const app = t.context

  app.use(({ res }) => {
    res.body = new Buffer('hey')
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.headers['content-type'], 'application/octet-stream')
})

test('when a buffer is given should set length', async t => {
  const app = t.context

  app.use(({ res }) => {
    res.body = new Buffer('Tobi')
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.headers['content-length'], '4')
})

test('when an object is given should default to json', async t => {
  const app = t.context

  app.use(({ res }) => {
    t.is(res.body, undefined)
    res.body = { foo: 'bar' }
    t.deepEqual(res.body, { foo: 'bar' })
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true })
  t.is(res.headers['content-type'], 'application/json')
})
