---
title: "Bringing Up DeepSeek-V4-Flash on AMD MI300X"
date: 2026-06-02T17:52:00+08:00
source: "Hacker News"
sourceUrl: "https://fergusfinn.com/blog/deepseek-v4-flash-mi300x/"
category: "科技"
slug: "bringing-up-deepseek-v4-flash-on-amd-mi300x"
---

Doubleword 团队记录了在 AMD MI300X 上运行 DeepSeek-V4-Flash 的过程。主要挑战包括 MI300X 特有的 fnuz FP8 格式兼容问题、AITER 注意力内核路径缺失以及 HIP Graph 适配。经优化后达到每 GPU 约 2699 tok/s，MI300X 租金约为等效 NVIDIA 硬件的一半。

<!--more-->

---

[阅读原文 →](https://fergusfinn.com/blog/deepseek-v4-flash-mi300x/)

