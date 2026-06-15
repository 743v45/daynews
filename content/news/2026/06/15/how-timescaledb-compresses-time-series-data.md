---
title: "How TimescaleDB compresses time-series data"
date: 2026-06-15T17:29:00+08:00
source: "Hacker News"
sourceUrl: "https://roszigit.com/en/blog/timescaledb-compression-hypercore"
category: "科技"
slug: "how-timescaledb-compresses-time-series-data"
---

TimescaleDB 的 hypercore 引擎通过混合行列存储实现最高 98% 的时间序列数据压缩率。核心技术包括增量编码、delta-of-delta、Gorilla XOR 和游程编码，按列类型自动选择最优算法。文章详细讲解了 segmentby 和 orderby 参数对压缩效果和查询性能的关键影响，实测压缩比达 42 倍，查询速度提升 28 倍。

<!--more-->

---

[阅读原文 →](https://roszigit.com/en/blog/timescaledb-compression-hypercore)

