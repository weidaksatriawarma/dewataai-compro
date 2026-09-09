/**
 * RSS for the journal and press pages.
 *
 * One builder for all four feeds (two sections, two locales). Feeds are how
 * aggregators, newsreaders and several answer-engine crawlers pick up new
 * writing without re-crawling the index page, so a post is discoverable the
 * moment it is published rather than at the next crawl.
 */
import rss from "@astrojs/rss"
import { listArticles } from "@/lib/cms"
import { getPages } from "@/lib/pages"
import { detailPath, type Lang } from "@/lib/i18n"

/** Full locale codes, matching the sitemap and the hreflang tags. */
const RSS_LANG: Record<Lang, string> = { id: "id-ID", en: "en-US" }

export async function buildFeed(opts: {
  kind: "post" | "pressRelease"
  lang: Lang
  site: URL | undefined
}) {
  const { kind, lang, site } = opts
  const routeKey = kind === "post" ? "journal" : "press"
  const page = getPages(lang)[routeKey]
  const articles = await listArticles(kind, lang)

  return rss({
    title: page.meta.title,
    description: page.meta.description,
    site: site ?? "https://dewataai.com",
    // A summary feed: title, excerpt and link. The body stays on the site, so
    // one query serves the feed and readers land on the page that carries the
    // structured data and the call to action.
    items: articles.map((article) => ({
      title: article.title,
      description: article.excerpt,
      pubDate: new Date(article.publishedAt),
      link: detailPath(routeKey, lang, article.slug),
      ...(article.author ? { author: article.author } : {}),
      ...(article.category ? { categories: [article.category] } : {}),
    })),
    customData: `<language>${RSS_LANG[lang]}</language>`,
  })
}
