/**
 * Sanity access for the journal + press pages.
 *
 * Every read goes through `query()`, which returns the supplied fallback when
 * the CMS is unconfigured or unreachable. That keeps `astro build` green before
 * the Sanity project exists, and keeps a CMS outage from taking the site down.
 */
import { sanityClient } from "sanity:client"
import { createImageUrlBuilder } from "@sanity/image-url"
import { toHTML } from "@portabletext/to-html"
import type { Lang } from "@/lib/i18n"

// Read the id the client was actually built with rather than the env var.
// The env var is absent on any host that builds from git without it set, which
// would switch every query to its empty fallback even though the client is
// perfectly well configured from the committed default.
const configuredProjectId = sanityClient.config().projectId

export const cmsConfigured =
  Boolean(configuredProjectId) && configuredProjectId !== "placeholder"

export interface Article {
  _id: string
  title: string
  slug: string
  lang: Lang
  translationKey?: string
  excerpt: string
  publishedAt: string
  author?: string
  category?: string
  coverImage?: { asset?: { _ref: string }; alt?: string }
  body?: unknown[]
  /** Last edit in Sanity, for `dateModified` and the sitemap. */
  updatedAt?: string
  /** Slug of the same article in the other locale, null when untranslated. */
  translatedSlug?: string | null
  /* press release only */
  dateline?: string
  boilerplate?: string
  contactName?: string
  contactEmail?: string
}

/** Toolbar state, parsed from the query string. */
export interface ArticleQuery {
  q: string
  category: string
  year: string
  sort: "baru" | "lama"
}

export interface ArticleFacets {
  categories: string[]
  years: string[]
  total: number
}

/**
 * CMS reads deliberately bypass apicdn.sanity.io. The journal and press routes
 * render per request, so the only thing standing between "Publish" in the
 * Studio and the live page is this client. The CDN purges on publish, but the
 * invalidation is queued, so a fresh read is the only way to guarantee a new
 * post is on the site immediately rather than a few moments later.
 */
const freshClient = sanityClient.withConfig({ useCdn: false })

async function query<T>(
  groq: string,
  params: Record<string, unknown>,
  fallback: T
): Promise<T> {
  if (!cmsConfigured) return fallback
  try {
    return await freshClient.fetch<T>(groq, params)
  } catch (error) {
    console.warn(
      `[cms] query failed, falling back to empty: ${(error as Error).message}`
    )
    return fallback
  }
}

const CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  lang,
  translationKey,
  excerpt,
  publishedAt,
  author,
  category,
  coverImage,
  dateline
`

/**
 * Detail-page fields. `translatedSlug` resolves the counterpart in the other
 * locale in the same round trip, so the page can emit hreflang that points at a
 * URL which exists. `defined(^.translationKey)` is the guard that matters: two
 * documents that both leave the key empty would otherwise compare equal and
 * pair themselves as translations of each other.
 */
const FULL_FIELDS = `${CARD_FIELDS},
  body,
  boilerplate,
  contactName,
  contactEmail,
  "updatedAt": _updatedAt,
  "translatedSlug": *[
    _type == ^._type &&
    lang != ^.lang &&
    defined(^.translationKey) &&
    translationKey == ^.translationKey &&
    defined(slug.current)
  ][0].slug.current`

/** Newest first, filtered to one locale. */
export function listArticles(type: "post" | "pressRelease", lang: Lang) {
  return query<Article[]>(
    `*[_type == $type && lang == $lang && defined(slug.current)]
      | order(publishedAt desc) { ${CARD_FIELDS} }`,
    { type, lang },
    []
  )
}

/** Read and sanitise the toolbar state from a URL. */
export function parseArticleQuery(url: URL): ArticleQuery {
  const get = (key: string) =>
    (url.searchParams.get(key) ?? "").trim().slice(0, 80)
  return {
    q: get("q"),
    category: get("kategori").toLowerCase(),
    year: /^\d{4}$/.test(get("tahun")) ? get("tahun") : "",
    sort: get("urut") === "lama" ? "lama" : "baru",
  }
}

/**
 * One round trip: the filtered, sorted list plus the facet values needed to
 * build the toolbar. Search covers the title, the excerpt, and the body text,
 * which stays on the server rather than shipping the body to the browser.
 */
export async function searchArticles(
  type: "post" | "pressRelease",
  lang: Lang,
  params: ArticleQuery
): Promise<{ items: Article[]; facets: ArticleFacets }> {
  // Direction is whitelisted above, never interpolated from raw input.
  const direction = params.sort === "lama" ? "asc" : "desc"
  const term = params.q ? `${params.q.replace(/[*"]/g, "")}*` : ""

  const filters = [
    `_type == $type`,
    `lang == $lang`,
    `defined(slug.current)`,
    `($category == "" || category == $category)`,
    `($year == "" || string::startsWith(publishedAt, $year))`,
    `($term == "" || title match $term || excerpt match $term || pt::text(body) match $term)`,
  ].join(" && ")

  const groq = `{
    "items": *[${filters}] | order(publishedAt ${direction}) { ${CARD_FIELDS} },
    "facets": *[_type == $type && lang == $lang && defined(slug.current)] {
      category,
      "year": string::split(publishedAt, "-")[0]
    }
  }`

  const empty = {
    items: [] as Article[],
    facets: { categories: [], years: [], total: 0 },
  }

  const result = await query<{
    items: Article[]
    facets: { category?: string; year?: string }[]
  } | null>(
    groq,
    {
      type,
      lang,
      category: params.category,
      year: params.year,
      term,
    },
    null
  )

  if (!result) return empty

  const categories = [
    ...new Set(result.facets.map((f) => f.category).filter(Boolean)),
  ] as string[]
  const years = [
    ...new Set(result.facets.map((f) => f.year).filter(Boolean)),
  ] as string[]

  return {
    items: result.items ?? [],
    facets: {
      categories: categories.sort(),
      years: years.sort().reverse(),
      total: result.facets.length,
    },
  }
}

export function getArticle(
  type: "post" | "pressRelease",
  lang: Lang,
  slug: string
) {
  return query<Article | null>(
    `*[_type == $type && lang == $lang && slug.current == $slug][0] { ${FULL_FIELDS} }`,
    { type, lang, slug },
    null
  )
}

/** Every (lang, slug) pair, for getStaticPaths. */
export function listRoutes(type: "post" | "pressRelease", lang: Lang) {
  return query<{ slug: string }[]>(
    `*[_type == $type && lang == $lang && defined(slug.current)] { "slug": slug.current }`,
    { type, lang },
    []
  )
}

const builder = cmsConfigured ? createImageUrlBuilder(sanityClient) : null

export function imageUrl(source: unknown, width = 1200) {
  if (!builder || !source) return null
  return builder
    .image(source as never)
    .width(width)
    .fit("max")
    .auto("format")
    .url()
}

/** Portable Text to HTML, styled to match the site's editorial type. */
export function renderBody(body: unknown[] | undefined): string {
  if (!body?.length) return ""
  return toHTML(body as never, {
    components: {
      block: {
        normal: ({ children }) =>
          `<p class="mt-5 leading-relaxed text-muted-foreground">${children}</p>`,
        h2: ({ children }) =>
          `<h2 class="mt-12 font-serif text-2xl font-medium tracking-[-0.02em] text-ink sm:text-3xl">${children}</h2>`,
        h3: ({ children }) =>
          `<h3 class="mt-9 font-serif text-xl font-medium text-ink">${children}</h3>`,
        blockquote: ({ children }) =>
          `<blockquote class="mt-8 border-l-2 border-ink/20 pl-5 font-serif text-xl leading-snug text-ink">${children}</blockquote>`,
      },
      list: {
        bullet: ({ children }) =>
          `<ul class="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">${children}</ul>`,
        number: ({ children }) =>
          `<ol class="mt-5 list-decimal space-y-2 pl-5 text-muted-foreground">${children}</ol>`,
      },
      listItem: {
        bullet: ({ children }) =>
          `<li class="leading-relaxed">${children}</li>`,
        number: ({ children }) =>
          `<li class="leading-relaxed">${children}</li>`,
      },
      marks: {
        strong: ({ children }) =>
          `<strong class="font-semibold text-ink">${children}</strong>`,
        link: ({ children, value }) =>
          `<a href="${value?.href ?? "#"}" rel="noopener noreferrer" target="_blank" class="link-underline font-medium text-ink">${children}</a>`,
      },
      types: {
        image: ({ value }) => {
          const url = imageUrl(value, 1400)
          if (!url) return ""
          const alt = (value as { alt?: string })?.alt ?? ""
          return `<img src="${url}" alt="${alt}" loading="lazy" class="mt-10 w-full rounded-2xl border border-hairline" />`
        },
      },
    },
  })
}

export function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Makassar",
  }).format(new Date(iso))
}

/** One row per published article, for the on-demand articles sitemap. */
export interface SitemapEntry {
  type: "post" | "pressRelease"
  slug: string
  lang: Lang
  translationKey?: string
  /** Last edit in Sanity, which is what `lastmod` is supposed to report. */
  updatedAt: string
}

/**
 * Every published journal post and press release, both locales, in one query.
 *
 * The journal and press routes render on demand, so their URLs never reach the
 * build-time sitemap. This feeds `/sitemap-articles.xml` instead, which is
 * listed in the sitemap index via `customSitemaps` in astro.config.mjs.
 */
export function listSitemapEntries() {
  return query<SitemapEntry[]>(
    `*[_type in ["post", "pressRelease"] && defined(slug.current) && defined(publishedAt)]
      | order(publishedAt desc) {
        "type": _type,
        "slug": slug.current,
        lang,
        translationKey,
        "updatedAt": coalesce(_updatedAt, publishedAt)
      }`,
    {},
    []
  )
}
