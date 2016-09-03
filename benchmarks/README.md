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
Stat         Avg     Stdev     Max
Latency (ms) 8.84    1.9       53
Req/Sec      5376.55 532.04    5963
Bytes/Sec    1.13 MB 110.42 kB 1.31 MB
59k requests in 11s, 12.42 MB read

  5 middleware
------- koa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 7.57      1.54     54
Req/Sec      6080.55   415.54   6327
Bytes/Sec    918.99 kB 59.88 kB 983.04 kB
67k requests in 11s, 10.1 MB read

  5 middleware
------- toa -------
Hello World
Stat         Avg     Stdev    Max
Latency (ms) 8.05    4.1      49
Req/Sec      5836.8  494.66   6183
Bytes/Sec    1.01 MB 87.39 kB 1.11 MB
58k requests in 10s, 9.98 MB read

  5 middleware
------- trek -------
Hello World
Stat         Avg      Stdev    Max
Latency (ms) 5.47     1.26     41
Req/Sec      8186.91  516.41   8703
Bytes/Sec    904.1 kB 61.63 kB 983.04 kB
90k requests in 11s, 10 MB read
```

**15 middleware**

```
  15 middleware
------- express -------
Hello World
Stat         Avg     Stdev     Max
Latency (ms) 8.78    1.7       55
Req/Sec      5374.4  508.32    5835
Bytes/Sec    1.13 MB 104.09 kB 1.25 MB
54k requests in 10s, 11.29 MB read

  15 middleware
------- koa -------
Hello World
Stat         Avg       Stdev     Max
Latency (ms) 8.58      2.42      65
Req/Sec      5493.7    844.72    6559
Bytes/Sec    832.31 kB 124.73 kB 1.02 MB
55k requests in 10s, 8.29 MB read

  15 middleware
------- toa -------
Hello World
Stat         Avg       Stdev     Max
Latency (ms) 10.08     5.07      57
Req/Sec      4733.9    969.03    5539
Bytes/Sec    813.47 kB 166.77 kB 950.27 kB
47k requests in 10s, 8.09 MB read

  15 middleware
------- trek -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 7.57      2.45     47
Req/Sec      6248.82   1321.65  7635
Bytes/Sec    691.11 kB 145.3 kB 851.97 kB
69k requests in 11s, 7.63 MB read
```

**30 middleware**

```
  30 middleware
------- express -------
Hello World
Stat         Avg      Stdev     Max
Latency (ms) 14.45    4.73      110
Req/Sec      3338.37  541.38    4283
Bytes/Sec    699.3 kB 113.42 kB 917.5 kB
37k requests in 11s, 7.71 MB read

  30 middleware
------- koa -------
Hello World
Stat         Avg       Stdev     Max
Latency (ms) 8.14      2.88      76
Req/Sec      5783.6    927.97    6783
Bytes/Sec    871.63 kB 137.82 kB 1.05 MB
58k requests in 10s, 8.73 MB read

  30 middleware
------- toa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 9.82      4.22     45
Req/Sec      4866.5    305.97   5127
Bytes/Sec    829.03 kB 56.38 kB 884.74 kB
49k requests in 10s, 8.32 MB read

  30 middleware
------- trek -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 6.26      1.44     49
Req/Sec      7604.55   749.25   8119
Bytes/Sec    844.52 kB 85.09 kB 917.5 kB
84k requests in 11s, 9.28 MB read
```

**50 middleware**

```
  50 middleware
------- express -------
Hello World
Stat         Avg       Stdev     Max
Latency (ms) 11.18     3.03      52
Req/Sec      4253.91   756.59    4991
Bytes/Sec    892.18 kB 158.13 kB 1.05 MB
47k requests in 11s, 9.83 MB read

  50 middleware
------- koa -------
Hello World
Stat         Avg       Stdev     Max
Latency (ms) 8.47      2.83      47
Req/Sec      5566.7    909.66    6583
Bytes/Sec    835.58 kB 133.51 kB 1.02 MB
56k requests in 10s, 8.4 MB read

  50 middleware
------- toa -------
Hello World
Stat         Avg       Stdev     Max
Latency (ms) 12.66     5.5       60
Req/Sec      3794.6    752.37    4671
Bytes/Sec    646.35 kB 123.34 kB 819.2 kB
38k requests in 10s, 6.49 MB read

  50 middleware
------- trek -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 7.66      2.89     59
Req/Sec      6124      852.52   7631
Bytes/Sec    677.48 kB 91.67 kB 851.97 kB
61k requests in 10s, 6.8 MB read
```

[wrk]: https://github.com/wg/wrk
[autocannon]: https://github.com/mcollina/autocannon
[Express]: https://github.com/expressjs/express
[Koa]: https://github.com/koajs/koa/tree/v2.x
[Toa]: https://github.com/toajs/toa
