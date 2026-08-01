---
title: "Scanning 7.6 Petabytes of HuggingFace Training Data for Secrets"
date: 2026-08-01T18:21:00+08:00
source: "Hacker News"
sourceUrl: "https://trufflesecurity.com/blog/scanning-7-6-petabytes-of-ai-training-data-for-secrets"
category: "科技"
slug: "scanning-76-petabytes-of-huggingface-training-data-for-secrets"
---

Truffle Security对Hugging Face所有公开数据集进行了史上最大规模的密钥扫描，覆盖7.6PB、1.869亿个文件，发现6003个数据集中的221303个有效凭据。其中含349个可写入GitHub令牌、318个Docker Hub推送令牌、8557个GCP服务账号密钥等。742个OpenAI密钥加上26个Anthropic密钥，按默认消费上限估算每年至少可被盗刷约92万美元AI推理费用。建议数据集发布前扫描、密钥及时轮换。

<!--more-->

---

[阅读原文 →](https://trufflesecurity.com/blog/scanning-7-6-petabytes-of-ai-training-data-for-secrets)

