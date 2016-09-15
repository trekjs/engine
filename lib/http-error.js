'use strict'

class HTTPError extends Error {
  constructor (code, message, origin) {
    super(message)
    this.code = code
    this.origin = origin
  }
}

module.exports = HTTPError
