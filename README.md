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
| `/search` | Site search |

Locale URLs use a prefix except English (e.g. `/fa/work`).

## Seeds & Docs

Content seeds live under `src/endpoints/seed/`. Useful scripts:

```bash
pnpm seed:projects
pnpm seed:case-studies
pnpm seed:experience
pnpm seed:home-mosaic
pnpm seed:home-tools
pnpm seed:translations
pnpm audit:translations
```

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

## Production URL, sitemap & robots

Set **`NEXT_PUBLIC_SERVER_URL`** to the real public origin (no trailing slash) for every production build. It drives:

- Open Graph / canonical URLs
- `postbuild` → `next-sitemap` ([next-sitemap.config.cjs](next-sitemap.config.cjs))

Without it, sitemap generation falls back to `https://example.com`. Local `public/robots.txt` and `public/sitemap*.xml` are **gitignored build artifacts** — do not treat them as source of truth, and do not bake a localhost copy into a deploy image.

Dynamic sitemaps for pages, posts, and projects live under `src/app/(frontend)/(sitemaps)/`.

Code releases go through `pnpm deploy:prod`: it validates the committed tree, builds the image once, and sends only the image layers the server doesn't already have (`--dry-run`, `--rollback`). Content changes need no deploy, because every route renders dynamically. The runbook (Caddy, Mongo restore, Arvan Object Storage / `pnpm migrate:media-urls`, rollback) is the local `Docs/Deploy.md` when present.

## Admin

Payload admin is at `/admin`. The dashboard seed control can refresh pages/projects/case studies against your local database without wiping unrelated content (additive seeds).
