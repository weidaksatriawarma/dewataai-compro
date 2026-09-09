/**
 * The IndexNow key file.
 *
 * IndexNow proves you control a host by having you serve the key back from it.
 * The canonical spot is `/<key>.txt` at the root, but the spec also allows any
 * other path as long as the submission names it in `keyLocation`, which is what
 * /api/indexnow does. Serving it from here rather than committing a file to
 * public/ keeps the key a secret in Cloudflare rather than a value in git.
 */
export const prerender = false

import type { APIRoute } from "astro"
import { INDEXNOW_KEY } from "astro:env/server"

export const GET: APIRoute = () => {
  // Unset means the feature is off. A 404 is the honest answer, and it also
  // stops IndexNow from verifying a host that is not ready to submit.
  if (!INDEXNOW_KEY) return new Response("Not found", { status: 404 })

  return new Response(INDEXNOW_KEY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
