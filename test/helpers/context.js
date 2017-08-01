import Stream from 'stream'
import Trek from '../../lib/engine'
import Context from '../../lib/context'

const createContext = (req, res, app = new Trek()) => {
  const socket = new Stream.Duplex()
  req = Object.assign(
    {
      headers: {},
      socket
    },
    Stream.Readable.prototype,
    req
  )
  res = Object.assign(
    {
      getHeaders() {
        return this._headers
      },
      _headers: {},
      socket
    },
    Stream.Writable.prototype,
    res
  )
  req.socket.remoteAddress = req.socket.remoteAddress || '127.0.0.1'
  res.getHeader = k => res.getHeaders()[k.toLowerCase()]
  res.setHeader = (k, v) => {
    res._headers[k.toLowerCase()] = v
  }
  res.hasHeader = k => k.toLowerCase() in res._headers
  res.removeHeader = k => delete res._headers[k.toLowerCase()]

  return new Context(app, app.config, req, res)
}

export default createContext

export const request = (req, res, app) => createContext(req, res, app).req

export const response = (req, res, app) => createContext(req, res, app).res

export const listen = app => {
  return new Promise((resolve, reject) => {
    app.run(function(err) {
      if (err) {
        return reject(err)
      }

      const { port } = this.address()
      resolve(`http://localhost:${port}`)
    })
  })
}
