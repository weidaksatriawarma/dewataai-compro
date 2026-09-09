/**
 * Sitemap for the journal and press pages.
 *
 * Those routes render on demand, so @astrojs/sitemap never sees their URLs at
 * build time and they would otherwise reach Google only by crawling the index
 * pages. This endpoint reads Sanity per request and is listed in
 * `sitemap-index.xml` through the `customSitemaps` option.
 *
 * Rendered on demand for the same reason the pages are: a post published in
 * the Studio is in the sitemap on the next fetch, with no rebuild.
 */
export const prerender = false

import type { APIRoute } from "astro"
import { listSitemapEntries, type SitemapEntry } from "@/lib/cms"
import { LOCALES, detailPath, type Lang } from "@/lib/i18n"

const SITE = "https://dewataai.com"

/** Sitemap hreflang wants a full locale code, matching astro.config.mjs. */
const HREFLANG: Record<Lang, string> = { id: "id-ID", en: "en-US" }

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

const absolute = (entry: SitemapEntry) =>
  new URL(
    detailPath(
      entry.type === "post" ? "journal" : "press",
      entry.lang,
      entry.slug
    ),
    SITE
  ).href

/**
 * Translations of one article, keyed by locale.
 *
 * Two documents are the same article when they share a type and a
 * `translationKey`. An article with no key stands alone and gets no alternates,
 * which is correct: claiming a translation that does not exist is worse than
 * claiming none.
 */
function translationGroups(entries: SitemapEntry[]) {
  const groups = new Map<string, Partial<Record<Lang, SitemapEntry>>>()
  for (const entry of entries) {
    if (!entry.translationKey) continue
    const key = `${entry.type}:${entry.translationKey}`
    const group = groups.get(key) ?? {}
    group[entry.lang] = entry
    groups.set(key, group)
  }
  return groups
}

export const GET: APIRoute = async () => {
  const entries = (await listSitemapEntries()).filter((entry) =>
    LOCALES.includes(entry.lang)
  )
  const groups = translationGroups(entries)

  const urls = entries.map((entry) => {
    const group = entry.translationKey
      ? groups.get(`${entry.type}:${entry.translationKey}`)
      : undefined
    const translated = LOCALES.filter((lang) => group?.[lang])

    // One alternate is the page itself, which says nothing. Only emit the block
    // when a real translation exists on the other side.
    const links =
      translated.length > 1
        ? [
            ...translated.map(
              (lang) =>
                `<xhtml:link rel="alternate" hreflang="${HREFLANG[lang]}" href="${escape(absolute(group![lang]!))}"/>`
            ),
            `<xhtml:link rel="alternate" hreflang="x-default" href="${escape(absolute(group!.id ?? group!.en!))}"/>`,
          ].join("")
        : ""

    return `<url><loc>${escape(absolute(entry))}</loc><lastmod>${escape(
      new Date(entry.updatedAt).toISOString()
    )}</lastmod>${links}</url>`
  })

  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Crawlers refetch a sitemap often. An hour of edge cache keeps that off
      // Sanity without making a new post wait for a rebuild.
      "Cache-Control": "public, max-age=600, s-maxage=3600",
    },
  })
}
