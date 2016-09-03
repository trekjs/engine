import test from 'ava'
import Engine from '../../lib/engine'

test('engine.env should be development', t => {
  process.env.NODE_ENV = ''
  const app = new Engine()
  t.is(app.env, 'development')
})

test('engine.env should be test', t => {
  process.env.NODE_ENV = 'test'
  const app = new Engine()
  t.is(app.env, 'test')
})
