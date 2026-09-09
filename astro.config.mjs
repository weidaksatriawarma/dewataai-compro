// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig, envField, fontProviders } from "astro/config"
import react from "@astrojs/react"
import sanity from "@sanity/astro"
import cloudflare from "@astrojs/cloudflare"
import sitemap from "@astrojs/sitemap"
import { loadEnv } from "vite"
import path from "node:path"
import { ROUTES } from "./src/lib/i18n.ts"

// Host platforms inject env vars into process.env; local development uses .env
// files, which loadEnv reads. Check both so either source works.
const fileEnv = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "")
const env = { ...fileEnv, ...process.env }

// @sanity/astro builds its Vite aliases by resolving `<pkg>/package.json` and
// stripping the suffix with a POSIX-only regex. On Windows the resolved path
// uses backslashes, so nothing is stripped and `sanity` and `styled-components`
// alias to package.json itself. Dependency pre-bundling then fails and the
// Studio at /admin renders a blank page.
//
// Declaring correct aliases here does not help, because the integration's
// entries are matched first. Correcting them in `configResolved` is too late,
// because Vite has already snapshotted the list by then. The `config` hook is
// the window that works: `post` runs it after the integration has added its
// entries, while the config is still being assembled.
function fixSanityWindowsAliases() {
  const misdirected = /[\\/]node_modules[\\/](sanity|styled-components)[\\/]package\.json$/

  /**
   * The directory an alias meant to point at, or null if it is already fine.
   * @param {unknown} target
   */
  const repointed = (target) =>
    typeof target === "string" && misdirected.test(target)
      ? path.dirname(target).split(path.sep).join("/")
      : null

  /**
   * Vite accepts aliases as an array of entries or as a find/replace record,
   * so handle both. Foreign config shapes, hence the loose type.
   * @param {any} alias
   */
  const repoint = (alias) => {
    if (!alias) return
    if (Array.isArray(alias)) {
      for (const entry of alias) {
        const fixed = repointed(entry?.replacement)
        if (fixed) entry.replacement = fixed
      }
      return
    }
    for (const [key, value] of Object.entries(alias)) {
      const fixed = repointed(value)
      if (fixed) alias[key] = fixed
    }
  }

  /** @type {import("vite").Plugin} */
  const plugin = {
    name: "dewataai:fix-sanity-windows-aliases",
    enforce: "post",
    apply: "serve",
    config(config) {
      repoint(config.resolve?.alias)
    },
  }

  return plugin
}

// Indonesian and English slugs differ per route (`/tentang/` pairs with
// `/en/about/`), so the sitemap integration's `i18n` option cannot find the
// pairs: it matches locales by URL structure alone and only ever links routes
// whose paths are otherwise identical. Without this, every localised-slug page
// ships hreflang in its <head> but none in the sitemap.
//
// Longest route first, so `/en/ventures/` is claimed by the ventures pair
// before the home pair (`/` and `/en/`) can match it as a prefix.
const LOCALE_PAIRS = Object.values(ROUTES).sort((a, b) => b.id.length - a.id.length)

/**
 * The id/en paths for one URL, following it into detail routes: a venture at
 * `/usaha/dewata-tech/` pairs with `/en/ventures/dewata-tech/`.
 * @param {string} pathname
 */
function localePaths(pathname) {
  for (const { id, en } of LOCALE_PAIRS) {
    if (pathname === id || pathname === en) return { id, en }
    // Home is a prefix of every path, so it only ever matches exactly.
    if (id !== "/" && pathname.startsWith(id)) {
      const rest = pathname.slice(id.length)
      return { id: id + rest, en: en + rest }
    }
    if (pathname.startsWith(en)) {
      const rest = pathname.slice(en.length)
      return { id: id + rest, en: en + rest }
    }
  }
  return null
}

// https://astro.build/config
export default defineConfig({
  site: "https://dewataai.com",

  // Static by default. The journal and press routes opt out with
  // `export const prerender = false`, so anything published in Sanity is live
  // on the next request instead of waiting for a rebuild.
  output: "static",
  adapter: cloudflare({ imageService: "compile" }),

  /* Server-only secrets for the IndexNow endpoints. Both optional: without them
     the key file and the submission route answer 404, and nothing else on the
     site changes. `Astro.locals.runtime` was removed in Astro 6, so these are
     read through astro:env, which the Cloudflare adapter wires to the Worker's
     own secrets. Set them with `wrangler secret put`, or in .env.production for
     a local production build. */
  env: {
    schema: {
      INDEXNOW_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      INDEXNOW_WEBHOOK_SECRET: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },

  // Indonesian-first bilingual site: `id` at `/`, `en` at `/en/`.
  i18n: {
    locales: ["id", "en"],
    defaultLocale: "id",
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss(), fixSanityWindowsAliases()],
  },

  integrations: [// Sanity powers the journal + press release pages. The project id and
  // dataset are committed as defaults because Astro inlines them into the
  // browser bundle at build time regardless, so they are public either way.
  // A host that builds from git without the env vars set then still gets a
  // working CMS; .env overrides when pointing at a different project.
  sanity({
    projectId: env.PUBLIC_SANITY_PROJECT_ID || "obs57lvl",
    dataset: env.PUBLIC_SANITY_DATASET || "production",
    // The CDN purges on publish, so on-demand pages stay fast and still show
    // new content within seconds.
    useCdn: true,
    studioBasePath: "/admin",
    // Hash routing keeps Studio deep links working on a static host.
    studioRouterHistory: "hash",
  }), react(), sitemap({
    // The embedded Sanity Studio (mounted at /admin) is an app, not a page
    // anyone should land on from search.
    filter: (page) => !page.includes("/admin"),
    i18n: {
      defaultLocale: "id",
      locales: { id: "id-ID", en: "en-US" },
    },
    // The journal and press routes render on demand, so their URLs never reach
    // this integration. That sitemap is generated per request instead and
    // listed here so the index points at it.
    customSitemaps: ["https://dewataai.com/sitemap-articles.xml"],
    serialize(item) {
      const paths = localePaths(new URL(item.url).pathname)
      if (!paths) return item
      const idUrl = new URL(paths.id, "https://dewataai.com").href
      const enUrl = new URL(paths.en, "https://dewataai.com").href
      item.links = [
        { lang: "id-ID", url: idUrl },
        { lang: "en-US", url: enUrl },
        // Indonesian is the default locale, so it is what an unmatched
        // language should be sent to.
        { lang: "x-default", url: idUrl },
      ]
      return item
    },
  })],

  // Self-hosted, subsetted, preloaded fonts — no render-blocking Google request
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Fraunces",
      cssVariable: "--font-fraunces",
      weights: [300, 400, 500, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Hanken Grotesk",
      cssVariable: "--font-hanken",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      // Dewata Tech sets its wordmark in Montserrat 900, so the lockup here
      // matches dewatatech.com rather than approximating it.
      provider: fontProviders.google(),
      name: "Montserrat",
      cssVariable: "--font-montserrat",
      // 700 for the Dewata AI wordmark, 900 for Dewata Tech's.
      weights: [700, 900],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains",
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
})