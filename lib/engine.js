'use strict'

const Emitter = require('events')
const { Server } = require('http')
const Middleware = require('trek-middleware')
const onFinished = require('on-finished')
const Context = require('./context')
const HTTPError = require('./error')
const { sendError } = require('./util')

const SERVER = Symbol('Engine#server')

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

    // unraw req & unraw res
    this.unraw = true
    this._init()
  }

  _init () {
    this.env = process.env.NODE_ENV || 'development'
    this.isDev = this.env.startsWith('dev')
    this.middleware = new Middleware()
    this.config = new Map([
      ['subdomain offset', 2],
      ['trust proxy', false]
    ])
  }

  set server (server) {
    this[SERVER] = server
  }

  get server () {
    return this[SERVER]
  }

  use (fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
    this.middleware.push(fn)
    return this
  }

  handle (req, res) {
    const ctx = new Context(this, req, res)
    const onError = err => {
      if (!err) return

      if (!(err instanceof HTTPError)) {
        err = new HTTPError(err.code, err.message, err)
      }

      sendError(res, err, this.isDev)
      this.emit('error', err, ctx)
    }
    onFinished(res, ctx.res.onError = onError)
    this.middleware.compose(ctx).catch(onError)
  }

  run () {
    if (!this.server) this.server = new Server()
    this.server.on('request', (req, res) => this.handle(req, res))
    return this.server.listen(...arguments)
  }

}
