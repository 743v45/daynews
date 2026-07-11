---
title: "We scaled PgBouncer to 4x throughput"
date: 2026-07-11T15:28:00+08:00
source: "Hacker News"
sourceUrl: "https://clickhouse.com/blog/pgbouncer-clickhouse-managed-postgres"
category: "科技"
slug: "we-scaled-pgbouncer-to-4x-throughput"
---

PgBouncer是单线程的，单进程最多只能用一个CPU核。ClickHouse Managed Postgres通过so_reuseport部署多进程集群，配合进程间对等通信解决取消查询的转发问题，在16核机器上将吞吐量从单进程的~87k tps提升至~336k tps，提升约4倍。

<!--more-->

---

[阅读原文 →](https://clickhouse.com/blog/pgbouncer-clickhouse-managed-postgres)

