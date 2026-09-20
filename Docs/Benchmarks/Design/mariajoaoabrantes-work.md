---
title: "Maria João Abrantes — mariajoaoabrantes.work"                 # Site / project name
url: "https://www.mariajoaoabrantes.work/"
slug: "mariajoaoabrantes-work"                  # domain in kebab-case; equals this file's name
type: "design"
owner: "Maria João Abrantes"                 # Person or studio behind it
owner_role: "Product Strategist & Designer — Product Partner / Design Advisory"            # e.g. Product Designer, Art Director
site_kind: "personal-portfolio"             # personal-portfolio | studio | agency | product | other
lang: "en"                  # html lang, e.g. en
generator: "Next.js (Turbopack build), CSS Modules, custom Radix-Colors-style token system; Plus Jakarta Sans via next/font"             # tech hint from meta generator / obvious stack, if any
date_added: "2026-09-19"
relevance: 4              # 1–5 relevance to Sina's brand — see ../Rubric.md
scores:                   # 0 = not scored yet (draft only); 1–5 per ../Rubric.md
  distinctiveness: 3
  typography: 4
  motion: 3
  brand: 4
  mobile: 4
summary: "A rigorously tokenized dark-canvas system (12-step neutral + violet/yellow accent scales) where one accent colour is bound to each of her two services from hero to case-study tags; the case-study 'key decisions' log and consultant-grade proof are the model, the visual identity itself is a well-executed but familiar dark-SaaS genre"               # one-line takeaway; shown in the index
tags: [dark-canvas, violet-yellow-duo, design-tokens, single-typeface, service-color-coding, decision-log, consultant-portfolio, calendar-embed, grain-texture]                  # e.g. [editorial, brutalist, motion-heavy, dark, serif]
screenshots:
  - desktop.png
  - desktop-fold.png
  - mobile.png
  - mobile-menu.png
  - about-desktop.png
  - about-mobile.png
  - services-desktop.png
  - services-mobile.png
  - work-desktop.png
  - work-mobile.png
  - contact-desktop.png
  - contact-mobile.png
  - case-constructer-ai-desktop.png
  - case-constructer-ai-mobile.png
  - case-reach-users-desktop.png
  - case-reach-users-mobile.png
  - case-outsystems-ui-kit-desktop.png
  - btn-contact-default.png
  - btn-contact-hover.png
status: draft
---

# Maria João Abrantes — mariajoaoabrantes.work

> A dark, rigorously tokenized "product-partner" system — violet for one service, butter-yellow
> for the other, the same pairing running from hero eyebrow to service card to case-study tag —
> benchmarked because it shows how a 12-step colour scale and a named type/spacing/motion token
> system can carry a solo consultant's brand with zero bespoke illustration.

## Overview
Mood: a calm, near-black product console. The page reads like a well-run internal design system
turned outward — everything sits on one neutral ground (`#141414`) with exactly two accents doing
all the work: a soft lavender **violet** and a soft butter **yellow**, each bound to one of her two
service offers and never used interchangeably. There is no illustration, no photography of tools,
no metaphor object the way Pleurat has a bench — the personality comes from *evidence* (named
clients, quantified results, testimonials) and from one page, `/about`, that breaks the system on
purpose. The projected personality is *senior operator*: precise, unshowy, confident enough to lead
every case study with the number before the story.

## Visual language
- **Typography:** one family for every role — **Plus Jakarta Sans**, loaded via `next/font` as a
  single `--font-sans` variable that both `--font-display` and `--font-body` resolve to (no second
  typeface anywhere, including 10px meta labels — a single-voice system, the opposite of Pleurat's
  sans/mono pairing). A full named token scale backs it: weights `300–700` (light…bold), tracking
  from `tighter (-.05em)` to `widest (.14em)`, leading from `display (.9)` to `loose (1.78)`, and a
  fluid size scale via `clamp()` (`--text-5xl: clamp(56px, 3.536vw + 42.74px, 88px)`). The hero H1
  uses its own literal `clamp(52px, 6.8vw, 88px)` at `leading-display (.9)` and `tracking-tighter
  (-.05em)`. Body measure is tokenized in `ch` units (`--measure-body: 44ch`, up to `64ch`) rather
  than left to whatever the column happens to be. Small caps-style eyebrows and category tags are
  the same family, just uppercase, letter-spaced and dimmed — a weight/spacing trick, not a second
  voice.
- **Color:** a full Radix-Colors-style system — 12-step scales defined for `wine` (near-neutral;
  `wine-1 #141414` is the page ground *and* `--color-surface`, `wine-12 #dedede` is the default text
  colour — literally opposite ends of one scale), `violet` (`violet-9 #c2a8ff`, sampled from the
  page), and `yellow` (`yellow-9 #ffef93` sampled; `yellow-7 #ffdd1a` a more saturated variant used
  elsewhere). `blue` and `green` 12-step scales are also shipped in the stylesheet but not visibly
  used on this site — infrastructure built ahead of need. `--color-accent-*` aliases the wine scale
  in reverse; semantic names layer on top (`--color-nav-scrolled-bg: color-mix(wine-2 70%,
  transparent)`, `--color-card-glow: yellow-9`, `--color-canvas-grain-rgb: 150, 125, 105` for a film-
  grain texture). The discipline is that violet and yellow are never decorative-interchangeable —
  violet is "Product Partner," yellow is "Design Advisory," full stop, from the hero eyebrow through
  the service cards through every case study's tag row.
- **Layout & grid:** `--container-max: 1280px` / `--container-pad: 52px` (the same 1280 content
  ceiling as Pleurat, coincidentally) with a `--space-section: 105px` vertical rhythm and a plain
  4px-based spacing scale (`--space-1` … `--space-40`). `--radius-full` pills every button and tag;
  `--radius-2xl` (40px) rounds cards and framed photos. There is no dense multi-column grid the way
  Pleurat has a 12-column employer grid — sections stack single-column and full-width; the densest
  moments are the 2-up service-card pair and a 3-up testimonial row.
- **Imagery:** three registers matched to what each project actually has to show. Desktop SaaS work
  (Constructer AI, Reach Users) is framed inside a light macOS-style browser chrome — a dashboard,
  a document list, a node-graph canvas. The OutSystems UI Kit case study switches to three real
  iPhone mockups (share sheet, colour picker, date picker) since it's a component library, not an
  app. Reach Users has no product screenshot in its hero at all — a warm lifestyle photo (laptop on
  a wood table, a plant) stands in. `/about` breaks from all of it: a dense inline photo/artifact
  collage — portrait, a VR-shoot behind-the-scenes photo, a conference-talk slide thumbnail, an NGO
  group photo, a phone mockup of her own app, a Queen-album collage, a bowl of soup — the only place
  personality is carried visually rather than through copy. Inside the case studies, embedded product
  screenshots sit inside a soft radial **amber/orange glow** behind the frame (Reach Users' three
  mid-article screenshots) — a warmer accent than the violet/yellow pair used everywhere else,
  reserved for "look closer" moments. One OutSystems UI Kit mockup drops the plain grey frame for a
  **marble-textured backdrop** behind the phone — the one place a literal grain/texture image appears,
  plausibly what the `--color-canvas-grain-rgb` token (`150, 125, 105`, a matching warm stone tone) is
  built for.
- **Motion & interaction:** confirmed in part by direct capture — comparing `btn-contact-default.png`
  against `btn-contact-hover.png` (same pill button, `:hover` triggered and given 350ms to settle)
  shows a real **violet tint blooming in from the button's bottom-left corner**, matching the CSS's
  `--btn-blob-color` mechanism exactly; this is observed, not just inferred. Still unconfirmed live:
  scroll/page-load reveals, the cursor and route-change "curtain" implied by the z-index scale
  (`--z-cursor`, `--z-curtain`), and whether reduced-motion is honoured at runtime and not just
  declared. The stylesheet backs all of it with a named system — easing tokens `ease-out-expo`,
  `ease-in-out`, `ease-in-out-strong` and a literal spring (`cubic-bezier(.34,1.56,.64,1)`); durations
  `fast (.15s)` → `slower (.7s)`; `prefers-reduced-motion` referenced 10 times across the stylesheet.
  > ❓ **Q1 — Confirm live:** the hover blob is now directly confirmed (above); scroll-reveal
  > behaviour, the cursor effect and the route-change curtain are still CSS-inferred, not observed.
  > Worth a five-minute live pass with motion unfrozen to close this out.
- **Components:** pill nav + pill "Contact →" CTA; two-tone eyebrow tag (`Product Partner · Design
  Advisory for Product Teams`, one clause per accent colour); work card (framed image, title,
  one-line quantified result, category-tag row); numbered "how I work" list (01–04, no icon or card
  chrome, just index + heading + body); the 2-up **service card** pair (solid violet / solid yellow
  fill, tag row, "this is for you if" checklist, "Book a meeting" button) — the site's signature
  component, reused verbatim on `/services`; a smaller, darker diagnostic/audit card pair (scope +
  price + timeline; the Diagnostic Session is the only priced item on the whole site, €450 ex. VAT);
  FAQ accordion (`+` toggle, reused on `/services` and `/contact`); case-study meta grid (client ·
  role · duration · tags); pull-quote block (large quote + name/role attribution); testimonial trio;
  a self-styled embedded **calendar** (month grid, available dates bolded, a dot marking today) on
  `/contact` instead of a third-party scheduler redirect; a floating skill-pill "cloud" (rounded blob
  shapes, `/about` only); a fixed white "**W. / Honors**" awards-badge tab on the right edge of every
  page and breakpoint.

## Brand storytelling
The device here is **consistent colour-coding of two services**, not a single central metaphor the
way Pleurat's bench is. From the first screen, violet means "Product Partner" (founders without a
designer) and yellow means "Design Advisory" (teams without a senior voice) — and that binding holds
through the hero eyebrow, the service cards, and even which colour a given case study's tags read
closest to. The homepage order is: **what I do** (hero, two-tone eyebrow) → **proof first** (three
work cards, each led by a one-line quantified result, before any process detail) → **how I work**
(four first-person principles, numbered, no icons) → **the two offers**, colour-coded → **book a
call**. Nothing is gated behind "read more" until the visitor already knows the offer and the result.

Experience isn't visualised as a chart, ticker or grid (contrast Pleurat's three different
visualisations of the same decade); it's carried entirely by the **case-study decision log** — each
of the three case studies names the client, states a quantified before/after immediately, then walks
three to five *named, numbered decisions* ("Two user types, one product," "Architecture before
components," "Slots over variants") with the reasoning behind each, before listing what shipped and
the result. It reads like a design-review document more than a portfolio slide, which is itself the
brand statement: *this is how she thinks, not just what she shipped*. Personality — the part a
consultant-positioned site usually suppresses — is pushed almost entirely onto `/about`: a VR short
film about sexual harassment made for her Master's thesis (shortlisted, Berlin Lift-Off Film Festival
2022), a self-funded clean-water project in Nyambori, Tanzania, teaching UX since 2021, mentoring on
MentorCruise, two of her own products in progress, and a closing note on Queen and caldo verde. The
JSON-LD `Person` node quietly mirrors this (`knowsLanguage: ["English", "Portuguese"]`, a full
`knowsAbout` list) — the structured data tells the same story the page does.

## Key screens
- **Home hero** (`desktop-fold.png`): two-tone eyebrow, H1 at `clamp(52px,6.8vw,88px)` /
  `line-height .9` / `tracking -.05em`, one subhead paragraph, no CTA button in the fold itself — the
  pill "Contact" in the nav is the only action above the fold, a quieter opening than Pleurat's
  two-CTA hero.
- **Selected work** (`desktop.png`, `work-desktop.png`, `work-mobile.png`): three cards, each a
  framed image + one-line result + category-tag row; `/work` repeats these full-width with a
  one-line intro rather than listing more projects — three case studies is the entire visible body of
  work. Mobile stacks the same cards full-width with the tag rows wrapping cleanly to two lines.
- **Services** (`services-desktop.png`, `services-mobile.png`): "Design decisions that move as fast
  as your product," then the violet/yellow card pair, a second darker pair (Diagnostic Session /
  Product Audit — the only priced items on the site), and an FAQ accordion. A Google Analytics
  consent banner is visible mid-page in the desktop capture — almost certainly a screenshot-stitching
  artifact of a fixed-position element, not a real mid-page placement; see Notes. Mobile stacks both
  service cards full-width with the checklist and CTA intact — one of the better-adapted pages, not
  just shrunk.
- **Case study — Constructer AI** (`case-constructer-ai-desktop.png`, `-mobile.png`): meta grid
  (client · role · duration · tags) under a browser-chrome screenshot, then Business Context →
  Research & Discovery (named method, named client, a legal-manager quote) → Key Decisions (three,
  numbered, each with its trade-off) → What Was Delivered (three modules) → outcome. Long — roughly
  2,500–3,000 words, ~27,000px on mobile — but skimmable by heading alone.
- **Case study — Reach Users App** (`case-reach-users-desktop.png`, `-mobile.png`): the same
  five-part skeleton, but with the richest image treatment of the three — a lifestyle hero photo, then
  three progressively-detailed product screenshots each sitting inside a soft amber glow (see Visual
  language). Closes on a **two-up next-project grid** linking to *both* other case studies
  (Constructer AI and OutSystems UI Kit), not just one — the only case study observed doing this;
  the other two link forward to a single next project each.
- **Case study — OutSystems UI Kit 2025** (`case-outsystems-ui-kit-desktop.png`): opens on three
  iPhone mockups (share sheet, colour picker, date picker) rather than a browser-chrome dashboard,
  reflecting that the deliverable is a component library; a later section swaps the plain mockup frame
  for a marble-textured backdrop behind a single phone, and closes on a 4-up grid of smaller mobile
  screens before the next-project card.
- **About** (`about-desktop.png`, `about-mobile.png`): a floating pill-cloud of thirteen skill words
  opens the page with no heading, then a first-person bio with photos, a laurel icon and a
  conference-talk thumbnail collaged inline paragraph by paragraph, three named testimonials, and a
  "Talks" section. The one page that breaks the token-driven, card-based rest of the site, and the
  one page where the mobile version stays as visually dense as desktop (see `scores.mobile`).
- **Contact** (`contact-desktop.png`, `contact-mobile.png`): "Say **hello**" in the same two-tone
  technique as the homepage eyebrow (default clause / yellow clause), a self-built calendar widget
  beside two lines of copy and an email fallback, then the same FAQ accordion as `/services`. The
  calendar widget survives the drop to 390px fully legible and tappable — the single riskiest
  component for a mobile pass and it holds up.
- **Mobile menu** (`mobile-menu.png`): a hamburger opens a dark sheet over the current page (the page
  behind it stays visible through the scrim), the active route marked in yellow, four links stacked
  large, initials "MJA" + a chevron pinned at the bottom.
- **Button hover state** (`btn-contact-default.png` vs. `btn-contact-hover.png`): direct before/after
  evidence of the CSS "blob" hover — see Motion & interaction above.

## Bilingual / RTL notes
English only — `lang="en"`, JSON-LD `inLanguage: "en-US"`, no `hreflang` alternates, no language
switcher in the nav on any page captured. The JSON-LD `Person` node lists
`knowsLanguage: ["English", "Portuguese"]` as a fact about Maria, not as a site capability. What
would survive a Persian version and what would not:

- **Survives:** the single-typeface-plus-tokens approach is arguably *safer* to localise than a
  two-role system — one Persian-capable family replaces the whole scale rather than needing a mono
  partner to also carry Persian (contrast Pleurat's IBM-Plex-Mono gap). The wine/violet/yellow token
  scales are colour, not script, and transfer as-is; so does binding one accent per offer.
- **Needs a Persian partner face / override:** `letter-spacing: -.05em` (`tracking-tighter`) on the
  display headline is a Latin-kerning move Persian needs to override, not inherit; the fluid
  `clamp()` sizes likely still work but were tuned against Latin glyph proportions.
- **Mirrors as layout:** the two-tone "Say **hello**" / eyebrow device (default clause, then accent
  clause) is cheap to rebuild in `dir="rtl"` if built as two `<span>`s rather than a fixed left/right
  split — same caution as Pleurat's two-tone headline. The card-based, single-column layout has
  nothing left-anchored that would fight a mirror.
- **Untested here:** nothing on this site was built for RTL. Notably, one of *her own* case studies
  (OutSystems UI Kit — see Notes) lists "RTL support" as a foundation-level requirement of the design
  system she shipped for a client — evidence she has hands-on RTL experience even though her own site
  doesn't use it.

## Takeaways for Sina
- **Borrow:**
  - **A real token system, not just a palette.** Named 12-step colour scales with semantic aliases
    (`surface`, `text-default`, `accent`), named weight/tracking/leading tokens, a `ch`-based measure
    scale, named easing/duration/z-index scales. This is close to what a Payload design-tokens block
    should look like structurally, independent of the specific values.
  - **Bind one accent per offer, everywhere.** Violet = Product Partner, yellow = Design Advisory,
    held from the hero eyebrow to the service card to the case-study tag row. If Sina's site ends up
    organised around a small number of distinct tracks, this is a cheaper, easier-to-keep-consistent
    wayfinding device than inventing a metaphor object.
  - **The case-study "Key Decisions" log** — three to five named, numbered decisions with the
    trade-off spelled out, ahead of the deliverables list. More honest and more skimmable than a pure
    narrative, and easier to write consistently across projects of different sizes.
  - **A self-styled calendar embed on Contact** instead of an iframe redirect to a third-party
    scheduler — keeps the visitor inside the site's own visual system at the highest-intent moment.
  - **One FAQ block reused verbatim** on both Services and Contact — pre-empts the objections that
    would otherwise become email back-and-forth.
  - **An explicit, cheap, priced entry point** (the €450 Diagnostic Session) next to the open-ended
    retainer offers — gives a hesitant visitor a low-commitment way to start.
- **Adapt:**
  - **Personality is pushed to About and Home's "how I work" list only.** For Sina, whose brand sits
    between design, marketing and product (D-007), the equivalent decision is which page carries the
    point-of-view voice and keeping the rest (services, case studies) in this site's more evidenced,
    structured register.
  - **Single-typeface-plus-tokens is a lighter bilingual bet** than a two-role pairing, but the
    tracking-tighter display treatment needs a Persian-specific override, not a blanket token.
  - **Service colour-coding generalises past two colours** if Sina ends up with three-plus offer
    tracks — would need a third/fourth step on the accent scale planned up front, not added ad hoc.
- **Avoid:**
  - **Fixed-position chrome (nav, badge, cookie banner) that ghosts in stitched full-page
    screenshots** — not a site flaw, a benchmarking-methodology one: any element pinned with
    `position: fixed` gets re-captured at each scroll-stitch boundary in a tall full-page shot (see
    Notes). Worth knowing before Sina's own site gets benchmarked by someone else the same way.
  - **Photo collage that doesn't re-flow for mobile** — `/about`'s inline photos stay as dense at
    390px as at 1440px; small images crowd tight against body text instead of being re-cropped or
    thinned for the narrow column (see `scores.mobile`).
  - **One photographic register standing in for a missing product shot** (the Reach Users "laptop on
    a table" hero) reads fine once; it would read as a gap if repeated across more projects.

## Notes
- **Stack:** Next.js, built with **Turbopack** (chunk filenames are turbopack-hashed) and **CSS
  Modules** (hashed `page-module__xxxxx__className` selectors) — not Tailwind (zero hits in the
  shipped CSS) or Webflow/Framer (zero hits) despite the polish. Fonts via `next/font` — **Plus
  Jakarta Sans** only, exposed as a `--font-sans` variable that both `--font-display` and
  `--font-body` resolve to. A dynamic OG image via Next's `/opengraph-image` route (1200×630,
  generated, not a static file). JSON-LD `WebSite` + `ProfilePage` + `Person` graph. `theme-color:
  #141414` matches the page background exactly. No `color-scheme` declared anywhere — one dark theme,
  no toggle.
- **Analytics/consent:** a custom, non-vendor consent banner ("I use Google Analytics… It sets
  cookies only if you say yes" — no OneTrust/Cookiebot/Iubenda footprint) gates analytics until
  accepted; no `gtag`/`G-…` id appears in the initial HTML, consistent with it loading only
  post-consent.
- **Crawling posture:** `robots.txt` explicitly `Allow: /` for a long, deliberate list of AI crawlers
  by name — GPTBot, ClaudeBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended, CCBot,
  anthropic-ai — a stance, not an oversight, consistent with the "AI workflows" line in her own
  positioning.
- **Sitemap:** all nine routes present (`/`, `/work`, `/about`, `/services`, `/contact`, `/privacy`,
  three case studies) with sensible `priority` weighting (home 1.0, case studies 0.8, privacy 0.3) —
  nothing missing the way Pleurat's `/ai` was absent from its sitemap.
- **Grain:** a `--color-canvas-grain-rgb` token (`150, 125, 105`, warm brown) implies a film-grain /
  noise texture somewhere in the canvas rendering; the marble-textured OutSystems mockup backdrop
  (Key screens) is the closest visual confirmation found, not a direct pixel-level match.
- **Screenshot-methodology caveat (corrected from the first pass):** the Google Analytics consent
  banner, the fixed nav bar and the "W./Honors" badge all appear to duplicate mid-page in several
  full-page captures (`services-desktop.png`; a "Maria João Abrantes" fragment mid-scroll in
  `work-mobile.png`). All three are `position: fixed` elements (confirmed by the badge sitting at an
  identical pixel position across pages of very different total height). Chromium's full-page
  screenshot works by scrolling and stitching viewport-height slices, and a `fixed` element gets
  re-rendered at each stitch boundary — so this reads as a **capture artifact, not a site bug**; the
  first pass of this benchmark described the consent banner as "reappearing, undismissed," which
  overstated what was actually observed. Real-visitor behaviour (does "accept" persist across
  navigations) is still unconfirmed either way — nothing here proves it does or doesn't.
- **Page length:** the Constructer AI and Reach Users case studies run to roughly 15,000px and
  11,000px at desktop width, and **27,000px / 21,000px on mobile** — several times taller than the
  same content at 1440px, since nothing about the type scale or image sizing compresses much at
  390px. Worth a page-length budget per case study, the same note Pleurat's benchmark ended on.

## Scores
Justification for each `scores.*` value and `relevance` — see [Rubric](../Rubric.md).

- **distinctiveness: 3** — a clean, confident dark-canvas-plus-two-pastel-accents look, held
  consistently everywhere down to the case-study tags, but the vocabulary itself (near-black ground,
  soft violet/yellow, pill buttons, rounded cards) sits within a familiar contemporary
  "product-consultant SaaS" genre rather than inventing its own device the way Pleurat's bench does;
  the About page's photo collage is the one place it breaks pattern.
- **typography: 4** — a genuinely rigorous token system (named weight/tracking/leading scales, fluid
  `clamp()` sizes, `ch`-based measure tokens) executed consistently, but it is one typeface for every
  role including the smallest meta labels — solid hierarchy through spacing and weight alone, short
  of a 5 because there's no second voice or pairing doing work the way Pleurat's mono captions do.
- **motion: 3** — the hover "blob" is now directly confirmed by capture (see Motion & interaction),
  not just inferred, and the stylesheet backs the rest with a real named system (easing/duration
  tokens, a spring easing, dedicated cursor/curtain/lightbox z-index layers, `prefers-reduced-motion`
  wired across 10 rules) — see ❓ Q1 for what's still unconfirmed (scroll-reveal, cursor, route
  curtain). Held at 3 rather than raised, since one confirmed hover effect doesn't establish whether
  the rest is purposeful or merely decorative; real reduced-motion support is a point in its favour
  over Pleurat regardless.
- **brand: 4** — colour, imagery register and content all reinforce one message (a senior,
  evidence-driven product partner), and the two-service colour-coding is a genuinely disciplined
  system carried end-to-end; short of 5 because the identity reads as a brand *system* built for
  credibility more than a singular personal statement.
- **mobile: 4** — verified across five of six page types (home, about, services, work, contact) plus
  two of three case studies: the nav becomes a working hamburger sheet, both service cards and all
  three work cards stack full-width with checklists/tags intact, and the `/contact` calendar widget —
  the riskiest single component — stays fully legible and tappable at 390px. Short of 5 because
  `/about`'s photo collage is the one section that stays desktop-dense rather than being re-cropped or
  thinned for the narrow column.
- **relevance: 4** — Avg 3.6. A strong reference for the token architecture, the service-colour-coding
  device and the case-study decision-log format; not a 5 because the visual identity itself reads as
  genre-competent rather than singular, and it offers nothing for the bilingual/RTL problem (D-009)
  beyond a lighter single-typeface starting point.

## Review checklist
- [ ] **Q1** — Hover-state "blob" is confirmed (`btn-contact-default.png` vs. `btn-contact-hover.png`).
  Still open: watch the live site with motion unfrozen for scroll-reveal, the cursor effect and the
  page-transition curtain, and correct `scores.motion` if the lived experience differs from what the
  CSS tokens imply.
- [x] **Q2** — Resolved: `services`, `work`, `contact` and two of three case studies are now captured
  at mobile width (390px); `scores.mobile` raised from 3 → 4 on that evidence. Only the third case
  study (OutSystems UI Kit) has no mobile capture, which doesn't change the score.

## Screenshots
Local-only, in `assets/mariajoaoabrantes-work/`: `desktop.png` (1440) · `mobile.png` (390) ·
`desktop-fold.png` (1440×900, first viewport).

Additional captures: `mobile-menu.png` · `about-{desktop,mobile}.png` ·
`services-{desktop,mobile}.png` · `work-{desktop,mobile}.png` · `contact-{desktop,mobile}.png` ·
`case-constructer-ai-{desktop,mobile}.png` · `case-reach-users-{desktop,mobile}.png` ·
`case-outsystems-ui-kit-desktop.png` (all three case studies now captured, two of them at both
breakpoints) · `btn-contact-{default,hover}.png` (cropped before/after evidence for the CSS "blob"
hover effect, not a full-page capture).
