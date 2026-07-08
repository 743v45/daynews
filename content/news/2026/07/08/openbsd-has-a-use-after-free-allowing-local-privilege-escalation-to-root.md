---
title: "OpenBSD has a use-after-free allowing local privilege escalation to root"
date: 2026-07-08T13:24:00+08:00
source: "Hacker News"
sourceUrl: "https://nvd.nist.gov/vuln/detail/cve-2026-57589"
category: "科技"
slug: "openbsd-has-a-use-after-free-allowing-local-privilege-escalation-to-root"
---

OpenBSD（至 7.9 版）被曝存在 use-after-free 漏洞（CVE-2026-57589），位于 sys/kern/sysv_sem.c 的 sys_semget() 函数中，攻击者可利用上下文切换漏洞实现本地权限提升至 root。CVSS 3.1 评分 7.4（高危）。

<!--more-->

---

[阅读原文 →](https://nvd.nist.gov/vuln/detail/cve-2026-57589)

