# Trek Engine Changelog

## v1.0.1 (2017-05-10)
* [[`7d1532d`](https://github.com/trekjs/engine/commit/7d1532d)] engine: add bootUp()

## v0.5.4 (2017-02-09)
* [[`75d7188`](https://github.com/trekjs/engine/commit/75d7188)] deps: fresh v0.4.0
* [[`0e3bec8`](https://github.com/trekjs/engine/commit/0e3bec8)] context: add store map


## v0.5.0 (2016-10-14)
* [[`9d97507`](https://github.com/trekjs/engine/commit/9d97507)] feature: lazy respond
* [[`3bd1fcd`](https://github.com/trekjs/engine/commit/3bd1fcd)] ddeps: xo v0.17
* [[`1508660`](https://github.com/trekjs/engine/commit/1508660)] deps: trek-http-error v0.0.5
* [[`1b2c9d2`](https://github.com/trekjs/engine/commit/1b2c9d2)] license: tweak


## v0.4.5 (2016-10-09)

* [[`131108a`](https://github.com/trekjs/engine/commit/131108a)] context: add cookies
* [[`b33130d`](https://github.com/trekjs/engine/commit/b33130d)] performance: Reflect.defineProperty is slower
* [[`e54706f`](https://github.com/trekjs/engine/commit/e54706f)] engine: remove unraw and add context(req, res) to create context
* [[`2087039`](https://github.com/trekjs/engine/commit/2087039)] error: use trek-http-error instead
* [[`db95022`](https://github.com/trekjs/engine/commit/db95022)] ddeps: tweak versions
* [[`4f022ec`](https://github.com/trekjs/engine/commit/4f022ec)] request: body getter and setter

## v0.4.4 (2016-10-04)

* [[`fc9b032`](https://github.com/trekjs/engine/commit/fc9b032)] - engine: add respond method


## v0.4.3 (2016-10-04)

* [[`d5b2159`](https://github.com/trekjs/engine/commit/d5b2159)] - engine: add server getter & setter and handle
* [[`f469078`](https://github.com/trekjs/engine/commit/f469078)] - error: mv http-error to error
* [[`75c7d98`](https://github.com/trekjs/engine/commit/75c7d98)] - response: add writable getter
* [[`dc1b8e5`](https://github.com/trekjs/engine/commit/dc1b8e5)] - response: add body setter and getter
* [[`960ef62`](https://github.com/trekjs/engine/commit/960ef62)] - esponse: add flushHeaders() and length getter/setter
* [[`92431c6`](https://github.com/trekjs/engine/commit/92431c6)] - util: add getLength(body)
* [[`4626b97`](https://github.com/trekjs/engine/commit/4626b97)] - pkg: mime-types v2.1.12


## v0.4.2 (2016-09-17)

* [[`e0dc7ab`](https://github.com/trekjs/engine/commit/e0dc7ab)] - pkg: trek-middleware v1.1.0


## v0.4.1 (2016-09-16)

* [[`6286e02`](https://github.com/trekjs/engine/commit/6286e02)] - pkg: trek-middleware v1.0.2


## v0.4.0 (2016-09-12)

* [[`25f7140`](https://github.com/trekjs/engine/commit/25f7140)] - response: add redirect method and headerSent getter


## v0.3.3 (2016-09-08)

* [[`f6c8949`](https://github.com/trekjs/engine/commit/f6c8949)] - context: move rawReq and rawRes outside the unraw checking


## v0.3.2 (2016-09-08)

* [[`3e0b7da`](https://github.com/trekjs/engine/commit/3e0b7da)] - response: use res.raw instead of res.res
* [[`a72d371`](https://github.com/trekjs/engine/commit/a72d371)] - request: use req.raw instead of req.req


## v0.3.1 (2016-09-07)

* [[`75531ce`](https://github.com/trekjs/engine/commit/75531ce)] - use destructuring assignment for require module

### Fixed

* [[`d77b3b5`](https://github.com/trekjs/engine/commit/d77b3b5)] - subdomains should be [] if the host is an ip


## v0.3.0 (2016-09-07)

* [[`be5fe22`](https://github.com/trekjs/engine/commit/be5fe22)] - add rawReq and rawRes to context when app.unraw is false
