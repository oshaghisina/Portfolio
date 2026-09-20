---
title: Content Model
doc_type: content-model
status: draft
updated: 2026-09-19
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
| **Case study** tab | | | | | one richText per template heading — trivially seedable |
| `context` | richText | | `## Context` | ✓ | |
| `problem` | richText | | `## Problem` | ✓ | |
| `myRole` | richText | | `## My role` | ✓ | |
| `process` | richText | | `## Process` | ✓ | |
| `solution` | richText | | `## Solution` | ✓ | |
| `outcome` | richText | | `## Outcome & impact` | ✓ | |
| `learnings` | richText | | `## Learnings` | ✓ | |
| `extras` | blocks `[content, mediaBlock, cta]` + §10 candidates | | — | ✓ | free-form additions below the fixed sections |
| `metrics` | array `{ label: text, value: text, context: text }` | | `metrics[]` | label/context ✓ | value stays text ("+18%", "3.2 → 4.1") |
| `figma` | array `{ url: text, label: text }` | | `figma[]` | label ✓ | admin-only reference, not rendered publicly by default |
| `links` | array of `link` | | `links[]` | label ✓ | live site, articles |
| `gallery` | array `{ media: upload → media, caption: text }` | | `assets/<slug>/` | caption ✓ | exported Figma frames |
| `featured` | checkbox | | `featured` | | drives home-page selection; 6–8 true (D-010) |
| `order` | number | | Inventory priority / rank | | |
| `meta` | SEO tab | | — | ✓ | |
| `publishedAt` | date | | — | | |

Why fixed case-study fields rather than one big `layout` blocks field: every case study has the
same seven sections (that *is* the format), seeding from Markdown headings becomes 1:1, and the
frontend can render a consistent reading experience with a sticky section nav. `extras` keeps
the flexibility for anything that doesn't fit.

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

- `Docs/Experience/<Co>/assets/<project>/` → uploaded to `media`, titled `<project>-<n>`, `alt`
  from a sidecar caption or the case-study text. Existing `imageSizes` (`src/collections/Media.ts`)
  are sufficient; `og` size covers social cards.
- Benchmark screenshots are **never** uploaded (local-only, D-008).
- Portrait and resume PDF live in `media` and are referenced from `about`.

## 10. Blocks

**Reused as-is:** `cta`, `content` (now with `layout: editorial`), `mediaBlock`, `archive` (widened to `projects`, §11), `formBlock`.

**Implemented (2026-09-19):** `metricsStrip` — `src/blocks/MetricsStrip/{config,Component}.tsx`, `metrics[] { value, caption, source }` (1–4) + `sectionHeader` group; the `logoWall` candidate is answered by the `ExperienceGrid` component (names in type, no logos) whose block waits for `experiences` (§5).

**Candidates — TBD pending benchmarks.** Each becomes real only when Synthesis shows the pattern
earns its place; until then it is a hypothesis.

| Block | Would do | Evidence needed | DS item | Synthesis link |
|---|---|---|---|---|
| `projectGrid` | featured projects on the home page with kind/domain filter | ≥ 2 Content benchmarks where a filterable grid beats a list for a hybrid profile | [DS-24](Design-System/DS-24-project-rail-column.md) · [DS-25](Design-System/DS-25-gallery-with-tabs-and-lightbox.md) | — |
| `experienceTimeline` | the nine roles on a time axis with overlaps visible | a Design benchmark that visualizes a career without looking like a CV | [DS-38](Design-System/DS-38-employer-ticker.md) · [DS-19](Design-System/DS-19-scroll-filled-stat-bars.md) | — |
| `metricsStrip` | 3–4 headline numbers per case study — **implemented** (`src/blocks/MetricsStrip`) | pleurat-com `proof` = 4; DS-18 adopted | [DS-18](Design-System/DS-18-stats-trio.md) (+ [DS-35](Design-System/DS-35-scroll-pinned-count-up-chart.md) motion, later) | — |
| `testimonial` | quotes from colleagues/clients | Sina has publishable quotes (Brand Brief Q7) | [DS-29](Design-System/DS-29-testimonial.md) | — |
| `logoWall` | company logos → **names in type** (`ExperienceGrid` component built; block follows `experiences`) | DS-20 adopted | [DS-20](Design-System/DS-20-typographic-employer-grid.md) | — |
| `processSteps` | research → prototype → test → ship as a visual | Design benchmarks that show process without a generic "double diamond" | [DS-31](Design-System/DS-31-numbered-table-rows.md) | — |
| `beforeAfter` | slider or side-by-side for redesigns (Arvan, OTeacher) | assets exist in Figma | — | — |

The `DS item` column links each candidate to the [Design-System](Design-System/README.md) item that
holds its measured anatomy and “For Sina” notes (D-013). A candidate becomes a real block when its
DS item is `adopted`.

## 11. Cross-cutting changes checklist (when building)

Everything in the template that assumes only `pages` and `posts`:

- [ ] `src/payload.config.ts` — add `Experiences`, `Projects` to `collections`; add `About` to `globals`; add `localization` (§3)
- [ ] `src/plugins/index.ts:16-17` — `generateTitle` suffix `| Payload Website Template` → `| Sina Oshaghi`; widen `GenerateTitle<Post | Page>` to include `Project | Experience`
- [ ] `src/plugins/index.ts:28` — redirects `collections` add `'projects'`, `'experiences'`
- [ ] `src/plugins/index.ts:84` — search `collections` add `'projects'`; extend `beforeSyncWithSearch` and `searchFields` for project cards
- [ ] `src/fields/link.ts:78` — `relationTo: ['pages', 'posts']` → add `'projects'`, `'experiences'`
- [ ] `src/blocks/ArchiveBlock/config.ts:45-87` — `relationTo` options + `selectedDocs.relationTo` add `'projects'`; `src/blocks/ArchiveBlock/Component.tsx` renders project cards
- [ ] `src/components/Card/index.tsx:17` — `relationTo?: 'posts'` → union with `'projects'`; href prefix map
- [ ] `src/utilities/generatePreviewPath.ts:4` — `collectionPrefixMap` add `projects: '/work'`, `experiences: '/experience'`
- [ ] New routes: `src/app/(frontend)/work/page.tsx`, `work/[slug]/page.tsx`, `experience/page.tsx`; locale prefix strategy for `/fa` (TBD: middleware vs. `[locale]` segment)
- [ ] `src/app/(frontend)/(sitemaps)/` — add `projects-sitemap.xml`; `next-sitemap.config.cjs` entries
- [ ] Revalidation hooks for the new collections, modelled on `src/collections/Pages/hooks/revalidatePage.ts`
- [ ] `src/endpoints/seed/index.ts` — wipe list add `projects`, `experiences`; header nav → Work / Experience / About / Contact
- [ ] Live-preview breakpoints (`src/payload.config.ts:40-52`): 375 / 768 / 1440 — fine; benchmarks use 390 for mobile, close enough
- [ ] `pnpm generate:types` after every schema change; `src/payload-types.ts` is committed

## 12. Seeding path (pointers only — out of scope here)

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

## 14. Changelog

| Date | Change | Trigger |
|---|---|---|
| 2026-09-19 | Created: baseline, localization plan, `experiences` / `projects` / `about`, block candidates, cross-cutting checklist | Docs improvement plan |
| 2026-09-19 | §10: added the `DS item` column linking block candidates to `Design-System/` items; `metricsStrip` evidence updated (pleurat-com `proof` = 4) | D-013 |
| 2026-09-19 | §2 + §10: `metricsStrip` block, Content `layout: editorial`, `sectionHeader` field group and the tokens → `theme.css` pipeline implemented; `logoWall` answered by `ExperienceGrid`; §13 Q6 `/design` route | D-015 … D-018 |
