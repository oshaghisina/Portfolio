---
title: "Eleken — eleken.co"
url: "https://www.eleken.co/"
slug: eleken-co
type: design
owner: "Eleken"
owner_role: "UI/UX design agency (Founder & CEO: Ilya Dmitruk)"
site_kind: agency
lang: en-US
generator: "Webflow (webflow-icons font present); Regolapro (custom display face) + Inter Variable body; Merriweather/Oswald also loaded but not observed in use"
date_added: 2026-09-19
relevance: 4
scores:
  distinctiveness: 3
  typography: 4
  motion: 4
  brand: 4
  mobile: 4
summary: "Warm cream, one soft-orange accent, isometric line illustrations and an ~80-photo candid team wall — a competent, on-genre SaaS-agency system whose real find is the about page's illustrated origin-story diagram and the case study's outcome-as-headline visual template"
tags: [warm-neutral, single-accent, isometric-illustration, candid-photography, webflow, saas-agency, before-after, editorial-numerals]
screenshots:
  - about-desktop.png
  - case-datawisp-desktop.png
  - cases-desktop.png
  - desktop-fold.png
  - desktop.png
  - mobile.png
status: draft
---

# Eleken — eleken.co

> A warm cream-and-ink SaaS-agency system built around one soft-orange accent, isometric line diagrams
> and an unusually large candid team-photo wall — benchmarked as a competent example of the "friendly,
> funded startup" genre that is now common enough to be a genre of its own, and for a genuinely strong
> illustrated storytelling pattern on the about page.

## Overview
First impression: warm, calm, confident — a cream, paper-like background (`#F6F4F2`), near-black ink
text and buttons (`#1D1E22`), and exactly **one** accent color (a soft orange, `#F59958`) used only for
CTAs, icon fills and highlight dots. The mood is "competent operator," not "creative studio": real
product screenshots, real (if unlabeled) team photos, and dry, declarative copy stand in for any
painterly art direction. It's the same warm-neutral-plus-one-accent formula that a large share of
funded 2024–2026 SaaS/Webflow sites now share — well executed and immediately legible, but not
something you'd recognize as *Eleken specifically* with the logo hidden.

## Visual language
- **Typography:** Regolapro (a rounded-geometric display sans; weights 400/500/700 plus a "book" cut)
  for every heading — H1 52px / weight 500 / letter-spacing −1.5px / line-height 57.98px (≈1.11); H2
  32px / 500 / −0.64px / 40px (1.25). Stat numerals reuse the same face at a much larger size (roughly
  90–100px+) for "2015," "100+," "150+," "100%." Body and UI copy run on Inter Variable at 15px / 400 /
  25px line-height (1.67) in mid-grey (`#717171`) — comfortable via generous leading despite the small
  base size. Two more families (Merriweather, three cuts, and Oswald, four weights) are loaded as web
  fonts but never appeared on any of the six pages sampled — dead weight, the same kind of unused-token
  debris Pleurat shipped with its lime palette.
- **Color:** paper background `#F6F4F2` throughout; ink `#1D1E22` for headings, buttons and the
  logotype; secondary grey `#717171` for body copy. One accent — soft orange `#F59958` — used with real
  discipline: the "today" marker on the funding timeline, every X-circle icon on the about page's
  pain-point diagram, the active state on the case-study carousel's progress dots, and a lighter tint
  (`#F6D1A4`) for small pill badges ("STEP 1"). No secondary accent appears anywhere sampled. Primary
  buttons are ink-filled with white text; secondary buttons are white/outline with an ink arrow glyph.
- **Layout & grid:** content maxes out a touch under 1440 with generous section padding; the default
  pattern is a centered headline + centered sub-copy for statement sections, switching to an explicit
  two-column split (illustration or screenshot on one side, numbered text block on the other) for
  case-study previews and the "problem/solution" pairs. Cards default to a soft-rounded rectangle
  (~12–16px radius, matching the 10px button radius) on white, sitting on the cream page background —
  logos, testimonials, stat blocks and process steps all reuse the same card shape. Density is
  low-to-medium: generous vertical whitespace between roughly 40 homepage sections is what drives the
  page to ~21,200px.
- **Imagery:** three registers, cleanly separated — the same three-register discipline Pleurat used.
  (1) **Isometric line illustrations** in thin, dotted-outline strokes (server-rack shapes for the
  "tailored partner" problem/solution pair, a shrugging tuxedoed character for the about-page origin
  story, a rising-bar illustration for the "Talent" tab) — the orange accent appears only as a small
  fill within them. (2) **Real product screenshots**, framed in a flat grey panel or literal
  app/browser chrome, always captioned when used as proof ("Before," "Three versions of the screen,
  designed during a free trial"). (3) **Candid team photography** — roughly 80 real, unstaged headshots
  (outdoor selfies, phone photos, a few studio shots) in a dense, uniform grid, deliberately unlabeled;
  one dark, full-bleed client headshot breaks the pattern inside the testimonial wall.
- **Motion & interaction:** captured with `prefers-reduced-motion: reduce`, so animation quality and
  easing can't be graded directly — but every section rendered fully populated under reduced motion
  (unlike Pleurat, nothing sat at `opacity: 0` waiting on a scroll trigger), which is itself a good,
  directly observed accessibility signal. Structural affordances point to a scroll/interaction-driven
  site: a dot-paginated logo carousel (desktop *and* mobile), an auto-advancing four-item case-study
  carousel with a progress bar per slide, a repeated pill-style tab switcher
  ("Flexibility/Reliability/Transparency/Expertise" on home, "Talent/Transparency/Tempo" on about), an
  expandable accordion for the six-phase process, and a horizontal pill-stepper
  (Trial → Research → IA → Screens → Handoff → Support) that likely highlights on scroll, echoing the
  dotted "today" marker on the funding timeline.
- **Components:** lower-case wordmark "eleken" with a small ® mark; five-item nav with two dropdowns
  plus an outlined "Log in" and a filled "Get started" pill; ink CTA pill (10px radius) with a white
  outline secondary variant; outlined five-star rating row; square white logo tiles (7-column desktop,
  3-column paginated carousel on mobile); numbered "01–04" oversized-numeral cards; a big flat stat card
  (numeral + label); an isometric problem/solution pair with a small dot-and-label eyebrow ("• Problem"
  / "• Solution"); a testimonial card (logo-only, or photo + quote + name/role, some stamped "Verified
  by Clutch" + stars); a pill-tab switcher; a horizontal pill-stepper with arrow connectors; a
  case-study preview card (index number, headline, blurb, CTA, framed screenshot); a breadcrumb
  (`Home / Cases / {Client}`).

## Brand storytelling
The origin story on `/about-us` is the strongest illustrated storytelling on the site: a radial diagram
places five pain points ("Bloated design processes?," "Lack of control?," "Telephone game through a
project manager?," "Weeks to settle down a project?," "One-size-fits-none approach?") around a
hand-drawn, shrugging tuxedoed figure, each marked with a small orange X-circle; a second diagram
threads "STEP 1 Experiment → STEP 2 Pivot if it doesn't work → STEP 3 [invent the category]" as an
orbiting dotted path. That's a genuine narrative device, not just a headline — closer in spirit to
Pleurat's single bench metaphor than anything else on the Eleken site.

Everywhere else, "experience" is *company* experience, not personal history: a stat block (2015
founded · 100+ team · 150+ clients · 100% SaaS focus) stands in for a timeline, and the ~80-photo team
wall stands in for an about-the-people section without naming anyone. The narrative order on home is
pure sales funnel, not identity: **what we help with** (hero) → **who trusts us** (logos) → **why
you're stuck** (three pain points, each resolved by a CTA) → **proof we've done this before** (funding
timeline + four case highlights) → **try before you buy** (free-trial offer + trial testimonials) →
**contact** → **why us over alternatives** (positioning + differentiators) → **social proof at scale**
(4.9 Clutch + 12 testimonials) → **how the machine works** (designer sourcing → onboarding →
six-phase process) → **who we're not for** → **blog / FAQ**. Nothing here is trying to be *someone* —
it's trying to de-risk a purchase, and the design (calm palette, real screenshots, real if anonymous
faces, one restrained accent) is entirely in service of that.

## Key screens
- **Home hero + logo wall** (`crops/home-a`): centered H1/sub/CTA pair over cream, a five-star rating
  row, then a 7×3 grid of client logotypes in white cards — sets the "calm, credible" tone immediately.
- **Funding timeline + case-study carousel** (`crops/home-b`): a dotted Gantt-style timeline
  ("Week 546–550") with a single orange "today" dot above a placeholder skeleton, then a numbered
  case-study preview (index, headline, blurb, CTA) beside a real product screenshot — the site's
  clearest "we've actually shipped this" moment.
- **Positioning + testimonial wall** (`crops/home-c`): pill-tab differentiators over paired isometric
  problem/solution illustrations, then the "4.9 Clutch" testimonial wall mixing plain logo cards with
  one dark, full-bleed photo card.
- **Process cards + stepper** (`crops/home-d`): a 2×2 numbered onboarding grid (one cell replaced by a
  real photo of two people at a desk) and the start of the six-phase pill-stepper with expandable
  detail below it.
- **Case study — Datawisp** (`case-datawisp-desktop.png`, `crops/dw-*`): breadcrumb → the
  outcome-as-headline H1 → paired app screenshots → problem bullets → a labelled "Before" screenshot in
  full-bleed grey → "three versions of the screen, designed during a free trial" → a large pull-quote
  testimonial with round headshot, name, role and a "Verified by Clutch" star badge.
- **Cases index** (`cases-desktop.png`): 14 industry filter pills over a large, featured first case
  card in literal browser chrome.
- **About** (`about-desktop.png`, `crops/about-*`): the radial pain-point diagram and shrugging-character
  illustration → four flat stat cards → the ~80-photo team grid → the reused pill-tab pattern
  (Talent/Transparency/Tempo) with a growth-bar illustration and a testimonial → a closing founder
  pull-quote.
- **Mobile** (`crops/mobile-a`, `crops/mobile-b`): nav collapses to a hamburger; hero CTAs stay
  side-by-side rather than stacking full-width; the logo grid becomes a paginated 3-column carousel
  with dot indicators; the two-column problem/solution blocks stack to one column with the isometric
  illustrations scaled down but still legible.

## Bilingual / RTL notes
English-only (`lang="en-US"`), no switcher, no RTL. What would survive a Persian version and what
wouldn't:
- **Survives:** the cream/ink/one-orange-accent formula; card shapes and radii; the isometric line
  illustrations, which carry no script and would mirror cleanly; the candid-photo-grid idea (identity
  independent of language).
- **Needs a Persian partner face:** Regolapro is an unusual, narrow-purpose display face — nothing in
  this pass confirms Arabic/Persian script coverage, and geometric Latin display faces of this kind
  typically don't ship Arabic glyphs, so a Persian headline face would need to be chosen separately and
  re-matched for weight and x-height at the same 500-weight, tight-tracking feel.
- **Mirrors as layout:** the two-column split panels (illustration/screenshot one side, text the
  other), the left-to-right funding timeline, and the breadcrumb would all need a `dir="rtl"` flip via
  logical CSS properties; the radial pain-point diagram is symmetric enough to mirror without changes.
- **Does not translate as-is:** the H1-as-outcome sentence pattern bakes English sentence order into
  the headline itself ("How our redesign helped X raise $3.6M") — a Persian equivalent needs its own
  sentence construction, not a word-for-word swap.

## Takeaways for Sina
- **Borrow:**
  - **One accent color with a hard rule for where it appears** (CTAs, active states, small icon fills
    only) — the same discipline Pleurat used with amber, independently arrived at here with orange;
    clearly a durable pattern, not a one-off.
  - **Isometric line-illustration pairs** for problem/solution or origin-story beats — cheap to produce
    consistently (unlike photography), and the about-page radial diagram proves the format can be
    genuinely memorable, not just decorative filler.
  - **Labelled proof screenshots** ("Before," "designed during a free trial") sitting directly under the
    image — removes any ambiguity a hover-slider or unlabelled before/after would leave.
  - **A big, flat numeral stat card** (2015 / 100+ / 150+ / 100%) reusing the display headline face at
    large size — an easy, high-impact component for Sina's own "years / companies / projects" facts.
  - Verifying **content renders complete under `prefers-reduced-motion`** — a good baseline
    accessibility bar to hold Sina's own site to, regardless of which animation approach gets used.
- **Adapt:**
  - The **candid, unstaged team-photo wall** is a strong *texture* (real people, not stock) but is used
    here to erase individual identity across ~80 people; for a personal-brand-first site the equivalent
    move is the opposite — one real, well-chosen portrait carrying the weight that 80 anonymous photos
    carry here.
  - The **radial/orbiting diagram style** from the about page is a genuinely strong storytelling device
    worth adapting for Sina's own "how I got here" or "how I work" narrative — but it should carry
    Sina's actual path (companies, pivots), not a generic pain-point list.
  - **Regolapro + Inter as a two-role system** (display face for headings/numerals, a plain grotesk for
    body/UI) is a sound structure to copy even if the specific faces change for Persian support
    (D-009) — keep the *role* split, swap the *faces*.
- **Avoid:**
  - **Genre-typical distinctiveness** — cream + ink + one warm accent + geometric rounded sans is common
    enough now among funded SaaS sites that it reads as "competent," not "memorable"; Sina's brief
    (D-007, personal-brand-first) needs a hook closer to Pleurat's single metaphor than to this
    well-executed but replicable formula.
  - **Loading unused fonts** (Merriweather ×3, Oswald ×4 weights, never observed in use) — a small
    performance and craft debt; only load what a page actually sets.
  - **A page long enough that no single crop can represent it** — every one of the six pages captured
    here ran 7,000–21,000+ px; Sina's D-010 6–8-project scope and shorter page targets should be
    protected deliberately, not left to grow the way a 40-section sales page does.

## Notes
**Stack:** Webflow, confirmed three independent ways — the `webflow-icons` icon font in the page's
loaded font list, `<link rel="preconnect"/"dns-prefetch">` to `assets.website-files.com` and
`cdn.prod.website-files.com`, and every image (including OG thumbnails) served from those same
website-files CDN paths. Type stack: Regolapro (custom/licensed display face, 400/500/500-book/700) +
"Inter Variable Local" (100–900) for body/UI; Merriweather (400/300/700, "Custom" cuts) and Oswald
(300/400/500/600/700) are also loaded site-wide but did not appear on any of the six pages sampled
here — possibly reserved for `/blog` article typography, not checked in this pass. Colors confirmed by
sampling rendered pixels, not just guessed from screenshots: background `#F6F4F2`, ink `#1D1E22`, body
grey `#717171`, accent `#F59958`, accent tint `#F6D1A4`. Primary button: ink fill, white text,
500-weight Inter, 10px border-radius, ~9px/16px padding. Analytics/tracking (read from the raw HTML,
homepage): Google Tag Manager (`googletagmanager.com/gtm.js`) plus a Clutch.co review widget script
(`clutch.co/static/js/widget.js`) that likely renders the "Verified by Clutch" badges live rather than
as static copy; no PostHog/Hotjar/Segment/Intercom tag was visible in the initial HTML (GTM may still
inject further tags client-side — not verified beyond the first payload). Structured data: the
homepage carries `Organization` JSON-LD (`@graph`, with `logo`, `foundingDate: 2015` — matching the
`/about-us` stat exactly — `areaServed: Worldwide`, and `sameAs` links to Dribbble, Behance, YouTube,
Facebook, LinkedIn and Instagram) plus a full `FAQPage` schema marking up its 12 home-page questions
for rich snippets; `/cases/datawisp` carries **no** JSON-LD at all — the site's strongest proof content
isn't structured-data-marked, only its sales copy is.

**Performance:** no `<link rel="preload" as="font">` and no `font-display` declaration appear anywhere
in the homepage's HTML head — unlike Pleurat's explicit preload-plus-`swap` strategy, font loading here
is left entirely to Webflow's compiled stylesheet rather than surfaced as head-level hints. Images lean
heavily on native lazy-loading (175 `loading="lazy"` instances on the homepage) but responsive
`srcset` is comparatively rare (11 instances against ~260 `alt=` attributes) — consistent with most of
those 260 images being small, fixed-size logo/icon assets rather than large photography.

**Accessibility:** no "Skip to content" link was found anywhere in the homepage markup (a real gap,
the direct opposite of Arturospatino's site, which has one). 41 `aria-label` attributes are present on
the homepage. Of 260 `alt=` attributes on the homepage, 193 (74%) are empty (`alt=""`) — consistent
with marking a lot of decorative logo/icon imagery as such, but too high a ratio to assume every
content-bearing image is still described; the Datawisp case study alone carries 39 `alt=` attributes,
12 of them empty. A single `<h1>` per page was confirmed on the case study (good heading hygiene). A
cookie/consent banner is present and dismissible (handled automatically for capture); contrast ratios,
focus-ring styling and reduced-motion fallback quality were not verified beyond what's noted above.

**Sitemap / robots:** `sitemap.xml` lists 691 URLs (all 70+ cases, all 10 industry and 6 service pages,
the 5 `/books/*` ebooks, blog, etc.), consistently as `https://www.eleken.co/...` (`www`, no trailing
slash) — the same form the homepage's own `<link rel="canonical">` uses, so there's no domain-form
mismatch. `robots.txt` is a clean two-line policy (`Allow: /`, `Disallow: /*_page=` to keep paginated
duplicates out of the index) that correctly points at the sitemap. Unlike Pleurat (`/ai` missing from
its sitemap), no missing top-level route turned up here — sitemap/canonical hygiene is exemplary,
consistent with a site that runs on hundreds of SEO-entry pages.

**Recognition:** the same `sameAs` list above is this site's answer to Pleurat's Awwwards/Dribbble
links — Dribbble (`dribbble.com/eleken`), Behance (`behance.net/elekenagency`), YouTube, Facebook,
LinkedIn and Instagram, also mirrored as plain footer icons. No awards or press mentions were found.

**Quirks:** (1) the Moritz Uehling testimonial's role/company reads "CTO at Line306" on his own
case-study page (`case-datawisp-desktop.png`) but is referenced elsewhere as CTO of Datawisp — a real,
directly observed attribution inconsistency (see the Content-bucket analysis for the fuller note). (2)
The homepage itself — the single most-shared URL on the site — has **no** `og:image`/`twitter:image`,
so a link to `eleken.co` unfurls with a title and description but no thumbnail; `/cases/datawisp`, by
contrast, has a proper per-case thumbnail image, so the priority is inverted from what you'd expect.
(3) Four extra font families (Merriweather ×3 cuts, Oswald ×4 weights) are loaded site-wide but were
never observed rendering on any of the six pages sampled.

## Scores
Justification for each `scores.*` value and `relevance` — see [Rubric](../Rubric.md).

- **distinctiveness: 3** — cream, ink, one soft-orange accent and a rounded geometric display face are
  all handled with real discipline, but this specific formula (warm neutral + single accent +
  geometric sans + isometric line art) is now common enough across funded SaaS/Webflow sites that it
  reads as a well-executed genre entry rather than something ownable; nothing here is as singular as
  Pleurat's bench metaphor.
- **typography: 4** — a clear two-role system (Regolapro for headings and big numerals, Inter for
  body/UI) with a sensible scale (52 → 32 → 15px) and generous line-heights carries the whole site
  consistently across six very different page types; not a 5 because four extra font families are
  loaded and never used, and body copy at 15px is on the small side for a marketing site even with
  1.67 line-height.
- **motion: 4** — captured under `prefers-reduced-motion: reduce`, and unlike Pleurat, every section
  still rendered fully populated (nothing sat hidden behind a scroll trigger) — a directly observed,
  good accessibility signal; scored 4 rather than 5 only because the actual animation easing and
  restraint can't be confirmed firsthand from a motion-frozen capture.
- **brand: 4** — palette, illustration style, real screenshots and copy tone all point the same way
  ("pragmatic, fast, credible") across dozens of very different page templates, a harder consistency
  test than a five-page portfolio, and it holds up; not a 5 because the visual system itself,
  distinctiveness aside, doesn't say anything uniquely Eleken the way a real metaphor would.
- **mobile: 4** — the two sampled screens show genuine re-composition (a paginated dot-indicator logo
  carousel, not just a shrunk grid; illustrations that scale down and stay legible; CTAs that stay
  appropriately sized rather than going full-width by default) rather than pure reflow; not a 5 because
  only the home page was checked on mobile — the 70-item case index and a full case-study page were not
  verified at the 390px viewport.
- **relevance: 4** — Avg 3.8, within the rubric's 1.5 band. Not a 5 because the overall identity is
  genre-typical rather than a model "feel" for Sina's brand; a 4 because two specific parts are strong,
  directly portable references — the about page's illustrated origin-story diagram, and the case
  study's visual template (outcome-as-headline, labelled before/after, testimonial-with-verification-
  badge) — exactly the "strong reference for a specific part of the site" the Rubric's tier-4 anchor
  describes.

## Screenshots
Local-only, in `assets/eleken-co/` (gitignored, D-008): `desktop.png` (1440, clipped at 15,000px — real
page is ~21,218px) · `mobile.png` (390 CSS / 780 physical, clipped at 15,000px CSS — real page is
~22,691px) · `desktop-fold.png` (1440×900, first viewport).

Additional captures: `cases-desktop.png` (`/cases` index, first viewport) · `case-datawisp-desktop.png`
(`/cases/datawisp`, clipped at 9,000px) · `about-desktop.png` (`/about-us`, clipped at 7,000px).
