---
title: "What happens when you run a CUDA kernel?"
date: 2026-06-29T13:11:00+08:00
source: "Hacker News"
sourceUrl: "https://fergusfinn.com/blog/what-happens-when-you-run-a-gpu-kernel/"
category: "科技"
slug: "what-happens-when-you-run-a-cuda-kernel"
---

深度技术文章详细追踪 CUDA 内核从编译（nvcc → PTX → SASS）、主机端启动（pushbuffer、GPFIFO、doorbell）到 GPU 上指令调度（warp 调度、scoreboard、memory coalescing）再到结果返回 CPU 的完整执行路径。

<!--more-->

---

[阅读原文 →](https://fergusfinn.com/blog/what-happens-when-you-run-a-gpu-kernel/)

