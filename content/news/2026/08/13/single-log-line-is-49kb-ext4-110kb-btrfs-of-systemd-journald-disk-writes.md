---
title: "Single log line is 49KB+ (ext4) / 110KB+ (btrfs) of systemd-journald disk writes"
date: 2026-08-13T18:41:00+08:00
source: "Hacker News"
sourceUrl: "https://github.com/systemd/systemd/issues/40262"
category: "科技"
slug: "single-log-line-is-49kb-ext4-110kb-btrfs-of-systemd-journald-disk-writes"
---

systemd 官方 GitHub issue 报告了一个磁盘写入问题：单条日志记录在 ext4 文件系统上会触发约 49KB 以上的磁盘写入，在 btrfs 上更是超过 110KB。这一显著的开销引发开发者对 systemd-journald 写入效率的讨论，可能影响高日志量系统的性能。

<!--more-->

---

[阅读原文 →](https://github.com/systemd/systemd/issues/40262)

