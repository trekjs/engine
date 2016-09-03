# Benchmarks

| Framework | Version |  
| --- | --- |  
| [Express][] | 4.14.0 |  
| [Koa][] | 2.0.0-alpha.6 |  
| [Toa][] | 1.8.11 |  
| [Trek Engine](..) | [-](../package.json) |  


## Frameworks' Battle! :fire: :collision:

### With [wrk][]

```
$ make battle
```

**5 middleware**

```
  5 middleware
------- express -------
Hello World
  6114.56

  5 middleware
------- koa -------
Hello World
  6613.55

  5 middleware
------- toa -------
Hello World
  5142.69

  5 middleware
------- trek -------
Hello World
  7393.59
```

**15 middleware**

```
  15 middleware
------- express -------
Hello World
  5681.79

  15 middleware
------- koa -------
Hello World
  6822.63

  15 middleware
------- toa -------
Hello World
  5336.33

  15 middleware
------- trek -------
Hello World
  8198.41
```

**30 middleware**

```
  30 middleware
------- express -------
Hello World
  5168.10

  30 middleware
------- koa -------
Hello World
  6205.17

  30 middleware
------- toa -------
Hello World
  4727.22

  30 middleware
------- trek -------
Hello World
  7982.35
```

**50 middleware**

```
  50 middleware
------- express -------
Hello World
  5393.90

  50 middleware
------- koa -------
Hello World
  5974.12

  50 middleware
------- toa -------
Hello World
  4261.97

  50 middleware
------- trek -------
Hello World
  6634.71
```

### With [autocannon][]

```
$ benchmarker=autocannon make battle
```

**5 middleware**

```
  5 middleware
------- express -------
Hello World

  5 middleware
------- koa -------
Hello World

  5 middleware
------- toa -------
Hello World

  5 middleware
------- trek -------
Hello World
```

**15 middleware**

```
  15 middleware
------- express -------
Hello World

  15 middleware
------- koa -------
Hello World

  15 middleware
------- toa -------
Hello World

  15 middleware
------- trek -------
Hello World
```

**30 middleware**

```
  30 middleware
------- express -------
Hello World

  30 middleware
------- koa -------
Hello World

  30 middleware
------- toa -------
Hello World

  30 middleware
------- trek -------
Hello World
```

**50 middleware**

```
  50 middleware
------- express -------
Hello World

  50 middleware
------- koa -------
Hello World

  50 middleware
------- toa -------
Hello World

  50 middleware
------- trek -------
Hello World
```

[wrk]: https://github.com/wg/wrk
[autocannon]: https://github.com/mcollina/autocannon
[Express]: https://github.com/expressjs/express
[Koa]: https://github.com/koajs/koa/tree/v2.x
[Toa]: https://github.com/toajs/toa
