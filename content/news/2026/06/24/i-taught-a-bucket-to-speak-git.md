---
title: "I taught a bucket to speak Git"
date: 2026-06-24T16:04:00+08:00
source: "Hacker News"
sourceUrl: "https://www.tigrisdata.com/blog/objgit/"
category: "科技"
slug: "i-taught-a-bucket-to-speak-git"
---

Xe Iaso 基于 go-git 和 billy 实现了 objgit——一个完全运行在对象存储上的 Git 服务器，无需本地磁盘或 git 二进制文件。他将 Tigris 对象存储伪装为文件系统，支持 HTTP/SSH/git 协议推送和克隆，并内置沙箱化的 post-receive 钩子机制。

<!--more-->

---

[阅读原文 →](https://www.tigrisdata.com/blog/objgit/)

