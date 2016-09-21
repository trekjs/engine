const Engine = require('../..')

const app = new Engine()

app.use(({ res }) => {
  res.status = 200
  res.body = 'Hello world'
})

app.run(3000)
