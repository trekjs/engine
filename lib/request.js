'use strict'

const { isIP } = require('net')
const { format: stringify } = require('url')
const qs = require('querystring')
const accepts = require('accepts')
const { parse: parseType } = require('content-type')
const fresh = require('fresh')
const typeis = require('type-is')
const parseRange = require('range-parser')
const parseUrl = require('parseurl')

const METHODS = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE']

const QUERY = Symbol('Request#query')

/**
 * Request
 *
 * @class Request
 * @param {IncomingMessage} req
 * @api public
 */

module.exports = class Request {
  constructor(req) {
    this.raw = req

    req.originalUrl = req.url
    this.accept = accepts(req)
  }

  /**
   * Initialize.
   *
   * @param {Engine} app
   * @param {Object} config
   * @param {Response} res
   * @api private
   */

  initialize(app, config, res) {
    this.app = app
    this.config = config
    this.res = res
    this.ip = this.ips[0] || this.socket.remoteAddress || ''
  }

  /**
   * Return the request socket.
   *
   * @return {Connection}
   * @api public
   */

  get socket() {
    return this.raw.socket
  }

  /**
   * Get request original url.
   *
   * @return {String} url
   * @api public
   */

  get originalUrl() {
    return this.raw.originalUrl
  }

  /**
   * Get request method.
   *
   * @return {String}
   * @api public
   */

  get method() {
    return this.raw.method
  }

  /**
   * Set request method.
   *
   * @param {String} val
   * @api public
   */

  set method(val) {
    this.raw.method = val
  }

  /**
   * Get request url.
   *
   * @return {String}
   * @api public
   */

  get url() {
    return this.raw.url
  }

  /**
   * Set request url.
   *
   * @param {String} val
   * @api public
   */

  set url(val) {
    this.raw.url = val
  }

  /**
   * Return request headers.
   *
   * @return {Object}
   * @api public
   */

  get headers() {
    return this.raw.headers
  }

  /**
   * Return request header.
   *
   * The `Referrer` header field is special-cased,
   * both `Referrer` and `Referer` are interchangeable.
   *
   * Examples:
   *
   *     this.get('Content-Type');
   *     // => "text/plain"
   *
   *     this.get('content-type');
   *     // => "text/plain"
   *
   *     this.get('Something');
   *     // => undefined
   *
   * @param {String} field
   * @return {String}
   * @api public
   */

  get(field) {
    field = field.toLowerCase()
    if (field === 'referer' || field === 'referrer') {
      return this.headers.referrer || this.headers.referer || ''
    }
    return this.headers[field] || ''
  }

  /**
   * Check if the given `type(s)` is acceptable, returning
   * the best match when true, otherwise `false`, in which
   * case you should respond with 406 "Not Acceptable".
   *
   * The `type` value may be a single mime type string
   * such as "application/json", the extension name
   * such as "json" or an array `["json", "html", "text/plain"]`. When a list
   * or array is given the _best_ match, if any is returned.
   *
   * Examples:
   *
   *     // Accept: text/html
   *     this.accepts('html');
   *     // => "html"
   *
   *     // Accept: text/*, application/json
   *     this.accepts('html');
   *     // => "html"
   *     this.accepts('text/html');
   *     // => "text/html"
   *     this.accepts('json', 'text');
   *     // => "json"
   *     this.accepts('application/json');
   *     // => "application/json"
   *
   *     // Accept: text/*, application/json
   *     this.accepts('image/png');
   *     this.accepts('png');
   *     // => false
   *
   *     // Accept: text/*;q=.5, application/json
   *     this.accepts(['html', 'json']);
   *     this.accepts('html', 'json');
   *     // => "json"
   *
   * @param {String|Array} type(s)...
   * @return {String|Array|false}
   * @api public
   */

  accepts() {
    return this.accept.types(...arguments)
  }

  /**
   * Return accepted encodings or best fit based on `encodings`.
   *
   * Given `Accept-Encoding: gzip, deflate`
   * an array sorted by quality is returned:
   *
   *     ['gzip', 'deflate']
   *
   * @param {String|Array} encoding(s)...
   * @return {String|Array}
   * @api public
   */

  acceptsEncodings() {
    return this.accept.encodings(...arguments)
  }

  /**
   * Return accepted charsets or best fit based on `charsets`.
   *
   * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
   * an array sorted by quality is returned:
   *
   *     ['utf-8', 'utf-7', 'iso-8859-1']
   *
   * @param {String|Array} charset(s)...
   * @return {String|Array}
   * @api public
   */

  acceptsCharsets() {
    return this.accept.charsets(...arguments)
  }

  /**
   * Return accepted languages or best fit based on `langs`.
   *
   * Given `Accept-Language: en;q=0.8, es, pt`
   * an array sorted by quality is returned:
   *
   *     ['es', 'pt', 'en']
   *
   * @param {String|Array} lang(s)...
   * @return {Array|String}
   * @api public
   */

  acceptsLanguages() {
    return this.accept.languages(...arguments)
  }

  /**
   * Get the charset when present or undefined.
   *
   * @return {String}
   * @api public
   */

  get charset() {
    const type = this.get('content-type')
    if (!type) return ''
    try {
      return parseType(type).parameters.charset || ''
    } catch (err) {
      return ''
    }
  }

  /**
   * Check if the request is fresh, aka
   * Last-Modified and/or the ETag
   * still match.
   *
   * @return {Boolean}
   * @api public
   */

  get fresh() {
    const method = this.method
    const s = this.res.status

    // GET or HEAD for weak freshness validation only
    if (method !== 'GET' && method !== 'HEAD') return false

    // 2xx or 304 as per rfc2616 14.26
    if ((s >= 200 && s < 300) || s === 304) {
      return fresh(this.headers, this.res.headers)
    }

    return false
  }

  /**
   * Check if the request is stale, aka
   * "Last-Modified" and / or the "ETag" for the
   * resource has changed.
   *
   * @return {Boolean}
   * @api public
   */

  get stale() {
    return !this.fresh
  }

  /**
   * Parse the "Host" header field host
   * and support X-Forwarded-Host when a
   * proxy is enabled.
   *
   * @return {String} hostname:port
   * @api public
   */

  get host() {
    let host = this.config.get('trust proxy') && this.get('x-forwarded-host')
    host = host || this.get('Host')
    if (!host) return ''
    return host.split(/\s*,\s*/)[0]
  }

  /**
   * Parse the "Host" header field hostname
   * and support X-Forwarded-Host when a
   * proxy is enabled.
   *
   * @return {String} hostname
   * @api public
   */

  get hostname() {
    const host = this.host
    if (!host) return ''
    return host.split(':')[0]
  }

  /**
   * Return subdomains as an array.
   *
   * Subdomains are the dot-separated parts of the host before the main domain of
   * the app. By default, the domain of the app is assumed to be the last two
   * parts of the host. This can be changed by setting "subdomain offset".
   *
   * For example, if the domain is "tobi.ferrets.example.com":
   * If "subdomain offset" is not set, req.subdomains is `["ferrets", "tobi"]`.
   * If "subdomain offset" is 3, req.subdomains is `["tobi"]`.
   *
   * @return {Array}
   * @api public
   */

  get subdomains() {
    const hostname = this.hostname
    if (!hostname) return []
    return (isIP(hostname) ? [hostname] : hostname.split('.').reverse()).slice(
      this.config.get('subdomain offset')
    )
  }

  /**
   * Return the protocol string "http" or "https"
   * when requested with TLS. When the proxy setting
   * is enabled the "X-Forwarded-Proto" header
   * field will be trusted. If you're running behind
   * a reverse proxy that supplies https for you this
   * may be enabled.
   *
   * @return {String}
   * @api public
   */

  get protocol() {
    const proxy = this.config.get('trust proxy')
    if (this.socket.encrypted) return 'https'
    if (!proxy) return 'http'
    const proto = this.get('x-forwarded-proto') || 'http'
    return proto.split(/\s*,\s*/)[0]
  }

  /**
   * Short-hand for:
   *
   *    req.protocol == 'https'
   *
   * @return {Boolean}
   * @api public
   */

  get secure() {
    return this.protocol === 'https'
  }

  /**
   * Get origin of URL.
   *
   * @return {String}
   * @api public
   */

  get origin() {
    return `${this.protocol}://${this.host}`
  }

  /**
   * Get full request URL.
   *
   * @return {String}
   * @api public
   */

  get href() {
    // Support: `GET http://example.com/foo`
    if (/^https?:\/\//i.test(this.originalUrl)) return this.originalUrl
    return this.origin + this.originalUrl
  }

  /**
   * Check if the request is idempotent.
   *
   * @return {Boolean}
   * @api public
   */

  get idempotent() {
    return METHODS.indexOf(this.method) !== -1
  }

  /**
   * When `app.proxy` is `true`, parse
   * the "X-Forwarded-For" ip address list.
   *
   * For example if the value were "client, proxy1, proxy2"
   * you would receive the array `["client", "proxy1", "proxy2"]`
   * where "proxy2" is the furthest down-stream.
   *
   * @return {Array}
   * @api public
   */

  get ips() {
    const proxy = this.config.get('trust proxy')
    const val = this.get('x-forwarded-for')
    return proxy && val ? val.split(/\s*,\s*/) : []
  }

  /**
   * Parse Range header field, capping to the given `size`.
   *
   * Unspecified ranges such as "0-" require knowledge of your resource length. In
   * the case of a byte range this is of course the total number of bytes. If the
   * Range header field is not given `undefined` is returned, `-1` when unsatisfiable,
   * and `-2` when syntactically invalid.
   *
   * When ranges are returned, the array has a "type" property which is the type of
   * range that is required (most commonly, "bytes"). Each array element is an object
   * with a "start" and "end" property for the portion of the range.
   *
   * The "combine" option can be set to `true` and overlapping & adjacent ranges
   * will be combined into a single range.
   *
   * NOTE: remember that ranges are inclusive, so for example "Range: users=0-3"
   * should respond with 4 users when available, not 3.
   *
   * @param {number} size
   * @param {object} [options]
   * @param {boolean} [options.combine=false]
   * @return {number|array}
   * @public
   */

  range(size, options) {
    const range = this.get('range')
    if (!range) return
    return parseRange(size, range, options)
  }

  /**
   * Get request pathname.
   *
   * @return {String}
   * @api public
   */

  get path() {
    return parseUrl(this.raw).pathname
  }

  /**
   * Set pathname, retaining the query-string when present.
   *
   * @param {String} path
   * @api public
   */

  set path(path) {
    const url = parseUrl(this.raw)
    if (url.pathname === path) return

    url.pathname = path
    url.path = null
    this.url = stringify(url)
  }

  /**
   * Get parsed query-string.
   *
   * @return {Object}
   * @api public
   */

  get query() {
    const str = this.querystring
    const c = this[QUERY] || (this[QUERY] = {})
    const q = c[str] || (c[str] = qs.parse(str))
    return q
  }

  /**
   * Set query-string as an object.
   *
   * @param {Object} obj
   * @api public
   */

  set query(obj) {
    this.querystring = qs.stringify(obj)
  }

  /**
   * Get query string.
   *
   * @return {String}
   * @api public
   */

  get querystring() {
    return this.raw ? parseUrl(this.raw).query || '' : ''
  }

  /**
   * Set querystring.
   *
   * @param {String} str
   * @api public
   */

  set querystring(str) {
    const url = parseUrl(this.raw)
    if (url.search === `?${str}`) return

    url.search = str
    url.path = null

    this.url = stringify(url)
  }

  /**
   * Get the search string. Same as the querystring
   * except it includes the leading ?.
   *
   * @return {String}
   * @api public
   */

  get search() {
    if (!this.querystring) return ''
    return `?${this.querystring}`
  }

  /**
   * Set the search string. Same as
   * response.querystring= but included for ubiquity.
   *
   * @param {String} str
   * @api public
   */

  set search(str) {
    this.querystring = str
  }

  /**
   * Return parsed Content-Length when present.
   *
   * @return {Number}
   * @api public
   */

  get length() {
    const len = this.get('content-length')
    if (len === '') return
    return ~~len
  }

  /**
   * Check if the incoming request contains the "Content-Type"
   * header field, and it contains any of the give mime `type`s.
   * If there is no request body, `null` is returned.
   * If there is no content type, `false` is returned.
   * Otherwise, it returns the first `type` that matches.
   *
   * Examples:
   *
   *     // With Content-Type: text/html; charset=utf-8
   *     req.is('html') // => 'html'
   *     req.is('text/html') // => 'text/html'
   *     req.is('text/*', 'application/json') // => 'text/html'
   *
   *     // When Content-Type is application/json
   *     req.is('json', 'urlencoded') // => 'json'
   *     req.is('application/json') // => 'application/json'
   *     req.is('html', 'application/*') // => 'application/json'
   *
   *     req.is('html'); // => false
   *
   * @param {String|Array} types...
   * @return {String|false|null}
   * @api public
   */

  is(types) {
    if (!types) return typeis(this.raw)
    if (!Array.isArray(types)) types = [...arguments]
    return typeis(this.raw, types)
  }

  /**
   * Return the request mime type void of
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
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect() {
    if (!this.raw) return
    return this.toJSON()
  }

  /**
   * Return JSON representation.
   *
   * @return {Object}
   * @api public
   */

  toJSON() {
    return {
      method: this.method,
      url: this.url,
      headers: this.headers
    }
  }
}
