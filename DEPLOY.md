# Deploy + CMS setup

The site is static except for the journal and press routes, which render on
demand. That split is deliberate: marketing pages stay on the CDN, and anything
published in Sanity is live on the next request without waiting for a rebuild.

| Route | Rendering |
| --- | --- |
| `/`, `/usaha/*`, `/tentang/`, `/manifesto/`, `/kontak/`, `/privasi/` (+ `/en/*`) | Prerendered at build |
| `/jurnal/`, `/jurnal/[slug]`, `/pers/`, `/pers/[slug]` (+ `/en/*`) | On demand, per request |
| `/admin` | Sanity Studio (client-side, hash routing) |

## 1. Create the Sanity project

1. Sign in at <https://sanity.io/manage> and create a project. Note the
   **project ID** and use the `production` dataset.
2. Copy `.env.example` to `.env` and fill in:

   ```
   PUBLIC_SANITY_PROJECT_ID=your-project-id
   PUBLIC_SANITY_DATASET=production
   ```

3. In **sanity.io/manage → API → CORS origins**, add both with credentials
   allowed:
   - `http://localhost:4321`
   - `https://dewataai.com`

Until step 2 is done the site still builds and runs; the journal and press
pages simply show their empty state.

## 2. Write content

Run `npm run dev` and open <http://localhost:4321/admin>. Two document types:

- **Jurnal** (`post`) for the blog
- **Siaran Pers** (`pressRelease`) for press releases, with dateline,
  boilerplate, and media contact fields

Each document has a **Bahasa** field (`id` / `en`). A document tagged `id`
appears at `/jurnal`, one tagged `en` at `/en/journal`. To link a translation
pair, give both documents the same **Kunci terjemahan**.

## 3. Deploy to Cloudflare

The `@astrojs/cloudflare` adapter writes a ready-to-use Wrangler config to
`dist/server/wrangler.json` on every build (assets bound to `dist/client`).

**From your machine:**

```sh
npm run deploy        # builds, then wrangler deploy
npm run preview:cf    # builds, then runs the Worker locally
```

The first deploy creates the Worker and provisions the KV namespace the adapter
binds for sessions. Follow the prompts.

**From Git (Workers Builds or Pages):**

- Build command: `npm run build`
- Output directory: `dist`
- No environment variables are required. The project id and dataset are
  committed as defaults, so a build from git is self-sufficient.

Set `PUBLIC_SANITY_PROJECT_ID` / `PUBLIC_SANITY_DATASET` as **build**
environment variables only to point a deployment at a different project or
dataset. They are read in `astro.config.mjs` and inlined into the bundle, so
they have to be present at build time; setting them as runtime-only variables
does nothing.

> Both values were previously supplied by `.env` alone. Because `.env` is
> gitignored, a git-driven build had no way to see them and the Studio at
> `/admin` came up with the project id `placeholder`. Committing the defaults
> is what removes that failure mode.

After the first deploy, add your production domain to the Sanity CORS list if
it differs from `dewataai.com`.

## 4. Why publishing shows up immediately

Three things make this work, and all three matter:

1. The journal and press routes set `export const prerender = false`, so they
   are rendered per request instead of frozen into HTML at build time.
2. `useCdn: true` in `astro.config.mjs` points reads at Sanity's CDN, which
   purges on publish. Fresh content, without hitting the live API on every
   pageview.
3. `src/lib/cms.ts` wraps every query, so an unconfigured or unreachable CMS
   returns an empty result instead of failing the build.

You do **not** need a deploy webhook for new posts. You only need to redeploy
when the code or the static pages change.

## 5. Notes

- `npm audit` reports vulnerabilities coming from the Sanity Studio dependency
  tree. These are development-time dependencies for `/admin`; check before
  running `npm audit fix --force`, which would try to move Astro across a major
  version.
- `react` and `react-dom` must stay on the exact same version. A mismatch fails
  the build with `Incompatible React versions`.
