# Trek Engine Changelog


## v0.4.3 (2016-10-04)

### Features

* [[`d5b2159`](https://github.com/trekjs/engine/commit/d5b2159)] - engine: add server getter & setter and handle
* [[`f469078`](https://github.com/trekjs/engine/commit/f469078)] - error: mv http-error to error
* [[`75c7d98`](https://github.com/trekjs/engine/commit/75c7d98)] - response: add writable getter
* [[`dc1b8e5`](https://github.com/trekjs/engine/commit/dc1b8e5)] - response: add body setter and getter
* [[`960ef62`](https://github.com/trekjs/engine/commit/960ef62)] - esponse: add flushHeaders() and length getter/setter
* [[`92431c6`](https://github.com/trekjs/engine/commit/92431c6)] - util: add getLength(body)
* [[`4626b97`](https://github.com/trekjs/engine/commit/4626b97)] - pkg: mime-types v2.1.12


## v0.4.2 (2016-09-17)

### Features

* [[`e0dc7ab`](https://github.com/trekjs/engine/commit/e0dc7ab)] - pkg: trek-middleware v1.1.0


## v0.4.1 (2016-09-16)

### Features

* [[`6286e02`](https://github.com/trekjs/engine/commit/6286e02)] - pkg: trek-middleware v1.0.2


## v0.4.0 (2016-09-12)

### Features

* [[`25f7140`](https://github.com/trekjs/engine/commit/25f7140)] - response: add redirect method and headerSent getter


## v0.3.3 (2016-09-08)

### Features

* [[`f6c8949`](https://github.com/trekjs/engine/commit/f6c8949)] - context: move rawReq and rawRes outside the unraw checking


## v0.3.2 (2016-09-08)

### Features

* [[`3e0b7da`](https://github.com/trekjs/engine/commit/3e0b7da)] - response: use res.raw instead of res.res
* [[`a72d371`](https://github.com/trekjs/engine/commit/a72d371)] - request: use req.raw instead of req.req


## v0.3.1 (2016-09-07)

### Features

* [[`75531ce`](https://github.com/trekjs/engine/commit/75531ce)] - use destructuring assignment for require module

### Fixed

* [[`d77b3b5`](https://github.com/trekjs/engine/commit/d77b3b5)] - subdomains should be [] if the host is an ip


## v0.3.0 (2016-09-07)

### Features

* [[`be5fe22`](https://github.com/trekjs/engine/commit/be5fe22)] - add rawReq and rawRes to context when app.unraw is false
