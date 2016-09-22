const Engine = require('../..')

const app = new Engine()

app.use(({ res }) => {
  res.status = 200
  res.body = 'Hello world'
})

app.on('error', err => {
  console.log('app:error: start')
  console.log(err)
  console.log('app:error: end')
})

app.run(3000)
