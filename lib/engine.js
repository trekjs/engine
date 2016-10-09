'use strict'

const Emitter = require('events')
const { Server } = require('http')
const onFinished = require('on-finished')
const HttpError = require('trek-http-error')
const Middleware = require('trek-middleware')
const Context = require('./context')
const { sendError } = require('./util')

/**
 * Engine
 *
 * @class Engine
 * @extends Emitter
 * @api public
 */

module.exports = class Engine extends Emitter {

  constructor () {
    super()

    this._init()
  }

  _init () {
    this.env = process.env.NODE_ENV || 'development'
    this.dev = this.env.startsWith('dev')
    this.middleware = new Middleware()
    this.config = new Map([
      ['subdomain offset', 2],
      ['trust proxy', false]
    ])
  }

  context (req, res) {
    return new Context(this, req, res)
  }

  use (fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
    this.middleware.push(fn)
    return this
  }

  handle (req, res) {
    const ctx = this.context(req, res)
    const onError = err => {
      if (!err) return

      if (!(err instanceof HttpError)) {
        err = new HttpError(err.code, err.message, err)
      }

      sendError(res, err, this.dev)
      this.emit('error', err, ctx)
    }
    onFinished(res, ctx.res.onError = onError)
    this.respond(ctx, onError)
  }

  respond (ctx, onError) {
    return this.middleware.compose(ctx).catch(onError)
  }

  run () {
    const server = this.server || new Server()
    server.on('request', (req, res) => this.handle(req, res))
    return server.listen(...arguments)
  }

}
