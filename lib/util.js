'use strict'

const Stream = require('stream')

// body type flags
const FLAG_STRING = 0
const FLAG_OBJECT = 1
const FLAG_BUFFER = 2
const FLAG_STREAM = 3

module.exports = {
  getLength,
  send,
  sendError,
  writable,
  getFlag,
  FLAG_STRING,
  FLAG_OBJECT,
  FLAG_BUFFER,
  FLAG_STREAM
}

function getFlag (body) {
  if (!body) return FLAG_STRING
  if (Buffer.isBuffer(body)) return FLAG_BUFFER
  if (body instanceof Stream) return FLAG_STREAM
  if ('object' === typeof body) return FLAG_OBJECT
  return FLAG_STRING
}

function getLength (body, flag = FLAG_STRING) {
  if (!body) return
  if (FLAG_STRING === flag) return Buffer.byteLength(body)
  if (FLAG_OBJECT === flag) return Buffer.byteLength(JSON.stringify(body))
  if (FLAG_BUFFER === flag) return body.length
}

function send (res, body = null, flag = FLAG_STRING, onError = () => {}) {
  // body: null
  if (null === body) return res.end()

  // set the content-type only if not yet set
  const needType = !res.headersSent && !res.getHeader('content-type')

  // body: stream
  if (FLAG_STREAM === flag) {
    if (needType) res.setHeader('content-type', 'application/octet-stream')
    // track fs.createReadStream('not-file-exists')
    if (body.listeners('error').indexOf(onError) === -1) body.on('error', onError)
    return body.pipe(res)
  }

  // body: buffer
  if (FLAG_BUFFER === flag) {
    if (needType) res.setHeader('content-type', 'application/octet-stream')
    return res.end(body)
  }

  // body: json
  if (FLAG_OBJECT === flag) {
    if (needType) res.setHeader('content-type', 'application/json')
    body = JSON.stringify(body)
  }

  // String and Buffer will auto set `content-length` header.
  // body: string
  res.end(body)
}

function sendError (res, { status, message, stack, expose }, DEV) {
  if (res.headersSent || !writable(res)) return

  // ignore body
  if ('204 205 304'.includes(res.statusCode)) {
    res.removeHeader('content-type')
    res.removeHeader('content-length')
    res.removeHeader('transfer-encoding')
    return res.end()
  }

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
  if (res.finished || res.responded) return false

  const socket = res.socket
  // There are already pending outgoing res, but still writable
  // https://github.com/nodejs/node/blob/v4.4.7/lib/_http_server.js#L486
  if (!socket) return true
  return socket.writable
}
