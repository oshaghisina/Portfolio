---
title: "Armory AI Agency"                 # Site / project name
url: "https://armory.framer.ai/"
slug: "armory-framer-ai"                  # domain in kebab-case; equals this file's name
type: "design"
owner: "Delani (sirdelani), Framer template author"                 # Person or studio behind it
owner_role: "Framer template designer/developer"            # e.g. Product Designer, Art Director
site_kind: "product"             # personal-portfolio | studio | agency | product | other
lang: "en"                  # html lang, e.g. en
generator: "Framer 40f5bc6"             # tech hint from meta generator / obvious stack, if any
date_added: "2026-09-19"
relevance: 2              # 1–5 relevance to Sina's brand — see ../Rubric.md
scores:                   # 0 = not scored yet (draft only); 1–5 per ../Rubric.md
  distinctiveness: 2
  typography: 4
  motion: 2
  brand: 2
  mobile: 3
summary: "A $129 Framer \"AI agency\" template — dark grain, isometric icons, mono eyebrow labels and a giant wordmark footer across 6 pages — undercut by a scroll-reveal confirmed to get stuck illegible at rest, a sticky upsell badge that covers price/stat text on mobile subpages, headline stats that contradict their own captions, and a contact page whose phone country code, address and map location all disagree"               # one-line takeaway; shown in the index
tags: [dark-mode, monochrome, grain-texture, isometric-icons, mono-labels, giant-wordmark-footer, scroll-reveal-bug, stat-proof-widgets, multi-page, saas-template, framer]                  # e.g. [editorial, brutalist, motion-heavy, dark, serif]
screenshots:
  - desktop.png
  - desktop-fold.png
  - mobile.png
  - pricing-desktop.png
  - pricing-mobile.png
  - about-desktop.png
  - about-mobile.png
  - project-desktop.png
  - project-mobile.png
  - case-cigna-desktop.png
  - case-cigna-mobile.png
  - articles-desktop.png
  - articles-mobile.png
  - contact-desktop.png
  - contact-mobile.png
  - frames/
status: draft
---

# Armory AI Agency

> Armory AI is a high-performance Framer template built for AI agencies, automation studios, and product teams. Designed with a systems-first layout, it helps you showcase capabilities, case studies, and services.

## Overview
Cold, high-production "enterprise AI infra" mood: a near-black canvas, grainy halftone/noise
textures, a glowing orb and a slow field of isometric blocks in the hero, and monospace
micro-labels (`//2026`, `SLA 99%`) that give it a command-line/dashboard feel. Every section reads
like a SaaS landing page — because it is one: capability grid → animated stats → case studies →
interactive product demo → integrations wall → testimonials → FAQ → newsletter. No author is
present anywhere; the "who" is a lightning-bolt logo and a fictional "we," not a person.

This benchmark covers the full site, not just the homepage: the 5 top-level subpages (`/pricing`,
`/about`, `/project`, `/articles`, `/contact`), one case-study detail page
(`/project/cigna-smart-health-systems`), and six live, motion-enabled scroll frames captured
directly in a browser to verify what the homepage's full-page screenshot only hinted at (see
Motion & interaction and Notes). The homepage alone under-sells the system in one respect: it has
*zero* photography, but `/about` and the case studies introduce a whole second register — curated
stock photography — that the home screenshots never show.

## Visual language
- **Typography:** A clean grotesk/humanist sans for display and body (large, tight-tracked
  headlines like "Power your future with AI"), paired with a monospace face reserved for
  meta/eyebrow labels and stat callouts (`STATISTICS`, `//2026`, tab names like `DISCOVERY`). The
  same mono role reappears in the case study's meta sidebar (`INDUSTRY`, `TIMELINE`, `PLATFORM`)
  and the pricing table's row-category labels (`FEATURES`, `CAPABILITIES`, `SUPPORT & DELIVERY`),
  confirming it's a deliberate two-role system, not a one-off. Hierarchy repeats verbatim — eyebrow
  (mono caps + icon) → 2-line H2 (sans) → one paragraph — across every page, which builds rhythm but
  gets monotonous over 6 pages of the same pattern.
- **Color:** Fully monochrome — near-black sections (white/gray-400 text) for "capability"
  content, flipping to light gray/off-white for "proof" content (case studies, testimonials, FAQ,
  pricing). No accent color anywhere; CTAs are plain white-on-black or black-on-white. Case-study
  heroes break the rule with one gesture: a per-client photo tinted in a duotone gradient (teal-green
  for Cigna) — the only place color carries any brand-differentiation work.
- **Layout & grid:** A visible 4-column grid with hairline dividers that runs the full height of
  *every* page — home, pricing, about, projects, articles, contact and the case-study detail page
  all share it without exception. That's a genuinely strong, verified systemic consistency (more
  consistent than most personal portfolios benchmarked so far), even though the visual vocabulary
  riding on top of it is generic.
- **Imagery:** The homepage shows only generated noise/grain textures, a glowing orb render, an
  isometric block field and a matching isometric line-icon set (padlock+gear, chained modules, fan,
  database+folder). Subpages add a second, completely separate register: `/about` uses abstract
  mood photography (an orange paint swirl, a snowy mountain lake, desert rock) plus stock **team
  portraits** on flat colour backgrounds (teal/orange/blue/pink) for 4 fictional people; case
  studies use moody black-and-white **architectural stock photography** in their galleries — a
  template about AI software shows zero actual product screenshots in its proof material.
- **Motion & interaction:** Verified live in a browser, not just from static captures. The
  "Integrate with the world's most powerful neural engines..." paragraph uses a scroll-scrubbed
  reveal, and it is **confirmed to get stuck partially transparent and illegible** if the user's
  scroll comes to rest partway through it — reproduced twice (on arrival and again 1.5s later,
  unchanged) at `scrollY: 903`, independent of any screenshot-tool artifact (see Notes). Separately,
  the hero's client-logo pair **auto-rotates** (captured as CVS+United Healthcare in one session,
  United Healthcare+Aetna in another). Elsewhere: animated gauge dials, a "Growth Vector" sparkline,
  count-up-style stat numbers, a live node-based workflow-canvas demo, a 4-tab feature switcher
  (Discovery/Analysis/Training/Deploy), and an accordion FAQ. It's a lot of movement for a marketing
  page, and one specific pattern is a confirmed reading-blocking defect, not just a spectacle-vs-
  restraint judgment call.
- **Components:** eyebrow chip (dashed icon + mono caps), animated stat/dial cards, a **radial
  percentage dial** (About page's 95%/90%/92%/100% row), isometric-icon feature cards on a
  dotted-grid background, a **compliance-badge row** (IRAP/ISO 27001/ISO 42001/SOC2), client logo
  wall, star-rated testimonial cards, a 3-tier **pricing comparison table** grouped into labeled
  feature categories, a case-study **meta sidebar** (Industry/Timeline/Platform/Live URL), accordion
  FAQ with a segmented control, a tabbed panel with a chat-composer mockup, a newsletter
  email-capture bar, a giant full-width outline **wordmark footer** ("armory" set at page width —
  a genuinely distinctive signature move, and the one component here that isn't genre-default), and
  a sticky "Buy Armory AI Template — from $129 · Made in Framer" badge pinned over every single
  page — the template's own self-promotion, left running in the live demo, that on mobile
  concretely overlaps page content (see Key screens, Notes).

## Brand storytelling
There is no person to tell a story about — "Armory" is a fictional company and the page is a pure
sales narrative: promise (hero) → capability (feature grid) → credibility (fabricated stats and
healthcare case studies naming Cigna, Aetna, Anthem, CVS Pharmacy and United Healthcare) → product
demo (tabs + chat mockup) → social proof (star-rated testimonials from invented companies) →
objection handling (FAQ) → conversion (newsletter/demo CTA). That sales arc — proof sandwiched
between capability and demo, testimonials placed right before FAQ — is the one transferable
structural idea; everything about *who* is fabricated, down to reusing real insurers' names and
logos for fake work, which is the opposite of what a personal portfolio needs.

Across the *whole site* the pattern is more extreme than the homepage alone suggests: the identical
testimonials block, the identical client-logo marquee, and the identical articles-teaser +
newsletter CTA close **every page** — home, pricing, about, projects and contact all end the same
way. The case-study detail page reuses the same proof arc again in miniature (stat strip →
testimonial → narrative). It's storytelling by repetition of a small set of blocks rather than a
bespoke arc per page — consistent, but the opposite instinct from a personal portfolio, where each
page should prove something different.

## Key screens
- **Hero** (`desktop-fold.png`, `frames/home-01-hero.png`): nav + 4-item capability list + 2
  auto-rotating client logos top-right, oversized 2-line headline bottom-left over the noise/blocks
  render, primary CTA, sticky template-upsell badge bottom-right.
- **Capability + live stats** (top of `desktop.png`): 4-card icon grid, then a "PRODUCT STATISTICS"
  block with three animated gauge/chart cards and one wide sparkline card.
- **Case studies + product demo** (middle of `desktop.png`; `frames/home-04-workflow-canvas.png`):
  light-mode 3-row case-study list (logo · date · title · description · chevron) followed by a dark
  tabbed feature demo with a live node-based workflow-canvas mockup (Email Trigger → Edit Fields →
  Telegram/If/Send Email) that the homepage's own 3000px-tall full-page slices happened to cut
  across the seam between two crops — only the live frame capture caught it whole.
- **Integrations + testimonials + FAQ** (lower `desktop.png`): tool-integration logo grid,
  4-column star-rated testimonial strip, a repeated client-logo marquee, an article/blog teaser
  grid, and an accordion FAQ with a segmented control, closing on a newsletter CTA over the
  noise/grain background. The true footer (giant "armory" wordmark + link columns + copyright)
  never appears here — the homepage is taller than the capture tool's 15,000px clip.
- **Pricing** (`pricing-desktop.png`): eyebrow + H1 + 3-tier table (Starter $1,500 / Growth $3,000,
  visually emphasized in an inverted dark column / Enterprise $8,000), rows grouped under
  Features/Capabilities/Support & Delivery with check/dash marks, then the same FAQ block as home,
  then the real footer (only visible here and on the shorter subpages).
- **About** (`about-desktop.png`): mission H1 → two mood photos (paint swirl, mountain lake) → a
  row of 4 **radial percentage dials** (95/90/92/100) → mission statement → proof numbers (8yrs,
  3x ROI, 12 frameworks) → a **compliance-badge row** (IRAP, ISO 27001, ISO 42001, SOC2) → a
  4-person stock-photo team grid on flat colour backgrounds → the identical testimonials block and
  client-logo marquee seen on home → articles teaser → footer.
- **Projects listing** (`project-desktop.png`): "AI systems we've designed and deployed" → 5 stacked
  rows (logo · `//2026` · title · description · chevron) for Cigna, Aetna, Anthem, CVS Pharmacy and
  United Healthcare → newsletter CTA → footer.
- **Case study detail** (`case-cigna-desktop.png`, `/project/cigna-smart-health-systems`): duotone
  photo hero (client logo + H1 + tagline) → a 4-stat proof strip whose headline numbers ($45M / 700%
  / 41x / 84) **contradict the numbers in their own captions** ("over 50M," "by 40%," "a 12x
  return") → testimonial quote → challenge paragraph beside an Industry/Timeline/Platform/Live-URL
  meta sidebar → two-column narrative → black-and-white architectural photo gallery.
- **Articles** (`articles-desktop.png`): "Insights on neural logic" → a 5-card grid (1 large + 4
  paired with small noise-texture thumbnails), each with title, date and read-time — all 5 dated the
  identical "Apr 29, 2026."
- **Contact** (`contact-desktop.png`): "Start your AI build" form (Name/Email/Location/Budget/a
  second field mislabeled "Email" that is clearly meant to be "Message") beside an embedded map;
  below it, phone numbers with a **+234 (Nigeria) country code**, an **Austin, TX** postal address,
  and the map itself centered on **Covent Garden, London** — three different countries on one
  contact block — plus visible "API KEY REQUIRED" tiling across the unauthenticated map.
- **Mobile** (`mobile.png` + subpage `*-mobile.png`): single column throughout; hero copy reflows to
  two lines and every icon/stat card stacks full-width with spacing preserved. But the sticky
  "Buy Armory AI Template" badge is a genuine cross-page defect on mobile: it overlaps the Starter
  plan's price on `pricing-mobile.png` and covers part of the first stat's caption on
  `case-cigna-mobile.png` — a homepage-only mobile review would have missed this.

## Bilingual / RTL notes
`lang="en"`, no language switcher or RTL affordance anywhere. Nothing here would survive a Persian
pass unchanged: the monospace eyebrow/stat labels (`//2026`, `SLA 99%`) are a Latin-alphabet, LTR
typographic device with no Farsi equivalent; the display grotesk has no matching Farsi weight; and
the strict 4-column hairline grid would need to mirror wholesale for RTL. The **giant outline
wordmark footer** is the hardest single piece — it's a bespoke, display-scale lettering treatment of
the Latin word "armory," not a font that can be swapped, so a Persian equivalent would need a custom
redraw rather than a translation. The one idea that would transfer is structural, not typographic:
the dark/light section alternation, the mono eyebrow label, and the case-study meta sidebar's
label/value pairs, all of which mirror cleanly as a language-agnostic rhythm device.

## Takeaways for Sina
- **Borrow:** the animated-stat/dashboard card and the **radial percentage dial** as compact "proof"
  components (a gauge, dial or sparkline next to a number reads as more credible than a bare stat);
  the small mono-caps eyebrow label as a lightweight section-identity device; the **giant outline
  wordmark footer** as a genuinely distinctive closing signature — one of the only components here
  that isn't genre-default; a **compliance/trust-badge row**, if Sina ever has real certifications
  or platform partnerships to show.
- **Adapt:** the dark/light alternation as section rhythm — works well with one real accent color
  instead of pure monochrome; the sales arc order (capability → proof → demo → testimonials → FAQ)
  can inform how a single *case study* is internally sequenced, not the top-level site; the
  case-study **meta sidebar** (Industry/Timeline/Platform/Live URL) as a cheap fact-box pattern.
- **Avoid:** scroll-scrubbed text reveals tied to exact scroll position — **confirmed live** (not
  just in a screenshot) to leave text stuck partially transparent and illegible if the user's scroll
  comes to rest partway through, and it still fights `prefers-reduced-motion`; a persistent sticky
  UI element (Armory's upsell badge) that was never checked against mobile content on inner pages,
  where it visibly covers a price and a stat caption; reusing real company names/logos for
  fabricated case studies, and worse, letting a case study's headline numbers contradict their own
  captions — a hard line for Sina's own site, where every client and number must be real,
  internally consistent, or explicitly marked confidential.

## Notes
- Meta generator confirms Framer (`Framer 40f5bc6`); the live demo carries its own "Made in
  Framer" + "Buy Armory AI Template — from $129" badge on *every page* — this is a *template
  product listing*, not an operating business (`site_kind: product`), so `owner`/`owner_role` name
  the template's author (Delani, `sirdelani` on Contra; sells more templates at `delani.pro`), not
  a real "Armory" team.
- **The scroll-reveal bug is confirmed live, not just in a screenshot.** Using Playwright to locate
  the "Integrate with" paragraph directly (`scrollIntoViewIfNeeded`, motion NOT reduced) put it at
  `scrollY: 903`. Screenshotting it there — both immediately and again after an extra 1.5s of
  dwell time — shows the exact same result both times: everything after "...unmatched precision.
  Bui" stays frozen at roughly 15–20% opacity (`frames/home-02b-integrate-arrive.png`,
  `frames/home-02c-integrate-settled.png`). Because it doesn't change between the two captures, the
  effect is driven by scroll *position*, not time — so any visitor whose scroll comes to rest in
  this range (trackpad momentum ending, a mid-page anchor jump, just pausing to read) sees
  permanently half-legible text, not a screenshot artifact.
- **Page height itself is unstable depending on motion state**, which is *why* the original
  full-page `desktop.png` (captured with `prefers-reduced-motion: reduce`) showed a *different*
  partial-reveal state of the same paragraph at a different apparent position (~y 3050 in that
  image) than the live, motion-enabled scrollY (903) for the same element. Six settled frames taken
  at planned offsets down the live, motion-enabled page consistently landed on *earlier* content
  than the same nominal offsets implied in the frozen full-page capture — the two rendering modes
  do not share a coordinate system. Comparing scroll positions between a motion-reduced screenshot
  and a live browser session is unreliable for this site.
- The hero's client-logo pair **auto-rotates**: `desktop-fold.png` (motion frozen) shows
  CVS Pharmacy + United Healthcare; `frames/home-01-hero.png` (motion live, same session as above)
  shows United Healthcare + Aetna a few seconds later.
- **Cigna case study's headline stats contradict their own captions**: the strip reads `$45M` /
  `700%` / `41x` / `84`, but the captions underneath say "secured over **50M**," "increased ... by
  **40%**" and "achieved a **12x** return" — the big number and the sentence explaining it disagree
  in 3 of 4 cards (`case-cigna-desktop.png`).
- **Contact page has three mutually contradictory locations** on one screen
  (`contact-desktop.png`): phone numbers with Nigeria's `+234` country code, a postal address in
  Austin, TX, and an embedded Leaflet/OSM/CARTO map centered on Covent Garden, London (street names
  "Strand," "Pall Mall," "St James's Park" are visible) — and that map tiles in "API KEY REQUIRED"
  watermarks throughout, meaning the embed isn't even authenticated. The form also has two fields
  both labeled "Email" — the second is clearly meant to be "Message."
- All 5 articles on `/articles` share the identical publish date ("Apr 29, 2026") — a template tell
  that wouldn't survive on a real, actively-updated blog.
- The healthcare client names/logos (CVS Pharmacy, United Healthcare, Cigna, Aetna, Anthem) and the
  testimonial companies (Vertex Labs, FlowState AI, Neural Sync, Sentinel Ops) are all
  placeholder/fictional — worth remembering if this ever resurfaces as a visual reference, so the
  pattern isn't mistaken for a real case study.
- Both `desktop.png` and `mobile.png` were clipped at the capture script's 15,000px cap (real page
  height ~15,595px desktop / ~25,281px mobile), so the homepage's own screenshots never reach the
  real footer — it's only visible on the shorter subpages (Pricing, Projects, Contact all end in
  the giant "armory" wordmark + Quick Links/Company/Policies columns + copyright).
- The sticky "Buy Armory AI Template" badge visibly overlaps real content on mobile subpages —
  the Starter plan's price on `pricing-mobile.png` and part of a stat caption on
  `case-cigna-mobile.png` — a defect a homepage-only mobile check would miss entirely.

## Scores
- **distinctiveness (2):** accomplished but genre-default — this exact grammar (grain, glow orb,
  isometric icons, mono eyebrow) is the current template-marketplace look for "AI agency" sites, and
  a "Made in Framer" resale badge runs on every page; the giant wordmark footer is the one component
  that pushes back against "interchangeable," not enough on its own to lift the system.
- **typography (4):** a consistent, deliberate sans/mono pairing carries the entire hierarchy —
  confirmed across the homepage, the case-study meta sidebar and the pricing table's category
  labels, not just one section; only the repeated eyebrow→H2→paragraph rhythm gets monotonous
  across 6 pages of it.
- **motion (2):** revised down after live interaction testing. Animated gauges, a sparkline, a
  workflow-canvas demo and tab/accordion interactions are genuinely well produced, but the
  scroll-scrubbed paragraph reveal is a **confirmed, reproducible defect** — text stuck illegible at
  rest, not a hypothetical or a capture artifact — which the Rubric's motion criterion treats as
  motion that "blocks reading," not merely "decorative."
- **brand (2):** the sections cohere into one confident tone, but there is no real person or real
  work behind it: case studies reuse actual insurers' names/logos for fabricated, internally
  contradictory results (mismatched headline/caption stats), all 5 articles share one publish date,
  and the contact page's own location details disagree with each other — the opposite of the proof
  a personal portfolio needs.
- **mobile (3):** revised down after checking subpages, not just the homepage. Single-column reflow
  is clean and nothing is cramped, but the sticky template-upsell badge concretely overlaps a price
  and a stat caption on two different subpages — a real, repeated collision, not a one-off.
- **relevance (2):** a SaaS/agency template, not a personal-portfolio kind of site (Rubric: "one
  idea worth noting; otherwise a different kind of site") — worth keeping for the radial-dial,
  animated-stat-card, trust-badge and eyebrow-label devices, not for content or brand structure.

## Screenshots
Local-only, in `assets/armory-framer-ai/` (gitignored): `desktop.png` (1440) · `mobile.png` (390) ·
`desktop-fold.png` (1440×900, first viewport).

Additional captures: `pricing-{desktop,mobile}.png` · `about-{desktop,mobile}.png` ·
`project-{desktop,mobile}.png` (the `/project` listing) · `case-cigna-{desktop,mobile}.png`
(`/project/cigna-smart-health-systems`) · `articles-{desktop,mobile}.png` ·
`contact-{desktop,mobile}.png`.

`frames/` — settled 1440×900 viewport captures on `/`, taken live with motion enabled instead of
trusting the full-page screenshot: `home-01-hero.png` · `home-02-orb-transition.png` ·
`home-02b-integrate-arrive.png` / `home-02c-integrate-settled.png` (the confirmed stuck-reveal, at
`scrollY: 903`) · `home-03-case-to-product.png` · `home-04-workflow-canvas.png` ·
`home-05-tabs-demo.png` · `home-06-articles.png`. Names describe what each frame actually shows,
which in several cases differs from the section the same nominal offset shows in the frozen
full-page capture (see Notes on page-height instability).
