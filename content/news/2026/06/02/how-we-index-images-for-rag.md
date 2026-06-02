---
title: "How we index images for RAG"
date: 2026-06-02T16:13:00+08:00
source: "Hacker News"
sourceUrl: "https://www.kapa.ai/blog/how-we-index-images-for-rag"
category: "科技"
slug: "how-we-index-images-for-rag"
---

Kapa.ai介绍了其为RAG系统索引图片的方法：不在查询时使用多模态模型，而是在索引阶段用廉价视觉模型对每张图片生成文字描述并存储为文本块。检索时与普通文本块一起召回，仅增加1-6%的查询成本，但显著提升答案质量。

<!--more-->

---

[阅读原文 →](https://www.kapa.ai/blog/how-we-index-images-for-rag)

