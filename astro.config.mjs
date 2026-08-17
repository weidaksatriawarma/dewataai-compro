// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig, fontProviders } from "astro/config"
import react from "@astrojs/react"
import sanity from "@sanity/astro"
import cloudflare from "@astrojs/cloudflare"
import { loadEnv } from "vite"

// Host platforms inject env vars into process.env; local development uses .env
// files, which loadEnv reads. Check both so either source works.
const fileEnv = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "")
const env = { ...fileEnv, ...process.env }

// https://astro.build/config
export default defineConfig({
  site: "https://dewataai.com",

  // Static by default. The journal and press routes opt out with
  // `export const prerender = false`, so anything published in Sanity is live
  // on the next request instead of waiting for a rebuild.
  output: "static",
  adapter: cloudflare({ imageService: "compile" }),

  // Indonesian-first bilingual site: `id` at `/`, `en` at `/en/`.
  i18n: {
    locales: ["id", "en"],
    defaultLocale: "id",
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    // Sanity powers the journal + press release pages. The placeholder project
    // id keeps builds working before the real credentials land in .env; every
    // query goes through lib/cms.ts, which falls back to an empty result.
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID || "placeholder",
      dataset: env.PUBLIC_SANITY_DATASET || "production",
      // The CDN purges on publish, so on-demand pages stay fast and still show
      // new content within seconds.
      useCdn: true,
      studioBasePath: "/admin",
      // Hash routing keeps Studio deep links working on a static host.
      studioRouterHistory: "hash",
    }),
    react(),
  ],

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
