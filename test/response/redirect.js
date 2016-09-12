import test from 'ava'
import request from 'request-promise'
import Engine from '../../lib/engine'
import { listen } from '../helpers/context'

test.beforeEach(t => {
  t.context = new Engine()
})

test('should redirect to the given url', async t => {
  const app = t.context

  app.use(({ res }) => {
    res.redirect('http://bing.com')
    t.is(res.header.location, 'http://bing.com')
    t.is(res.status, 302)
  })

  const url = await listen(app)
  await request(url)
})

test('with "back" should redirect to Referrer', async t => {
  const app = t.context

  app.use(({ req, res }) => {
    if (req.path === '/') {
      req.headers.referrer = '/login'
      res.redirect('back')
      t.is(res.header.location, '/login')
    } else {
      res.end()
    }
  })

  const url = await listen(app)
  await request(url)
})

test('with "back" should redirect to Referer', async t => {
  const app = t.context

  app.use(({ req, res }) => {
    if (req.path === '/') {
      req.headers.referer = '/login'
      res.redirect('back')
      t.is(res.header.location, '/login')
    } else {
      res.end()
    }
  })

  const url = await listen(app)
  await request(url)
})

test('with "back" should default to alt', async t => {
  const app = t.context

  app.use(({ req, res }) => {
    if (req.path === '/') {
      res.redirect('back', '/index.html')
      t.is(res.header.location, '/index.html')
    } else {
      res.end()
    }
  })

  const url = await listen(app)
  await request(url)
})

test('with "back" should default redirect to /', async t => {
  const app = t.context

  app.use(({ req, res }) => {
    if (req.path === '/') {
      res.end()
    } else {
      res.redirect('back')
      t.is(res.header.location, '/')
    }
  })

  const url = await listen(app)
  await request(url + '/index')
})

test('when html is accepted should respond with html', async t => {
  const app = t.context

  app.use(({ req, res }) => {
    if (req.path === '/') {
      req.header.accept = 'text/html'
      res.redirect('/redirect')
      t.is(res.header['content-type'], 'text/html; charset=utf-8')
    } else {
      res.end()
    }
  })

  const url = await listen(app)
  await request(url)
})

test('when text is accepted should respond with text', async t => {
  const app = t.context

  app.use(({ req, res }) => {
    if (req.path === '/') {
      req.header.accept = 'text/plain'
      res.redirect('/redirect')
      t.is(res.header['content-type'], 'text/plain; charset=utf-8')
    } else {
      res.end()
    }
  })

  const url = await listen(app)
  await request(url)
})

test('when html is accepted should escape the url', async t => {
  const app = t.context

  app.use(({ req, res }) => {
    if (req.path === '/') {
      req.header.accept = 'text/html'
      res.redirect('/redirect')
      t.is(res.header['content-type'], 'text/html; charset=utf-8')
    } else {
      res.end()
    }
  })

  const url = await listen(app)
  await request(url)
})

test('when status is 301 should not change the status code', async t => {
  const app = t.context

  app.use(({ req, res }) => {
    if (req.path === '/') {
      res.status = 301
      req.header.accept = 'text/plain'
      res.redirect('/redirect')
      t.is(res.status, 301)
      t.is(res.type, 'text/plain')
    } else {
      res.end()
    }
  })

  const url = await listen(app)
  await request(url)
})

test('when status is 304 should change the status code', async t => {
  const app = t.context

  app.use(({ req, res }) => {
    if (req.path === '/') {
      req.header.accept = 'text/plain'
      res.status = 304
      res.redirect('/redirect')
      t.is(res.status, 302)
      t.is(res.type, 'text/plain')
    } else {
      res.end()
    }
  })

  const url = await listen(app)
  await request(url)
})

test('when content-type was present should overwrite content-type', async t => {
  const app = t.context

  app.use(({ req, res }) => {
    if (req.path === '/') {
      req.header.accept = 'text/plain'
      res.redirect('/redirect')
      t.is(res.status, 302)
      t.is(res.type, 'text/plain')
    } else {
      res.end()
    }
  })

  const url = await listen(app)
  await request(url)
})
