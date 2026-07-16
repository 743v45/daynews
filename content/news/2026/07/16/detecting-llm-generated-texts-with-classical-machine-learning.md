---
title: "Detecting LLM-Generated Texts with “Classical” Machine Learning"
date: 2026-07-16T16:41:00+08:00
source: "Hacker News"
sourceUrl: "https://blog.lyc8503.net/en/post/llm-classifier/"
category: "科技"
slug: "detecting-llm-generated-texts-with-classical-machine-learning"
---

作者使用经典的 scikit-learn SVM 模型结合 TF-IDF 特征训练了 7 个二分类器，通过多数投票实现 LLM 文本检测。在测试集上句子级准确率约 85%，对 AI 生成文本的检测效果显著优于简单的困惑度方法，并且在跨模型泛化上表现良好。

<!--more-->

---

[阅读原文 →](https://blog.lyc8503.net/en/post/llm-classifier/)

