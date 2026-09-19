---
title: "Pleurat Shala — pleurat.com"
url: "https://www.pleurat.com/"
type: content
owner: "Pleurat Shala"
owner_role: "Product Designer & AI Product Builder"
site_kind: personal-portfolio
date_added: 2026-09-19
relevance: 5
tags: [case-studies, numbered-sections, meta-strip, stats, nda-work, ai-differentiator, lead-magnet, sanity-cms, spa]
status: draft
---

# Pleurat Shala — pleurat.com

> A 10-year product designer's portfolio that sells one differentiator (AI-native workflow) through a
> tight content system: six deep numbered case studies, a typographic employer grid, a "by the numbers"
> block, a dedicated `/ai` page and an e-book lead magnet — benchmarked because Pleurat's
> *design + systems + AI* story is structurally the same problem as Sina's *design + marketing + product* story.

## Overview
Pleurat Shala is a product designer in Pristina (Kosovo, CET) with 10+ years across SaaS, brand and
design systems, now positioned as an "AI Product Builder". The site is a Vite + React SPA with images
served from Sanity (`cdn.sanity.io`), plus a private `/editor` route — so content is CMS-managed, not
hard-coded. First impression of the content: **confident, quantified, and opinionated**. Every claim
comes with a number ("150+ websites", "91 commits", "~$0.03 per nightly run"), every case study ends
with a "What shipped" list, and the AI angle is treated as a first-class section of the site rather than
a footnote.

Routes: `/` · `/work` · `/ai` · `/about` (nav label "Profile") · `/contact` · `/privacy` · `/work/{slug}` ×6
(`mindpath`, `otee`, `appello`, `valuehut`, `codex`, `ai-journey`). `/ai` is missing from `sitemap.xml`.

## Content model
What kinds of content exist and how each is structured (visible "fields").

| Entity | Fields observed | Notes |
|---|---|---|
| Project / case study | title · one-line summary · category label ("Website and Web App", "Mobile App", "SaaS", "AI SaaS") · cover image · **meta strip**: ROLE, TOOLS, TYPE, YEAR (range, e.g. "2025 — 26"), optional LIVE url / CLIENT · hero image · **numbered sections** (`01 · OVERVIEW` eyebrow + short heading + body) ×5–10 · tag chips after the problem section · figures (full-width / 2-col / 3-col; Figma & FigJam screenshots, device mockups) · **stats trio** (value + mono caption) · optional testimonial (quote + attribution) · **"What shipped"** 3–4 bullets · next case study (title, blurb, image) | Section labels are free text and vary per study (OVERVIEW, CHALLENGES / THE PROBLEM / PROBLEM STATEMENT / PROJECT GOALS, DISCOVERY PHASE, RESEARCH, BRAND, ARCHITECTURE, UX/UI DESIGN, COLLABORATION, WORKFLOW, PRODUCT, WEBSITE, CRAFT, RESULTS / OUTCOME / PROJECT RESULTS, AI ARCHITECTURE, THE STANDOUT, ENGINEERING, THE BUSINESS LAYER, TAKEAWAY). A sticky vertical index of section numbers runs down the left margin. |
| Employer / team entry | index (A1–A10) · company · role (mono caps) · one-line description | Ten entries, shown identically on `/` and `/about`. **Not linked** to case studies. Companies: Hoopit AI, Santander UK, Appello, Toyota, Gjirafa, ThemeForest, Nacew, FourTwoThree, Otee, AI Journey. Hero ticker also surfaces Valtech; NDA marquee adds DHFPG. |
| NDA work | company name only, in a marquee | "Plus many other projects I can't publicly share, but they're some of my favorite work." — Santander UK · Hoopit AI · FourTwoThree · Toyota · DHFPG. Cheap way to claim big names without a case study. |
| Stat | value ("10+", "150+") · label ("Years designing", "Websites designed", "Products shipped", "Industries workd" *(sic)*) | Rendered as a scroll-driven bar chart on `/`. Case-study stats reuse the same value + mono caption shape. |
| Tool | name · logo · "station code" (R1, C4, L3…) · purpose (on `/ai`) | Ten tools: Claude, Figma, Cursor, Supabase, Vercel, OpenAI, Meta, Grok, GitHub, Tailwind. Reused in three places: logo tiles, `/ai` stack, footer transit map. |
| AI build / experiment | title · status (ACTIVE · Q1 2026 / PLUGIN · 2026) · purpose · stack chips · 4 process steps · 4 stats (11 AGENTS, 38 COMPONENTS, 4 BRAND MODES, 1.4s PER BUILD) · tags · simulated terminal log · "Read the report" link | Three: Sena (design system built with agents), AI Realtime Renamer (Figma plugin), AI Journey (SaaS — also a full case study). Lives on `/ai` and as an accordion on `/work`. |
| Screenshot gallery | image · alt · category tab (APPS 33 / WEBSITES 36) · pagination · lightbox | "Everything, up close." — lets the long tail of work exist without a case study each. |
| About / profile | statement paragraphs (scroll-highlighted) · photo strip (portrait, desk, laptop, outdoors, e-book) · timeline line ("2015 — NOW · PRISTINA, CET") · skill chips (Lead / Product, Design systems, Brand, AI workflows, UX / UI, Figma) · employer grid · **e-book** (title, blurb, 4 bullets, CTA) | E-book *The Product Designer's Mind* is the only lead magnet. |
| Experience / CV | — | No CV page, no dates per role, no PDF resume. Experience is carried entirely by the employer grid + case studies. |
| Writing / notes | — | None. "Read the report" links on AI builds are the only long-form beyond case studies. |
| Contact | email (with COPY button) · 4 social handles (Awwwards, Dribbble, LinkedIn, ThemeForest) · location · "Response within 24 hours" | No form, no calendar link. |
| Global | nav (Welcome, Work, AI, Profile, Contact) · footer columns (Contact, Sitemap, Elsewhere, Studio) · copyright · privacy | Footer repeats email, response time and location on every page. |

## Information architecture
```
/            Welcome — hero → employer ticker → "bench" (4 expertise tracks) → tracks carousel
             → by the numbers → AI tools → where I've worked → selected-work wall → footer
/work        Work — 6-project rail → NDA marquee → screenshot gallery (Apps/Websites) → "built with AI" accordion
/work/{slug} Case study (6) → next case study
/ai          AI — manifesto hero → 8-row workflow table → 3 AI builds (bench) → stack
/about       Profile — statement → illustration → story → skills → where I've worked → e-book
/contact     Contact — email + socials
```
**Landing → proof → contact:** the hero's two CTAs go to `/work` and `/about`. Almost every section
ends in an amber "Explore portfolio" or "Read the full profile" link, and the footer on every page
carries the email. There is deliberate redundancy: the employer grid appears twice, the tool set three
times, the AI builds twice. Ordering on `/work` is editorial (MindPath first — the most complete story),
and the same order drives "Next case study", so the six studies form a loop.

The **AI page is the differentiator page**: it doesn't list projects, it explains a way of working
(8 numbered practices) and then proves it with three shipped builds. That is the content move worth
copying — the thing that makes you different gets its own top-level nav item with its own content type.

## How work is showcased
- **Case-study format:** consistent skeleton (summary → meta strip → hero → numbered sections → figures →
  stats → what shipped → next). Depth varies a lot: Codex is 5 sections; Otee 8; MindPath 10 (~21k px at 1440);
  AI Journey is 8 sections and almost text-only — an essay about method with three numbers, no screens
  — which reads differently from the other five. Process vs. outcome is roughly 60/40: every study
  names the discovery/research phase and shows the FigJam artefact, then closes on outcomes. Body copy is
  first-person, 2–4 sentences per section; headings are short verdicts ("Everything, from scratch",
  "Five platforms, five audiences, one service").
- **Media:** Sanity-hosted stills only — no video, no embedded prototypes. Case studies alternate
  full-bleed mockups (devices on fabric), FigJam/Figma canvases (structure, flows, file organisation)
  and app screens inset in a grey frame. Home has a scroll-driven wall of ~20 screenshots. `/work` has a
  69-image paginated gallery. Visual-to-text ratio in case studies is roughly 70/30 by page height.
- **Proof & metrics:** numbers everywhere and always with a caption — home stats (10+/150+/50+/10+),
  case-study trios (30% faster article creation · 20+ people · 100% positive feedback; 10~ daily
  pre-assessments · 10+ full assessments · 5/5 reviews; ~$0.03 nightly run · 7 AI features · 91 commits).
  One testimonial (MindPath founding team). "Live" links for shipped products. Employer names carry the
  credibility (Santander UK, Toyota) even where no case study exists. No client logos anywhere — names
  are typeset instead.
- **Personality:** it shows through micro-copy more than through the "about" text — the fake terminal
  ("workspace live — it carries on without you"), the sticky note ("Ship the thing. Then make it worth
  keeping. — still going"), the tagline "AI does not design. It does the other 80%", "the decade counted
  rather than described". Voice is plain, slightly terse, allergic to buzzwords ("It's not just vibe
  coding"). Photos of the person appear only on `/about`.

## Takeaways for Sina
- **Borrow:**
  - The **meta strip** (Role · Tools · Type · Year · Live/Client) at the top of every case study — becomes fixed fields in Payload, not prose.
  - **Numbered sections with an eyebrow label + short verdict heading** — scannable, and the section index doubles as a table of contents.
  - **"What shipped"** as a mandatory closing list, and the **stats trio** with mono captions — the format forces outcomes into every study.
  - **Typographic employer grid instead of a logo wall** — Sina has nine companies; index them (A1–A9), give each a one-line role blurb, and avoid logo-permission issues.
  - The **NDA marquee** — a one-liner that lets Digikala/Arvan-scale names appear even where the work can't be shown in detail.
  - The **screenshot gallery with category tabs** — a home for the long tail (campaign creatives, dashboards, UI) without writing a case study for each.
  - The **lead magnet** on the profile page — a PDF (resume, or a short playbook) with a CTA.
- **Adapt:**
  - Pleurat's `/ai` is a *differentiator page*. Sina's differentiator (D-007) is the designer + marketer + PM hybrid — give it the same treatment: a top-level page that explains how the three roles compound, with 6–8 numbered practices and 2–3 proofs, rather than three separate skill lists.
  - "**By the numbers**" maps directly onto Sina's marketing side (NMV, CTR/CPC, conversion lifts, NPS growth at Arvan) — but count only what has a source; the resume currently lacks the numbers behind achievements.
  - Section labels should be a **controlled vocabulary** (Payload `select`: Context, Problem, Role, Research, Process, Solution, Outcome, Learnings) — Pleurat's free-text labels drift across studies.
  - **Link employer entries to their case studies** — Pleurat's grid is a dead end; in Payload `experiences` ↔ `projects` is a relationship, so the grid can show "3 projects →".
  - Keep section copy at Pleurat's length (2–4 sentences). With EN + FA twins (D-009), brevity halves the translation load.
  - Deep-study count: Pleurat has six; D-010 says 6–8 — the depth cap should be Otee (8 sections), not MindPath (10).
- **Avoid:**
  - Content that only exists after a scroll-reveal fires — whole sections (employer grid, tool tiles, selected-work wall) are invisible without JS/IntersectionObserver. Next.js SSR fixes this for free; don't undo it with reveal-only rendering.
  - Free-text section labels and near-duplicate sections (Otee has "03 · DISCOVERY PHASE" and "04 · DISCOVERY PHASE").
  - One case study written in a different register (AI Journey reads as an essay; the other five as visual studies). Decide the register once.
  - Typos in high-visibility strings ("Industries workd", "Lets get in touch!", "independent app") — a CMS makes these fixable, but it also means copy needs review status (our `draft → review → ready`).
  - Sitemap drift (`/ai` missing) — generate the sitemap from the CMS, never by hand.
  - No contact form or booking link — fine for Pleurat's inbound, but Sina's audience includes clients; at least add a mailto with subject presets or a Cal link.

## Payload implications
Which collections / fields / blocks this suggests for the CMS.

- **`projects`** (exists in draft mapping) — add: `summary` (one line), `category` (select), `cover` (media),
  `meta` group `{ role, tools[], type, yearFrom, yearTo, liveUrl, client }`, `hero` (media),
  `sections` as **blocks**: `section { label(select), heading, body(richText), tags[], figures[] { media, layout: full|two|three } }`,
  `stats { value, caption }[]`, `testimonial { quote, attribution }`, `whatShipped[]`, `order` (drives next/prev), `featured`.
- **`experiences`** (exists) — add `index` (A1…), `blurb` (one line), `showOnHome`, relationship to `projects` (hasMany). Also `ndaOnly: boolean` to feed the NDA marquee.
- **`tools`** collection — `name`, `logo`, `purpose`, `code` (Pleurat's station codes are decoration, but a `sortOrder` is useful). Referenced from `projects.meta.tools` and from the "how I work" page.
- **`gallery`** — media with `category` (select: product / marketing / dashboard / brand) and `project` (optional relationship). Powers the tabbed screenshot grid.
- **`experiments`** (or `projects.kind = experiment`) — `title`, `status`, `period`, `purpose`, `stack[]`, `steps[]`, `stats[]`, `reportUrl`. Pleurat's "AI builds" shape.
- **`about` global** — `statements[]` (richText, short), `photos[]`, `skills[]`, `timeline { from, to, location }`, `leadMagnet { title, blurb, bullets[], file, cta }`, `stats[]` (the "by the numbers" set, with `source` field so every number is traceable).
- **`site` global** — `nav[]`, `footerColumns[]`, `socials[] { platform, handle, url }`, `email`, `location`, `responseTime`.
- All `label`, `heading`, `body`, `caption`, `blurb` fields are **localized** (EN default, FA twin) per D-009; media `alt` too.

## Screenshots
Local-only (gitignored, D-008) under `assets/pleurat-com/`:

`desktop.png` · `mobile.png` · `mobile-menu.png` — home at 1440 / 390
`work-desktop.png` · `work-mobile.png` · `about-desktop.png` · `about-mobile.png` · `ai-desktop.png` · `ai-mobile.png` · `contact-desktop.png` · `contact-mobile.png`
`case-{otee,mindpath,ai-journey,codex,appello,valuehut}-desktop.png` · `case-{otee,mindpath}-mobile.png`
`frames/` — viewport-by-viewport frames (1440×900) of `/`, `/work`, `/ai` and `/work/otee`; needed because the scroll-pinned sections (numbers chart, selected-work wall, footer transit map) render blank in full-page captures.
