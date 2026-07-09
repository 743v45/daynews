---
title: "TLS certificates for internal services done right"
date: 2026-07-09T14:57:00+08:00
source: "Hacker News"
sourceUrl: "https://tuxnet.dev/posts/tls-for-internal-services/"
category: "科技"
slug: "tls-certificates-for-internal-services-done-right"
---

本文介绍了为内部服务正确配置 TLS 证书的方案：通过 split-horizon DNS 将内部域名（如 grafana.tuxnet.dev）在 VPN 内解析为内网 IP，同时使用 Let's Encrypt 签发合法证书，配合 Nginx 绑定 VPN 接口实现 WAF 层防护，替代自签名证书方案。

<!--more-->

---

[阅读原文 →](https://tuxnet.dev/posts/tls-for-internal-services/)

