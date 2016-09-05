const Emitter = require('events')
const { Server } = require('http')
const Middleware = require('trek-middleware')
const onFinished = require('on-finished')
const Context = require('./context')
const { sendError } = require('./util')

class Engine extends Emitter {

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
    const DEV = this.env === 'development' || this.env === 'dev'
    const server = new Server((req, res) => {
      const onerror = err => {
        if (err) {
          sendError(res, err, DEV)
          this.emit('error', err)
        }
      }
      onFinished(res, onerror)
      this.middleware.compose(new Context(this, req, res)).catch(onerror)
    })

    return server.listen(...arguments)
  }

  use (fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
    this.middleware.push(fn)
    return this
  }

}

module.exports = Engine
