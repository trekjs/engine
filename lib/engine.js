'use strict'

const Emitter = require('events')
const { Server } = require('http')
const Middleware = require('trek-middleware')
const onFinished = require('on-finished')
const Context = require('./context')
const HTTPError = require('./http-error')
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

    // unraw req & unraw res
    this.unraw = true
    this._init()
  }

  _init () {
    this.env = process.env.NODE_ENV || 'development'
    this.middleware = new Middleware()
    this.config = new Map()
    this.config.set('subdomain offset', 2)
    this.config.set('trust proxy', false)
  }

  run () {
    const DEV = this.env.startsWith('dev')
    const server = new Server((req, res) => {
      const ctx = new Context(this, req, res)
      const onError = err => {
        if (!err) return

        if (!(err instanceof HTTPError)) {
          err = new HTTPError(err.code, err.message, err)
        }

        sendError(res, err, DEV)
        this.emit('error', err, ctx)
      }
      onFinished(res, ctx.res.onError = onError)
      this.middleware.compose(ctx).catch(onError)
    })

    return server.listen(...arguments)
  }

  use (fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
    this.middleware.push(fn)
    return this
  }

}
