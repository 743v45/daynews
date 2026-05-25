# Daily News / 每日新闻

Automated daily news aggregator that fetches RSS feeds, generates AI-powered summaries, and publishes a static site via GitHub Pages.

## How it works

1. **Fetch** — RSS feeds from 7 sources (Hacker News, TechCrunch, 36Kr, Reuters, Ars Technica, BBC, The Guardian) are parsed into structured JSON
2. **Summarize** — Each article is summarized in Chinese using the opencode AI CLI
3. **Generate** — Hugo markdown pages are created with summaries and links to originals
4. **Deploy** — The Hugo site is built and deployed to GitHub Pages daily at 05:00 Beijing time

## Stack

- **Runtimes**: Deno (scripts), Node.js (opencode CLI), Hugo (site)
- **Theme**: PaperMod
- **AI**: opencode (`opencode/deepseek-v4-flash-free`)
- **CI/CD**: GitHub Actions → GitHub Pages

## Usage

```bash
# Install dependencies
deno cache scripts/fetch-rss.ts
npm install -g opencode-ai

# Full pipeline
deno task pipeline

# Step by step
deno task fetch
deno task summarize
deno task generate

# Preview site
hugo server
```

## Configuration

- `news-sources.yml` — RSS sources, AI model, summary language and length
- `hugo.yaml` — Hugo site settings
- `.github/workflows/daily-news.yml` — CI/CD pipeline
