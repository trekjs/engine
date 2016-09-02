const Emitter = require('events')
const { Server } = require('http')
const Middleware = require('trek-middleware')
const onFinished = require('on-finished')
const Context = require('./context')

class Engine extends Emitter {

  constructor () {
    super()

    // just using raw req & raw res
    this.raw = false
    this._init()
  }

  _init () {
    this.middleware = new Middleware()
    this.config = new Map()
    this.config.set('subdomain offset', 2)
    this.config.set('trust proxy', false)
  }

  run () {
    const server = new Server((req, res) => {
      onFinished(res, err => {
        // handle err
        if (err) {
          this.emit('error', err)
        }
      })
      this.middleware.compose(
        this.raw ? { req, res } : new Context(this, this.config, req, res)
      )
        .catch(err => this.emit('error', err))
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
