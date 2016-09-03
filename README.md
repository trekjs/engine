<div align="center">

<h1>Trek Engine</h1>

<p>Micro, Elegant, Fast, Lightweight, Expressive middleware for Modern Node.js</p>

<p>
<a href="https://travis-ci.org/trekjs/engine"><img src="https://img.shields.io/travis/trekjs/engine.svg" alt="Build status"></a>
<a href="https://codecov.io/gh/trekjs/engine"><img src="https://codecov.io/gh/trekjs/engine/branch/master/graph/badge.svg" alt="Codecov" /></a>
<a href="https://npmjs.org/package/trek-engine"><img src="https://img.shields.io/npm/v/trek-engine.svg" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/trek-engine"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT License"></a>
</p>

</div>

## Features

* **Micro**.

* **Elegant**.

* **Fast**.

* **Lightweight**.

* **Expressive**.


## Installation

```
$ npm install trek-engine
```

## Hello Trek Engine

```js
const co = require('co')
const Engine = require('trek-engine')
const app = new Engine()

// middleware
app.use((ctx, next) => {
  // return promise
  return next()
})

// async/await
app.use(async (ctx, next) => {
  await next()
})

// generation
app.use(co.wrap(function * (ctx, next) {
  yield next()
}))

// response
app.use({ res } => {
  res.end('Hello Koa')
})

app.run(3000)
```

---

> [fundon.me](https://fundon.me) &nbsp;&middot;&nbsp;
> GitHub [@fundon](https://github.com/fundon) &nbsp;&middot;&nbsp;
> Twitter [@_fundon](https://twitter.com/_fundon)
