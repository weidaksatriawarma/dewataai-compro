/**
 * Push newly published URLs to IndexNow.
 *
 * IndexNow is a single ping that tells Bing, Yandex, Naver and Seznam a URL
 * changed. Bing acts on it in minutes instead of waiting for a crawl, and Bing
 * is what backs ChatGPT search, so a new post becomes citable the same day.
 * Google does not participate; it gets the same news from the sitemap.
 *
 * Meant to be called by a Sanity webhook on publish. Configure it at
 * sanity.io/manage under API, Webhooks:
 *
 *   URL      https://dewataai.com/api/indexnow
 *   Trigger  Create, Update
 *   Filter   _type in ["post", "pressRelease"]
 *   Projection  {_type, "slug": slug.current, lang}
 *   Header   x-webhook-secret: <the INDEXNOW_WEBHOOK_SECRET value>
 */
export const prerender = false

import type { APIRoute } from "astro"
import { INDEXNOW_KEY, INDEXNOW_WEBHOOK_SECRET } from "astro:env/server"
import { LOCALES, detailPath, path, type Lang } from "@/lib/i18n"

const SITE = "https://dewataai.com"
const ENDPOINT = "https://api.indexnow.org/indexnow"

/** Shape a Sanity webhook sends with the projection documented above. */
interface WebhookBody {
  _type?: string
  slug?: string
  lang?: string
  /** Escape hatch: submit explicit paths or absolute URLs instead. */
  urls?: string[]
}

const isLang = (value: unknown): value is Lang =>
  typeof value === "string" && (LOCALES as readonly string[]).includes(value)

/**
 * The URLs one published document affects: the article itself, and the index
 * page that lists it, whose contents just changed.
 */
function urlsFor(body: WebhookBody): string[] {
  if (body.urls?.length) {
    return body.urls.slice(0, 100).map((url) => new URL(url, SITE).href)
  }

  const routeKey =
    body._type === "post"
      ? "journal"
      : body._type === "pressRelease"
        ? "press"
        : null
  if (!routeKey || !body.slug || !isLang(body.lang)) return []

  return [
    new URL(detailPath(routeKey, body.lang, body.slug), SITE).href,
    new URL(path(routeKey, body.lang), SITE).href,
  ]
}

/**
 * Compare two secrets without leaking their contents through timing.
 *
 * A plain `!==` returns as soon as two bytes differ, so the time it takes to
 * reject a guess reveals how much of the prefix was right, and a secret can be
 * recovered one character at a time. This always walks the full length.
 */
function secretsMatch(supplied: string | null, expected: string): boolean {
  if (!supplied || supplied.length !== expected.length) return false
  let difference = 0
  for (let i = 0; i < expected.length; i++) {
    difference |= supplied.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return difference === 0
}

export const POST: APIRoute = async ({ request }) => {
  if (!INDEXNOW_KEY || !INDEXNOW_WEBHOOK_SECRET) {
    return Response.json(
      { error: "IndexNow is not configured" },
      { status: 503 }
    )
  }

  // Anyone can reach this route, and an open one would let a stranger spend
  // this host's IndexNow quota on URLs of their choosing.
  if (
    !secretsMatch(
      request.headers.get("x-webhook-secret"),
      INDEXNOW_WEBHOOK_SECRET
    )
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: WebhookBody
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Body is not JSON" }, { status: 400 })
  }

  const urlList = urlsFor(body)
  if (!urlList.length) {
    return Response.json({ error: "Nothing to submit" }, { status: 400 })
  }

  const submission = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: INDEXNOW_KEY,
      // The key does not sit at the root, so the submission has to say where
      // the verifier will find it.
      keyLocation: new URL("/indexnow-key.txt", SITE).href,
      urlList,
    }),
  })

  // 200 and 202 both mean accepted; 202 means the key is still being verified.
  const accepted = submission.status === 200 || submission.status === 202
  return Response.json(
    { accepted, indexNowStatus: submission.status, submitted: urlList },
    { status: accepted ? 200 : 502 }
  )
}
