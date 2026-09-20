---
title: Decisions
doc_type: decisions
status: ready
updated: 2026-09-19
---

# Decisions

Lightweight log of decisions about the portfolio and this knowledge base. Add a row when
something is decided; never edit history — supersede with a new row and link the old ID.

Status: `proposed` → `accepted` → `superseded by D-xxx`

| ID | Date | Decision | Why | Status |
|---|---|---|---|---|
| D-001 | 2026-09-19 | Build on the Payload 3 **website** template (Next.js) rather than the blank template or a custom frontend | Pages + layout builder, posts, media, SEO, live preview and drafts out of the box; closest starting point for a portfolio | accepted |
| D-002 | 2026-09-19 | **SQLite** (`file:./portfolio.db`) for development | Zero local setup; the adapter in `src/payload.config.ts` can be swapped to Postgres before deploy | accepted |
| D-003 | 2026-09-19 | **pnpm** as the package manager | Payload's recommended manager; already installed locally | accepted |
| D-004 | 2026-09-19 | `Docs/` is the **source of truth**, every doc carries YAML frontmatter, lifecycle `draft → review → ready` | Docs will be seeded into Payload collections; frontmatter makes that mechanical | accepted |
| D-005 | 2026-09-19 | Benchmarks: **one file per URL + a machine-generated index** per folder; slug = domain in kebab-case; desktop 1440 / mobile 390 screenshots | Individually reviewable analyses; indices never drift | accepted |
| D-006 | 2026-09-19 | Experience: **one folder per company, one file per project**; Figma exports in `<Company>/assets/<project>/` | Nine roles hold many projects each; case studies stay independent | accepted |
| D-007 | 2026-09-19 | Audience lens: **mixed — personal brand first**. The site must work for recruiters, clients and collaborators, but story and identity come before any single conversion goal | Sina's differentiator is the designer + marketer + PM hybrid, which is a brand story, not a job title | accepted |
| D-008 | 2026-09-19 | Benchmark screenshots are **local-only** (gitignored) and stored as **PNG** straight from Playwright | Keeps the repo small; the `.md` analysis is the durable record, the screenshots are working material | accepted |
| D-009 | 2026-09-19 | Site is **bilingual from the start: English (default) + Persian**, via Payload localization. Docs are authored in English; values the site will show carry a `<key>_fa` twin | Sina's network and market span both languages; retrofitting localization touches every collection | accepted |
| D-010 | 2026-09-19 | **6–8 featured deep case studies**; all other projects are short entries in their company page | Enough range to show design + marketing + product breadth without diluting | accepted |
| D-011 | 2026-09-19 | Rename `Docs/About Me` → `Docs/About-Me`, resume files → `Resume.{md,pdf}` | No spaces in paths; consistent with the other folders; scripts and links stay simple | accepted |
| D-012 | 2026-09-19 | `relevance` (1–5) is a **manual** score of relevance to Sina's site, separate from per-criterion craft scores defined in `Benchmarks/Rubric.md` | A beautiful but irrelevant site should not rank as a model to copy | accepted |
| D-013 | 2026-09-19 | Design-system inspiration lives in **`Docs/Design-System/`**: one file per cross-benchmark item (`DS-NN-<slug>.md`, `sources[]` grows per benchmark), lifecycle `status` × `adoption` (`candidate → adopted \| rejected \| superseded`), machine-owned index; crops, frames and video of third-party sites are **local-only** (gitignored) like benchmark screenshots | Individually reviewable patterns with stable ids that Content-Model can reference; no third-party visuals in the repo | accepted |
| D-014 | 2026-09-19 | Design tokens are recorded as **W3C DTCG JSON** (`Design-System/tokens/*.tokens.json`, 2025 object forms; fluid sizes as `{min, vw, max}` groups; provenance under `$extensions["com.sinaoshaghi.docs"]`; groups map 1:1 to Tailwind v4 `@theme` namespaces). Measured values are written by `docs:ds-capture`, never by hand; a later `scripts/tokens` step emits `globals.css` `@theme` from `sina.tokens.json` | Measured evidence and Sina's own choices share one schema, so the emitter is a table lookup and CSS is never the source of truth | accepted |
| D-015 | 2026-09-19 | **Light and dark are two palettes, not an inversion**: warm paper (`color.light.*`) and true slate (`color.dark.*`) as sibling groups in `sina.tokens.json`; the template's `data-theme` toggle stays and a section may invert itself with `data-theme="dark"` (footer) | Pleurat's toggle changed almost nothing — either the themes differ or the toggle goes; two real palettes keep the brand legible on both | accepted |
| D-016 | 2026-09-19 | **Type pairing: Geist Sans + Geist Mono (installed) + Vazirmatn** (`next/font/google`) as the Persian partner. Labels/codes are a real mono (`.eyebrow`, `.index-code`); Persian metrics (taller leading, zero tracking, no uppercase, 13px eyebrow floor) are `font.fa.*` tokens emitted inside `:lang(fa)`; Latin digits and codes stay mono in every locale | Zero licensing friction, matching x-height and weight; script-specific values as tokens keep components free of `if (fa)` | accepted |
| D-017 | 2026-09-19 | **The accent is a placeholder cobalt** (`color.*.brand`, `brand-foreground`, `ring`); the single-accent *rule* (CTA · section tag · live data) is adopted, the *value* is not — DS-01 Q1 stays open. Swapping it is a tokens edit + `pnpm tokens:build`, never a code change | Unblocks the build without borrowing pleurat's amber; keeps the decision visible in the docs | accepted |
| D-018 | 2026-09-19 | **Emitter contract**: `pnpm tokens:build` generates `src/app/(frontend)/theme.css` (`@theme static` + colour scopes + `@theme inline` bridge + `:lang(fa)`) and `src/cssVariables.js` from `sina.tokens.json`; both files are generated, prettier/eslint-ignored and drift-checked by `pnpm docs:check`. Colour roles (`--paper`, `--ink-2` …) are the design vocabulary; shadcn slots (`--background`, `--card` …) are DTCG aliases in the tokens file so `src/components/ui` keeps working. `tailwind.config.mjs` is removed | One source of truth (D-014) with the mapping to Tailwind v4 as data, and the template UI untouched | accepted |
