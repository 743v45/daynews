interface SummaryConfig {
  model: string;
  language: string;
  max_summary_length: number;
  batch_size: number;
}

interface Article {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  category: string;
  summary?: string;
}

async function callOpencode(
  prompt: string,
  model: string,
): Promise<string> {
  const cmd = new Deno.Command("opencode", {
    args: [
      "run",
      "-m", model,
      "--",
      prompt,
    ],
    stdin: "null",
    stdout: "piped",
    stderr: "piped",
    env: {
      "OPEncode_PURE": "1",
      "OPENCODE_NO_AUTO_EXECUTE": "1",
    },
  });

  const child = cmd.spawn();
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("opencode timeout")), 120000)
  );

  const result = await Promise.race([child.output(), timeout]) as Awaited<ReturnType<typeof child.output>>;

  const stdout = new TextDecoder().decode(result.stdout).trim();
  const stderr = new TextDecoder().decode(result.stderr).trim();

  if (stderr) {
    console.error(`  [opencode stderr]: ${stderr.slice(0, 200)}`);
  }

  return stdout;
}

function buildBatchPrompt(articles: Article[], config: SummaryConfig): string {
  const items = articles.map((a, i) =>
    `[${i + 1}]\n标题: ${a.title}\n来源: ${a.source}\n内容片段: ${a.description.slice(0, 300)}`
  ).join("\n\n");

  return `你是一个新闻摘要助手。请用${config.language === "zh-cn" ? "简体中文" : "英文"}为以下每篇新闻生成摘要。
要求：
- 每篇摘要不超过 ${config.max_summary_length} 字
- 保持客观，提炼核心信息
- 输出格式为 JSON 数组：[{"index": 1, "summary": "摘要内容"}, ...]

新闻列表：
${items}`;
}

async function main() {
  const today = new Date().toISOString().split("T")[0];

  // Load config
  let config: SummaryConfig;
  try {
    const configText = await Deno.readTextFile(`articles/config-${today}.json`);
    config = JSON.parse(configText);
  } catch {
    config = {
      model: "opencode/qwen3.6-plus-free",
      language: "zh-cn",
      max_summary_length: 150,
      batch_size: 5,
    };
  }

  // Load raw articles
  const rawPath = `articles/raw-${today}.json`;
  const rawText = await Deno.readTextFile(rawPath);
  const allArticles: Article[] = JSON.parse(rawText);

  console.error(`Summarizing ${allArticles.length} articles...`);

  const batchSize = config.batch_size;
  const batches: Article[][] = [];

  for (let i = 0; i < allArticles.length; i += batchSize) {
    batches.push(allArticles.slice(i, i + batchSize));
  }

  console.error(`Split into ${batches.length} batches of ${batchSize}`);

  const results: Article[] = [];

  for (let b = 0; b < batches.length; b++) {
    const batch = batches[b];
    console.error(`\nBatch ${b + 1}/${batches.length} (${batch.length} articles)...`);

    const prompt = buildBatchPrompt(batch, config);
    const summaryModel = config.model || "opencode/qwen3.6-plus-free";

    try {
      const output = await callOpencode(prompt, summaryModel);

      // Try to parse JSON from response
      const jsonMatch = output.match(/\[[\s\S]*\]/);
      let summaries: Array<{ index: number; summary: string }> = [];

      if (jsonMatch) {
        try {
          summaries = JSON.parse(jsonMatch[0]);
        } catch {
          console.error(`  [WARN] Failed to parse JSON from batch ${b + 1}, using raw output`);
        }
      }

      if (summaries.length > 0) {
        for (const s of summaries) {
          const idx = s.index - 1;
          if (idx >= 0 && idx < batch.length) {
            batch[idx].summary = s.summary;
          }
        }
      } else {
        // Fallback: use a generic summary
        for (const article of batch) {
          article.summary = article.description.slice(0, config.max_summary_length);
        }
      }

      results.push(...batch);
    } catch (err) {
      console.error(`  [ERROR] Batch ${b + 1} failed: ${err}`);
      for (const article of batch) {
        article.summary = article.description.slice(0, config.max_summary_length);
        results.push(article);
      }
    }

    // Small delay between batches
    if (b < batches.length - 1) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  console.error(`\nDone. ${results.length} articles summarized.`);

  const outPath = `articles/summarized-${today}.json`;
  await Deno.writeTextFile(outPath, JSON.stringify(results, null, 2));
  console.error(`Saved to ${outPath}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  Deno.exit(1);
});
