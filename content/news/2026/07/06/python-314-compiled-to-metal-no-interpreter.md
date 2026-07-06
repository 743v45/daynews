---
title: "Python 3.14 compiled to metal – no interpreter"
date: 2026-07-06T19:40:00+08:00
source: "Hacker News"
sourceUrl: "https://github.com/can1357/pon"
category: "科技"
slug: "python-314-compiled-to-metal-no-interpreter"
---

Pon 是一个用 Rust 编写的 Python 3.14 原生编译器与运行时，采用 Cranelift 后端、ruff 解析器和 Green Tea 垃圾回收器，无解释器也无字节码。它支持 JIT 即时编译和 AoT 提前编译为独立可执行文件，并通过字节级差分测试确保与 CPython 3.14 输出完全一致，目前已有 244 个模块通过一致性测试。

<!--more-->

---

[阅读原文 →](https://github.com/can1357/pon)

