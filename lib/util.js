'use strict'

const Stream = require('stream')

module.exports = {
  getLength,
  send,
  sendError,
  writable
}

function getLength (body) {
  if (!body) return
  if (Buffer.isBuffer(body)) return body.length
  if (body instanceof Stream) return
  if ('string' === typeof body) return Buffer.byteLength(body)
  if ('object' === typeof body) return Buffer.byteLength(JSON.stringify(body))
}

function send (res, body = null, onError) {
  // body: null
  if (null === body) return res.end()

  // set the content-type only if not yet set
  const needType = !res.headersSent && !res.getHeader('content-type')

  // body: buffer
  if (Buffer.isBuffer(body)) {
    if (needType) res.setHeader('content-type', 'application/octet-stream')
    return res.end(body)
  }

  // body: stream
  if (body instanceof Stream) {
    if (needType) res.setHeader('content-type', 'application/octet-stream')
    // track fs.createReadStream('not-file-exists')
    if (body.listeners('error').indexOf(onError) === -1) body.on('error', onError)
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

function sendError (res, { status, message, stack, expose }, DEV) {
  // ignore body
  if ('204 205 304'.includes(res.statusCode)) {
    res.removeHeader('content-type')
    res.removeHeader('content-length')
    res.removeHeader('transfer-encoding')
    return res.end()
  }

  if (res.headersSent || !writable(res)) return

  if (DEV) {
    message = stack
  } else {
    message = expose ? message : String(status)
  }

  // force text/plain
  res.writeHead(status, {
    'content-length': Buffer.byteLength(message),
    'content-type': 'text/plain'
  })
  res.end(message)
}

function writable (res) {
  // can't write any more after response finished
  if (res.finished) return false

  const socket = res.socket
  // There are already pending outgoing res, but still writable
  // https://github.com/nodejs/node/blob/v4.4.7/lib/_http_server.js#L486
  if (!socket) return true
  return socket.writable
}
