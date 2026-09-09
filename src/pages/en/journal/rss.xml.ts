/** RSS for the English journal. Rendered on demand, like the pages it lists. */
export const prerender = false

import type { APIRoute } from "astro"
import { buildFeed } from "@/lib/feed"

export const GET: APIRoute = (context) =>
  buildFeed({ kind: "post", lang: "en", site: context.site })
