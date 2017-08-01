'use strict'

const assert = require('assert')
const { extname } = require('path')
const { STATUS_CODES: statuses } = require('http')
const { is: typeis } = require('type-is')
const { contentType: getType } = require('mime-types')
const contentDisposition = require('content-disposition')
const vary = require('vary')
const { getFlag, getLength, send, writable, FLAG_STREAM } = require('./util')

const BODY = Symbol('Response#body')

/**
 * Response
 *
 * @class Response
 * @param {ServerResponse} res
 * @api public
 */

module.exports = class Response {
  constructor(res) {
    this.raw = res
  }

  /**
   * Initialize.
   *
   * @param {Engine} app
   * @param {Object} config
   * @param {Request} req
   * @api private
   */

  initialize(app, config, req) {
    this.app = app
    this.config = config
    this.req = req
  }

  /**
   * Return the request socket.
   *
   * @return {Connection}
   * @api public
   */

  get socket() {
    return this.req.socket
  }

  /**
   * Get response status code.
   *
   * @return {Number}
   * @api public
   */

  get status() {
    return this.raw.statusCode
  }

  /**
   * Set response status code.
   *
   * @param {Number} code
   * @api public
   */

  set status(code) {
    assert(typeof code === 'number', 'status code must be a number')
    const message = statuses[code]
    assert(message, `invalid status code: ${code}`)
    assert(!this.raw.headersSent, 'headers have already been sent')
    this.raw.statusCode = code
    this.raw.statusMessage = message
  }

  /**
   * Get response status message.
   *
   * @return {String}
   * @api public
   */

  get message() {
    return this.raw.statusMessage || statuses[this.status]
  }

  /**
   * Set response status message.
   *
   * @param {String} msg
   * @api public
   */

  set message(msg) {
    this.raw.statusMessage = msg
  }

  /**
   * Get response body.
   *
   * @return {Mixed}
   * @api public
   */

  get body() {
    return this[BODY]
  }

  /**
   * Set response body.
   *
   * @param {String|Buffer|Object|Stream} val
   * @api public
   */

  set body(val) {
    this[BODY] = val

    if (this.raw.headersSent) return

    if (val === null) {
      if (!'204 205 304'.includes(this.status)) this.status = 204
      this.remove('content-type')
      this.remove('content-length')
      this.remove('transfer-encoding')
      return
    }

    this.flag = getFlag(val)

    // Stream
    if (FLAG_STREAM === this.flag) {
      // Track fs.createReadStream('not-file-exists')
      if (!val.listeners('error').includes(this.onError)) {
        val.on('error', this.onError)
      }
    }
  }

  /**
   * Return response headers.
   *
   * @return {Object}
   * @api public
   */

  get headers() {
    return this.raw.getHeaders()
  }

  /**
   * Return response header.
   *
   * Examples:
   *
   *    res.get('Content-Type')
   *    // => "text/plain"
   *
   *    res.get('content-type')
   *    // => "text/plain"
   *
   * @param {String} field
   * @return {String}
   * @api public
   */

  get(field) {
    return this.raw.getHeader(field)
  }

  /**
   * Set header `field` to `val`, or pass an object of header fields.
   *
   * Examples:
   *
   *    res.set('Foo', ['bar', 'baz'])
   *    res.set('Accept', 'application/json')
   *    res.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' })
   *
   * @param {String|Object|Array} field
   * @param {String} val
   * @api public
   */

  set(field, val) {
    if (arguments.length === 2) {
      if (Array.isArray(val)) val = val.map(String)
      else val = String(val)
      this.raw.setHeader(field, val)
    } else {
      /* eslint guard-for-in: 0 */
      for (const key in field) {
        this.set(key, field[key])
      }
    }
  }

  /**
   * Return a boolean indicating whether a header
   * with the specified field exists or not.
   *
   * Examples:
   *
   *    res.has('Accept')
   *    // => true
   *
   *    res.has('X-Accept')
   *    // => false
   *
   * @param {String} field
   * @param {Boolean}
   * @api public
   */

  has(field) {
    return this.raw.hasHeader(field)
  }

  /**
   * Set the ETag of a response.
   * This will normalize the quotes if necessary.
   *
   *    res.etag = 'md5hashsum'
   *    res.etag = '"md5hashsum"'
   *    res.etag = 'W/"123456789"'
   *
   * @param {String} etag
   * @api public
   */

  set etag(val) {
    if (!/^(W\/)?"/.test(val)) val = `"${val}"`
    this.set('etag', val)
  }

  /**
   * Get the ETag of a response.
   *
   * @return {String}
   * @api public
   */

  get etag() {
    return this.get('etag')
  }

  /**
   * Set Content-Length field to `n`.
   *
   * @param {Number} n
   * @api public
   */

  set length(n) {
    this.set('content-length', n)
  }

  /**
   * Return parsed response Content-Length when present.
   *
   * @return {Number}
   * @api public
   */

  get length() {
    const len = this.get('content-length')
    if (len) return ~~len
    return getLength(this[BODY], this.flag)
  }

  /**
   * Check if a header has been written to the socket.
   *
   * @return {Boolean}
   * @api public
   */

  get headerSent() {
    return this.raw.headersSent
  }

  /**
   * Vary on `field`.
   *
   * @param {String} field
   * @api public
   */

  vary(field) {
    vary(this.raw, field)
  }

  /**
   * Perform a 302 redirect to `url`.
   *
   * The string "back" is special-cased
   * to provide Referrer support, when Referrer
   * is not present `alt` or "/" is used.
   *
   * Examples:
   *
   *    this.redirect('back');
   *    this.redirect('back', '/index.html');
   *    this.redirect('/login');
   *    this.redirect('http://google.com');
   *
   * @param {String} url
   * @param {String} [alt]
   * @api public
   */

  redirect(url, alt) {
    // Location
    if (url === 'back') url = this.req.get('referrer') || alt || '/'
    this.set('location', url)

    // Status
    if (!'300 301 302 303 305 307 308'.includes(this.status)) this.status = 302

    // Html
    if (this.req.accepts('html')) {
      url = escape(url)
      this.set('content-type', 'text/html; charset=utf-8')
      this.end(`Redirecting to <a href="${url}">${url}</a>.`)
      return
    }

    // Text
    this.set('content-type', 'text/plain; charset=utf-8')
    this.end(`Redirecting to ${url}.`)
  }

  /**
   * Set Content-Disposition header to "attachment" with optional `filename`.
   *
   * @param {String} filename
   * @api public
   */

  attachment(filename) {
    if (filename) this.type = extname(filename)
    this.set('content-disposition', contentDisposition(filename))
  }

  /**
   * Set the Last-Modified date using a string or a Date.
   *
   *     res.lastModified = new Date()
   *     res.lastModified = '2013-09-13'
   *
   * @param {String|Date} type
   * @api public
   */

  set lastModified(val) {
    if (typeof val === 'string') val = new Date(val)
    this.set('last-modified', val.toUTCString())
  }

  /**
   * Get the Last-Modified date in Date form, if it exists.
   *
   * @return {Date}
   * @api public
   */

  get lastModified() {
    const date = this.get('last-modified')
    if (date) return new Date(date)
  }

  /**
   * Set Content-Type response header with `type` through `mime.lookup()`
   * when it does not contain a charset.
   *
   * Examples:
   *
   *     res.type = '.html'
   *     res.type = 'html'
   *     res.type = 'json'
   *     res.type = 'application/json'
   *     res.type = 'png'
   *
   * @param {String} type
   * @api public
   */

  set type(type) {
    type = getType(type)
    if (type) {
      this.set('content-type', type)
    } else {
      this.remove('content-type')
    }
  }

  /**
   * Return the response mime type void of
   * parameters such as "charset".
   *
   * @return {String}
   * @api public
   */

  get type() {
    const type = this.get('content-type')
    if (!type) return ''
    return type.split(';')[0]
  }

  /**
   * Check whether the response is one of the listed types.
   * Pretty much the same as `this.request.is()`.
   *
   * @param {String|Array} types...
   * @return {String|false}
   * @api public
   */

  is(types) {
    const type = this.type
    if (!types) return type || false
    if (!Array.isArray(types)) types = [...arguments]
    return typeis(type, types)
  }

  /**
   * Append additional header `field` with value `val`.
   *
   * Examples:
   *
   *    res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
   *    res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
   *    res.append('Warning', '199 Miscellaneous warning')
   *
   * @param {String} field
   * @param {String|Array} val
   * @api public
   */

  append(field, val) {
    const prev = this.get(field)

    if (prev) {
      val = Array.isArray(prev) ? prev.concat(val) : [prev].concat(val)
    }

    return this.set(field, val)
  }

  /**
   * Remove header `field`.
   *
   * @param {String} name
   * @api public
   */

  remove(field) {
    this.raw.removeHeader(field)
  }

  /**
   * Checks if the request is writable.
   * Tests for the existence of the socket
   * as node sometimes does not set it.
   *
   * @return {Boolean}
   * @api private
   */

  get writable() {
    return writable(this.raw)
  }

  /**
   * Flush any set headers, and begin the body.
   *
   * @api public
   */

  flush() {
    return this.raw.flushHeaders()
  }

  /**
   * End a response, likes `res.end(...)`.
   *
   * @param {String|Buffer} data
   * @param {String} encoding
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */

  end() {
    return this.raw.end(...arguments)
  }

  /**
   * Send a response.
   *
   * Examples:
   *
   *     res.send(200, new Buffer('wahoo'));
   *     res.send(200, '<p>some html</p>');
   *     res.send(200, { some: 'json' });
   *     res.send(200, stream);
   *
   * @param {Number} code
   * @param {String|Buffer|Object|Stream} body
   * @return {Boolean}
   * @api public
   */

  send(code, body = null) {
    this.raw.responded = true
    this.raw.statusCode = code
    return send(this.raw, body, getFlag(body), this.onError)
  }

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect() {
    if (!this.raw) return
    const o = this.toJSON()
    o.body = this.body
    return o
  }

  /**
   * Return JSON representation.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return {
      status: this.status,
      message: this.message,
      headers: this.headers
    }
  }
}
