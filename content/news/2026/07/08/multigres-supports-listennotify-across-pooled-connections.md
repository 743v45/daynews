---
title: "Multigres Supports Listen/Notify Across Pooled Connections"
date: 2026-07-08T20:11:00+08:00
source: "Hacker News"
sourceUrl: "https://multigres.com/blog/listen-notify"
category: "科技"
slug: "multigres-supports-listennotify-across-pooled-connections"
---

Multigres 通过共享监听连接实现 PostgreSQL LISTEN/NOTIFY 在连接池中的支持。池化器维护一条专用长连接代表所有客户端监听频道，使用引用计数管理订阅，并通过两阶段扇出路径将通知从 Postgres 传递回客户端，同时正确处理事务边界和重连等边缘情况。

<!--more-->

---

[阅读原文 →](https://multigres.com/blog/listen-notify)

