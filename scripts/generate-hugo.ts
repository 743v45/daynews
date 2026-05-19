interface Article {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  category: string;
  summary?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 80);
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:00+08:00`;
  } catch {
    return dateStr;
  }
}

function formatDisplayDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  } catch {
    return dateStr;
  }
}

function generateMarkdown(article: Article): string {
  const slug = slugify(article.title);
  const date = formatDate(article.pubDate);
  const displayDate = formatDisplayDate(article.pubDate);
  const summary = article.summary || article.description.slice(0, 150);

  const content = `**来源**: [${article.source}](${article.link})  
**日期**: ${displayDate}  
**分类**: ${article.category}

${summary}

---

[阅读原文 →](${article.link})
`;

  return `---
title: "${article.title.replace(/"/g, '\\"')}"
date: ${date}
source: "${article.source}"
sourceUrl: "${article.link}"
category: "${article.category}"
slug: "${slug}"
---

${content}
`;
}

async function main() {
  const today = new Date().toISOString().split("T")[0];

  // Try to load summarized articles, fall back to raw
  let articles: Article[];
  try {
    const summarizedText = await Deno.readTextFile(
      `articles/summarized-${today}.json`,
    );
    articles = JSON.parse(summarizedText);
    console.error(`Loading summarized articles (${articles.length})`);
  } catch {
    const rawText = await Deno.readTextFile(`articles/raw-${today}.json`);
    articles = JSON.parse(rawText);
    console.error(`Loading raw articles (${articles.length})`);
  }

  const dateStr = today;
  const [year, month, day] = dateStr.split("-");
  const contentDir = `content/news/${year}/${month}/${day}`;
  await Deno.mkdir(contentDir, { recursive: true });

  let count = 0;
  for (const article of articles) {
    if (!article.title || !article.link) continue;

    const slug = slugify(article.title);
    const fileName = `${slug}.md`;
    const filePath = `${contentDir}/${fileName}`;

    try {
      // Skip if already exists (dedup)
      await Deno.stat(filePath);
      continue;
    } catch {
      // File doesn't exist, create it
    }

    const markdown = generateMarkdown(article);
    await Deno.writeTextFile(filePath, markdown);
    count++;
  }

  console.error(`Generated ${count} markdown files in ${contentDir}`);

  // Generate _index.md for the day
  const indexContent = `---
title: "${year}年${month}月${day}日"
date: ${today}T${new Date().toISOString().split("T")[1].split(".")[0]}+08:00
summary: "${articles.length} 条新闻"
---

当日共收录 **${articles.length}** 条新闻。
`;

  await Deno.writeTextFile(`${contentDir}/_index.md`, indexContent);
  console.error(`Generated index for ${contentDir}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  Deno.exit(1);
});
