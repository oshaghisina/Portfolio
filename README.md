# Sina Oshaghi Portfolio

Personal product-design portfolio for **Sina Oshaghi** — a Payload CMS 3 + Next.js 16 site with a public archive of work, deep case studies, experience/about storytelling, a Lab for writing, and a living `/design` guide.

Started from the [Payload Website Template](https://github.com/payloadcms/payload/blob/3.x/templates/website); the product, collections, seeds, tokens, and i18n are customized for this portfolio.

## Stack

- **Payload CMS** 3.90 + **Next.js** 16 (App Router) + **React** 19
- **MongoDB** (`@payloadcms/db-mongodb`)
- **Tailwind CSS** v4 + design tokens (`pnpm tokens:build`)
- **pnpm**, Vitest (integration), Playwright (e2e)
- **7 locales**: `en` | `fa` | `ar` | `es` | `de` | `fr` | `ja` (`fallbackLocale: false`)

## Quick start

```bash
cp .env.example .env
docker compose up -d mongo
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Create an admin user on first visit, then use the admin Seed button (or the `pnpm seed:*` scripts below) to load content.

Local Mongo defaults are in `.env.example` / `docker-compose.yml` (dev compose only).

## Collections & globals

| Kind | Role |
| --- | --- |
| **Pages** | CMS pages (`/`, `/work`, `/experience`, `/about`, `/contact`, …) with layout blocks |
| **Projects** | Work archive + case studies → `/work`, `/work/[slug]` |
| **Posts** | Lab writing → `/lab` |
| **Experiences** | Career / capability reference data |
| **Media** | Uploads (covers, case-study figures). Local `public/media` in dev; Arvan Object Storage when `S3_BUCKET` + `S3_PUBLIC_URL` are set |
| **Categories** | Post taxonomy |
| **Users** | Admin auth |
| **Header / Footer** | Nav + site chrome (localized labels) |
| **About** | About global content |

## Public routes

| Path | Purpose |
| --- | --- |
| `/` | Home |
| `/work` | Filterable project archive |
| `/work/[slug]` | Case study (when `caseStudyStatus: published`) |
| `/experience` | Capability / career story |
| `/about` | About |
| `/lab` | Writing / experiments (English-first today) |
| `/contact` | Form-builder contact page |
| `/design` | Living design guide (`noindex`) |
| `/search` | Site search (`noindex, follow`; not in pages sitemap) |

Locale URLs use a prefix except English (e.g. `/fa/work`). Hreflang is readiness-gated (`fallbackLocale: false`) so unpublished locales are never advertised.

## Seeds & Docs

For the current status of all 37 project showcases and case studies, start with [CASE_STUDY_ROADMAP.md](Docs/CASE_STUDY_ROADMAP.md).

Content seeds live under `src/endpoints/seed/`. Useful scripts:

```bash
pnpm seed:projects
pnpm seed:seo-sync
pnpm seed:case-studies
pnpm seed:experience
pnpm seed:home-mosaic
pnpm seed:home-tools
pnpm seed:translations
pnpm audit:translations
```

`pnpm seed:projects` syncs the projects archive and also applies retired-slug redirects + the Carsparency `nextProject` chain. Prefer `pnpm seed:seo-sync` when you only need those two SEO DB follow-ups (idempotent). Never run seeds on the VPS — point `DATABASE_URL` at prod Mongo from the laptop (SSH tunnel) when needed; see `Docs/Deploy.md`.

**`Docs/` is gitignored and local-only.** Seeds read research assets from `Docs/Experience/…`. Do not expect `Docs/` on a production server — migrate Mongo (and sync media into Arvan Object Storage if needed) instead; see deploy notes below.

## Design tokens

```bash
pnpm tokens:build
```

DTCG token sources compile into the frontend theme. The `/design` route documents the system.

## Tests

```bash
pnpm test:int    # Vitest
pnpm test:e2e    # Playwright (needs a running app / webServer config)
```

## Production URL, SEO, sitemap & robots

Set **`NEXT_PUBLIC_SERVER_URL`** to the real public origin (no trailing slash) for every production build. It drives:

- Canonical URLs, Open Graph, and Twitter cards via [`generateMeta`](src/utilities/generateMeta.ts)
- `postbuild` → `next-sitemap` ([next-sitemap.config.cjs](next-sitemap.config.cjs))

Without it, sitemap generation falls back to `https://example.com`. Local `public/robots.txt` and `public/sitemap*.xml` are **gitignored build artifacts** — do not treat them as source of truth, and do not bake a localhost copy into a deploy image.

**Metadata & indexing (D-037):** CMS `meta` on Pages / Posts / Projects; shared `generateMeta` adds title/description fallbacks, draft-mode `noindex`, OG locale, and readiness-gated `alternates.languages` + `x-default`. Lab archive uses full meta; `/search` and `/design` stay out of the index; robots disallow `/admin/*`, `/api/*`, `/next/*`, `/design`.

**Structured data:** factual JSON-LD only — `WebSite` on home, `Person` on about, `CreativeWork` + `BreadcrumbList` on published case studies.

**Sitemaps:** dynamic maps under `src/app/(frontend)/(sitemaps)/` (pages omit `/search`; projects gate on published case studies).

**Retired URLs:** Payload `redirects` rows for `RETIRED_PROJECT_SLUGS` → `/work` (seeded by `seed:projects` / `seed:seo-sync`).

Code releases go through `pnpm deploy:prod`: it validates the committed tree, builds the image once, and sends only the image layers the server doesn't already have (`--dry-run`, `--rollback`). Content changes need no deploy, because every route renders dynamically. The runbook (Caddy, Mongo restore, Arvan Object Storage / `pnpm migrate:media-urls`, Cloudflare Tunnel for `.com` / D-036, SEO sync, rollback) is the local `Docs/Deploy.md` when present.

## Admin

Payload admin is at `/admin`. The dashboard seed control can refresh pages/projects/case studies against your local database without wiping unrelated content (additive seeds).

### Payload MCP (Cursor)

`@payloadcms/plugin-mcp` (pinned with Payload **3.90.1**) mounts **`POST /api/mcp`**. Auth is a **Bearer** key from Admin → **MCP → API Keys** (not the Users document “API” preview URL, and not Users `useAPIKey`).

1. Create a key in Admin; enable the same collection/global capabilities you expose in [`src/plugins/index.ts`](src/plugins/index.ts).
2. Set in `.env` (see `.env.example`):
   - `PAYLOAD_MCP_URL` — local `http://127.0.0.1:3000/api/mcp` or prod `https://sinaoshaghi.com/api/mcp`
   - `PAYLOAD_API_KEY` — the Bearer secret from that key document
3. Project Cursor config: [`.cursor/mcp.json`](.cursor/mcp.json) (`Authorization: Bearer ${env:PAYLOAD_API_KEY}`). Reload MCP servers after changing env.

Smoke test (expects tools SSE/JSON, not `Route not found`):

```bash
curl -i "$PAYLOAD_MCP_URL" -X POST \
  -H "Authorization: Bearer $PAYLOAD_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":"1","method":"tools/list","params":{}}'
```

Keys are per database (local ≠ prod). Never commit real keys. Ops notes: local `Docs/Deploy.md` when present (D-039).
