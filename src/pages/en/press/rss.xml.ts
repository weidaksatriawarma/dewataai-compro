/** RSS for English press releases. Rendered on demand, like the pages it lists. */
export const prerender = false

import type { APIRoute } from "astro"
import { buildFeed } from "@/lib/feed"

export const GET: APIRoute = (context) =>
  buildFeed({ kind: "pressRelease", lang: "en", site: context.site })
