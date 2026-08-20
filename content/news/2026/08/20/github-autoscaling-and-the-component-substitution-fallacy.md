---
title: "GitHub, autoscaling, and the component substitution fallacy"
date: 2026-08-20T19:28:00+08:00
source: "Hacker News"
sourceUrl: "https://surfingcomplexity.blog/2026/08/19/github-autoscaling-and-the-component-substitution-fallacy/"
category: "科技"
slug: "github-autoscaling-and-the-component-substitution-fallacy"
---

文章分析GitHub近期故障：Istio sidecar达到并发上限，但自动扩缩策略仅监控主服务而忽略sidecar指标，导致扩容失败。作者指出自动扩缩策略针对每个服务都是定制的，服务团队未必是扩缩专家。同时提醒不应陷入「组件替换谬误」，系统可靠性还取决于组件交互，需关注流量变化、重试逻辑等多因素协同。

<!--more-->

---

[阅读原文 →](https://surfingcomplexity.blog/2026/08/19/github-autoscaling-and-the-component-substitution-fallacy/)

