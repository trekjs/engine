# Benchmarks

| Framework | Version |  
| --- | --- |  
| [Express][] | 4.14.1 |  
| [Koa][] | 2.0.1 |  
| [Toa][] | 2.6.1 |  
| [Restify][] | 5.0.0-beta-1 |  
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
    Latency     2.42ms  514.30us  16.98ms   95.09%
    Req/Sec     2.50k   631.05    19.66k    98.88%
  199480 requests in 10.10s, 39.95MB read
Requests/sec:  19747.95
Transfer/sec:      3.95MB

  5 middleware
------- koa -------
Hello World
Running 10s test @ http://127.0.0.1:7002?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.34ms  409.84us  14.86ms   94.22%
    Req/Sec     2.58k   200.84     3.18k    89.96%
  207253 requests in 10.10s, 29.85MB read
Requests/sec:  20511.36
Transfer/sec:      2.95MB

  5 middleware
------- toa -------
Hello World
Running 10s test @ http://127.0.0.1:7003?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.73ms    1.05ms  13.78ms   90.42%
    Req/Sec     2.25k   178.18     3.93k    92.12%
  179812 requests in 10.03s, 29.32MB read
Requests/sec:  17918.69
Transfer/sec:      2.92MB

  5 middleware
------- trek -------
Hello World
Running 10s test @ http://127.0.0.1:7004?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.08ms  367.29us  13.90ms   97.34%
    Req/Sec     2.91k   182.40     3.72k    93.38%
  231746 requests in 10.01s, 33.37MB read
Requests/sec:  23155.56
Transfer/sec:      3.33MB

  5 middleware
------- restify -------
Hello World
Running 10s test @ http://127.0.0.1:7005?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.23ms  310.03us  10.43ms   92.21%
    Req/Sec     2.71k   188.22     3.60k    93.55%
  217522 requests in 10.10s, 30.29MB read
Requests/sec:  21530.05
Transfer/sec:      3.00MB
```

**15 middleware**

```
  15 middleware
------- express -------
Hello World
Running 10s test @ http://127.0.0.1:7001?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.42ms  462.52us  16.94ms   95.94%
    Req/Sec     2.50k   401.69    10.25k    96.76%
  199932 requests in 10.10s, 40.04MB read
Requests/sec:  19792.69
Transfer/sec:      3.96MB

  15 middleware
------- koa -------
Hello World
Running 10s test @ http://127.0.0.1:7002?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.31ms  394.59us  14.63ms   96.04%
    Req/Sec     2.62k   199.83     4.33k    94.41%
  209847 requests in 10.10s, 30.22MB read
Requests/sec:  20770.36
Transfer/sec:      2.99MB

  15 middleware
------- toa -------
Hello World
Running 10s test @ http://127.0.0.1:7003?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.06ms    1.06ms  18.57ms   88.36%
    Req/Sec     1.98k   169.31     3.61k    91.75%
  157891 requests in 10.04s, 25.75MB read
Requests/sec:  15726.66
Transfer/sec:      2.56MB

  15 middleware
------- trek -------
Hello World
Running 10s test @ http://127.0.0.1:7004?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.10ms  357.51us  13.23ms   96.56%
    Req/Sec     2.88k   187.22     3.89k    95.53%
  230700 requests in 10.10s, 33.22MB read
Requests/sec:  22831.76
Transfer/sec:      3.29MB

  15 middleware
------- restify -------
Hello World
Running 10s test @ http://127.0.0.1:7005?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.80ms  363.48us  13.69ms   95.13%
    Req/Sec     2.16k   141.27     2.61k    95.12%
  171783 requests in 10.01s, 23.92MB read
Requests/sec:  17160.01
Transfer/sec:      2.39MB
```

**30 middleware**

```
  30 middleware
------- express -------
Hello World
Running 10s test @ http://127.0.0.1:7001?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.60ms  473.86us  15.84ms   95.97%
    Req/Sec     2.33k   180.69     2.49k    93.88%
  185462 requests in 10.01s, 37.14MB read
Requests/sec:  18533.23
Transfer/sec:      3.71MB

  30 middleware
------- koa -------
Hello World
Running 10s test @ http://127.0.0.1:7002?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.36ms  415.33us  15.19ms   96.55%
    Req/Sec     2.56k   238.05     5.20k    96.52%
  204993 requests in 10.10s, 29.52MB read
Requests/sec:  20289.27
Transfer/sec:      2.92MB

  30 middleware
------- toa -------
Hello World
Running 10s test @ http://127.0.0.1:7003?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.71ms    1.07ms  17.52ms   83.19%
    Req/Sec     1.63k   138.70     2.18k    90.38%
  130023 requests in 10.03s, 21.20MB read
Requests/sec:  12958.03
Transfer/sec:      2.11MB

  30 middleware
------- trek -------
Hello World
Running 10s test @ http://127.0.0.1:7004?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.14ms  379.79us  15.69ms   97.47%
    Req/Sec     2.83k   206.90     4.70k    96.52%
  226978 requests in 10.10s, 32.69MB read
Requests/sec:  22464.60
Transfer/sec:      3.24MB

  30 middleware
------- restify -------
Hello World
Running 10s test @ http://127.0.0.1:7005?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.57ms  575.01us  16.15ms   96.38%
    Req/Sec     1.69k   403.85    12.66k    98.88%
  134775 requests in 10.10s, 18.77MB read
Requests/sec:  13344.20
Transfer/sec:      1.86MB
```

**50 middleware**

```
  50 middleware
------- express -------
Hello World
Running 10s test @ http://127.0.0.1:7001?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.80ms  505.61us  21.18ms   96.30%
    Req/Sec     2.16k   500.48    15.70k    98.88%
  172472 requests in 10.10s, 34.54MB read
Requests/sec:  17075.68
Transfer/sec:      3.42MB

  50 middleware
------- koa -------
Hello World
Running 10s test @ http://127.0.0.1:7002?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.38ms  400.03us  12.85ms   96.94%
    Req/Sec     2.54k   404.75    10.87k    98.75%
  202600 requests in 10.10s, 29.18MB read
Requests/sec:  20053.24
Transfer/sec:      2.89MB

  50 middleware
------- toa -------
Hello World
Running 10s test @ http://127.0.0.1:7003?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     4.56ms    1.16ms  21.00ms   78.64%
    Req/Sec     1.33k   121.92     1.53k    87.50%
  105908 requests in 10.04s, 17.27MB read
Requests/sec:  10543.60
Transfer/sec:      1.72MB

  50 middleware
------- trek -------
Hello World
Running 10s test @ http://127.0.0.1:7004?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.20ms  378.50us  14.75ms   98.19%
    Req/Sec     2.75k   154.34     2.85k    97.77%
  221114 requests in 10.10s, 31.84MB read
Requests/sec:  21883.21
Transfer/sec:      3.15MB

  50 middleware
------- restify -------
Hello World
Running 10s test @ http://127.0.0.1:7005?foo[bar]=baz
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     5.23ms  645.13us  23.60ms   97.64%
    Req/Sec     1.15k    78.76     1.22k    97.38%
  91980 requests in 10.01s, 12.81MB read
Requests/sec:   9187.29
Transfer/sec:      1.28MB
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
Stat         Avg      Stdev     Max
Latency (ms) 2.07     0.39      18
Req/Sec      18842.91 623.23    19151
Bytes/Sec    3.95 MB  115.53 kB 4.06 MB

207k requests in 11s, 43.52 MB read

  5 middleware
------- koa -------
Hello World
Stat         Avg      Stdev    Max
Latency (ms) 2.01     0.3      18
Req/Sec      22831.28 556.08   23135
Bytes/Sec    3.45 MB  75.36 kB 3.54 MB

251k requests in 11s, 37.92 MB read

  5 middleware
------- toa -------
Hello World
Stat         Avg    Stdev     Max
Latency (ms) 2.16   1.47      16
Req/Sec      18760  683.78    19199
Bytes/Sec    3.2 MB 130.53 kB 3.41 MB

206k requests in 11s, 35.29 MB read

  5 middleware
------- trek -------
Hello World
Stat         Avg      Stdev     Max
Latency (ms) 1.11     0.39      19
Req/Sec      26698.91 620.84    26991
Bytes/Sec    4.03 MB  113.04 kB 4.19 MB

294k requests in 11s, 44.35 MB read

  5 middleware
------- restify -------
Hello World
Stat         Avg     Stdev     Max
Latency (ms) 2.01    0.27      16
Req/Sec      22629.1 660.08    22927
Bytes/Sec    3.31 MB 113.04 kB 3.41 MB

249k requests in 11s, 36.34 MB read
```

**15 middleware**

```
  15 middleware
------- express -------
Hello World
Stat         Avg      Stdev     Max
Latency (ms) 2.12     0.45      19
Req/Sec      18254.91 675.08    18559
Bytes/Sec    3.81 MB  151.66 kB 3.93 MB

201k requests in 11s, 42.17 MB read

  15 middleware
------- koa -------
Hello World
Stat         Avg      Stdev    Max
Latency (ms) 2        0.29     16
Req/Sec      22762.91 590.92   23023
Bytes/Sec    3.45 MB  75.36 kB 3.54 MB

250k requests in 11s, 37.81 MB read

  15 middleware
------- toa -------
Hello World
Stat         Avg     Stdev     Max
Latency (ms) 2.51    1.54      19
Req/Sec      16000.8 598.88    16303
Bytes/Sec    2.78 MB 117.96 kB 2.88 MB

160k requests in 10s, 27.36 MB read

  15 middleware
------- trek -------
Hello World
Stat         Avg      Stdev     Max
Latency (ms) 1.18     0.45      17
Req/Sec      25836.37 551.95    26111
Bytes/Sec    3.88 MB  103.88 kB 4.06 MB

284k requests in 11s, 42.91 MB read

  15 middleware
------- restify -------
Hello World
Stat         Avg     Stdev    Max
Latency (ms) 2.15    0.48     18
Req/Sec      17210   512.13   17439
Bytes/Sec    2.53 MB 78.64 kB 2.62 MB

172k requests in 10s, 25.13 MB read
```

**30 middleware**

```
  30 middleware
------- express -------
Hello World
Stat         Avg      Stdev     Max
Latency (ms) 2.29     0.57      19
Req/Sec      16643.28 612.51    16911
Bytes/Sec    3.52 MB  150.72 kB 3.67 MB

183k requests in 11s, 38.44 MB read

  30 middleware
------- koa -------
Hello World
Stat         Avg     Stdev    Max
Latency (ms) 2.01    0.28     16
Req/Sec      22037.1 561.76   22319
Bytes/Sec    3.32 MB 75.36 kB 3.41 MB

242k requests in 11s, 36.6 MB read

  30 middleware
------- toa -------
Hello World
Stat         Avg     Stdev    Max
Latency (ms) 3.45    1.51     19
Req/Sec      13137.6 431.65   13423
Bytes/Sec    2.26 MB 88.47 kB 2.36 MB

131k requests in 10s, 22.46 MB read

  30 middleware
------- trek -------
Hello World
Stat         Avg      Stdev     Max
Latency (ms) 1.34     0.54      15


Req/Sec      25043.64 594.07    25343
Bytes/Sec    3.82 MB  115.53 kB 3.93 MB

275k requests in 11s, 41.6 MB read

  30 middleware
------- restify -------
Hello World
Stat         Avg      Stdev    Max
Latency (ms) 3.15     0.58     23
Req/Sec      13585.82 489.39   13783
Bytes/Sec    1.98 MB  75.36 kB 2.03 MB

149k requests in 11s, 21.82 MB read
```

**50 middleware**

```
  50 middleware
------- express -------
Hello World
Stat         Avg      Stdev     Max
Latency (ms) 2.94     0.47      22
Req/Sec      15840.37 625.41    16127
Bytes/Sec    3.31 MB  113.04 kB 3.41 MB

174k requests in 11s, 36.59 MB read

  50 middleware
------- koa -------
Hello World
Stat         Avg     Stdev     Max
Latency (ms) 2.01    0.29      17
Req/Sec      21928   697.8     22351
Bytes/Sec    3.29 MB 115.53 kB 3.41 MB

241k requests in 11s, 36.42 MB read

  50 middleware
------- toa -------
Hello World
Stat         Avg     Stdev    Max
Latency (ms) 4.19    2.04     25
Req/Sec      10713.6 382.99   11071
Bytes/Sec    1.83 MB 66.83 kB 1.9 MB

107k requests in 10s, 18.32 MB read

  50 middleware
------- trek -------
Hello World
Stat         Avg      Stdev    Max
Latency (ms) 1.57     0.56     17
Req/Sec      24493.82 585      24767
Bytes/Sec    3.71 MB  75.36 kB 3.8 MB

269k requests in 11s, 40.68 MB read

  50 middleware
------- restify -------
Hello World
Stat         Avg     Stdev     Max
Latency (ms) 5.07    1.1       25
Req/Sec      9103.21 691.03    9559
Bytes/Sec    1.32 MB 109.86 kB 1.44 MB

91k requests in 10s, 13.29 MB read
```

[wrk]: https://github.com/wg/wrk
[autocannon]: https://github.com/mcollina/autocannon
[Express]: https://github.com/expressjs/express
[Koa]: https://github.com/koajs/koa/tree/v2.x
[Toa]: https://github.com/toajs/toa
