import { parse } from "@std/yaml";
import { XMLParser } from "fast-xml-parser";

interface Source {
  name: string;
  url: string;
  category: string;
  enabled: boolean;
}

interface Config {
  sources: Source[];
  summary: {
    model: string;
    language: string;
    max_summary_length: number;
    batch_size: number;
  };
}

interface Article {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  category: string;
}

interface RssItem {
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
  "dc:creator"?: string;
  "content:encoded"?: string;
  summary?: string;
}

interface RssChannel {
  title?: string;
  link?: string;
  description?: string;
  item?: RssItem | RssItem[];
}

interface RssFeed {
  rss?: {
    channel?: RssChannel;
  };
  feed?: {
    title?: string;
    link?: string;
    entry?: Array<{
      title?: { _?: string };
      link?: { _href?: string } | { _href?: string }[] | string;
      summary?: { _?: string };
      published?: string;
      updated?: string;
    }>;
  };
}

async function fetchFeed(source: Source): Promise<Article[]> {
  const articles: Article[] = [];

  try {
    const resp = await fetch(source.url, {
      headers: { "User-Agent": "Daily-News-Bot/1.0" },
      signal: AbortSignal.timeout(30000),
    });

    if (!resp.ok) {
      console.error(`  [ERROR] ${source.name}: HTTP ${resp.status}`);
      return [];
    }

    const xml = await resp.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      isArray: (name) => ["item", "entry"].includes(name),
    });

    const feed = parser.parse(xml) as RssFeed;

    let items: RssItem[] = [];

    if (feed.rss?.channel?.item) {
      items = Array.isArray(feed.rss.channel.item)
        ? feed.rss.channel.item
        : [feed.rss.channel.item];
    } else if (feed.feed?.entry) {
      // Atom feed
      for (const entry of feed.feed.entry) {
        const item: RssItem = {};
        item.title = entry.title?.__;
        const links = entry.link;
        if (Array.isArray(links)) {
          item.link = links.find((l) => l?.["@_href"])?.["@_href"];
        } else if (links && typeof links === "object") {
          item.link = links["@_href"] || links.toString();
        }
        item.description = entry.summary?.__;
        item.pubDate = entry.published || entry.updated;
        items.push(item);
      }
    }

    for (const item of items) {
      if (!item.title) continue;

      const title = typeof item.title === "string" ? item.title.trim() : "";

      const link = typeof item.link === "string" ? item.link.trim() : "";

      const description = item.description || item.summary || "";
      const descText = typeof description === "string"
        ? description.replace(/<[^>]*>/g, "").trim().slice(0, 500)
        : "";

      const pubDate = item.pubDate || new Date().toISOString();
      const pubDateStr = typeof pubDate === "string" ? pubDate : new Date(pubDate).toISOString();

      if (title && link) {
        articles.push({
          title,
          link,
          description: descText,
          pubDate: pubDateStr,
          source: source.name,
          category: source.category,
        });
      }
    }

    console.error(`  [OK] ${source.name}: ${articles.length} articles`);
  } catch (err) {
    console.error(`  [ERROR] ${source.name}: ${err instanceof Error ? err.message : String(err)}`);
  }

  return articles;
}

async function main() {
  const configText = await Deno.readTextFile("news-sources.yml");
  const config = parse(configText) as Config;

  const enabledSources = config.sources.filter((s) => s.enabled !== false);
  console.error(`Fetching ${enabledSources.length} RSS feeds...`);

  const allArticles: Article[] = [];
  const seen = new Set<string>();

  for (const source of enabledSources) {
    const articles = await fetchFeed(source);

    for (const article of articles) {
      const key = article.link;
      if (!seen.has(key)) {
        seen.add(key);
        allArticles.push(article);
      }
    }
  }

  console.error(`\nTotal unique articles: ${allArticles.length}`);

  const today = new Date().toISOString().split("T")[0];
  const outDir = "articles";
  await Deno.mkdir(outDir, { recursive: true });

  const outPath = `${outDir}/raw-${today}.json`;

  // Merge with existing data to preserve articles from previous runs today
  let mergedArticles = allArticles;
  try {
    const existingText = await Deno.readTextFile(outPath);
    const existingArticles: Article[] = JSON.parse(existingText);
    const existingUrls = new Set(existingArticles.map((a) => a.link));
    const newOnes = allArticles.filter((a) => !existingUrls.has(a.link));
    if (newOnes.length > 0) {
      mergedArticles = [...existingArticles, ...newOnes];
      console.error(`Merged ${newOnes.length} new articles with ${existingArticles.length} existing`);
    } else {
      mergedArticles = existingArticles;
      console.error(`No new articles — kept ${existingArticles.length} existing`);
    }
  } catch {
    // File doesn't exist yet, use fresh results
  }

  await Deno.writeTextFile(outPath, JSON.stringify(mergedArticles, null, 2));
  console.error(`Saved to ${outPath}`);

  // Also save config for other scripts
  const { summary } = config;
  await Deno.writeTextFile(
    `${outDir}/config-${today}.json`,
    JSON.stringify(summary, null, 2),
  );
}

main().catch((err) => {
  console.error("Fatal:", err);
  Deno.exit(1);
});
