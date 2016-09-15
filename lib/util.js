'use strict'

const Stream = require('stream')

module.exports = {
  send,
  sendError
}

function send (res, code, body = null) {
  res.statusCode = code

  // body: null
  if (null === body) return res.end()

  // body: buffer
  if (Buffer.isBuffer(body)) {
    // if (!this.type) this.set('content-type', 'application/octet-stream')
    // this.set('content-length', body.length)
    return res.end(body)
  }

  // body: stream
  if (body instanceof Stream) {
    // if (!this.type) this.set('content-type', 'application/octet-stream')
    return body.pipe(res)
  }

  // body: json
  if ('object' === typeof body) {
    res.setHeader('content-type', 'application/json')
    body = JSON.stringify(body)
  }

  // body: string
  if (!res.headersSent) {
    res.setHeader('content-length', Buffer.byteLength(body))
  }

  res.end(body)
}

function sendError (res, { code, message, stack }, DEV) {
  if (!code) {
    code = 500
    message = 'Internal Server Error'
  }

  send(res, code, DEV ? stack : message)
}
