const assert = require('assert')
const { extname } = require('path')
const { STATUS_CODES: statuses } = require('http')
const { is: typeis } = require('type-is')
const { contentType: getType } = require('mime-types')
const contentDisposition = require('content-disposition')
const vary = require('vary')
const { send } = require('./util')

class Response {

  constructor (res) {
    this.raw = res
  }

  /**
   * Return the request socket.
   *
   * @return {Connection}
   * @api public
   */

  get socket () {
    return this.req.socket
  }

  /**
   * Set the ETag of a response.
   * This will normalize the quotes if necessary.
   *
   *     res.response.etag = 'md5hashsum'
   *     res.response.etag = '"md5hashsum"'
   *     res.response.etag = 'W/"123456789"'
   *
   * @param {String} etag
   * @api public
   */

  set etag (val) {
    if (!/^(W\/)?"/.test(val)) val = `"${val}"`
    this.set('etag', val)
  }

  /**
   * Get the ETag of a response.
   *
   * @return {String}
   * @api public
   */

  get etag () {
    return this.get('etag')
  }

  /**
   * Return response header.
   *
   * @return {Object}
   * @api public
   */

  get header () {
    return this.raw._headers || {}
  }

  /**
   * Get response status code.
   *
   * @return {Number}
   * @api public
   */

  get status () {
    return this.raw.statusCode
  }

  /**
   * Set response status code.
   *
   * @param {Number} code
   * @api public
   */

  set status (code) {
    assert('number' === typeof code, 'status code must be a number')
    const message = statuses[code]
    assert(message, `invalid status code: ${code}`)
    assert(!this.raw.headersSent, 'headers have already been sent')
    this.raw.statusCode = code
    this.raw.statusMessage = message
  }

  /**
   * Get response status message
   *
   * @return {String}
   * @api public
   */

  get message () {
    return this.raw.statusMessage || statuses[this.status]
  }

  /**
   * Set response status message
   *
   * @param {String} msg
   * @api public
   */

  set message (msg) {
    this.raw.statusMessage = msg
  }

  /**
   * Vary on `field`.
   *
   * @param {String} field
   * @api public
   */

  vary (field) {
    vary(this.raw, field)
  }

  /**
   * Set Content-Disposition header to "attachment" with optional `filename`.
   *
   * @param {String} filename
   * @api public
   */

  attachment (filename) {
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

  set lastModified (val) {
    if ('string' === typeof val) val = new Date(val)
    this.set('last-modified', val.toUTCString())
  }

  /**
   * Get the Last-Modified date in Date form, if it exists.
   *
   * @return {Date}
   * @api public
   */

  get lastModified () {
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

  set type (type) {
    type = getType(type) || false
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

  get type () {
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

  is (types) {
    const type = this.type
    if (!types) return type || false
    if (!Array.isArray(types)) types = [...arguments]
    return typeis(type, types)
  }

  /**
   * Return response header.
   *
   * Examples:
   *
   *     res.get('Content-Type')
   *     // => "text/plain"
   *
   *     res.get('content-type')
   *     // => "text/plain"
   *
   * @param {String} field
   * @return {String}
   * @api public
   */

  get (field) {
    return this.header[field.toLowerCase()] || ''
  }

  /**
   * Set header `field` to `val`, or pass
   * an object of header fields.
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

  set (field, val) {
    if (2 === arguments.length) {
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

  append (field, val) {
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

  remove (field) {
    this.raw.removeHeader(field)
  }

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect () {
    if (!this.raw) return
    return this.toJSON()
  }

  /**
   * Return JSON representation.
   *
   * @return {Object}
   * @api public
   */

  toJSON () {
    // should include body and header
    return {
      status: this.status,
      message: this.message
    }
  }

  end () {
    return this.raw.end.apply(this.raw, arguments)
  }

  send (code, body = null) {
    return send(this.raw, code, body)
  }

}

module.exports = Response
