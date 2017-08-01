import test from 'ava'
import request from 'request-promise'
import Trek from '../../lib/engine'
import { response, listen } from '../helpers/context'

test('when given a filename should set the filename param', t => {
  const res = response()
  res.attachment('path/to/tobi.png')
  const str = 'attachment; filename="tobi.png"'
  t.is(res.headers['content-disposition'], str)
})

test('when omitting filename should not set filename param', t => {
  const res = response()
  res.attachment()
  t.is(res.headers['content-disposition'], 'attachment')
})

test('when given a no-ascii filename should set the encodeURI filename param', t => {
  const res = response()
  res.attachment('path/to/include-no-ascii-char-中文名-ok.png')
  const str =
    'attachment; filename="include-no-ascii-char-???-ok.png"; filename*=UTF-8\'\'include-no-ascii-char-%E4%B8%AD%E6%96%87%E5%90%8D-ok.png'
  t.is(res.headers['content-disposition'], str)
})

test('when given a no-ascii filename should work with http client', async t => {
  const app = new Trek()

  app.use(({ res }) => {
    res.attachment('path/to/include-no-ascii-char-中文名-ok.json')
    res.send(200, { foo: 'bar' })
  })

  const uri = await listen(app)
  const res = await request({ uri, resolveWithFullResponse: true, json: true })

  t.is(res.statusCode, 200)
  t.is(
    res.headers['content-disposition'],
    'attachment; filename="include-no-ascii-char-???-ok.json"; filename*=UTF-8\'\'include-no-ascii-char-%E4%B8%AD%E6%96%87%E5%90%8D-ok.json'
  )
  t.deepEqual(res.body, { foo: 'bar' })
})
