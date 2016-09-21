'use strict'

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

class HTTPError extends Error {
  constructor (code, message, origin) {
    super(message)
    this.code = code
    this.origin = origin
  }
}

module.exports = HTTPError
