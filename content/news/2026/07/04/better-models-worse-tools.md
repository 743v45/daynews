---
title: "Better Models: Worse Tools"
date: 2026-07-04T20:16:00+08:00
source: "Hacker News"
sourceUrl: "https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/"
category: "科技"
slug: "better-models-worse-tools"
---

Armin Ronacher 发文指出，Anthropic 新一代模型（Opus 4.8、Sonnet 5）在 Pi 编辑工具调用中，会在 edits 数组内凭空生成 requireUnique、oldText2 等未定义字段，导致工具调用被拒。较老的模型反而没有此问题。作者认为这是后训练阶段过度适配 Claude Code 闭源工具生态的结果。

<!--more-->

---

[阅读原文 →](https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/)

