# Docs — Portfolio knowledge base

Research and source-of-truth content for Sina Oshaghi's personal portfolio (Payload CMS).
Every doc here is **structured with YAML frontmatter** so it can later be mapped to Payload
collections and seeded into the CMS.

**Audience lens:** mixed — *personal brand first*. The site should work for recruiters, clients
and collaborators, but story and identity come before any single conversion goal. All benchmark
analyses are written through this lens.

## Layout

| Folder | Purpose | What goes in |
|---|---|---|
| `About Me/` | Who Sina is, in general | Resume (PDF + MD), brand brief, bio, photos, positioning |
| `Benchmarks/Content/` | Content benchmarks | One file per URL: how the site **stores and showcases** content (content model, IA, case-study format, depth, media) |
| `Benchmarks/Design/` | Design inspiration | One file per URL: how the **design** expresses a personal brand and experience (visual language, typography, layout, motion, storytelling) |
| `Experience/` | All work experience in detail | One folder per company; one file per project/case study; Figma exports in `assets/` |

## Workflow

### Sending a URL
Say which bucket it belongs to (Content or Design) — or send it and I'll ask.
For each URL I will:

1. Fetch the page(s) and take **desktop (1440px) and mobile (390px) screenshots** with
   Playwright into `Benchmarks/<Type>/assets/<slug>/`.
2. Write `Benchmarks/<Type>/<slug>.md` from `_template.md` — filled frontmatter, analysis,
   and a **"Takeaways for Sina"** section (borrow / adapt / avoid).
3. Add a row to that folder's `README.md` index with a one-line takeaway.

`<slug>` = the site's domain in kebab-case (e.g. `linear.app` → `linear-app`).

### Sending a project (Experience)
Send the project name, company, and Figma link(s). For each project I will:

1. Read the Figma file via the Figma MCP (screens, flows, components).
2. Write `Experience/<Company>/<project-slug>.md` from `Experience/_template.md` as a
   case study: context → problem → role → process → solution → outcome → learnings.
3. Export key frames to `Experience/<Company>/assets/<project-slug>/`.
4. Update `Experience/README.md` and the company `README.md` project list.

## Frontmatter → Payload mapping (draft)

| Doc type | Likely Payload collection | Key fields |
|---|---|---|
| Experience company `README.md` | `experiences` | company, product, role, period, employment, domain |
| Experience project | `projects` (relates to `experiences`) | title, company, role, period, tools, skills, metrics, figma, links, featured |
| Benchmark | not published — research only | — |

Status values: `draft` → `review` → `ready` (ready = safe to seed into Payload).
