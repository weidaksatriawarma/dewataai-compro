import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"

import { schemaTypes } from "./src/sanity/schemaTypes"

/**
 * Sanity Studio, embedded at /admin (basePath is managed by @sanity/astro).
 * Credentials come from .env — see .env.example.
 */
export default defineConfig({
  name: "dewataai",
  title: "Dewata AI",
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
