/** RSS for the Indonesian journal. Rendered on demand, like the pages it lists. */
export const prerender = false

import type { APIRoute } from "astro"
import { buildFeed } from "@/lib/feed"

export const GET: APIRoute = (context) =>
  buildFeed({ kind: "post", lang: "id", site: context.site })
