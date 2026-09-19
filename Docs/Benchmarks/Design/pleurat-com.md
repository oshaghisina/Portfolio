---
title: "Pleurat Shala — pleurat.com"
url: "https://www.pleurat.com/"
slug: pleurat-com
type: design
owner: "Pleurat Shala"
owner_role: "Product Designer & AI Product Builder"
site_kind: personal-portfolio
lang: en
generator: "Vite + React SPA (react-router, TypeScript); General Sans (Fontshare) + IBM Plex Mono; images from Sanity CDN"
date_added: 2026-09-19
relevance: 4
scores:
  distinctiveness: 5
  typography: 4
  motion: 3
  brand: 5
  mobile: 3
summary: "One metaphor (the designer's bench) on cream ruled paper with a single amber accent, mono drafting labels and thin-line illustration; scroll-driven numbers as the one spectacle — motif overload and reveal-only sections are the cautionary part"
tags: [warm-paper, single-accent, mono-labels, line-illustration, scroll-driven, workshop-metaphor, editorial, light]
screenshots:
  - desktop.png
  - desktop-fold.png
  - mobile.png
  - mobile-menu.png
  - work-desktop.png
  - work-mobile.png
  - about-desktop.png
  - about-mobile.png
  - ai-desktop.png
  - ai-mobile.png
  - contact-desktop.png
  - contact-mobile.png
  - case-otee-desktop.png
  - case-otee-mobile.png
  - case-mindpath-desktop.png
  - case-mindpath-mobile.png
  - case-ai-journey-desktop.png
  - case-codex-desktop.png
  - case-appello-desktop.png
  - case-valuehut-desktop.png
  - frames/
status: draft
---

# Pleurat Shala — pleurat.com

> A "designer's workbench" rendered as cream ruled paper with one amber accent, mono drafting labels and
> thin-line illustrations — benchmarked because it shows how a single, well-chosen metaphor can carry a
> personal brand across every page without a logo wall or a hero portrait.

## Overview
Mood: a drafting table in a warm room. The page reads as a sheet of ruled notebook paper (faint
horizontal lines are visible in the page margins) framed by two hairline vertical rules that run the
full height like ledger margins. Everything on top of it is either **ink** (near-black text and line
art), **amber** (one accent, used for CTAs, section tags and the "live" bits of charts) or **mono
caption** (tiny IBM-Plex-style labels: `FIG. 004 — FOUR TRACKS, ONE BENCH`, `BENCH · LIVE`,
`1440 · 12 COL`). The personality it projects is *maker, not stylist*: calm, precise, a bit nerdy about
tools, confident enough to use dry micro-copy instead of adjectives. It is unmistakably a designer who
also writes code — terminals, file names and commit counts appear as decoration.

## Visual language
- **Typography:** one family for everything readable — **General Sans** (Fontshare, 400/500/600/700).
  H1 ≈ 58px / weight 500 / line-height 1.04 / tracking −1.75px; section H2 ≈ 41px; body 19px / 1.55.
  Headlines use a **two-tone device**: the first clause in ink, the second in a muted olive-grey
  (`rgb(139,133,119)`) — "I design apps, websites, / and **AI-powered systems**", "Ten years, / **by the
  numbers.**", "Where I've **worked**". Eyebrows, meta labels, captions and the console are monospaced
  caps at 9–12.5px with wide tracking (IBM Plex Mono is loaded; the console falls back to
  `ui-monospace`). Type scale is fluid via `clamp()` tokens (`--fs-h1: clamp(36px, 3.5vw, 54px)`,
  `--fs-display-lg` up to 84px, a `--fs-ghost` up to 420px for background numerals).
- **Color:** paper `#FBF7E6` / `#FFFCF0` panels on a `#050711` ground that only shows outside the paper;
  ink `#16140E`, secondary `#57534A`, tertiary `#8B8577`; **accent amber `#F3B44A`** with a deeper
  `#C77E0A` for text on amber; terminal panels are ink-black with cream text; hatched grey `#E7E2EE`
  frames behind app screenshots. Chart bars are diagonal-hatched outlines that fill solid amber as they
  animate. A theme toggle (◐) exists but the "light" variant only swaps the paper to flat `#F7F7F7` —
  barely perceptible. The stylesheet still ships an older lime palette (`--lime: #C0EB3A`) that is
  never visible.
- **Layout & grid:** 12 columns at 1440 (the illustration literally labels itself "1440 · 12 COL");
  content max ≈ 1280 with the two full-height hairline rules; section padding `clamp(96px, 15vh, 200px)`.
  The default section pattern is **two-column editorial**: eyebrow + short heading left, body right;
  centred only for the big statement headings. Each section opens with an **amber tag** pinned to the
  top-left of the hairline rule (`TRACKS`, `BY THE NUMBERS`, `AI TOOLS`, `TEAMS`, `NON-DISCLOSURE`) and
  a small corner bracket top-right — like a drawing-sheet title block. Dense grids (5-col employer grid,
  4-col stat bars, 10-col tool tiles, 4-col gallery) alternate with single full-bleed figures. Mobile
  collapses to one column, drops the interactive bench entirely, and stacks the stat bars 2×2.
- **Imagery:** three registers, kept strictly separate. (1) **Thin-line illustrations** in a single
  style — a city skyline strip with a walking "commuter" character, an isometric layered board for the
  tracks carousel, a home-office scene on `/about`, a build pipeline drawn as a rail line on `/ai`, and a
  footer "Daily kit" transit map where tools are stations. (2) **Product mockups** — devices on green or
  cobalt fabric, phones in shirt pockets; case-study hero material. (3) **Tool artefacts** — FigJam
  boards, Figma file trees, a dark Figma-like canvas with a sticky note, terminals. No hero portrait;
  photos of the person appear only in a small strip on `/about`.
- **Motion & interaction:** everything is scroll-driven and in-DOM (no WebGL, no cursor effects).
  Stat bars fill and counters count up while the section is pinned; a single MindPath screenshot zooms
  out into a 5-wide mosaic of ~20 screens; statement paragraphs on `/about` highlight word by word as
  you scroll; the hero ticker rotates employers ("06 ThemeForest", "08 Valtech") while the commuter
  walks; the console types its log lines; the tracks carousel has prev/next. Reveal-on-scroll fades are
  aggressive — sections stay at `opacity: 0` until they intersect, so they render blank to anything that
  doesn't scroll. Easing is a single custom curve (`cubic-bezier(.22,1,.36,1)`) with 200/320/550 ms
  durations and a `--lift: -2px` hover lift on controls.
- **Components:** lower-case custom logotype "pleurat"; nav of four text links + theme toggle + an amber
  **Contact** button, active link marked by a small amber dot below; amber primary CTA with ↗ and an
  outlined secondary; **section tag**; the **bench** (amber title bar with three window dots and a
  breadcrumb `PORTFOLIO / WORKSPACE / WORKSPACE ▪ READY`, left rail of 4 items with mono sub-labels,
  dotted canvas that draws a flowchart and sticky notes, chip row `FIGMA · CURSOR · CLAUDE`, black console
  with prompt and `NEXT / HELP / CLEAR` buttons, footer caption `FIG. 004`); stat bar; square tool tile
  with mono caption; employer cell (index, name, mono role, blurb); 6-column project rail with `+`
  corners; screenshot tile → lightbox; accordion; case-study **meta strip** (4–5 cells); stats trio;
  "What shipped" list with `↳` bullets; next-case card; footer transit map; mobile drawer nav (numbered
  `01–05`, large type, email + location pinned at the bottom).

## Brand storytelling
The metaphor is **the bench**: the portfolio *is* the workshop, and the site keeps insisting it is a
live tool rather than a brochure — `BENCH · LIVE`, `LIVE · NEVER FINISHED`, "workspace live — it carries
on without you", a sticky note that says "Ship the thing. Then make it worth keeping. — still going".
The narrative order on the home page is: **what I make** (hero) → **who trusted me** (employer ticker
over the city) → **how I work** (bench with four tracks, tools) → **how much** (numbers) → **where**
(employer grid) → **show me** (selected-work wall) → **write to me**.

Experience is visualised three ways, none of them a résumé: a rotating ticker of employers over a
skyline, a scroll-filled bar chart ("the decade counted rather than described"), and a typographic
A1–A10 grid. History is compressed into one line — "2015 — NOW · PRISTINA, CET" — and one statement
paragraph. Craft is signalled by *showing the tooling*: FigJam boards, Figma file structure, terminal
runs with `axe · contrast 4.9:1 — AA`, commit counts. The AI positioning is delivered as a slogan in
the same two-tone headline device — "AI does not design. **It does the other 80%**" — and then proven
with a fake-but-plausible build log. The place (Pristina · CET Europe) is worn proudly in the footer of
every page. Warmth comes from the paper, the illustrations and the dry humour, not from photography.

## Key screens
- **Home hero + bench** (`frames/home-01`, `home-02`): two-tone H1 left, lede + two CTAs right; the
  employer ticker and city strip sit *between* hero and bench, so the fold ends on an illustration.
  The bench is the signature component — and it's hidden on mobile.
- **Numbers** (`frames/home-05`–`home-07`): a pinned section where four hatched bars fill amber and
  count up; the least "designed" section visually, but the most memorable on scroll.
- **Employer grid + work wall** (`frames/home-08`–`home-11`): the grid is pure type; the wall zooms
  from one screenshot to a mosaic, ending on a lone amber "Explore portfolio" button.
- **Footer** (`frames/home-12`): the tools-as-transit-map illustration with a walking figure, then four
  quiet columns — the footer is a set piece, not an afterthought.
- **/work** (`work-desktop.png`, `frames/work-*`): a six-column rail of tall project cards, an NDA
  marquee, then the tabbed gallery — density goes *up* as you scroll, the opposite of the home page.
- **/ai** (`ai-desktop.png`, `frames/ai-*`): manifesto hero, a numbered 8-row table (index · category ·
  title · description), and the bench reused for three builds with a terminal log.
- **Case study** (`case-otee-desktop.png`, `frames/work-otee-*`): back link, title, one-liner, meta
  strip, full-bleed hero; then alternating two-column text blocks and figures with a sticky mini index
  of section numbers in the left margin; ends with three purple-headed columns (Apps / Web / Kiosk),
  "What shipped", next-case card.
- **/about** (`about-desktop.png`): centred statement with word-highlight → large home-office
  illustration → dark Figma canvas with sticky note → two-column story + photo strip → skills chips →
  employer grid → e-book with a rendered book cover.
- **Mobile** (`mobile.png`, `mobile-menu.png`): one column, drawer nav with numbered oversized links; the
  bench is dropped rather than squeezed; stat bars go 2×2; every section still opens with its amber tag.

## Takeaways for Sina
- **Borrow:**
  - **One accent colour, used sparingly and always for the same jobs** (CTA, section tag, "live" state) — the restraint is what makes the amber read as brand.
  - The **two-tone headline** device — cheap to implement (a `<span>`), gives every H1/H2 a rhythm and a place to put the point.
  - **Amber section tags on a hairline rule** as the section opener — a consistent wayfinding pattern that also works as a design token for Payload blocks.
  - **Mono caps for metadata** (eyebrows, meta strip, captions, stats labels) vs. a single humanist sans for everything readable — a clean two-role type system.
  - **Typographic employer grid** with index codes instead of logos; **meta strip** on case studies; **stats trio** with mono captions; **"What shipped"** list; **next-case card**.
  - A **numbered mobile drawer** with oversized links and contact details pinned at the bottom.
  - Scroll-driven **numbers** as the one "spectacle" moment — motion that carries meaning, not decoration.
- **Adapt:**
  - The **metaphor**, not the surface. Pleurat's bench is a *maker's* metaphor; Sina's brand (D-007) sits between design, marketing and product — the equivalent might be a control room / campaign board / dashboard where design, growth numbers and roadmap live on one surface. Pick one and let it generate the components (title bar, rail, canvas, log), the way the bench does here.
  - **Bilingual type system (D-009).** General Sans has no Persian glyphs. The two-role system still works, but each role needs a Persian partner (e.g. a contemporary Persian sans for body/headings paired with a Latin grotesk of matching weight/x-height; mono captions can stay Latin/numeric). Test the two-tone headline in RTL — the "second clause" flips sides.
  - **RTL layout.** The two-column editorial pattern (heading left / body right), the left-margin section index and the top-left section tags all mirror in FA. Design the section block so its mirror is a CSS `dir` flip, not a second layout.
  - **Illustration budget.** The line-art system is a large part of the warmth and would be expensive to replicate. Options: a smaller set (one hero strip + one footer piece) in a consistent style, or replace with typographic/data motifs that Sina can produce himself (his dashboards and campaign numbers are visual material).
  - The **hero without a portrait** works for Pleurat; for a personal-brand-first site that also courts clients, consider a portrait on the home page and keep the illustration language for everything else.
  - **Dark/light**: Pleurat's toggle changes almost nothing. Either make the two themes genuinely different (paper vs. slate) or drop the toggle.
- **Avoid:**
  - **Reveal-on-scroll that hides entire sections** — hurts a11y (no `prefers-reduced-motion` fallback visible), SEO snapshots and screenshot tooling; with SSR the content should be visible first and *enhanced* by motion.
  - **Motif overload** — bench + console + city strip + transit map + isometric board + Figma canvas is five visual jokes on one home page; they compete with the actual work. Cap at two signature motifs.
  - **Low-contrast mono captions** — tertiary `#8B8577` on cream at 9–11px is ≈3.3:1; fine for decoration, not for meta the visitor needs to read (role, year).
  - Hiding the signature component on mobile — design the mobile version of the metaphor, don't delete it.
  - **Page length** — MindPath is ~21k px at 1440 (24 viewports). Set a cap per case study.
  - Shipping dead tokens (the unused lime palette) and hand-maintained sitemaps — small, but they show in a portfolio that claims systems discipline.

## Notes
- **Stack:** Vite + React SPA (react-router; lazy chunks named `SiteHome`, `Commuter`, `Ledger`, `Console`, `theme`), TypeScript, Sanity for images (`cdn.sanity.io`, AVIF/WebP with `?w=&q=&auto=format`), private `/editor` route (noindex + `robots.txt` Disallow) and an internal `/ui` component bench. Fonts: General Sans via Fontshare (preloaded as style, swapped in), IBM Plex Mono via Google Fonts. Analytics: GA4, PostHog (autocapture, dead-click and rage-click capture), utest.me. JSON-LD `Person` + `WebSite`; custom 1200×630 OG card drawn in the site's own style.
- **Performance:** thoughtful font loading (preload + `display=swap`, only two preconnects), heavily annotated `index.html` explaining every head decision — the site was very likely built with an AI coding agent using the same "CLAUDE.md / AGENTS.md as contract" method its AI Journey case study describes.
- **Accessibility:** focus ring token (`--focus-ring`), semantic `h1–h4`, alt text on all Sanity images (some lazy: "3", "4"). Contrast of tertiary mono text is borderline. Reveal-on-scroll with no visible reduced-motion path. Theme toggle has no visible label.
- **Quirks:** typos ("Industries workd", "Lets get in touch!"); `/ai` absent from `sitemap.xml`; duplicate section label in Otee ("03 · DISCOVERY PHASE", "04 · DISCOVERY PHASE"); `--mono` var is overridden to General Sans in one theme so mono labels partly fall back to `ui-monospace`; the "light" theme is nearly indistinguishable.
- **Recognition:** Awwwards profile linked (`awwwards.com/Pleurats`), Dribbble, ThemeForest author (730+ clients) — the ThemeForest past explains the front-end fluency.

## Screenshots
Local-only (gitignored, D-008) under `assets/pleurat-com/`:

`desktop.png` · `mobile.png` · `mobile-menu.png` — home at 1440 / 390
`work-desktop.png` · `work-mobile.png` · `about-desktop.png` · `about-mobile.png` · `ai-desktop.png` · `ai-mobile.png` · `contact-desktop.png` · `contact-mobile.png`
`case-{otee,mindpath,ai-journey,codex,appello,valuehut}-desktop.png` · `case-{otee,mindpath}-mobile.png`
`frames/` — viewport frames (1440×900) of `/`, `/work`, `/ai`, `/work/otee`: the pinned sections (numbers chart, work wall, transit-map footer, bench) only render in these, not in full-page captures.
