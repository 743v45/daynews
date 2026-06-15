---
title: "A backdoor in a LinkedIn job offer"
date: 2026-06-15T20:00:00+08:00
source: "Hacker News"
sourceUrl: "https://roman.pt/posts/linkedin-backdoor/"
category: "科技"
slug: "a-backdoor-in-a-linkedin-job-offer"
---

Roman Imankulov 收到 LinkedIn 上冒充招聘人员的消息，对方要求审查一个 GitHub 仓库。他警觉地在隔离环境中用只读 AI 代理审查代码，发现 app/test/index.js 中藏有后门——该文件在 npm install 时自动执行，从远程服务器下载并执行任意命令。攻击者还盗用了真实开发者的 GitHub 身份和记者的 LinkedIn 资料。

<!--more-->

---

[阅读原文 →](https://roman.pt/posts/linkedin-backdoor/)

