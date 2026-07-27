---
title: "Tokio Gives Progress, Not Ordering: Scheduling 1M Tasks"
date: 2026-07-27T15:10:00+08:00
source: "Hacker News"
sourceUrl: "https://pranitha.dev/posts/tokio-gives-progress-not-ordering/"
category: "科技"
slug: "tokio-gives-progress-not-ordering-scheduling-1m-tasks"
---

文章探讨 Tokio 调度器设计哲学：优先保证所有任务都能取得进展（progress），而非严格遵循任务提交顺序（ordering）。在调度 100 万个任务时，Tokio 通过权衡公平性与吞吐量，选择不保证执行顺序以提升整体性能。

<!--more-->

---

[阅读原文 →](https://pranitha.dev/posts/tokio-gives-progress-not-ordering/)

