'use strict'

const Cookies = require('cookies')
const Request = require('./request')
const Response = require('./response')

/**
 * Context
 *
 * @class Context
 * @param {Engine} app
 * @param {Request} req
 * @param {Response} res
 * @api public
 */

module.exports = class Context {

  constructor (app, req, res) {
    const config = app.config

    // Add raw req and raw res to context
    this.rawReq = req
    this.rawRes = res

    this.cookies = new Cookies(req, res, config.get('cookie'))

    req = new Request(req)
    res = new Response(res)

    this.app = req.app = res.app = app
    this.config = req.config = res.config = config
    this.req = res.req = req
    this.res = req.res = res
    // Storing variables for view
    this.state = {}
    // Storing variables for context
    this.store = new Map()

    // Cache ip
    req.ip = req._ip
  }

}
