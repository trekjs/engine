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

  constructor (app, config, req, res) {
    this.app = app
    this.config = config

    // Add raw req and raw res to context
    this.rawReq = req
    this.rawRes = res

    this.cookies = new Cookies(req, res, config.get('cookie'))

    this.req = new Request(req)
    this.res = new Response(res)

    this.req.initialize(app, config, this.res)
    this.res.initialize(app, config, this.req)

    // Storing variables for view
    this.state = {}
    // Storing variables for context
    this.store = new Map()
  }

}
