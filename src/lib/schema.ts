/**
 * Per-page structured data.
 *
 * The site-wide Organization and WebSite graphs live in `layouts/main.astro`,
 * because every page carries them. Anything that describes one page only is
 * built here and passed into the layout through its `jsonLd` prop.
 */
import type { Article } from "@/lib/cms"
import { getSite } from "@/lib/site"
import { getPages, type VentureSlug } from "@/lib/pages"
import { detailPath, path, type Lang } from "@/lib/i18n"

const SITE = "https://dewataai.com"

/** Root-relative path to the absolute URL crawlers need. */
export function absolute(target: string): string {
  return new URL(target, SITE).href
}

export interface Crumb {
  name: string
  /** Root-relative, e.g. "/jurnal/". */
  path: string
}

/**
 * Breadcrumbs, which Google renders in place of the raw URL in a result. The
 * trail has to match what the page actually shows, so the last crumb is the
 * page itself.
 */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  }
}

/**
 * BlogPosting for the journal, NewsArticle for press releases. A press release
 * is a dated announcement from the organisation, which is what NewsArticle
 * describes; calling it a blog post would understate it in Google News.
 */
export function articleSchema(opts: {
  kind: "post" | "pressRelease"
  article: Article
  lang: Lang
  /** Absolute URL of the cover image, when the article has one. */
  image?: string | null
}) {
  const { kind, article, lang, image } = opts
  const site = getSite(lang)
  const routeKey = kind === "post" ? "journal" : "press"
  const url = absolute(detailPath(routeKey, lang, article.slug))

  const publisher = {
    "@type": "Organization",
    name: site.brand.name,
    url: absolute("/"),
    logo: {
      "@type": "ImageObject",
      url: absolute("/icon-512.png"),
      width: 512,
      height: 512,
    },
  }

  return {
    "@context": "https://schema.org",
    "@type": kind === "post" ? "BlogPosting" : "NewsArticle",
    // Google truncates headline past 110 characters and flags longer ones.
    headline: article.title.slice(0, 110),
    description: article.excerpt,
    inLanguage: lang,
    datePublished: article.publishedAt,
    // Sanity's edit timestamp feeds this where the caller has it; otherwise the
    // publish date is the honest answer.
    dateModified: article.publishedAt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    // A press release is issued by the company, not signed by a writer.
    author:
      kind === "post" && article.author
        ? { "@type": "Person", name: article.author }
        : {
            "@type": "Organization",
            name: site.brand.name,
            url: absolute("/"),
          },
    publisher,
    ...(image ? { image: [image] } : {}),
    ...(article.category ? { articleSection: article.category } : {}),
  }
}

/** Home > section > article, in the reader's language. */
export function articleCrumbs(opts: {
  kind: "post" | "pressRelease"
  article: Article
  lang: Lang
  /** Label for the section, e.g. "Jurnal". */
  sectionName: string
}): Crumb[] {
  const { kind, article, lang, sectionName } = opts
  const routeKey = kind === "post" ? "journal" : "press"
  return [
    { name: lang === "en" ? "Home" : "Beranda", path: path("home", lang) },
    { name: sectionName, path: path(routeKey, lang) },
    { name: article.title, path: detailPath(routeKey, lang, article.slug) },
  ]
}

/**
 * The RSS discovery link for a section, for the layout's `feed` prop.
 *
 * Lives here rather than in lib/feed.ts so a page can advertise the feed
 * without importing @astrojs/rss and the XML builder along with it.
 */
export function feedLink(kind: "post" | "pressRelease", lang: Lang) {
  const routeKey = kind === "post" ? "journal" : "press"
  return {
    href: `${path(routeKey, lang)}rss.xml`,
    title: getPages(lang)[routeKey].meta.title,
  }
}

/**
 * Everything the layout needs for one article page: canonical + hreflang paths,
 * the share card, the article timestamps and the structured data.
 *
 * All four article routes (journal and press, in both locales) call this, so
 * the head of a post is defined once rather than drifting between them.
 */
export function articlePageProps(opts: {
  kind: "post" | "pressRelease"
  lang: Lang
  article: Article
  /** Absolute URL of the cover image, when the article has one. */
  image?: string | null
  /** Section label for the breadcrumb trail, e.g. "Jurnal". */
  sectionName: string
}) {
  const { kind, lang, article, image, sectionName } = opts
  const routeKey = kind === "post" ? "journal" : "press"
  const here = detailPath(routeKey, lang, article.slug)
  const there = article.translatedSlug
    ? detailPath(routeKey, lang === "en" ? "id" : "en", article.translatedSlug)
    : null

  return {
    feed: feedLink(kind, lang),
    pathId: lang === "id" ? here : there,
    pathEn: lang === "en" ? here : there,
    ogImage: image ?? undefined,
    ogType: "article" as const,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
    jsonLd: [
      {
        ...articleSchema({ kind, article, lang, image }),
        dateModified: article.updatedAt ?? article.publishedAt,
      },
      breadcrumbSchema(articleCrumbs({ kind, article, lang, sectionName })),
    ],
  }
}

/**
 * The venture itself, as an entity an answer engine can resolve.
 *
 * Type follows what each venture actually is: Dewata Tech sells a build and a
 * booking setup, which is a Service; Dagangku AI is software someone installs
 * and uses, which is a SoftwareApplication.
 *
 * No `offers` and no `aggregateRating`. Prices live on each venture's own site,
 * not here, and there are no published reviews. Inventing either to chase a
 * rich result would be a false claim in machine-readable form, which is the
 * kind Google penalises hardest.
 */
export function ventureSchema(opts: { slug: VentureSlug; lang: Lang }) {
  const { slug, lang } = opts
  const site = getSite(lang)
  const venture = site.ventures.items.find((item) => item.slug === slug)
  const detail = getPages(lang).ventureDetail[slug]
  const url = absolute(detailPath("ventures", lang, slug))

  const common = {
    "@context": "https://schema.org",
    name: venture?.name ?? detail.eyebrow,
    description: detail.meta.description,
    url,
    inLanguage: lang,
    provider: {
      "@type": "Organization",
      name: site.brand.name,
      url: absolute("/"),
    },
    areaServed: { "@type": "Country", name: "Indonesia" },
    // The venture's own domain, which is the page a searcher should land on
    // once they know what they want.
    ...(venture?.url ? { sameAs: [venture.url] } : {}),
  }

  if (slug === "dagangku-ai") {
    return {
      ...common,
      "@type": "SoftwareApplication",
      applicationCategory: "BusinessApplication",
      // Stated because both are true and both are what people search for.
      operatingSystem: "Android, Web",
    }
  }

  return {
    ...common,
    "@type": "Service",
    ...(venture?.tag ? { serviceType: venture.tag } : {}),
  }
}
