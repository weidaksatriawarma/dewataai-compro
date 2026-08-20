import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"

import { schemaTypes } from "./src/sanity/schemaTypes"

/**
 * Sanity Studio, embedded at /admin (basePath is managed by @sanity/astro).
 *
 * The project id and dataset are committed rather than left to .env alone.
 * Both are public values: Astro inlines them into the browser bundle at build
 * time either way, which is why Sanity's own docs put them straight in the
 * config. Keeping them here means a host that builds from git without the env
 * vars set still gets a working Studio instead of silently falling back to a
 * placeholder id. .env still overrides, for pointing at another project.
 */
export default defineConfig({
  name: "dewataai",
  title: "Dewata AI",
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "obs57lvl",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
