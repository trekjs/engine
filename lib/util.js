'use strict'

const Stream = require('stream')

module.exports = {
  send,
  sendError
}

function send (res, body = null) {
  // body: null
  if (null === body) return res.end()

  // set the content-type only if not yet set
  const needType = !res.getHeader('content-type')

  // body: buffer
  if (Buffer.isBuffer(body)) {
    if (needType) res.setHeader('content-type', 'application/octet-stream')
    return res.end(body)
  }

  // body: stream
  if (body instanceof Stream) {
    if (needType) res.setHeader('content-type', 'application/octet-stream')
    return body.pipe(res)
  }

  // body: json
  if ('object' === typeof body) {
    if (needType) res.setHeader('content-type', 'application/json')
    body = JSON.stringify(body)
  }

  // String and Buffer will auto set `content-length` header.
  // body: string
  return res.end(body)
}

function sendError (res, { code, message, stack }, DEV) {
  if (!code) {
    code = 500
    message = 'Internal Server Error'
  }

  res.statusCode = code
  send(res, DEV ? stack : message)
}
