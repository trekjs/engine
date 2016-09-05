# Benchmarks

| Framework | Version |  
| --- | --- |  
| [Express][] | 4.14.0 |  
| [Koa][] | 2.0.0-alpha.6 |  
| [Toa][] | 1.8.11 |  
| [Trek Engine](..) | [-](../package.json) |  


## Frameworks' Battle! :fire: :collision:

Target Machine:

```
MacBook Pro (Retina, 13-inch, Late 2012)
Processor 2.5 GHz Intel Core i5
Memory 8 GB 1600 MHz DDR3
Graphics Intel HD Graphics 4000 1536 MB

Node v6.5.0
wrk v4.0.2
autocannon v0.14.1
```

### With [wrk][]

<img width="640" alt="With wrk" src="https://cloud.githubusercontent.com/assets/27926/18242600/a6810b88-7389-11e6-8c55-7eb88eedc023.png">

```
$ make battle
```

**5 middleware**

```
  5 middleware
------- express -------
Hello World
Running 10s test @ http://127.0.0.1:7001?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     8.28ms    3.81ms  91.11ms   96.16%
    Req/Sec   749.46    119.07     1.11k    89.62%
  59767 requests in 10.03s, 11.97MB read
Requests/sec:   5960.58
Transfer/sec:      1.19MB

  5 middleware
------- koa -------
Hello World
Running 10s test @ http://127.0.0.1:7002?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     7.80ms    2.29ms  62.20ms   93.24%
    Req/Sec   780.51    114.83     0.90k    84.88%
  62222 requests in 10.02s, 8.96MB read
Requests/sec:   6210.36
Transfer/sec:      0.89MB

  5 middleware
------- toa -------
Hello World
Running 10s test @ http://127.0.0.1:7003?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     8.89ms    3.98ms  70.65ms   91.10%
    Req/Sec   693.20    124.12     1.04k    69.88%
  55457 requests in 10.06s, 9.04MB read
Requests/sec:   5511.25
Transfer/sec:      0.90MB

  5 middleware
------- trek -------
Hello World
Running 10s test @ http://127.0.0.1:7004?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     6.50ms    1.87ms  50.89ms   94.48%
    Req/Sec     0.94k   126.29     1.03k    90.12%
  74692 requests in 10.01s, 7.91MB read
Requests/sec:   7461.16
Transfer/sec:    808.78KB
```

**15 middleware**

```
  15 middleware
------- express -------
Hello World
Running 10s test @ http://127.0.0.1:7001?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     8.44ms    2.11ms  59.18ms   92.27%
    Req/Sec   719.31     99.85   830.00     85.88%
  57357 requests in 10.02s, 11.49MB read
Requests/sec:   5725.24
Transfer/sec:      1.15MB

  15 middleware
------- koa -------
Hello World
Running 10s test @ http://127.0.0.1:7002?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     7.86ms    2.54ms  66.14ms   94.30%
    Req/Sec   778.10    107.56     0.89k    85.62%
  62054 requests in 10.02s, 8.94MB read
Requests/sec:   6191.55
Transfer/sec:      0.89MB

  15 middleware
------- toa -------
Hello World
Running 10s test @ http://127.0.0.1:7003?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     9.49ms    3.20ms  54.46ms   88.02%
    Req/Sec   639.42     94.53     0.98k    80.62%
  51179 requests in 10.06s, 8.35MB read
Requests/sec:   5087.62
Transfer/sec:    849.59KB

  15 middleware
------- trek -------
Hello World
Running 10s test @ http://127.0.0.1:7004?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     6.63ms    2.03ms  54.42ms   93.48%
    Req/Sec     0.92k   136.13     1.03k    86.62%
  73446 requests in 10.02s, 7.77MB read
Requests/sec:   7330.96
Transfer/sec:    794.67KB
```

**30 middleware**

```
  30 middleware
------- express -------
Hello World
Running 10s test @ http://127.0.0.1:7001?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     8.55ms    2.48ms  72.66ms   96.28%
    Req/Sec   712.96     90.84   810.00     91.62%
  56865 requests in 10.02s, 11.39MB read
Requests/sec:   5675.68
Transfer/sec:      1.14MB

  30 middleware
------- koa -------
Hello World
Running 10s test @ http://127.0.0.1:7002?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     7.97ms    2.38ms  62.09ms   93.85%
    Req/Sec   765.95    108.18   848.00     88.25%
  61075 requests in 10.02s, 8.80MB read
Requests/sec:   6094.90
Transfer/sec:      0.88MB

  30 middleware
------- toa -------
Hello World
Running 10s test @ http://127.0.0.1:7003?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    10.50ms    3.29ms  54.30ms   84.59%
    Req/Sec   577.90     86.31     0.91k    81.75%
  46270 requests in 10.07s, 7.55MB read
Requests/sec:   4596.74
Transfer/sec:    767.62KB

  30 middleware
------- trek -------
Hello World
Running 10s test @ http://127.0.0.1:7004?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     6.77ms    1.45ms  42.57ms   92.51%
    Req/Sec     0.90k   103.14     1.01k    87.38%
  71346 requests in 10.01s, 7.55MB read
Requests/sec:   7126.01
Transfer/sec:    772.45KB
```

**50 middleware**

```
  50 middleware
------- express -------
Hello World
Running 10s test @ http://127.0.0.1:7001?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     9.55ms    3.11ms  80.41ms   93.83%
    Req/Sec   639.79     95.53   727.00     89.62%
  51030 requests in 10.02s, 10.22MB read
Requests/sec:   5092.74
Transfer/sec:      1.02MB

 50 middleware
------- koa -------
Hello World
Running 10s test @ http://127.0.0.1:7002?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     8.13ms    2.34ms  63.12ms   93.65%
    Req/Sec   750.06    101.76   848.00     89.00%
  59778 requests in 10.02s, 8.61MB read
Requests/sec:   5968.34
Transfer/sec:      0.86MB

  50 middleware
------- toa -------
Hello World
Running 10s test @ http://127.0.0.1:7003?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    11.56ms    3.43ms  64.45ms   88.17%
    Req/Sec   524.29     79.84   606.00     83.50%
  42037 requests in 10.08s, 6.86MB read
Requests/sec:   4171.66
Transfer/sec:    696.63KB

  50 middleware
------- trek -------
Hello World
Running 10s test @ http://127.0.0.1:7004?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     6.90ms    2.05ms  61.90ms   95.75%
    Req/Sec     0.88k   107.64     0.97k    90.62%
  70405 requests in 10.02s, 7.45MB read
Requests/sec:   7029.15
Transfer/sec:    761.95KB

```

### With [autocannon][]

<img width="640" alt="With autocannon" src="https://cloud.githubusercontent.com/assets/27926/18249405/90f9c760-73b0-11e6-9b28-7c75788cdf2b.png">

```
$ benchmarker=autocannon make battle
```

**5 middleware**

```
  5 middleware
------- express -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 10.56     2.41     61
Req/Sec      4578.37   457.12   4919
Bytes/Sec    963.68 kB 101.2 kB 1.05 MB
50k requests in 11s, 10.58 MB read

  5 middleware
------- koa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 8.81      2.03     46
Req/Sec      5312.4    467.35   5703
Bytes/Sec    796.26 kB 72.98 kB 884.74 kB
53k requests in 10s, 8.02 MB read

  5 middleware
------- toa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 9.12      4.4      50
Req/Sec      5211.2    463.1    5647
Bytes/Sec    888.01 kB 75.01 kB 983.04 kB
52k requests in 10s, 8.91 MB read

  5 middleware
------- trek -------
Hello World
Stat         Avg       Stdev   Max
Latency (ms) 7.42      1.63    48
Req/Sec      6372.55   618.39  6779
Bytes/Sec    701.53 kB 69.1 kB 753.66 kB
70k requests in 11s, 7.78 MB read
```

**15 middleware**

```
  15 middleware
------- express -------
Hello World
Stat         Avg       Stdev   Max
Latency (ms) 10.81     2.2     60
Req/Sec      4442.19   400.39  4767
Bytes/Sec    936.87 kB 83.2 kB 1.02 MB
49k requests in 11s, 10.26 MB read

  15 middleware
------- koa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 8.66      1.66     55
Req/Sec      5420.19   348.65   5735
Bytes/Sec    820.69 kB 51.08 kB 884.74 kB
60k requests in 11s, 9 MB read

  15 middleware
------- toa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 9.72      4.64     44
Req/Sec      4886.11   410.79   5219
Bytes/Sec    835.58 kB 76.15 kB 917.5 kB
49k requests in 10s, 8.35 MB read

  15 middleware
------- trek -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 7.46      1.66     40
Req/Sec      6275.2    501.97   6671
Bytes/Sec    694.68 kB 60.51 kB 753.66 kB
63k requests in 10s, 6.96 MB read
```

**30 middleware**

```
  30 middleware
------- express -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 11.23     2.18     59
Req/Sec      4236.55   361.31   4531
Bytes/Sec    886.23 kB 80.71 kB 983.04 kB
47k requests in 11s, 9.79 MB read

  30 middleware
------- koa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 8.84      2.12     58
Req/Sec      5300.28   473.35   5643
Bytes/Sec    799.84 kB 71.87 kB 851.97 kB
58k requests in 11s, 8.8 MB read

  30 middleware
------- toa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 10.9      4.68     49
Req/Sec      4395      368.27   4719
Bytes/Sec    753.66 kB 59.07 kB 819.2 kB
44k requests in 10s, 7.51 MB read

  30 middleware
------- trek -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 7.73      1.75     45
Req/Sec      6047.1    513.41   6519
Bytes/Sec    668.77 kB 54.93 kB 753.66 kB
67k requests in 11s, 7.38 MB read
```

**50 middleware**

```
  50 middleware
------- express -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 12.52     2.82     70
Req/Sec      3827.9    379.17   4203
Bytes/Sec    796.26 kB 81.33 kB 884.74 kB
38k requests in 10s, 8.04 MB read

  50 middleware
------- koa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 9.67      2.36     54
Req/Sec      4938.5    485.14   5431
Bytes/Sec    743.83 kB 71.49 kB 851.97 kB
49k requests in 10s, 7.46 MB read

  50 middleware
------- toa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 12.99     5.66     61
Req/Sec      3705.8    344.4    4093
Bytes/Sec    634.88 kB 61.22 kB 720.89 kB
37k requests in 10s, 6.34 MB read

  50 middleware
------- trek -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 7.96      2.23     52
Req/Sec      5868.1    749.57   6359
Bytes/Sec    649.63 kB 83.22 kB 720.89 kB
59k requests in 10s, 6.51 MB read
```

[wrk]: https://github.com/wg/wrk
[autocannon]: https://github.com/mcollina/autocannon
[Express]: https://github.com/expressjs/express
[Koa]: https://github.com/koajs/koa/tree/v2.x
[Toa]: https://github.com/toajs/toa
