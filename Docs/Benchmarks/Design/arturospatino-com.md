---
title: "Arturo Spatino — Product Designer"                 # Site / project name
url: "https://www.arturospatino.com/"
slug: "arturospatino-com"                  # domain in kebab-case; equals this file's name
type: "design"
owner: "Arturo Spatino"                 # Person or studio behind it
owner_role: "Product Designer"            # e.g. Product Designer, Art Director
site_kind: "personal-portfolio"             # personal-portfolio | studio | agency | product | other
lang: "en"                  # html lang, e.g. en
generator: "Next.js App Router (Turbopack build chunks) + Tailwind CSS utility classes; Geist variable font via next/font; JSON-LD Person schema"
date_added: "2026-09-19"
relevance: 4              # 1–5 relevance to Sina's brand — see ../Rubric.md
scores:                   # 0 = not scored yet (draft only); 1–5 per ../Rubric.md
  distinctiveness: 3
  typography: 4
  motion: 3
  brand: 4
  mobile: 3
summary: "A single grainy B&W portrait and near-total grayscale portfolio chrome (Geist, #111111 on white) stay deliberately quiet so four full case studies — each with its own real color system, type choice and a hard number — can supply all the personality; restrained system, cramped mobile explorations grid"
tags: [minimalist, monochrome, grotesk, portrait-hero, editorial, restrained, light, personal-portfolio, case-study-format]
screenshots:
  - desktop.png
  - desktop-fold.png
  - mobile.png
  - about-desktop.png
  - about-mobile.png
  - work-desktop.png
  - work-mobile.png
  - case-4fett-desktop.png
  - case-4fett-mobile.png
  - case-togevent-desktop.png
  - case-kiwi-desktop.png
  - case-bounty-hunters-desktop.png
status: draft
---

# Arturo Spatino — Product Designer

> Product Designer with 10+ years of experience designing digital products across startups, agencies and consulting environments. Benchmarked for its inverse move to `pleurat-com`: the portfolio *chrome* stays almost entirely
> colorless and unbranded, and every ounce of personality is pushed down into four real, fully-worked
> case studies instead.

## Overview
Mood: quiet confidence. A grainy black-and-white portrait (hand half-covering the face, direct gaze with
the other eye) sits opposite a two-tone headline and carries almost the entire personality of the *shell*
of the site — everything else is deliberately neutral: white ground, near-black text (`#111111`), one
gray for secondary copy, hairline gray borders. The very next thing you see, one scroll down, is a
full-bleed strip of the work in real, saturated color (a Napoli-branded ticketing app on two phones).
That cut — moody monochrome self-portrait → bright color proof — is the site's one real structural move,
and it repeats at every level of the site: the four project covers (4fett's terracotta desk flat-lay,
Togevent's green isometric wedding board, Bounty Hunters' black-and-orange grid, Kiwi's cyan-lit product
shot) are the only saturated color anywhere until you open a case study, where each one runs its own
small, real design system (a documented typeface swap, five named hex swatches, a "400+ Mobile Screen"
stat card). The personality it projects is *understated professional*: no manifesto, no illustration
system, short declarative copy ("Understand before designing.", "Clarity, hierarchy, and detail."), a
first-name-basis sign-off (`ciao@arturospatino.com`).

## Visual language
- **Typography:** a single family across the portfolio chrome, **Geist** (Vercel's grotesk, loaded as a
  variable font via `next/font`, referenced in the page's own CSS class as `geist_…__variable`). The H1
  uses a **two-tone, word-level device**, reused verbatim as the pattern for every page's big statement
  heading: "**Designer** crafting digital experiences from **UX to UI systems**." on `/`, "A collection of
  **projects**, **explorations** and **details**. Some are case studies. Some are just good work." on
  `/work` — in each case the emphasized clauses are near-black and the connective tissue between them is
  muted gray, so the eye lands on the nouns that matter. Body copy and nav sit on the same sans at a
  lighter weight and `gray-400`. Section eyebrows are plain (`Info`, `Services`, `Work`, `Work Experience`,
  `Clients`, `Design Goals`) rather than mono-cap labels — no second typeface anywhere, including the
  `001–004` service indices or the case-study meta labels (`Year`, `Role`, `Type`, `Link`). Simpler and
  less deliberate than a two-role type system, but consistent end to end across all seven pages.
  Inside one case study (Bounty Hunters), a typeface swap is documented as a real decision — "replacing
  Helvetica with Saens by Display Type. Not just for legibility, but because it felt right for a platform
  that champions original work, a typeface with character" — the one moment the site talks about type as
  craft rather than just using it.
- **Color:** effectively **no accent color** in the portfolio's own chrome — background is pure white
  (`bg-white`), text `#111111`, secondary copy and inactive nav links `gray-400`, hairline dividers
  `gray-100`, identical on every page. The only color in the shell comes from photography: the grayscale
  portrait, full-color case-study covers, and a grayscale client-logo strip. Color *does* show up, richly,
  once you're inside a case study — Kiwi's page presents its own five-swatch product palette as named
  hex chips (**Vapor Blue** `#367CDE`, **Cloud White** `#F3F5F8`, **Midnight Cobalt** `#1E3E6F`, **Aero
  Mist** `#0DBDEF`, **Carbon Black** `#000000`), and 4fett's dashboards run a dark teal/navy UI with a
  cyan accent. The absence of a brand color at the *portfolio* level is the choice — it reads as "the
  work supplies the color," and the case studies prove that's a deliberate withholding, not an inability.
- **Layout & grid:** a centered `max-w-5xl` (~1024px) container on every page; a thin `border-gray-100`
  rule under the fixed header is the only structural line (no hairline side rules, no grid labels, no
  drafting-sheet devices). The home hero is a 2-column split (headline + intro left, portrait right,
  roughly 45/55); directly below it a full-bleed banner breaks the container for the phone-mockup strip.
  Sections elsewhere return to the centered column with generous vertical whitespace and a repeated
  **label-left / content-right** pattern (`Info` → bio, `Work Experience` → timeline, `Design Goals` →
  paragraph) that appears on the home page, `/about` and inside every case study. Services form a plain
  **4-up grid** of numbered cards; the home Work section is an **asymmetric 3-up grid** (two stacked
  smaller tiles beside one large tile); `/work` itself runs a flat **4-up grid** of case-study covers
  followed by a denser photo-grid "Explorations" gallery (3 columns × 3 rows, last row 2). Case studies
  share one template: title → 4-cell meta strip (Year / Role / Type / Link) → full-bleed hero → 2–4
  paragraphs of body copy → a 3-phone screenshot row → "Design Goals" (label-left/content-right again) →
  a loose grid of supporting screens and lifestyle shots → a next-project link. Mobile keeps the case
  study and About sections single-column but the `/work` grids only go **2-up**, not 1 — case-study
  covers and Explorations tiles both stay two per row on a 390px viewport.
- **Imagery:** two strictly separate registers at the shell level — one B&W editorial portrait (the only
  "person" photo on the whole site, reused unchanged on `/` and `/about`) and full-color **product
  photography/mockups** everywhere else: devices on fabric, wood-grain or marble surfaces (4fett on a
  round wood table, Kiwi's vape pen on ribbed green fabric, Bounty Hunters' laptop on a tan armchair,
  Togevent's phone in-hand against concrete), isometric illustration (Togevent's wedding-venue board),
  and an "Explorations" gallery of eight Napoli/fantacalcio-themed app mockups that reads as pure design
  practice rather than client work. A horizontal grayscale **client-logo wall** on `/about` (Talent
  Garden, sketchin, Tangity, THE WAVE, KIWI, Poste Italiane, Barilla, e.on, enel, PRADA, BPER, sanofi,
  DHL, brembo, MONOGRID, Togevent, plus a couple of stylized/cursive marks not fully legible at this
  resolution) supplies scale and social proof without color or commentary.
- **Motion & interaction:** assessed from static full-page captures across all seven pages plus the page
  markup (no live interaction session was run), so this is a lighter-confidence read than usual, but the
  read is now consistent across every page: nothing renders blank-until-scroll the way it can on
  reveal-heavy sites, no pinned/scroll-jacked sections were found (unlike `pleurat-com`'s bench and
  numbers chart, which only render correctly mid-scroll), and the markup shows only Tailwind
  `transition-colors` on nav-link hover (`gray-400` → `#111111`). Reads as intentionally quiet rather
  than under-built — a fully static, SSR-friendly, screenshot-friendly site.
- **Components:** plain text nav (Home/About/Work/Contact, active item black, inactive gray-400, no
  button styling, identical on every page); numbered service card (thin outline icon, `00x` index, bold
  one-line title, one-line description); label-left/content-right info block with a text "Discover more"
  link; 3-up asymmetric work grid (home) vs. flat 4-up case-study grid (`/work`); **employer-grid cell**
  on `/about` (small brand-colored square icon — Nebula's purple diamond, Bip Red's red mark, The Wave
  Studio's blue "TW", SEO Tester Online's icon — plus role, date range, 2–3 short paragraphs); grayscale
  client-logo strip; **case-study meta strip** (Year / Role / Type / external "Visit site" link); "Design
  Goals" callout block; loose supporting-screens grid with alternating full-bleed lifestyle photography;
  **named hex-swatch chip** (seen in Kiwi: color name, swatch, `HEX Color Code`, value); "Next project"
  footer link with the following project's name; closing full-width contact band ("Connect, collaborate,
  or just say hello") with a large email link and LinkedIn, repeated verbatim at the bottom of all seven
  pages.

## Brand storytelling
The funnel is completely literal, in this order: **who** (hero: name-equivalent tagline "Design by
Art.", role, years) → **proof, immediately** (color product banner under the fold, before any "about"
text) → **what I do** (Services, four numbered cards) → **the work** (selected case studies +
explorations) → **who trusted me** (client-logo wall) → **talk to me**. There is no framing metaphor
(contrast with `pleurat-com`'s "workbench") — the structure *is* the pitch: show the person once, then
get out of the way of the work, and let each project carry its own story.

Experience is told as a plain reverse-chronological list on `/about` — five roles (**Independent**,
current, freelance/partnerships → **Nebula**, Co-Founder and Lead of Design, 2024–Today, "I led the
design direction across products, brand and user experience... contributed to the launch of Togevent" →
**Bip Red**, Senior UI Designer, 2022–2025, design systems for large-scale companies → **The Wave
Studio**, Lead UX/UI Designer, 2020–2022, cross-functional teams + mentoring junior designers →
**SEO Tester Online**, UX/UI Designer, 2018–2020) — each cell gets a small brand-colored logo mark,
title, dates and 2–3 short paragraphs, but no chart or visualized timeline; the only "data" moment on the
whole site is the case-study grid itself. Craft is signaled two ways: **specificity in the case-study
copy** (4fett names "Italian fiscal rules, tax brackets, INPS contributions" and a "consuntivazione view"
instead of generic UX-portfolio language; Bounty Hunters explains *why* Helvetica was replaced), and
**one real proof point per project where it exists** — Togevent's system section closes on a stat card,
"**400+ Mobile Screen**", the only quantified claim anywhere on the site. The work page's own framing —
*"A collection of projects, explorations and details. Some are case studies. Some are just good work."*
— is a deliberately modest, low-stakes way to present unfinished/experimental work (the Explorations
gallery) without pretending it's all a polished case study.

## Key screens
- **Home hero + fold** (`desktop-fold.png`): two-tone headline and portrait, then an immediate cut to a
  full-bleed, full-color product banner — the site's signature transition, and it happens before any
  bio copy.
- **Home Info / Services / Work / clients / contact** (`desktop.png`, `mobile.png`): label-left bio block
  with a "Discover more" link out to `/about`; numbered 4-up services grid; asymmetric 3-up work grid;
  grayscale logo wall; full-width closing contact band. Mobile: hero portrait stays full width above the
  fold, numbered service cards keep their index labels, contact info pinned at the very bottom — a clean
  single-column shrink, not a rethought mobile layout, but nothing looks broken or cramped.
- **`/about`** (`about-desktop.png`, `about-mobile.png`): full-bleed dark portrait crop at the top (a
  second, darker crop of the same photo used on home), then the label-left `Info` bio in five short
  paragraphs, the five-role `Work Experience` list with logo-marked cells, the client wall, and the same
  closing contact band. Mobile keeps every section, single column, employer cells stacked with the logo
  mark above the text.
- **`/work`** (`work-desktop.png`, `work-mobile.png`): the two-tone statement heading doubles as the
  page's whole pitch, then a flat 4-up grid of case-study covers (4fett terracotta flat-lay, Togevent
  isometric board, Bounty Hunters black/orange grid, Kiwi cyan product shot) with title + type caption
  under each, then the 8-image "Explorations" gallery. On mobile both grids stay **2 columns**, not 1 —
  the one place on the site where the responsive behavior is a real layout decision rather than a plain
  stack, though the Explorations tiles end up quite small (~185px wide on a 390px viewport).
- **`/work/4fett`** (`case-4fett-desktop.png`, `case-4fett-mobile.png`): meta strip (Year 2026 · Role
  *Founder · Product Design & Development* · Type *Web App* · *Visit site*) → hero (laptop on a sunlit
  wood table) → three short problem/solution paragraphs → a 3-phone screenshot row → "Design Goals" →
  a loose grid of four more screens and two lifestyle shots → next-project link to Kiwi. No metrics or
  quantified outcomes — honest rather than padded, but also the one case study that offers no proof the
  solution worked.
- **`/work/togevent`** (`case-togevent-desktop.png`): the longest and most complete case study — hero →
  problem/solution copy → a 3-phone screenshot row → "Design Goals" → a "gallery" mockup screen → four
  more device shots → a two-tile before/after (map view + onboarding) → **"The System"**, a dedicated
  section showing a settings-panel screenshot, a swatch grid (grayscale + status colors) and a button/tag
  component sheet → closing on the **"400+ Mobile Screen"** stat tile over a dense multi-screen collage.
  The one page that documents an actual design-system deliverable, not just final screens.
- **`/work/kiwi`** (`case-kiwi-desktop.png`): hero (vape device across ribbed green fabric) → three
  paragraphs pitching behavior-change framing ("without judgment", "a win, not a defeat") → "Design
  Goals" → four supporting screens → a **five-swatch named color palette with hex codes** (the site's only
  explicit color-system callout) → three more UI screens (usage stats, device pairing, target-setting) →
  next-project link to Togevent.
- **`/work/bounty-hunters`** (`case-bounty-hunters-desktop.png`): hero (laptop on a tan armchair) →
  problem/solution copy that includes the **Helvetica → Saens typeface decision** quoted above → three
  screens → "Design Goals" → two more screens → a full-bleed "SPOTLIGHT / 1+1=3" editorial page → **"The
  Build"** (a short note that the site "runs on a custom WordPress theme built from scratch... no
  off-the-shelf template compromises") → a closing "Share your work with us" CTA grid → next-project link
  to 4fett. The only case study that names the actual tech build, not just the design.

## Bilingual / RTL notes
`lang="en"` only, no i18n evidence anywhere across the seven pages crawled. What would survive a Persian
version and what would not:

- **Survives:** the white/`#111111`/gray-400 palette and hairline `gray-100` rule, script-agnostic across
  every page; the numbered service-card pattern, the grayscale client wall, the employer-grid cell (logo
  mark + text) and the case-study meta strip, all of which mirror cleanly under a `dir="rtl"` flip if
  built with logical properties; the label-left/content-right info block, a simple structural mirror; the
  named hex-swatch chip (Kiwi) — numbers and hex codes read fine in either direction.
- **Needs a Persian partner face:** Geist has no Arabic-script glyphs, so the single-typeface identity
  needs a Persian partner matched on x-height and weight before it can carry FA pages — the same gap
  flagged for `pleurat-com`'s General Sans (see [[portfolio-payload-setup]] / D-009 in `Decisions.md`).
- **Needs re-testing:** the **two-tone headline device**, reused on every page's big statement, relies on
  the reader passing through a de-emphasized middle clause before landing on an emphasized close
  ("**Designer** crafting digital experiences from **UX to UI systems**"); Persian sentence order will
  likely put different words in that middle position, so the emphasis pattern needs to be re-authored per
  language on *every* page it appears, not just re-colored once.
- **Does not translate as-is:** the plain-text employer timeline is actually the *easiest* piece here to
  port — it depends only on translated copy, not on script-specific display type or illustration, unlike
  `pleurat-com`'s visualized-numbers approach, which is more expressive but more bilingual work to rebuild.

## Takeaways for Sina
- **Borrow:**
  - The **portrait → full-color proof** cut in the first scroll — open with the person, then immediately
    show real work in color before any bio text. Cheap to build, does a lot of work.
  - The **numbered services grid** (icon, `00x`, bold one-liner, short description) as a compact "what I
    do" block — a good candidate for a reusable Payload block.
  - The work page's **permission-giving framing copy** ("Some are case studies. Some are just good
    work.") — a low-stakes way to include explorations/experiments alongside polished case studies
    without over-promising.
  - **Lean case-study template, reused verbatim across all four projects**: meta strip (Year / Role /
    Type / Link) → problem paragraphs naming real specifics → "Design Goals" → screens → next-project
    link. The consistency across projects, not any single case study, is what reads as professional.
  - **One real proof point per case study, not a metrics section**: Togevent's "400+ Mobile Screen" tile
    and Kiwi's named hex-swatch palette are both single, concrete artifacts dropped into the flow rather
    than a bolted-on "Results" block — cheaper to produce honestly than invented KPIs.
  - **Naming a craft decision explicitly** — Bounty Hunters' one line on why Helvetica was replaced with
    Saens does more for perceived typographic judgment than any amount of visual polish.
  - Letting **one restrained palette carry the whole shell** and reserving all color for the actual work
    — a viable, lower-effort alternative to `pleurat-com`'s single-accent approach if Sina wants
    something quieter, proven here across seven pages, not just the home page.
  - The **2-column mobile grid on `/work`** — proof that "mobile" doesn't have to mean "always 1 column";
    worth considering for Sina's own work-index page.
- **Adapt:**
  - The **plain-text timeline** is a reasonable minimum-viable pattern to ship first; `pleurat-com`'s
    scroll-filled bar chart shows the ceiling if there's time to build something more visualized later —
    treat this as v1, not the target.
  - **Bilingual type (D-009).** Same gap as every English-only benchmark so far: pick a Persian partner
    face with matching x-height/weight before locking a single-typeface identity, and re-author (not
    just re-color) the two-tone headline device for Persian sentence order on *every* page that reuses it.
  - **Add proof consistently, not per-project ad hoc.** 4fett has no outcome or metric while Togevent and
    Kiwi each have one; decide up front what the "one proof artifact" is for every case study so it isn't
    missing wherever the project happens not to have an obvious number.
- **Avoid:**
  - **Genericness risk.** Geist + Tailwind's default gray scale + a clean grid is a widely-used
    "default good taste" look; on its own it reads as template-clean rather than distinctive (this is
    the whole gap between this site's `distinctiveness: 3` and `pleurat-com`'s `5`). If Sina wants a
    memorable system rather than a tasteful one, at least one signature motif beyond "minimal" is needed.
  - **A case study with no outcome section** (4fett) — leaves the visitor without a "so what," and stands
    out precisely because the other three projects do better.
  - **A photo grid sized for desktop and only shrunk for mobile** — `/work`'s Explorations gallery stays
    3 columns' worth of density at 2 columns on a 390px screen, so each tile lands around 185px wide;
    fine for browsing, tight for actually looking at the work.
  - **Treating the mobile shrink as sufficient everywhere** — the 2-up work grid shows real mobile
    thinking, but the Explorations density issue above shows the same instinct wasn't applied uniformly.

## Notes
- **Stack:** Next.js App Router with Turbopack build chunks (`/_next/static/chunks/...`), Tailwind CSS
  utility classes in the markup (`bg-white`, `text-[#111111]`, `max-w-5xl`, `border-gray-100`), Geist
  variable font via `next/font`, `next/image` responsive `srcset`s with multiple widths/quality params,
  JSON-LD `Person` schema, full OG/Twitter card meta, canonical URL without `www`. Bounty Hunters' own
  case study confirms Arturo builds custom WordPress themes for client sites in addition to Next.js for
  his own.
- **Performance:** hero images preloaded at many widths (`rel=preload` with a wide `imageSrcSet`), font
  preloaded — solid, standard Next.js image/font optimization; consistent across all seven pages crawled
  (no page failed to load or timed out).
- **Accessibility:** a "Skip to content" link is present (`sr-only focus:not-sr-only`), with visible
  focus-ring utility classes in the markup — a reasonable baseline; not deeply verified beyond the
  markup (no contrast or keyboard-nav walkthrough performed).
- **Crawl scope:** all seven live pages were captured — `/`, `/about`, `/work`, `/work/4fett`,
  `/work/togevent`, `/work/kiwi`, `/work/bounty-hunters` — desktop full-page for all seven, plus mobile
  full-page for `/`, `/about`, `/work` and `/work/4fett` (the two-viewport pair used for the other three
  case studies would have been redundant: all four case studies share one template, and the difference
  between them is content, not layout). No pinned/scroll-jacked sections were found on any page, so unlike
  `pleurat-com` no separate `frames/` folder of mid-scroll captures was needed. Live interaction (hover,
  click, actual scroll behavior in a real browser) was still not tested — the motion score carries that
  caveat.

## Scores
Justification for each `scores.*` value and `relevance` — see [Rubric](../Rubric.md).

- **distinctiveness: 3** — a clear, tasteful style within a familiar genre (grayscale grotesk minimal
  portfolio with a portrait hero, confirmed consistent across all seven pages); competent but not
  unmistakable without the portrait — swap the photo and this could be many designers' sites. Each case
  study *within* the site has its own strong identity, but that's the client work's distinctiveness, not
  the portfolio's own.
- **typography: 4** — Geist is used with real intent (the two-tone word-level headline reused
  consistently across every page's statement heading, a clean gray/black two-step hierarchy) and reads
  comfortably; the Bounty Hunters case study even documents a real typographic decision (Helvetica →
  Saens). Capped below 5 because the portfolio itself has no second role (no mono/label typeface) to
  carry metadata, so eyebrows, indices and meta-strip labels all lean on the same body face.
- **motion: 3** — no gratuitous or blocking motion observed anywhere across seven pages, and — unlike
  `pleurat-com` — no pinned or reveal-only sections that only render correctly mid-scroll; but also no
  evidence of purposeful, structure-revealing motion beyond basic link-color transitions. Scored with
  lower confidence since live interaction wasn't tested (see Notes).
- **brand: 4** — raised from an initial homepage-only read: the portfolio shell stays neutral on
  purpose, but each case study demonstrates real brand/color-system thinking on the client's behalf
  (Kiwi's five named hex swatches, Togevent's swatch-and-component "System" section, the Bounty Hunters
  type-swap rationale) — the visual system doesn't *state* who Arturo is, but it *proves* what he can do,
  which is arguably the more credible brand signal for a product designer. Not a 5 because the
  portfolio's own identity (as opposed to the work inside it) still leans on text more than visuals.
- **mobile: 3** — lowered from an initial homepage-only read: the home page and case studies collapse
  cleanly to one column with nothing broken, and the `/work` grids' deliberate 2-column mobile layout is
  a genuine piece of mobile design; but the Explorations gallery inherits desktop density (tiles land
  around 185px wide on a 390px screen) — real "tiny tap target" territory per the rubric's 3-band.
- **relevance: 4** — Avg 3.4. A strong, same-category reference, now confirmed end-to-end rather than
  just on the home page: the portrait-to-proof opening move, the numbered services block, the repeatable
  case-study template and the "one proof artifact per project" habit are all directly reusable; not a 5
  because the portfolio shell itself doesn't clear the distinctiveness bar Sina's brand-first site is
  aiming for, and mobile density needs more care than this site gives it.

## Screenshots
Local-only, in `assets/arturospatino-com/`: `desktop.png` (1440) · `mobile.png` (390) · `desktop-fold.png`
(1440×900, first viewport) — home page.

Additional captures: `about-desktop.png` · `about-mobile.png` · `work-desktop.png` · `work-mobile.png` ·
`case-4fett-desktop.png` · `case-4fett-mobile.png` · `case-togevent-desktop.png` · `case-kiwi-desktop.png`
· `case-bounty-hunters-desktop.png` — all seven live pages on the site are covered.
