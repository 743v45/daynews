---
title: "Linux on the Atari Jaguar"
date: 2026-07-06T18:35:00+08:00
source: "Hacker News"
sourceUrl: "https://cakehonolulu.github.io/linux-for-jaguar/"
category: "科技"
slug: "linux-on-the-atari-jaguar"
---

开发者成功将 Linux 移植到 1993 年发布的 Atari Jaguar 游戏机上。该主机仅有 2MB RAM 和 6MB ROM，运行 Linux 面临内存极度受限、缺乏 MMU、工具链对齐等问题。通过使用 uClinux（nommu）、XIP 技术将内核只读段存储在卡带 ROM 中、重写 UART 控制台驱动和定时器驱动，最终成功启动 Linux，并运行了 BusyBox shell。

<!--more-->

---

[阅读原文 →](https://cakehonolulu.github.io/linux-for-jaguar/)

