import { IncomingMessage, ServerResponse } from 'http'
import test from 'ava'
import request from 'request-promise'
import Engine from '../../lib/engine'
import Request from '../../lib/request'
import Response from '../../lib/response'
import { listen } from '../helpers/context'

test('when unraw is true should have rawReq and rawRes', async t => {
  const app = new Engine()
  app.unraw = true

  app.use(({ req, rawReq }, next) => {
    t.not(rawReq, undefined)
    t.false(req === rawReq)
    t.true(req instanceof Request)
    t.true(rawReq instanceof IncomingMessage)
    return next()
  })

  app.use(({ res, rawRes }, next) => {
    t.not(rawRes, undefined)
    t.false(res === rawRes)
    t.true(res instanceof Response)
    t.true(rawRes instanceof ServerResponse)
    return next()
  })

  app.use(({ res }) => {
    res.end()
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const url = await listen(app)
  try {
    await request(url)
  } catch (err) {
    t.true(err.statusCode === 404)
  }
})

test('when unraw is false should not have rawReq and rawRes', async t => {
  const app = new Engine()
  app.unraw = false

  app.use(({ req, rawReq }, next) => {
    t.not(rawReq, undefined)
    t.true(req === rawReq)
    t.false(req instanceof Request)
    t.true(rawReq instanceof IncomingMessage)
    return next()
  })

  app.use(({ res, rawRes }, next) => {
    t.not(rawRes, undefined)
    t.true(res === rawRes)
    t.false(res instanceof Response)
    t.true(rawRes instanceof ServerResponse)
    return next()
  })

  app.use(({ res }) => {
    res.end()
  })

  app.on('error', err => {
    t.true(err === null)
  })

  const url = await listen(app)
  try {
    await request(url)
  } catch (err) {
    t.true(err.statusCode === 404)
  }
})
