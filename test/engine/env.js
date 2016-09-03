import test from 'ava'
import Engine from '../../lib/engine'

test.beforeEach(t => {
  t.context = new Engine()
})

test('app\'s env should be development', t => {
  const app = t.context
  t.is(app.env, 'development')
})

test('app\'s env should be test', t => {
  process.env.NODE_ENV = 'test'
  const app = new Engine()
  t.is(app.env, 'test')
})
