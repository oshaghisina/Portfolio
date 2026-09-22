---
title: Content Model
doc_type: content-model
status: draft
updated: 2026-09-22
payload_version: 3.90.1
locales: [en, fa]
default_locale: en
collections_proposed: [experiences, projects]
globals_proposed: [about]
---

# Content Model

The bridge from this research to the build. It records what the Payload "website" template
already gives us, what the Docs frontmatter needs from Payload, and how English + Persian
localization works. It is a **spec that evolves**: every time [Benchmarks/Synthesis.md](Benchmarks/Synthesis.md)
flips a verdict that changes the site's shape, this file gets a changelog row.

Paths are relative to the repo root. Collections and localization are not implemented yet (§13); the design-system layer is — see §2 and §10.

## 1. Purpose & update rule

- Source of truth for the *shape* of content: collections, fields, blocks, globals, locales.
- Updated when: a Synthesis verdict changes (§10 blocks especially), a Docs template gains a
  key, or a decision in [Decisions.md](Decisions.md) touches content.
- Bump `updated` and add a row to §14.

## 2. Baseline — what the template ships

| Item | Path | Keep / Extend / Remove | Note |
|---|---|---|---|
| `pages` | `src/collections/Pages/index.ts` | **Keep** | Title, hero group, `layout` blocks, SEO tab, drafts + autosave + scheduled publish. Home, About, Contact live here |
| `posts` | `src/collections/Posts/index.ts` | **Keep** | Becomes *Writing / Notes* if Sina writes; otherwise hidden from nav, not deleted |
| `media` | `src/collections/Media.ts` | **Keep** | `alt`, `caption`; sizes thumbnail/square/small/medium/large/xlarge/og. Enough for case-study imagery |
| `categories` | `src/collections/Categories.ts` | **Extend** | Reuse as the *domain* taxonomy (fintech, cloud, edtech…) for experiences and projects; nested-docs already enabled |
| `users` | `src/collections/Users/index.ts` | **Keep** | Admin auth only |
| `header`, `footer` | `src/Header/config.ts`, `src/Footer/config.ts` | **Keep** | `navItems` of `link`; `link.relationTo` must widen (§11) |
| Blocks | `src/blocks/*/config.ts` | **Keep** | `cta`, `content` (+ `layout: columns \| editorial`, DS-13), `mediaBlock`, `archive`, `formBlock`, **`metricsStrip`** (DS-18) for pages; `banner`, `code` inside rich text |
| `sectionHeader` group | `src/fields/sectionHeader.ts` | **New** | `tag · lead · tail · lede` (DS-12), reused by every block that opens a section; all four become `localized: true` with §3 |
| Design tokens | `Docs/Design-System/tokens/sina.tokens.json` → `src/app/(frontend)/theme.css` | **New** | Emitted by `pnpm tokens:build` (D-014, D-018); `src/utilities/locale.ts` drives `<html lang dir>` until §3 lands |
| Heros | `src/heros/config.ts` | **Keep** | `none / highImpact / mediumImpact / lowImpact`; reused by projects (§6) |
| `link` field | `src/fields/link.ts`, `src/fields/linkGroup.ts` | **Extend** | Reused for experience/project links; widen `relationTo` |
| Plugins | `src/plugins/index.ts` | **Extend** | redirects, nested-docs, seo, form-builder, search — all kept; configs widen to new collections |
| Seed | `src/endpoints/seed/index.ts` | **Extend later** | Demo data today; §12 describes the Docs seeder |

## 3. Localization plan (D-009)

```ts
// src/payload.config.ts
localization: {
  locales: [
    { code: 'en', label: 'English' },
    { code: 'fa', label: 'فارسی', rtl: true },
  ],
  defaultLocale: 'en',
  fallback: true,
},
```

| Rule | Detail |
|---|---|
| What is localized | Every `text`, `textarea`, `richText` field that a visitor reads, and `select` option *labels*. Set `localized: true` per field |
| What is not | Slugs, dates, numbers, relationships, uploads, booleans, URLs, tool/skill *values* |
| Slugs | **Shared across locales** — one URL per document; the locale is a path prefix (`/fa/work/…`). Routing is a build-time decision, noted TBD |
| Fallback | `fallback: true` — a missing Persian field shows English rather than nothing |
| RTL | The `fa` locale renders with `dir="rtl"`; the frontend needs a Persian-capable font stack and mirrored layout tokens. This is a *design* constraint tracked in Design benchmarks |
| Docs mapping | `<key>_fa` in frontmatter → the `fa` locale value of `<key>` at seed time; body sections with a `(fa)` heading → the `fa` value of the matching rich-text field |
| Admin | Payload's admin gains a locale switcher automatically; no extra work |

## 4. Docs → Payload mapping

| Doc | Location | Target | Notes |
|---|---|---|---|
| Company `README.md` | `Docs/Experience/<Co>/README.md` | one `experiences` document | frontmatter → fields; body "Summary" → `description` |
| Project file | `Docs/Experience/<Co>/<slug>.md` | one `projects` document | frontmatter → fields; each `##` section → its rich-text field (§6) |
| Brand Brief | `Docs/About-Me/Brand-Brief.md` | `about` global | frontmatter facts + the three bios by heading (§7) |
| Timeline | `Docs/Experience/Timeline.md` | `experiences.period`, `order` | dates propagate to company READMEs first (Timeline → README → Payload) |
| Inventory | `Docs/Experience/Inventory.md` | `projects.featured`, `order` | only rows with a `File` are seeded |
| Benchmarks | `Docs/Benchmarks/**` | **not published** | research only; they shape this file, not the database |
| Resume | `Docs/About-Me/Resume.pdf` | `media` upload, linked from `about` | the downloadable CV |

## 5. `experiences` collection (new)

One document per company/role. Slug `experiences`, `admin.useAsTitle: 'company'`,
`versions.drafts` as in Pages, access `authenticatedOrPublished` / `authenticated`.

| Field | Payload type | Req | Frontmatter key | Localized | Notes |
|---|---|---|---|---|---|
| `title` | text | ✓ | `company` + `product` | ✓ | display title, e.g. "Digikala — Digital Gold" |
| `company` | text | ✓ | `company` | ✓ | |
| `product` | text | | `product` | ✓ | business unit if different |
| `role` | text | ✓ | `role` | ✓ | |
| `employment` | select `full-time / part-time / freelance / contract` | ✓ | `employment` | labels ✓ | |
| `period` | group `{ start: date, end: date, present: checkbox, approx: checkbox }` | ✓ | `period.{start,end,approx}` | | `end` empty when `present`; dates from Timeline only |
| `domain` | relationship → `categories`, hasMany | | `domain` | | seeded from the domain string |
| `summary` | textarea | ✓ | `summary` (+ `_fa`) | ✓ | one line for lists and cards |
| `description` | richText | | body "Summary (from resume)" | ✓ | duties + achievements |
| `logo` | upload → `media` | | — | | |
| `links` | array of `link` (`src/fields/link.ts`) | | — | label ✓ | company site, press |
| `projects` | join → `projects.experience` | | — | | read-only list in admin |
| `order` | number | | `resume_order` (until dates), then derived from `period.start` | | |
| `slug` | `slugField()` from `payload` | ✓ | `slug` | | shared across locales |
| `meta` | SEO tab (copy from Pages) | | — | ✓ | |
| `publishedAt` | date, sidebar | | — | | `populatePublishedAt` hook as Pages |

## 6. `projects` collection (new)

One document per case study. Slug `projects`, `admin.useAsTitle: 'title'`, drafts + autosave +
live preview like Pages, `defaultPopulate` limited to card fields (as Posts does).

**Implemented 2026-09-21 as a V1 subset (D-021)** — `src/collections/Projects/index.ts`: `title` · `slug` ·
`summary` · `company` (text, localized — stands in for `experience` until §5 exists) · `role` · `kind`
(select hasMany: `product · growth · data · research · systems · concept`, labels in
`src/collections/Projects/kinds.ts`) · `period {start, end, present}` · `cover` (upload) · `liveUrl` ·
`caseStudyStatus` (`none · draft · published` — the case-study gate, separate from `_status`) ·
`featured` · `order` (required, default 50) · `meta` · `publishedAt`. Drafts + `localizeStatus`
like Pages; no live preview until `/work/[slug]`. Everything below that is not in this list
(`experience`, `product`, `domain`, `team`, `tools`, `skills`, `hero`, the case-study tab, `extras`,
`metrics`, `figma`, `links`, `gallery`) is still the spec for the case-study task.

| Field | Payload type | Req | Frontmatter key | Localized | Notes |
|---|---|---|---|---|---|
| `title` | text | ✓ | `title` / `title_fa` | ✓ | |
| `slug` | `slugField()` | ✓ | `slug` | | |
| `experience` | relationship → `experiences` | ✓ | `company` (resolved by folder) | | |
| `product` | text | | `product` | ✓ | |
| `role` | text | ✓ | `role` | ✓ | |
| `period` | group as §5 | ✓ | `period` | | validate: inside the experience's bounds |
| `domain` | relationship → `categories`, hasMany | | `domain` | | |
| `team` | text | | `team` | ✓ | |
| `tools` | select hasMany | | `tools` | labels ✓ | options seeded from the resume Tools list |
| `skills` | select hasMany | | `skills` | labels ✓ | options seeded from the resume Skills list |
| `summary` | textarea | ✓ | `summary` / `summary_fa` | ✓ | |
| `hero` | group — reuse `src/heros/config.ts` | | — | richText ✓ | cover image + intro |
| **Case study** tab — **implemented 2026-09-22 (D-022)**, `src/collections/Projects/caseStudy.ts` | | | | | a controlled block narrative, not seven fixed rich-text fields (see below) |
| `statement` | text (≤ 160) | | `> one-line summary` | ✓ | the positioning line under the title; falls back to `summary` |
| `industry` · `team` | text | | `domain` · `team` | ✓ | header facts; `industry` is free text until a domain taxonomy is decided (§13 Q7) |
| `projectStatus` | select `shipped · in-progress · pre-launch · paused · concept` | | — | labels in code | header fact; labels in `src/components/CaseStudy/copy.ts` |
| `tools` | text hasMany | | `tools[]` | | Latin tool names, not translated |
| `hero` | group `{ items[1–3] { media }, caption }` | | `assets/` | caption ✓ | 1 item = one full-width visual; 2–3 = a row of framed screens on the drafting plate |
| `snapshot` | group `{ problem, role, result }` textarea | | — | ✓ | THE PROBLEM · THE ROLE · THE RESULT, one sentence each |
| `sections` | blocks — `csNarrative` · `csFigure` · `csFinding` · `csProcess` · `csOwnership` · `csDecisions` · `csOutcomes` · `csLessons` | | `## …` headings | leaves ✓, structure shared | `src/blocks/CaseStudy/*/config.ts`; the blocks array is **not** localized, every text leaf inside it is, so block order and media are shared across locales and rows merge by `id` |
| `nextProject` | relationship → `projects` | | — | | optional; empty = next published case study by `order`, wrapping |
| `translationReviewed` | checkbox, sidebar | | — | ✓ | per-locale flag: machine-drafted locales stay unticked |
| `metrics` | → `csOutcomes.items[] { value, label, context, source, kind: measured · delivered }` | | `metrics[]` | label/context/source ✓ | value stays text ("+18%"); a delivered output has no value and never pretends to |
| `figma` | array `{ url: text, label: text }` | | `figma[]` | label ✓ | admin-only reference, not rendered publicly by default |
| `links` | array of `link` | | `links[]` | label ✓ | live site, articles |
| `gallery` | → `csFigure` blocks (`full · split · sequence · annotated · compare`) | | `<project-slug>/assets/` | caption ✓ | figures are evidence inside a chapter, never a gallery |
| `featured` | checkbox | | `featured` | | drives home-page selection; 6–8 true (D-010) |
| `order` | number | | Inventory priority / rank | | |
| `meta` | SEO tab | | — | ✓ | |
| `publishedAt` | date | | — | | |

Why a controlled block narrative rather than seven fixed rich-text fields (D-022, superseding the
2026-09-19 sketch): the argument is the same everywhere — context → problem → constraints →
ownership → approach → decisions → evidence → outcomes → learning — but its *evidence* differs per
project (a process map here, a before/after there), and decisions, ownership and outcomes are
structured data, not prose. So `csNarrative` carries a controlled `label` (`context · problem ·
constraints · approach · solution · research · outcome · custom`) that becomes the numbered chapter
kicker ("01 CONTEXT") and the sticky section index (DS-14), while `csOwnership`, `csDecisions`,
`csOutcomes` and `csLessons` open chapters with their own fields; `csFigure`, `csProcess` and
`csFinding` are evidence inside the current chapter. No block exposes spacing, size or column
controls — editors choose a pattern, the page decides the composition.

**Publication rule.** `/work/<slug>` renders only when the project is published *for that locale*
(`_status`, `localizeStatus`), `caseStudyStatus = published` (the validator refuses it with no
sections) and at least one section exists; otherwise the archive never links to it and a direct
hit is a 404 outside draft mode. `src/i18n/contentReady.ts` applies the same rule, so hreflang
alternates and the locale switcher never advertise an archive-only project. Live preview opens
`/<locale>/work/<slug>` from the admin's locale (`generatePreviewPath`).

## 7. `about` global (new)

From the Brand Brief. Slug `about`.

| Field | Type | Source | Localized |
|---|---|---|---|
| `name` | text | `name` / `name_fa` | ✓ |
| `headline` | text | `headline` / `headline_fa` | ✓ |
| `tagline` | text | `tagline` / `tagline_fa` | ✓ |
| `bioShort` | textarea | `### One-liner` / `(fa)` | ✓ |
| `bioMedium` | richText | `### Short bio` / `(fa)` | ✓ |
| `bioLong` | richText | `### Long bio` / `(fa)` | ✓ |
| `basedIn` | text | `based_in` | ✓ |
| `openTo` | select hasMany | `open_to` | labels ✓ |
| `portrait` | upload → media | resume photo | |
| `resume` | upload → media (PDF) | `Resume.pdf` | per-locale upload later |
| `links` | array `{ platform: select, url: text }` | `links` | |

The About *page* itself is a `pages` document whose blocks read from this global, so copy edits
happen in one place.

## 8. Taxonomy

- **Domain** → reuse `categories` (nested-docs on). Seed: fintech, automotive, retail, edtech,
  cloud, media, telecom. Persian labels via localization.
- **Tools** and **Skills** → `select hasMany` on `projects`, options seeded from the resume.
  Revisit as collections only if the site needs filter pages per tool.
- **Kind** (Inventory: product / campaign / dashboard-BI …) → `select` on `projects`, useful for
  filtering "show me the growth work" vs "show me the design work" — the hybrid story in a filter.

## 9. Media conventions

- `Docs/Experience/<Co>/<project>/assets/` → uploaded to `media`, titled `<project>-<n>`, `alt`
  from a sidecar caption or the case-study text. Existing `imageSizes` (`src/collections/Media.ts`)
  are sufficient; `og` size covers social cards.
- Benchmark screenshots are **never** uploaded (local-only, D-008).
- Portrait and resume PDF live in `media` and are referenced from `about`.

## 10. Blocks

**Reused as-is:** `cta`, `content` (now with `layout: editorial`), `mediaBlock`, `archive` (widened to `projects`, §11), `formBlock`.

**Implemented (2026-09-19):** `metricsStrip` — `src/blocks/MetricsStrip/{config,Component}.tsx`, `metrics[] { value, caption, source }` (1–4) + `sectionHeader` group; the `logoWall` candidate is answered by the `ExperienceGrid` component (names in type, no logos) whose block waits for `experiences` (§5).

**Implemented (2026-09-21):** `projectArchive` — `src/blocks/ProjectArchive/{config,Component}.tsx`, the whole
body of the `/work` page: `sectionHeader` intro (rendered as the page `h1`), the three `featured` projects
in a large → medium → medium rhythm, then a numbered index of every published project with a single-select
`kind` filter (DS-10 index codes, DS-20-style rows, DS-22 tags). Reads the `projects` collection directly;
holds no project copy of its own. `selectedWork` (home) now references one `projects` document.

**Implemented (2026-09-22, D-022):** the case-study blocks in `src/blocks/CaseStudy/` — `csNarrative`,
`csFigure` (DS-30: full · split · sequence · annotated · compare; portrait captures framed as screens,
diagrams on the drafting plate), `csFinding`, `csProcess` (nodes + hairlines, `process` or `loop`),
`csOwnership`, `csDecisions`, `csOutcomes` (DS-18 type roles + DS-27 `ShippedList`), `csLessons`.
They belong to `projects.sections` only, never to `pages.layout`. `processSteps` and `beforeAfter`
below are answered by `csProcess` and `csFigure.compare`.

**Candidates — TBD pending benchmarks.** Each becomes real only when Synthesis shows the pattern
earns its place; until then it is a hypothesis.

| Block | Would do | Evidence needed | DS item | Synthesis link |
|---|---|---|---|---|
| `projectGrid` | featured projects on the home page with kind/domain filter | ≥ 2 Content benchmarks where a filterable grid beats a list for a hybrid profile | [DS-24](Design-System/DS-24-project-rail-column.md) · [DS-25](Design-System/DS-25-gallery-with-tabs-and-lightbox.md) | — |
| `experienceTimeline` | the nine roles on a time axis with overlaps visible | a Design benchmark that visualizes a career without looking like a CV | [DS-38](Design-System/DS-38-employer-ticker.md) · [DS-19](Design-System/DS-19-scroll-filled-stat-bars.md) | — |
| `metricsStrip` | 3–4 headline numbers per case study — **implemented** (`src/blocks/MetricsStrip`) | pleurat-com `proof` = 4; DS-18 adopted | [DS-18](Design-System/DS-18-stats-trio.md) (+ [DS-35](Design-System/DS-35-scroll-pinned-count-up-chart.md) motion, later) | — |
| `testimonial` | quotes from colleagues/clients | Sina has publishable quotes (Brand Brief Q7) | [DS-29](Design-System/DS-29-testimonial.md) | — |
| `logoWall` | company logos → **names in type** (`ExperienceGrid` component built; block follows `experiences`) | DS-20 adopted | [DS-20](Design-System/DS-20-typographic-employer-grid.md) | — |
| `processSteps` | research → prototype → test → ship as a visual — **answered by `csProcess`** (case studies only) | Design benchmarks that show process without a generic "double diamond" | [DS-31](Design-System/DS-31-numbered-table-rows.md) | — |
| `beforeAfter` | slider or side-by-side for redesigns (Arvan, OTeacher) — **answered by `csFigure.compare`** (side by side, labelled) | assets exist in Figma | — | — |

The `DS item` column links each candidate to the [Design-System](Design-System/README.md) item that
holds its measured anatomy and “For Sina” notes (D-013). A candidate becomes a real block when its
DS item is `adopted`.

## 11. Cross-cutting changes checklist (when building)

Everything in the template that assumes only `pages` and `posts`:

- [ ] `src/payload.config.ts` — add `Experiences`, `Projects` to `collections`; add `About` to `globals`; add `localization` (§3)
- [x] `src/plugins/index.ts` — `generateTitle` suffix → `| Sina Oshaghi` via `src/utilities/site.ts` (`withSiteName`, also used by `generateMeta` and `mergeOpenGraph`); typed `Post | Page | Project`
- [x] `src/plugins/index.ts` — redirects `collections` add `'projects'` (`experiences` has no public route)
- [ ] `src/plugins/index.ts` — search `collections` add `'projects'`; extend `beforeSyncWithSearch` and `searchFields` for project cards — **deferred**: the search page is posts-only chrome today
- [ ] `src/fields/link.ts:78` — `relationTo: ['pages', 'posts']` → add `'projects'`, `'experiences'`
- [ ] `src/blocks/ArchiveBlock/config.ts:45-87` — `relationTo` options + `selectedDocs.relationTo` add `'projects'`; `src/blocks/ArchiveBlock/Component.tsx` renders project cards
- [ ] `src/components/Card/index.tsx:17` — `relationTo?: 'posts'` → union with `'projects'`; href prefix map
- [x] `src/utilities/generatePreviewPath.ts` — reads `src/i18n/routes.ts` (`projects: '/work'`); `Projects.admin.livePreview` / `preview` wired, locale-aware
- [x] Routes: `/work` is a CMS page (D-021); `src/app/(frontend)/work/[slug]/page.tsx` renders the case study (D-022); locale prefix via `src/proxy.ts` (header-based, no `[locale]` segment); `experience/page.tsx` not planned
- [x] `src/app/(frontend)/(sitemaps)/projects-sitemap.xml/route.ts` (published + public case study, per locale); `next-sitemap.config.cjs` entries
- [x] `src/collections/Projects/hooks/revalidateProject.ts` — every locale path + the `projects-sitemap` tag
- [x] `src/endpoints/seed/index.ts` — wipe list has `projects`; the RP1 case study seeds additively (`src/endpoints/seed/case-studies/`, also `pnpm seed:case-studies` against a live database)
- [ ] Live-preview breakpoints (`src/payload.config.ts:40-52`): 375 / 768 / 1440 — fine; benchmarks use 390 for mobile, close enough
- [x] `pnpm generate:types` after every schema change; `src/payload-types.ts` is committed

## 12. Seeding path

**Implemented for case studies (2026-09-22):** `src/endpoints/seed/case-studies/` — `media.ts` uploads
or reuses assets by filename and writes localized `alt`; `rp1-arena.ts` holds the content in en/fa/ar/de
with deterministic row ids so each locale's `update` merges into the same blocks; `index.ts` is
additive and idempotent (runs at the end of the main seed and standalone via `pnpm seed:case-studies`).
Non-English copy is machine-drafted and flagged with `translationReviewed: false`. The pointers below
still describe the generic Docs → Payload path for the remaining collections.


- Extend `seed()` in `src/endpoints/seed/index.ts` with a `seedFromDocs` step, or add a
  `pnpm seed:docs` script calling `getPayload({ config })` the way `tests/helpers/seedUser.ts` does.
- Reuse `scripts/docs/lib/frontmatter.ts` to read frontmatter and body sections; convert
  Markdown sections to Lexical JSON (the template's `post-1.ts` shows the node shapes).
- Read images from `Docs/Experience/**/assets` with `fs` instead of the template's
  `fetchFileByURL`; `payload.create({ collection: 'media', data, file })` is unchanged.
- Type data as `RequiredDataFromCollectionSlug<'projects'>` etc.; only `status: ready` docs seed.
- Locale: create with `locale: 'en'`, then `payload.update({ locale: 'fa', data: faFields })`.

## 13. Open questions

| # | Question | Default |
|---|---|---|
| 1 | Locale routing: `/fa/...` path prefix vs. subdomain vs. cookie | path prefix, `[locale]` segment |
| 2 | Do `posts` stay (Writing section) or get hidden until there's content? | keep, hide from nav |
| 3 | Is `about` a global or a `pages` document with special blocks? | global + a page that reads it |
| 4 | Persian slugs — shared with English (default) or separate? | shared |
| 5 | Should `figma[]` links ever render publicly? | no; admin reference only |
| 6 | `/design` is a static route (the style guide) and shadows a `pages` document with slug `design` | keep the route; reserve the slug |
| 7 | Domain taxonomy: keep `projects.industry` as free text, or move to a `categories` relationship once filtering by industry is needed? | free text until a second consumer exists |

## 14. Changelog

| Date | Change | Trigger |
|---|---|---|
| 2026-09-19 | Created: baseline, localization plan, `experiences` / `projects` / `about`, block candidates, cross-cutting checklist | Docs improvement plan |
| 2026-09-19 | §10: added the `DS item` column linking block candidates to `Design-System/` items; `metricsStrip` evidence updated (pleurat-com `proof` = 4) | D-013 |
| 2026-09-19 | §2 + §10: `metricsStrip` block, Content `layout: editorial`, `sectionHeader` field group and the tokens → `theme.css` pipeline implemented; `logoWall` answered by `ExperienceGrid`; §13 Q6 `/design` route | D-015 … D-018 |
| 2026-09-21 | §6: `projects` implemented as a V1 subset; §10: `projectArchive` implemented, `selectedWork` re-pointed at `projects`; `/work` is a CMS page | D-021 |
| 2026-09-22 | §6: case-study layer implemented as a controlled block narrative (8 blocks, publication rule, live preview); §10: `csNarrative … csLessons` implemented, `processSteps` / `beforeAfter` answered; §11: title suffix, redirects, preview, `/work/[slug]`, sitemap, hooks, seed ticked, search deferred; §12: case-study seeder; §13 Q7 | D-022 |
