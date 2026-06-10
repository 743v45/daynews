---
title: "Claude Desktop spawns 1.8 GB Hyper-V VM on every launch, even for chat-only use"
date: 2026-06-10T17:11:00+08:00
source: "Hacker News"
sourceUrl: "https://github.com/anthropics/claude-code/issues/29045"
category: "科技"
slug: "claude-desktop-spawns-18-gb-hyper-v-vm-on-every-launch-even-for-chat-only-use"
---

Windows 版 Claude Desktop 每次启动都会自动生成约 1.8 GB 的 Hyper-V 虚拟机，即使仅使用聊天功能也会消耗大量内存。用户报告称，该问题源于应用无条件初始化 Cowork 模式所需的容器基础设施，且旧会话文件未自动清理，建议按需启动 VM 基础设施。

<!--more-->

---

[阅读原文 →](https://github.com/anthropics/claude-code/issues/29045)

