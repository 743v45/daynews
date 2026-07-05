---
title: "Why DMARC's new \"NP\" tag can fail with DNSSEC"
date: 2026-07-05T15:00:00+08:00
source: "Hacker News"
sourceUrl: "https://dmarcwise.io/blog/dmarc-np-incompatibility-with-dnssec"
category: "科技"
slug: "why-dmarcs-new-np-tag-can-fail-with-dnssec"
---

DMARC 新规 RFC 9989 引入的 np 标签用于对不存在的子域设置策略，但其依赖 NXDOMAIN 判断方式与 DNSSEC 的紧凑否认存在机制（RFC 9824）冲突，Cloudflare、AWS 等主流 DNS 提供商均受影响，实际中 np 标签可能无法生效。

<!--more-->

---

[阅读原文 →](https://dmarcwise.io/blog/dmarc-np-incompatibility-with-dnssec)

