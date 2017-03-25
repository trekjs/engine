'use strict'

const Stream = require('stream')

// Body type flags
const FLAG_STRING = 0
const FLAG_OBJECT = 1
const FLAG_BUFFER = 2
const FLAG_STREAM = 4

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
  if (!body || 'string' === typeof body) return FLAG_STRING
  if (Buffer.isBuffer(body)) return FLAG_BUFFER
  if (body instanceof Stream) return FLAG_STREAM
  return FLAG_OBJECT
}

function getLength (body, flag = FLAG_STRING) {
  if (!body) return
  if (FLAG_STRING === flag) return Buffer.byteLength(body)
  if (FLAG_OBJECT === flag) return Buffer.byteLength(JSON.stringify(body))
  if (FLAG_BUFFER === flag) return body.length
}

function send (res, body = null, flag = FLAG_STRING, onError = () => {}) {
  // Body: null
  if (null === body) return res.end()

  // Set the content-type only if not yet set
  const needType = !res.headersSent && !res.getHeader('content-type')

  // Body: stream
  if (FLAG_STREAM === flag) {
    if (needType) res.setHeader('content-type', 'application/octet-stream')
    // Track fs.createReadStream('not-file-exists')
    if (!body.listeners('error').includes(onError)) body.on('error', onError)
    return body.pipe(res)
  }

  // Body: buffer
  if (FLAG_BUFFER === flag) {
    if (needType) res.setHeader('content-type', 'application/octet-stream')
    return res.end(body)
  }

  // Body: json
  if (FLAG_OBJECT === flag) {
    if (needType) res.setHeader('content-type', 'application/json')
    body = JSON.stringify(body)
  }

  // Body: string
  res.end(body)
}

function sendError (res, err, DEV, headersSent = false) {
  if (res.headersSent || !writable(res)) {
    headersSent = true
    err.headersSent = true
  }

  if (headersSent) return

  let { status = 500, message = 'Internal Server Error', stack, expose } = err

  if (DEV) {
    message = stack
  } else {
    message = expose ? message : String(status)
  }

  // Force text/plain
  res.writeHead(status, {
    'content-length': Buffer.byteLength(message),
    'content-type': 'text/plain'
  })
  res.end(message)
}

function writable (res) {
  // Can't write any more after response finished
  if (res.finished || res.responded) return false

  const socket = res.socket
  // There are already pending outgoing res, but still writable
  // https://github.com/nodejs/node/blob/v4.4.7/lib/_http_server.js#L486
  if (!socket) return true
  return socket.writable
}
