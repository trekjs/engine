'use strict'

const { STATUS_CODES: statuses } = require('http')

/**
 * HTTPError
 *
 * @class HTTPError
 * @extends Error
 * @param {Number|String} code
 * @param {String} message
 * @param {Object} origin
 * @api public
 */

module.exports = class HTTPError extends Error {
  constructor (code = 500, message = '', origin, expose = false) {
    super()

    let status = code
    if ('ENOENT' === code) {
      status = 404
      message = statuses[404]
    }

    this.code = code
    this.status = status
    this.message = message || statuses[this.status] || 'unknown'
    this.origin = origin
    this.expose = expose

    if (origin) {
      Error.captureStackTrace(origin, HTTPError)
    }
  }
}
