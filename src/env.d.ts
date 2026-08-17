/// <reference types="astro/client" />

/**
 * Virtual module provided by @sanity/astro. Declared here rather than via
 * `@sanity/astro/module`, because that file also redeclares `*.astro` as
 * `unknown`, which would strip prop typing from every Astro component.
 */
declare module "sanity:client" {
  export const sanityClient: import("@sanity/client").SanityClient
}

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID?: string
  readonly PUBLIC_SANITY_DATASET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
