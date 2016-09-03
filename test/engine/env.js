import test from 'ava'
import Engine from '../../lib/engine'

test('app\'s env should be development', t => {
  process.env.NODE_ENV = ''
  const app = new Engine()
  t.is(app.env, 'development')
})

test('app\'s env should be test', t => {
  const app = new Engine()
  t.is(app.env, 'test')
})
