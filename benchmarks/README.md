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
Running 10s test @ http://127.0.0.1:7001?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     8.83ms    3.54ms  88.49ms   95.70%
    Req/Sec   697.36    112.74   848.00     82.62%
  55635 requests in 10.03s, 11.14MB read
Requests/sec:   5548.53
Transfer/sec:      1.11MB

  5 middleware
------- koa -------
Hello World
Running 10s test @ http://127.0.0.1:7002?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     8.24ms    2.45ms  63.07ms   92.35%
    Req/Sec   738.91    112.82   848.00     84.62%
  58933 requests in 10.02s, 8.49MB read
Requests/sec:   5880.60
Transfer/sec:    867.16KB

  5 middleware
------- toa -------
Hello World
Running 10s test @ http://127.0.0.1:7003?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     9.22ms    3.42ms  65.72ms   91.60%
    Req/Sec   662.42    102.72     0.85k    68.62%
  53040 requests in 10.07s, 8.65MB read
Requests/sec:   5267.35
Transfer/sec:      0.86MB

  5 middleware
------- trek -------
Hello World
Running 10s test @ http://127.0.0.1:7004?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     6.93ms    1.76ms  41.77ms   91.85%
    Req/Sec     0.88k   131.05     1.03k    82.38%
  69800 requests in 10.02s, 7.39MB read
Requests/sec:   6966.96
Transfer/sec:    755.21KB
```

**15 middleware**

```
  15 middleware
------- express -------
Hello World
Running 10s test @ http://127.0.0.1:7001?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     8.63ms    2.29ms  57.53ms   92.87%
    Req/Sec   704.48     96.57   797.00     88.00%
  56252 requests in 10.04s, 11.27MB read
Requests/sec:   5603.93
Transfer/sec:      1.12MB

  15 middleware
------- koa -------
Hello World
Running 10s test @ http://127.0.0.1:7002?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     8.73ms    3.72ms  64.25ms   95.81%
    Req/Sec   711.35    128.36     0.88k    85.88%
  56751 requests in 10.03s, 8.17MB read
Requests/sec:   5659.06
Transfer/sec:    834.49KB

  15 middleware
------- toa -------
Hello World
Running 10s test @ http://127.0.0.1:7003?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     9.98ms    3.44ms  42.20ms   86.39%
    Req/Sec   609.78    108.96     0.91k    71.38%
  48816 requests in 10.06s, 7.96MB read
Requests/sec:   4850.14
Transfer/sec:    809.94KB

  15 middleware
------- trek -------
Hello World
Running 10s test @ http://127.0.0.1:7004?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     7.11ms    1.67ms  47.88ms   92.06%
    Req/Sec     0.85k   111.62     1.02k    76.50%
  68011 requests in 10.02s, 7.20MB read
Requests/sec:   6785.73
Transfer/sec:    735.56KB
```

**30 middleware**

```
  30 middleware
------- express -------
Hello World
Running 10s test @ http://127.0.0.1:7001?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     9.37ms    2.72ms  54.22ms   91.02%
    Req/Sec   649.83    111.33     0.96k    86.75%
  51825 requests in 10.03s, 10.38MB read
Requests/sec:   5166.12
Transfer/sec:      1.03MB

  30 middleware
------- koa -------
Hello World
Running 10s test @ http://127.0.0.1:7002?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     8.80ms    2.80ms  57.63ms   92.97%
    Req/Sec   694.24    118.94     0.87k    86.25%
  55370 requests in 10.03s, 7.97MB read
Requests/sec:   5523.06
Transfer/sec:    814.44KB

  30 middleware
------- toa -------
Hello World
Running 10s test @ http://127.0.0.1:7003?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    10.92ms    4.37ms  84.70ms   91.35%
    Req/Sec   562.17     99.15   720.00     86.38%
  45049 requests in 10.07s, 7.35MB read
Requests/sec:   4471.89
Transfer/sec:    746.77KB

  30 middleware
------- trek -------
Hello World
Running 10s test @ http://127.0.0.1:7004?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     7.15ms    1.74ms  48.86ms   92.68%
    Req/Sec   848.55    114.26     0.97k    79.12%
  67672 requests in 10.02s, 7.16MB read
Requests/sec:   6753.60
Transfer/sec:    732.08KB
```

**50 middleware**

```
  50 middleware
------- express -------
Hello World
Running 10s test @ http://127.0.0.1:7001?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    10.63ms    2.98ms  60.10ms   90.50%
    Req/Sec   570.60     96.46   676.00     85.38%
  45553 requests in 10.03s, 9.12MB read
Requests/sec:   4541.39
Transfer/sec:      0.91MB

  50 middleware
------- koa -------
Hello World
Running 10s test @ http://127.0.0.1:7002?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     8.73ms    2.04ms  41.39ms   90.78%
    Req/Sec   693.73    100.59   848.00     85.00%
  55353 requests in 10.03s, 7.97MB read
Requests/sec:   5518.08
Transfer/sec:    813.70KB

  50 middleware
------- toa -------
Hello World
Running 10s test @ http://127.0.0.1:7003?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    12.35ms    4.93ms  88.17ms   91.25%
    Req/Sec   497.59     96.75   666.00     75.38%
  39868 requests in 10.07s, 6.50MB read
Requests/sec:   3957.51
Transfer/sec:    660.87KB

  50 middleware
------- trek -------
Hello World
Running 10s test @ http://127.0.0.1:7004?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     7.29ms    1.59ms  48.51ms   91.46%
    Req/Sec   830.77    102.65     0.98k    81.75%
  66242 requests in 10.02s, 7.01MB read
Requests/sec:   6609.27
Transfer/sec:    716.43KB
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
Latency (ms) 8.78    2.97      66
Req/Sec      5472    1011.44   6175
Bytes/Sec    1.15 MB 210.94 kB 1.31 MB
55k requests in 10s, 11.49 MB read

  5 middleware
------- koa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 12.2      2.12     64
Req/Sec      3942.46   268.02   4093
Bytes/Sec    593.55 kB 40.04 kB 622.59 kB
43k requests in 11s, 6.55 MB read

  5 middleware
------- toa -------
Hello World
Stat         Avg       Stdev     Max
Latency (ms) 9.75      5.45      50
Req/Sec      4874      1387.93   6251
Bytes/Sec    834.76 kB 239.13 kB 1.11 MB
49k requests in 10s, 8.33 MB read

  5 middleware
------- trek -------
Hello World
Stat         Avg       Stdev     Max
Latency (ms) 5.83      2.35      51
Req/Sec      7864.8    1552.11   9015
Bytes/Sec    877.36 kB 178.37 kB 1.02 MB
79k requests in 10s, 8.73 MB read
```

**15 middleware**

```
  15 middleware
------- express -------
Hello World
Stat         Avg       Stdev     Max
Latency (ms) 10.07     3.61      76
Req/Sec      4703.1    1128.14   5839
Bytes/Sec    987.51 kB 241.01 kB 1.25 MB
52k requests in 11s, 10.86 MB read

  15 middleware
------- koa -------
Hello World
Stat         Avg      Stdev    Max
Latency (ms) 11.61    2.14     50
Req/Sec      4131.82  301.94   5071
Bytes/Sec    621.1 kB 49.13 kB 786.43 kB
45k requests in 11s, 6.86 MB read

  15 middleware
------- toa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 14.64     4.14     62
Req/Sec      3290.2    362.41   3701
Bytes/Sec    558.69 kB 63.54 kB 655.36 kB
33k requests in 10s, 5.63 MB read

  15 middleware
------- trek -------
Hello World
Stat         Avg       Stdev     Max
Latency (ms) 5.79      1.93      40
Req/Sec      7842.2    1342.18   8911
Bytes/Sec    874.91 kB 147.13 kB 1.02 MB
78k requests in 10s, 8.7 MB read
```

**30 middleware**

```
  30 middleware
------- express -------
Hello World
Stat         Avg     Stdev     Max
Latency (ms) 9.18    2.63      53
Req/Sec      5116.91 650.18    5611
Bytes/Sec    1.06 MB 136.19 kB 1.18 MB
56k requests in 11s, 11.82 MB read

  30 middleware
------- koa -------
Hello World
Stat         Avg       Stdev     Max
Latency (ms) 8.66      3.11      58
Req/Sec      5473.9    1226.25   6755
Bytes/Sec    825.75 kB 183.65 kB 1.05 MB
55k requests in 10s, 8.26 MB read

  30 middleware
------- toa -------
Hello World
Stat         Avg       Stdev     Max
Latency (ms) 10.95     4.93      51
Req/Sec      4366.61   799.62    5375
Bytes/Sec    747.11 kB 137.51 kB 950.27 kB
44k requests in 10s, 7.47 MB read

  30 middleware
------- trek -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 5.64      1.32     33
Req/Sec      7971.4    619.47   8415
Bytes/Sec    884.74 kB 67.55 kB 950.27 kB
80k requests in 10s, 8.85 MB read
```

**50 middleware**

```
  50 middleware
------- express -------
Hello World
Stat         Avg     Stdev   Max
Latency (ms) 9.47    1.59    60
Req/Sec      4986.1  370.58  5219
Bytes/Sec    1.05 MB 79.9 kB 1.11 MB
55k requests in 11s, 11.52 MB read

  50 middleware
------- koa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 7.52      1.5      48
Req/Sec      6091.46   380.68   6295
Bytes/Sec    913.04 kB 56.36 kB 950.27 kB
67k requests in 11s, 10.12 MB read

  50 middleware
------- toa -------
Hello World
Stat         Avg       Stdev    Max
Latency (ms) 10.69     4.38     44
Req/Sec      4491.7    292.49   4731
Bytes/Sec    770.05 kB 46.34 kB 819.2 kB
45k requests in 10s, 7.68 MB read

  50 middleware
------- trek -------
Hello World
Stat         Avg      Stdev    Max
Latency (ms) 6.14     1.08     31
Req/Sec      7672.19  517.73   7939
Bytes/Sec    847.5 kB 56.36 kB 884.74 kB
84k requests in 11s, 9.37 MB read
```

[wrk]: https://github.com/wg/wrk
[autocannon]: https://github.com/mcollina/autocannon
[Express]: https://github.com/expressjs/express
[Koa]: https://github.com/koajs/koa/tree/v2.x
[Toa]: https://github.com/toajs/toa
