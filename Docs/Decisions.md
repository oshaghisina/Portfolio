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
