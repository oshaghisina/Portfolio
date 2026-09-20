---
title: "Jingjing Han — jingjinghan.com"
url: "https://www.jingjinghan.com/"
slug: jingjinghan-com
type: design
owner: "Jingjing Han"
owner_role: "Product Designer & Creative Technologist"
site_kind: personal-portfolio
lang: en
generator: "Next.js (Vercel-hosted, ISR-prerendered, Turbopack build chunks) + Tailwind CSS; Blinker (display) + Gilroy (body/nav) + Sulphur Point (captions) local variable fonts via next/font; full OG/Twitter card meta, no JSON-LD, no meta generator tag"
date_added: 2026-09-19
relevance: 4
scores:
  distinctiveness: 3
  typography: 3
  motion: 3
  brand: 4
  mobile: 3
summary: "True-black identity pages vs. cream project pages, one lime accent, and a persona-switcher intro tie a product-design practice and a live-performance practice into one brand; strong on the multidisciplinary story, plain on body typography and very long pages"
tags: [black-white-split, lime-accent, persona-switcher, numbered-process, pull-quote-callouts, multidisciplinary, editorial-case-study, dark]
screenshots:
  - desktop.png
  - desktop-fold.png
  - mobile.png
  - design-desktop.png
  - about-desktop.png
  - case-first-movers-desktop.png
  - performance-desktop.png
  - playground-nook-desktop.png
status: draft
---

# Jingjing Han — jingjinghan.com

> A product designer/creative technologist who is also a trained stage performer: Home and About run
> in true black with one lime accent; every project page (design gallery, case studies, performances)
> switches to a cream editorial canvas. Benchmarked for the persona-switcher intro and for how it uses
> two completely different image registers — UI screenshots vs. stage photography — to hold two
> disciplines in one brand without them fighting each other.

## Overview
First impression: a designer's landing page, not a case-study wall — full-bleed black, a huge
lowercase-feeling "Jingjing Han" set in a rounded display face, one soft sentence of positioning
("New York based product designer who loves beautiful things and blends creativity, technology, and a
little vibe-coding into every build"), and nothing else above the fold except a "scroll" hint. A brief
full-screen preloader runs before the hero settles in. The personality is warm and slightly playful
("vibe-coding") rather than austere, but the black canvas and single lime accent keep it from reading as
cute. The site's real distinguishing move only shows up once you scroll or click through: this is one
person running two visibly different practices — interface design and live/movement performance — and
the site is structured to let each one keep its own visual register instead of forcing one look onto
both.

## Visual language
- **Typography:** three roles, not two. **Blinker** (variable) carries all large display type — the
  home H1 renders at ~102px/400, section H1s on inner pages at ~102px/500 with tight tracking (as
  negative as ‑3px at that size). **Gilroy** (variable) is the reading/UI face — nav, body copy, buttons,
  all at a plain 16–18px/400 with no visible custom scale beyond headings. **Sulphur Point** (a blocky,
  slightly technical Google-fonts display face) shows up as a caption/subhead voice, e.g. the `/design`
  page's subtitle ("Product design, web design, and self-initiated experiments — everything in one
  place."). Hierarchy elsewhere leans on **opacity, not size** — nav links and the persona buttons sit
  at `white/40%` and brighten to `white/75–100%` on hover/active, which is elegant on a dark background
  but easy to miss as a resting state.
- **Color:** identity pages (Home, About) are **true black** (`rgb(0,0,0)`) with **pure white** text;
  project pages (`/design`, case studies, `/performance`, playground detail) switch their outer canvas
  to an **off-white `#F6F6F4`** with near-black text — this is a per-page canvas swap, not a global
  dark-mode toggle (`<body>` stays black as the fallback; each page's top-level wrapper overrides it).
  The **one accent is a vivid lime `#8CFF2E`** (`rgb(140,255,46)`) — used only for the "available for
  work" status dot and the active-nav underline dot, nowhere else. Project thumbnails supply the rest of
  the color: each tile in the `/design` grid carries its own bespoke background (cobalt for Sourcing,
  hot pink for the networking-platform app, near-black for Nuro AI, mint for Nook) rather than sitting
  in a uniform card frame.
- **Layout & grid:** home is a stacked single column of full-width sections (hero → Intro → Featured
  Work → Playground → Web Design → Performances → footer), each edge-to-edge on black. `/design`,
  `/performance` and case studies switch to a **bordered, contained canvas** (`max-w-[1274px]`,
  hairline `border-neutral-300` verticals) with a **masonry-style 2-up tile grid**, closer to a gallery
  wall than a résumé list. Case studies and the one Playground page inspected both use a **numbered
  single-column narrative** (eyebrow `01`, `02` … + short section title + body), one column, generous
  vertical rhythm, no side-by-side layout at all.
- **Imagery:** two registers, kept strictly apart — the site's actual thesis. **Product work**: flat UI
  screenshots and laptop/phone mockup renders, one consistent flat-design language across all four
  product case studies and three playground pieces. **Performance work**: real stage/site photography —
  motion-blurred limbs, red stage lighting, a moving-image portrait — nothing flat or vector about it.
  No video/motion-capture footage is embedded anywhere on the site, which is a notable absence given
  that "motion capture" and "movement" are named credits on three of the six performance pieces.
- **Motion & interaction:** a full-screen preloader before the hero reveals; scroll-triggered fade/slide
  reveals (class name `wd-in`) on most sections; a custom cursor-hover state (`data-cursor-hover="true"`
  on interactive elements, implying a cursor-follow effect not visible in static screenshots); an
  orbiting-badge animation around the About-page avatar; a horizontal carousel on the "Other
  Performances" section. Nothing here is a single "spectacle" moment (no scroll-pinned counters, no
  zoom-out mosaic) — motion reads as competent default polish rather than a designed set piece.
- **Components:** logo/name lockup + 3-link nav + external "Resources ↗" + LinkedIn/email icons (same
  on every page); persona-switcher button list beside a swappable quote card (Home "Intro"); featured
  work card (thumbnail + title, links into the filtered `/design` grid); filter-pill row (`All / Product
  Design / Web Design / Playground`) on `/design`; masonry project tile; numbered case-study section
  with an inset **pull-quote callout box** (one bolded insight sentence per section, visually promoted
  out of the body copy); browser-chrome mockup frame (Playground detail); role/year performance card;
  vertical "journey" timeline (era heading + paragraph, connecting rule) on `/about`; 3-card
  Discover/Design/Deliver process strip; "Curious to see more?" / next-project footer.

## Brand storytelling
The hero states the positioning once, plainly, then the **"Intro" section does something few
portfolios attempt**: a row of persona buttons — `For anyone`, `Recruiters`, `Product Designers`,
`Product Managers`, `Engineers` — sits beside a single quote card, reading as an audience switcher that
lets one page speak differently to different visitors without duplicating content. ❓ In a quick
automated check the card's copy did not visibly change on a button click — worth confirming by hand
before treating this as a working personalization feature rather than a styled (but inert) tab list.

The real narrative arc, though, is disciplinary rather than chronological: **what I design** (hero) →
**who this is for** (persona intro) → **product work** (Featured Work, flat UI) → **self-directed
work** (Playground, same flat register) → **web design** (outbound projects) → **performance** (Home
ends on this, in real stage photography) → **contact**. By closing the home page on performance work
rather than burying it in a footnote, the site insists the two practices are equally load-bearing parts
of the same person, not "day job + hobby." `/about` reinforces this with an orbiting-badge avatar
graphic listing four identities at once (Digital Product Strategist · UX Designer · Creative
Technologist · Design Researcher) and a six-stop "journey" timeline that traces design *from* movement
("It all starts with body" → "From movement to making" → "Becoming a UX designer") rather than treating
performance as a detour from a design career.

## Key screens
- **Home hero + Intro** (`desktop-fold.png`, top of `desktop.png`): black canvas, oversized name, one
  positioning sentence, then the persona-switcher beside a quote card — the fold ends on an interactive
  device, not an image.
- **Featured Work → Playground → Web Design → Performances** (`desktop.png`): four registers stacked in
  one scroll — product screenshots, self-directed product screenshots, outbound web-design thumbnails,
  then real photography — density and color both increase as the page goes on.
- **`/design`** (`design-desktop.png`): the canvas flips to cream; a filterable masonry grid where every
  tile carries its own bespoke color/photo treatment rather than a uniform card — closer to a gallery
  wall than a project list.
- **Case study — First Movers / "Designing an AI-Powered Learning Experience"**
  (`case-first-movers-desktop.png`): eight numbered sections, each closing on a bolded pull-quote
  insight ("Users do not think in categories. They think in outcomes."), ending on a working-prototype
  flow screenshot rather than a metrics slide.
- **`/performance`** (`performance-desktop.png`): a 2-up grid of six credited works (role tags, year,
  one-liner) in real stage photography, then a black-background "Other Performances" carousel with
  director/performer credit lines — the site's only place that looks like a theater program instead of
  a design portfolio.
- **Playground — Nook** (`playground-nook-desktop.png`): the same numbered-section format as the case
  study (`01 Why I Built It` … `06 Reflection`) but shorter, wrapped in a browser-chrome mockup frame,
  ending on a two-item "curious to see more?" cross-link.
- **`/about`** (`about-desktop.png`): orbiting role-badge avatar graphic, a six-stop vertical "journey"
  timeline mixing personal history (born in Beijing) with a design origin story, then a 3-card
  Discover/Design/Deliver process strip before the shared contact footer.
- **Mobile** (`mobile.png`): single column throughout; the persona-switcher, filter pills and masonry
  grid all collapse to stacked full-width blocks; the homepage alone runs to roughly 21,000px tall at
  390 CSS px.

## Bilingual / RTL notes
No second language (`lang="en"` only), no RTL, no locale switcher anywhere in the nav.

- **Would not survive as-is:** Blinker and Gilroy are Latin-only display/body faces with no evidence of
  Arabic-script glyph coverage — a Persian version needs partner faces at matching weight/x-height (per
  D-009). The large-scale negative tracking on Blinker headlines (down to ‑3px at 102px) is a Latin-type
  trick that doesn't transfer to Persian's looser, more open letterforms.
- **Survives as a concept, not as copy:** the persona-switcher (labels translate directly; the
  interaction pattern is language-agnostic) and the black-identity/cream-work canvas split (pure color,
  no directional dependency).
- **Mirrors as layout, if built with logical properties:** the left-aligned nav, the numbered-section
  eyebrow (`01`, `02`…) which is numeral not directional, and the pull-quote callout boxes (centered
  insets, no inherent direction).
- **Needs a directional decision:** the "Other Performances" horizontal carousel currently plays
  left-to-right with dot pagination beneath — an RTL build would need to decide whether the carousel
  itself flips direction.

## Takeaways for Sina
- **Borrow:**
  - The **persona-switcher intro** — one hero section, several audience buttons, one swappable summary
    paragraph — is a cheap, direct answer to "who is this site for" on a mixed-audience personal brand
    (D-007), without duplicating the whole homepage per visitor type. ❓ Confirm the interaction actually
    swaps copy before copying it — see the note above.
  - **Two image registers, one brand.** Sina's split isn't design vs. performance, it's
    design/marketing/product — the same trick applies: let each practice's proof material look like
    what it actually is (dashboards and campaign creative for marketing, UI for product) instead of
    dressing every practice up as a design screenshot.
  - **Numbered case-study sections with one promoted insight per section** (the pull-quote callout) —
    forces the writer to state a conclusion, not just narrate, and makes a long case study skimmable
    from the bolded lines alone.
  - A **filterable, bespoke-color project grid** once there are 10+ pieces spanning different kinds of
    work — closer to a gallery than a template list, and the filter (by kind of work) maps directly onto
    a mixed practice like Sina's.
  - **Closing the home page on the "other" practice**, not burying it — signals both disciplines are
    equally real rather than one being a day job and the other a footnote.
- **Adapt:**
  - **Bilingual type (D-009).** Neither Blinker nor Gilroy has a Persian partner; pick faces with
    matching weight/x-height logic for each role, and drop the large negative tracking on FA headlines.
  - The **type hierarchy relies on opacity states** (white/40 → white/75) more than a real type scale —
    fine on a high-contrast black background, riskier to reuse on a lighter or bilingual palette where
    opacity steps read less cleanly.
  - The **persona list and filter taxonomy are Jingjing's own** (recruiters/PMs/engineers; product
    design/web design/playground) — Sina's equivalent audience and practice labels need their own pass,
    not a copy of these.
- **Avoid:**
  - **Extremely long pages with no shortcuts** — the homepage alone runs to ~21,000px on mobile, and the
    First Movers case study was tall enough that the capture tool clipped it at 15,000px. Same caution
    as pleurat's MindPath case study: cap section count or add in-page jump links.
  - **Long paragraphs in pure white on pure black.** Fine for a one-line hero; the About-page journey
    timeline runs six ~80-100-word paragraphs in full-white-on-full-black, which is technically
    high-contrast but can read as harsh/halation-prone for extended reading — worth dropping body-copy
    opacity slightly (the nav already does this elsewhere) rather than using 100% white for long text.
  - **Outbound work with no in-site context.** The four "Web Design" projects exist only as a thumbnail
    + one-liner that link out (↗) to other sites — no role, process or outcome stated in-site — a dead
    end for anyone who doesn't click through immediately, and it hands the rest of that visit to a page
    Sina wouldn't control.
  - **A subtle, easy-to-miss interactive affordance** (the persona buttons rest at 40% opacity with no
    obvious "click me" cue) — if Sina borrows the persona-switcher, give it a clearer resting-state
    signal than this version has.

## Notes
- **Stack:** Next.js, server-rendered and prerendered on Vercel (`server: Vercel`,
  `x-nextjs-prerender: 1`, `x-nextjs-stale-time: 300` → ISR with a 5-minute revalidate window),
  Turbopack build chunks (hashed `_next/static/chunks/*.js` names, literal `turbopack` string in the
  served markup) and Tailwind CSS utility classes in the DOM (`bg-[#f6f6f4]`, `font-sulphur`,
  `text-neutral-9`). Three **local** variable fonts — Blinker, Gilroy, Sulphur Point — loaded via
  `next/font` (CSS-module classnames on `<html>`, e.g. `blinker_e8661953-module__…__variable`) and
  preloaded as `woff2`. `next/image` responsive `srcSet`s are used throughout (`/_next/image?url=…`),
  including priority preloads for hero/case-study images. Full **OG + Twitter card** meta (dedicated
  `/seo/og-image.png`, `summary_large_image`) and a canonical URL (`https://www.jingjinghan.com`, **with**
  `www`, opposite of `arturospatino-com`'s no-`www` canonical). No `meta[name=generator]` tag and **no
  JSON-LD structured data** — a gap relative to `arturospatino-com`'s `Person` schema. A full-screen
  preloader (`preloader-root`) runs on first load. Interactive elements carry `data-cursor-hover="true"`,
  implying a custom cursor-follow effect not visible in static captures.
- **Performance:** fonts and several hero/case-study images are explicitly preloaded (standard
  Next.js optimization), but page weight aside, the sheer **scroll length** is the main concern — the
  homepage alone is ~21,000px tall on mobile; several inner pages (design gallery, case study,
  performance list) also run long with heavy imagery.
- **Accessibility:** contrast is technically strong everywhere (pure white/black, near-black/cream) but
  see the "Avoid" note on long white-on-black paragraphs. Checked the served HTML directly (same method
  as `arturospatino-com`'s "Skip to content" check): **no skip-to-content link and no `sr-only` /
  `focus-visible` / `focus:` utility classes were found anywhere in the markup** — a real gap next to
  `arturospatino-com`'s `sr-only focus:not-sr-only` baseline. No `meta[name=robots]` restriction either
  (fully indexable). Reduced-motion behavior was not tested.
- **Recognition:** no awards-platform badges or press mentions surfaced; the performance section's venue
  credits (ShenZhen Biennial Theater Festival, Beijing Times Art Museum) function as the closest thing
  to third-party validation on the site.

## Scores
Justification for each `scores.*` value and `relevance` — see [Rubric](../Rubric.md).

- **distinctiveness: 3** — the black-identity/cream-work split plus one lime accent is consistent and
  clean, but that specific move (dark hero, light gallery, single accent) is a familiar genre within
  portfolios; the genuinely unique material — the stage photography and the persona-switcher — sits
  below the fold and wouldn't be the first thing recalled from the hero alone.
- **typography: 3** — a real three-role system (Blinker display / Gilroy body / Sulphur Point captions)
  with deliberate large-scale tracking on headlines, but body copy defaults to plain 16–18px paragraphs
  with no visible measure control, and hierarchy leans on opacity steps rather than a type scale.
- **motion: 3** — preloader, scroll-reveal fades and a custom cursor are all present and never block
  reading, but none of it is a designed "spectacle" moment the way a counted stat or a zoom-out mosaic
  is elsewhere on the web — it reads as solid default polish, not a authored motion idea.
- **brand: 4** — the two-practice story is genuinely *visualised*, not just claimed: product and
  performance work are kept in deliberately different image registers so a reader feels the switch, and
  the persona-switcher is a rare, direct content device for a mixed audience.
- **mobile: 3** — single-column stacking and card collapse work cleanly, but the page runs extremely
  long with no in-page shortcuts, and the already-subtle opacity-based hierarchy gets harder to read at
  phone width.
- **relevance: 4** — Avg 3.2, relevance 4: not a visual model for Sina's site (the palette/genre is
  common), but strong for two specific, exportable patterns that map directly onto Sina's actual
  structural problem — a mixed audience (persona-switcher) and multiple practices under one name
  (image-register separation) — even though Jingjing's second practice is performance, not
  marketing/product.

## Screenshots
Local-only, in `assets/jingjinghan-com/`: `desktop.png` (1440) · `mobile.png` (390) ·
`desktop-fold.png` (1440×900, first viewport).

Additional captures: `design-desktop.png` (`/design`) · `about-desktop.png` (`/about`) ·
`case-first-movers-desktop.png` (`/work/first-movers`, clipped at 15,000px — the page is taller) ·
`performance-desktop.png` (`/performance`) · `playground-nook-desktop.png` (`/playground/nook`).
