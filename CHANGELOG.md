# Trek Engine Changelog


## v0.3.3 (2016-09-08)

### Features

* [[`f6c8949`](https://github.com/trekjs/engine/commit/f6c8949)] - context: move rawReq and rawRes outside the unraw checking


## v0.3.2 (2016-09-08)

### Features

* [[`3e0b7da`](https://github.com/trekjs/engine/commit/3e0b7da)] - response: use res.raw instead of res.res
* [[`a72d371`](https://github.com/trekjs/engine/commit/a72d371)] - request: use req.raw instead of req.req


## v0.3.1 (2016-09-07)

### Features

* [[`75531ce1cb`](https://github.com/trekjs/engine/commit/75531ce1cb)] - use destructuring assignment for require module

### Fixed

* [[`d77b3b59e1`](https://github.com/trekjs/engine/commit/d77b3b59e1)] - subdomains should be [] if the host is an ip


## v0.3.0 (2016-09-07)

### Features

* [[`be5fe22568`](https://github.com/trekjs/engine/commit/be5fe22568)] - add rawReq and rawRes to context when app.unraw is false
