const Request = require('./request')
const Response = require('./response')

class Context {

  constructor (app, req, res) {
    const { unraw, config } = app
    if (unraw) {
      // Add raw req and raw res to context
      Reflect.defineProperty(this, 'rawReq', { value: req })
      Reflect.defineProperty(this, 'rawRes', { value: res })

      req = new Request(req)
      res = new Response(res)
    }

    Reflect.defineProperty(this, 'app', { value: app })
    Reflect.defineProperty(this, 'req', { value: req })
    Reflect.defineProperty(this, 'res', { value: res })
    Reflect.defineProperty(this, 'config', { value: config })
    Reflect.defineProperty(this, 'state', { value: {} })

    Reflect.defineProperty(this.req, 'app', { value: app })
    Reflect.defineProperty(this.req, 'res', { value: res })
    Reflect.defineProperty(this.req, 'config', { value: config })

    Reflect.defineProperty(this.res, 'app', { value: app })
    Reflect.defineProperty(this.res, 'req', { value: req })
    Reflect.defineProperty(this.res, 'config', { value: config })

    if (unraw) {
      // Cache ip
      req.ip = req._ip
    }
  }

}

module.exports = Context
