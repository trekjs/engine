'use strict'

const Emitter = require('events')
const { Server } = require('http')
const onFinished = require('on-finished')
const HttpError = require('trek-http-error')
const Middleware = require('trek-middleware')
const Context = require('./context')
const { send, sendError } = require('./util')

/**
 * Engine
 *
 * @class Engine
 * @extends Emitter
 * @api public
 */

module.exports = class Engine extends Emitter {
  constructor() {
    super()

    this.initialize()
  }

  initialize() {
    this.bootUp()
  }

  bootUp() {
    this.env = process.env.NODE_ENV || 'development'
    this.dev = this.env.startsWith('dev')
    this.middleware = new Middleware()
    this.config = new Map([['subdomain offset', 2], ['trust proxy', false]])
  }

  context(req, res) {
    return new Context(this, this.config, req, res)
  }

  use(fn) {
    if (typeof fn !== 'function')
      throw new TypeError('middleware must be a function!')
    this.middleware.push(fn)
    return this
  }

  handle(req, res) {
    const ctx = this.context(req, res)
    const onError = err => {
      if (!err) return

      if (!(err instanceof HttpError)) {
        err = new HttpError(err.code, err.message, err)
      }

      sendError(res, err, this.dev)
      this.emit('error', err, ctx)
    }
    onFinished(res, (ctx.res.onError = onError))
    return this.invoke(ctx, onError)
  }

  invoke(ctx, onError) {
    return this.middleware
      .compose(ctx)
      .then(() => this.respond(ctx))
      .catch(onError)
  }

  respond({ req: { method }, res, rawRes: raw }) {
    if (!res.writable) return

    // Ignore body
    if ('204 205 304'.includes(res.status)) {
      // Strip headers
      res.body = null
      return raw.end()
    }

    if (method === 'HEAD') {
      return raw.end()
    }

    send(raw, res.body, res.flag, res.onError)
  }

  run() {
    if (!this.server) this.server = new Server()
    this.server.on('request', (req, res) => this.handle(req, res))
    return this.server.listen(...arguments)
  }
}
