---
title: "Since Chronium 148, Math.tanh is now fingerprintable to link underlying OS"
date: 2026-07-12T21:12:00+08:00
source: "Hacker News"
sourceUrl: "https://scrapfly.dev/posts/browser-math-os-fingerprint/"
category: "科技"
slug: "since-chronium-148-mathtanh-is-now-fingerprintable-to-link-underlying-os"
---

Chrome 148 起 V8 改用系统 libm 计算 Math.tanh，由于不同操作系统（Linux/macOS/Windows）的数学库实现差异，导致同一输入返回不同的浮点结果，使得浏览器可通过数学函数指纹识别底层 OS。

<!--more-->

---

[阅读原文 →](https://scrapfly.dev/posts/browser-math-os-fingerprint/)

