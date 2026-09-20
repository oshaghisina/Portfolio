---
title: "Zalak Patel — Zecco's Design Portfolio"
url: "https://www.zalak-patel.com/"
slug: zalak-patel-com
type: design
owner: "Zalak Patel"
owner_role: "Senior UX/UI Product Designer – AI (MS-HCI candidate, DePaul University)"
site_kind: personal-portfolio
lang: en
generator: "Vite + React SPA (id=\"root\", hashed /assets bundle); Tailwind CSS v4 (oklch tokens); Three.js WebGL globe; Inter throughout the shell, a script/display pairing on the Profile page; hosted on Vercel"
date_added: 2026-09-19
relevance: 4
scores:
  distinctiveness: 5
  typography: 3
  motion: 3
  brand: 5
  mobile: 5
summary: "A personal-brand dashboard, not a portfolio: dark 'control room' (career gauge, live skill-score matrix) + light 'case-file' work room (15 folder case studies, each with personas, journey maps, SWOT or bubble-chart segmentation, and named behavioral-science citations) + an editorial 'about' room — rigorous case-study depth undercut by skill scores that visibly change on every reload"
tags: [dark-dashboard, bento-grid, gamified-stats, ai-positioning, light-dark-split, folder-metaphor, case-study-rigor, data-viz]
screenshots:
  - desktop.png
  - desktop-fold.png
  - mobile.png
  - mobile-menu.png
  - profile-desktop.png
  - profile-mobile.png
  - case-studies-desktop.png
  - case-studies-mobile.png
  - ai-desktop.png
  - ai-mobile.png
  - case-pocket-protector-desktop.png
  - case-pocket-protector-mobile.png
  - case-z-fit-desktop.png
  - case-civic-energy-desktop.png
  - case-manga-creator-desktop.png
  - case-the-sinclair-desktop.png
  - case-live-portfolio-desktop.png
  - case-live-portfolio-mobile.png
  - toggle-3d-desktop.png
status: draft
---

# Zalak Patel — Zecco's Design Portfolio

> A portfolio built and argued like a product dashboard — a career-hours gauge, a scored skill
> matrix, a live "px/s" cursor-speed counter — benchmarked because it's the most literal "prove it
> with data" execution in this set, in both its strongest form (case studies that cite named
> behavioral-science models and cross-reference 37 real, live client deliverables) and its weakest
> (skill scores that change on every reload).

## Overview
Mood: a product dashboard, not a portfolio. The homepage never scrolls past one viewport-and-a-bit —
six black bento cards on a `#191919` dotted-grid ground (the exact tone comes straight from
`<meta name="theme-color" content="#191919">`), each card reading like a SaaS admin widget: a live
"0 px/s" cursor-speed counter in the header (it moves — "21 px/s", "77 px/s" — on real interaction), a
rainbow speedometer for career hours, a scored skill matrix, a podcast player. It projects *operator*,
not *artist* — competence measured in numbers (25,467 hours, an 83% result, skill scores to the point)
rather than adjectives. Three rooms argue the same person three ways: a dark **control room**
("here is my data"), a light **case-file room** for "Case Studies" and "AI" ("here is my work," 15
folders plus a 60+ item AI-tools wall), and a fourth, easy-to-miss nav item, **"My Profile,"** that
turns out to be the real about/contact page — a full-colour editorial cutout photo, a script-and-sans
headline ("Who's that / *girl?*"), a testimonial, a reading shelf and links to original articles
("here is me").

## Visual language
- **Typography:** The shell — Dashboard, Case Studies, AI — runs on one family, **Inter**, including
  the `--font-mono` token (`font-mono: "Inter", ui-sans-serif, system-ui, sans-serif` — there is no
  real monospace, so the tabular numbers in the skill matrix and stat cards are just Inter at
  whatever weight). Hierarchy there is carried by size and black/bold weight jumps rather than a
  second typeface. The one deliberate exception is the Profile page headline, "Who's that / *girl?*"
  — a thin serif/rounded display face for "Who's that" paired with an italic script face for "girl?"
  (the bundle ships `Caveat`, `Montserrat` and `Playfair Display` as extra faces; this is almost
  certainly where one of them is spent) — a real, considered pairing that never recurs anywhere else
  on the site. Case-study pages separately document a *different* typeface per project as content —
  Pocket Protector's system is "Outfit" (shown as its own type-specimen card with a weight list, Thin
  → Black), while Civic Energy's own product explicitly reuses Inter — the portfolio shell stays
  typographically neutral on purpose so each client brand can show through, except for the one
  headline where Zalak's own voice gets a typeface of its own.
- **Color:** Chrome is strictly monochrome — `#191919` page ground, near-black cards, white text on
  Dashboard; flips to a white ground with near-white cards and black text on Case Studies, AI and
  Profile. Color is spent entirely on data and artifacts: a full-spectrum rainbow arc for the hours
  gauge, a ten-bloom multicolor flower row under the skill matrix, a teal `#5ABDB2` Awwwards
  "W. Nominee" ribbon pinned to the right edge on every page, and whatever palette each case study
  documents for itself — Pocket Protector's `#8cca0d`/`#3c9c14`/`#15803d` green, Civic Energy's dark
  green `#082e29` + orange `#ff7500` climate-tech identity (with its own logo mark, an orange
  lightning bolt inside a leaf), Manga Creator's saturated purple product UI. No accent color belongs
  to the *brand* — Zecco's only fixed colors are black and white; everything else is either
  data-encoded or borrowed from a project.
- **Layout & grid:** Dashboard is a fixed bento grid — one wide hero tile and two squarer stat tiles
  on row one, three equal tiles on row two — with generous card radii and a dotted-grid page
  background that reads as graph paper. Case Studies switches to a strict 4-column card grid (15
  projects). A case-study page itself is built from a **modular component library, reassembled per
  project** rather than one fixed template: every case opens with Overview + a Results/Goal/Challenge/
  Outcome snapshot and closes with a Validation/Reflection/Next-steps triptych (confirmed identical
  across all six read in full), but the middle is assembled from whichever of these fit — a
  pain-point stacked-bar chart, one or two user-persona cards, a five-stage emoji journey map, a SWOT
  quadrant wheel, a three-competitor teardown, a tone-of-voice spectrum, or a custom bubble-chart
  segmentation — plus a differently-named iterative-process tab set every time (Brainstorming/App/AI;
  Brainstorming/Moodboard/App/Landing page; Mind mapping/Dashboard/Website/AI Prototype; Early
  Concepts/Final Outcome; Guest Behavior Insights/Final UI). Same rhetoric each time
  (finding → decision → outcome), different cast of components.
- **Imagery:** Four registers now, not three. (1) A grayscale halftone/pencil-sketch portrait of
  Zalak on the Dashboard, reused at every breakpoint. (2) A completely different **full-colour
  editorial cutout** on the Profile page — a styled photo of her seated, holding a fake tabloid
  ("UX/UI Product AI") up over her face — the one moment of visual humour on the whole site. (3) Flat
  vector illustration for data — a monoline city skyline, ten hand-drawn flowers, isometric buildings
  for Civic Energy, blob-style persona avatars. (4) Real product screenshots inside case studies,
  ranging from two phone mockups (Pocket Protector's conversational onboarding) to a full seven-frame
  numbered UI walkthrough for Manga Creator (character generator, onboarding modal, brush studio,
  layers panel, text-bubble tools — an actual shipped-feeling app). A WebGL globe (Three.js) is the
  one component that can fail — it errors out without a GPU and degrades to a plain "Globe
  Unavailable" string rather than breaking the card.
- **Motion & interaction:** Captured with motion frozen/reduced, so transition-level polish (easing,
  hover, page loads) is not directly confirmed. What *is* confirmed: the "0 px/s" cursor-speed counter
  is genuinely live (it read 21 and separately 77 px/s under real mouse movement, 0 at rest), and the
  skill-matrix scores are not static data — they read differently on every fresh page load.
  "AI-Driven UX Strategy" read **99, then 86, then 96, then 96, then 88** across five separate loads;
  "Total Design Hours" stayed fixed at **25,467** every time. That's a deliberately generative/
  randomized detail layered onto an otherwise-real stat, not a bug — reinforcing the AI positioning at
  the cost of the "numbers as proof" credibility the rest of the site is built on. Other signals of a
  live system: a needle-marked gauge, a testimonial carousel with pagination dots on Profile, and per
  case study its own segmented tab control. Clicking "3D" on the Dashboard changed the pill's active
  state but produced no visibly different layout on that route; the mobile nav drawer drops the "3D"
  option entirely (2D/VR/AR only), suggesting the 3D mode is deliberately desktop/hardware-gated
  rather than aspirational chrome. Lazy-loaded thumbnails on the AI page were still showing "LOADING"
  placeholders even after a scripted scroll-through — 60+ images is a lot to hydrate.
- **Components:** pill-shaped multi-way toggle (2D/3D/VR/AR, 2D/VR/AR on mobile); pill tab bar
  (Dashboard/Case Studies/AI); a real mobile nav **drawer** (hamburger → Dashboard/Case Studies/AI/My
  Profile list, confirmed — not a dead end); live stat pill ("0 px/s"); black bento card with an
  icon-label eyebrow; horizontal skill-score row with a numeric badge; rainbow gauge with dual
  endpoint labels; manila-folder project card; segmented RESULTS/GOAL/CHALLENGE/OUTCOME snapshot card
  with big stat callouts; dot-matrix percentage icon; type-specimen and hex-labeled color-swatch
  cards; **user-persona card** (illustrated avatar, demographic line, Frustrations list); **five-stage
  emoji journey map**; **pain-point stacked-bar chart**, sometimes segmented by a second dimension
  (traveler type); **SWOT quadrant wheel**; **three-tile competitor teardown**; **tone-of-voice
  spectrum**; **custom bubble-chart segmentation** with named, hex-coded clusters; numbered
  iterative-process step list (colored left rule + all-caps title) paired with a category-bulleted
  detail column; Validation/Reflection/Next-steps triptych; prev/next case footer; on Profile: a
  testimonial carousel, a book shelf, and a horizontal blog-article strip.

## Brand storytelling
The nav is the pitch in three moves: **Dashboard** (who I am, as data) → **Case Studies / AI** (what
I've shipped, and how much of it used AI) → **My Profile** (who I am, as a person) — the last of which
most visitors would miss, since on desktop it's just a small circular avatar next to the mute icon,
with no text label.

The case studies are where the "quantify everything" ethos gets serious. All six read in full open
with a metrics snapshot and close with an explicit Validation/Reflection/Next-steps section — problem
→ decisions → result, with what didn't work, argued in full every time. But the six don't repeat one
template; they range across **registers**: Pocket Protector and Z Fit are pure UX-research case
studies; Civic Energy is framed as her own venture (role: "Co-Founder, CEO & Product Designer") and
carries a full competitive **SWOT analysis** naming real incumbents ("Johnson Controls or Siemens
entering with stronger data + trust"); Manga Creator is the deepest *shipped-product* proof, a
seven-frame numbered UI walkthrough of a real manga-authoring tool; The Sinclair is the most
analytically ambitious, a custom bubble-chart guest-segmentation model justified with **named
behavioral-science frameworks** — "the Fogg Behavior Model," "the Von Restorff effect" — that connect
directly back to the bio's claimed "human-computer interaction and psychology" background. That range,
not just the volume, is the actual proof of seniority.

The Profile page ("Who's that girl?") is a second, quieter kind of proof: a real email
(`zalipatel7777@gmail.com`), a "Download CV," LinkedIn/Dribbble/Spotify/booking-calendar icons, a
client testimonial on a carousel ("Zalak is one of the best designers I've worked with... — Elise Mun,
Realtor, San Francisco Bay Area"), a small shelf of books she recommends (*The Design of Everyday
Things* among them), and a horizontal strip of her own article headlines ("Who Leads the Aisle? What
the Research Says About Humans and Robots Picking Orders Together"). Combined with a named podcast
episode ("The Ordinary Designer" — "Blending UX with AI"), that's four separate content-marketing
surfaces (podcast, articles, testimonial, reading list) feeding one identity — an unusually complete
personal-brand system for a portfolio benchmark.

The "Live Portfolio" case-study entry is a third kind of proof again: not a case study at all, but a
plain numbered list of **37 real, live, shipped deliverables** — 25 websites (many hospitality
clients: Waterfront Resort, The Otesaga, Frederick Hotel NYC, Hotel Casa Velas, **The Sinclair Hotel**
itself, cross-referenced back to its own full case study), 4 apps and 8 social accounts, each linking
out to the actual live site. It's the AI-tools wall's breadth-over-depth move applied to *paid
production work* instead of AI experiments — together the two pages make the claim "I have shipped an
enormous amount," where the 15 curated case studies make the claim "and I can explain any of it in
depth."

## Key screens
- **Dashboard** (`desktop-fold.png`, `desktop.png`, `mobile.png`): the entire home page in one look —
  hero bio, hours gauge, skill matrix + tools + flowers, philosophy card, podcast, experience/CV/globe.
  Almost nothing sits below the fold, on desktop or mobile.
- **Mobile nav drawer** (`mobile-menu.png`): opens from a hamburger icon nested inside the header's
  second circular button (a `lucide-menu` SVG, easy to miss next to the avatar); lists Dashboard/Case
  Studies/AI/My Profile as a vertical menu, then a secondary 2D/VR/AR row — "3D" is dropped on mobile
  entirely.
- **My Profile** (`profile-desktop.png`, `profile-mobile.png`): the real about/contact page — see
  Brand storytelling. Desktop splits editorial photo (left-centre) from contact/testimonial/reading
  list (right rail); mobile stacks photo → bio → CTAs → contact → testimonial → shelf → articles.
- **Case Studies** (`case-studies-desktop.png`, `case-studies-mobile.png`): 15 projects as folders,
  each tagged by industry; "Live Portfolio" gets a yellow sticky-note "Live" badge instead of a photo.
- **AI** (`ai-desktop.png`, `ai-mobile.png`): "Domain Expertise + AI Tools" — 60+ captioned thumbnails
  (Design System Copilot, Compliance Intelligence for healthcare, "Track Your Entire Financial Picture
  in 90 Seconds," Legal Agentic Platform...) in a plain image-wall grid, no folder chrome — breadth
  over depth, and the page runs to roughly 16,000px at 1440 / 20,000px on mobile.
- **Case study detail, six read in full:**
  - *Pocket Protector* (`case-pocket-protector-desktop.png`, `-mobile.png`) — Medicare-plan AI
    assistant; UX-research counts, a typography+palette pair documented as content, a two-screen
    conversational-onboarding phone mockup.
  - *Z Fit* (`case-z-fit-desktop.png`) — habit-tracking app; two user personas, a pain-point
    stacked-bar chart, "instead of / trade-off" design-decision cards.
  - *Civic Energy* (`case-civic-energy-desktop.png`) — her own climate-tech venture (Co-Founder/CEO);
    a real brand identity, an isometric-building mood board, a full SWOT analysis with named
    competitors.
  - *Manga Creator* (`case-manga-creator-desktop.png`) — the deepest shipped-product proof: a
    three-competitor teardown (Clip Studio Paint / Procreate / Adobe Fresco), a tone-of-voice
    spectrum, and seven numbered UI frames of a working manga-authoring tool.
  - *The Sinclair* (`case-the-sinclair-desktop.png`) — hotel website; two personas, a five-stage
    emoji journey map, and a custom bubble-chart guest-segmentation model citing the Fogg Behavior
    Model and the Von Restorff effect.
  - *Live Portfolio* (`case-live-portfolio-desktop.png`, `-mobile.png`) — not a case study but a
    37-item numbered list of live client sites/apps/social accounts, cross-referencing The Sinclair.
  - All six open with a Results/Goal/Challenge/Outcome snapshot and close with an identical
    Validation/Reflection/Next-steps triptych — confirmed as the one fixed template beneath very
    different middles.
- **3D toggle** (`toggle-3d-desktop.png`): same Dashboard, pill state changed, no other visible
  difference captured.

## Bilingual / RTL notes
English only — `<html lang="en">`, no alternate-language links, no RTL anywhere. What would and
wouldn't survive a Persian pass:
- **Survives as structure:** the dark/light split by section, the bento grid, the folder-card
  metaphor, the modular case-study component library (personas, journey maps, stat cards are all
  script-agnostic shapes), and the dot-matrix icon-as-motif idea.
- **Needs a Persian partner face — twice over.** Inter has limited Arabic-script coverage and is the
  workhorse for the whole shell (including numerals; this site is unusually numeral-heavy, so Latin vs.
  Persian digits is a real decision). The Profile headline's script/display pairing is the harder
  problem: an italic Latin script face doesn't have a Persian equivalent with the same "handwritten
  signature" connotation, so that specific moment of personality would need a genuinely different,
  not just swapped, solution in Persian.
- **Needs real RTL work, not just a flip:** the left-anchored step index in every case study's
  iterative-process section, the left/right PREVIOUS/NEXT case footer, the ribbon pinned to the
  *right* edge, the two-column persona/journey-map layouts, and the bubble chart's axis labels and
  legend.
- **Doesn't translate at all:** "px/s" and "2D/3D/VR/AR" are Latin-abbreviation conventions; "Zecco"
  as a nickname-brand is a Latin-script wordplay on "Zalak Patel" with no obvious Persian equivalent;
  "Who's that girl?" is an English pop-culture reference (Madonna's 1987 film/song) that wouldn't
  travel as a headline at all.

## Takeaways for Sina
- **Borrow:**
  - **Numbers over adjectives, at every level** — not just a homepage stat, but case studies that
    open with a Results snapshot and quantify pain points, and personas with named frustrations
    instead of vague "user needs." Suits someone who, like Sina, can point to real design + marketing
    + product metrics.
  - **A modular case-study component library, reassembled per project** rather than one rigid
    template. Fixed open (Overview + Snapshot) and fixed close (Validation/Reflection/Next), but a
    different combination of persona cards, journey maps, competitive teardowns or custom charts in
    the middle depending on what the project actually needed. Gives variety without losing a
    recognizable shape.
  - **Cite the methodology by name** — "the Fogg Behavior Model," "the Von Restorff effect" — turns a
    generic "I used behavioral science" claim into something checkable and memorable, and it's free
    (a sentence, not a redesign).
  - **A real about page that pairs the bio with proof** — a testimonial, a reading list, links to
    original writing — not just a photo and a paragraph. Costs little, reads as more credible than
    the case studies alone.
  - **A plain, unglamorous "everything I've shipped" list** (Live Portfolio's 37 links) sitting
    alongside the curated case studies — breadth and depth doing different jobs on different pages,
    rather than trying to cram both into one.
  - **One cheap texture reused at two scales** — the dotted-grid background reappears as dot-matrix
    icons inside stat cards.
- **Adapt:**
  - The dashboard-as-homepage idea is strong, but the "live stat" gimmicks (px/s counter, WebGL
    globe) are the riskiest part — the globe already fails without a GPU, and a mouse-speed counter
    means nothing without a label. If Sina borrows the dashboard framing, keep the self-explanatory
    stats and skip novelty telemetry that needs a tooltip to justify itself.
  - The dark/light split by section is a bold structural choice, not a cosmetic toggle — worth
    considering deliberately (a "product/data" mode vs. a "portfolio/work" mode) rather than copied
    wholesale, since it doubles the design surface to maintain.
  - The folder-as-case-study-card metaphor is memorable but skeuomorphic; a version that fits Sina's
    brand (design + marketing + product, D-007) might swap "folder" for something from that world — a
    campaign board, a briefing doc — while keeping the same "stacked paper peeking out" affordance.
  - The range across registers (pure UX process → founder/strategy → shipped product → behavioral
    science) is worth deliberately planning rather than letting each case study default to the same
    shape — pick the register that fits what actually happened on each project.
- **Avoid:**
  - **Randomized "proof" numbers.** Skill scores that visibly change on reload undermine the exact
    credibility the numbers-over-adjectives strategy is going for — a visitor who reloads and notices
    will trust the *other* stats less too. Any stat presented as evidence should be real and stable.
  - **A real destination with no visible entry point.** "My Profile" — the site's actual about/contact
    page — is reachable only through a small unlabeled avatar icon (desktop) or a drawer item that
    doesn't announce itself as "About" (mobile). Sina's equivalent page should be a labeled, visible
    nav item, not a treasure hunt.
  - **One typeface doing every job in the shell**, including a `font-mono` token that resolves to the
    same sans — the one moment of real type pairing (Profile headline) proves the team can do it, which
    makes its absence everywhere else more noticeable, not less.
  - **No deep-linkable case-study URLs** — clicking a project opens in place rather than navigating to
    a real route, so a specific case study (or the Profile page) can't be shared, bookmarked, or
    indexed on its own.
  - **Lazy-loaded thumbnails left visibly stuck on "LOADING"** at the scale of the AI page (60+
    items) — breadth is a fine strategy, but not if a third of the proof never renders.
  - **A fixed decorative badge pinned to the same screen edge on every page, including mobile**, where
    it eats into an already-narrow content column.

## Notes
- **Stack:** Vite + React SPA (`id="root"`, hashed `/assets/index-*.js` + `/assets/index-*.css`,
  `type="module"`), Tailwind CSS v4 (`oklch()` color tokens, `--text-*` scale vars, arbitrary-value
  utility classes), Three.js for the WebGL globe, hosted on Vercel (`server: Vercel` header, Vercel
  edge cache HIT). No `generator` meta tag.
- **Mobile navigation is real, just badly signposted.** The Dashboard/Case Studies/AI pill bar is
  `hidden` below Tailwind's `md` breakpoint; the working alternative is a hamburger (`svg.lucide-menu`)
  nested inside the second circular header button, which opens an inline drawer listing Dashboard,
  Case Studies, AI **and "My Profile."** Nothing about the collapsed header hints at this — there's no
  visible menu icon at a glance, only on close inspection.
- The bundle ships a few display/script faces (`Caveat`, `Montserrat`, `Playfair Display`, plus a
  `Bradley Hand`/`Comic Sans` fallback); the Profile page's "Who's that *girl?*" headline accounts for
  at least one of them — the rest may still be inside case-study mockup images rather than site chrome.
- A SoundCloud embed script logs to the console on every page load even though the visible podcast
  player is Spotify-branded — possibly a shared embed library loaded for both providers.
- **Recognition:** a real, persistent Awwwards "W. Nominee" ribbon links to an actual listing
  (`awwwards.com/sites/zeccos-design-portfolio`), not a placeholder badge.
- **Robustness:** the WebGL globe fails cleanly to a text fallback ("Globe Unavailable") when no GPU
  is available (confirmed in headless Chromium) instead of breaking the card.
- **Quirks:** case-study cards open as an in-place view rather than a real route, so no case study (or
  the Profile page) is independently linkable; the skill-matrix scores are randomized per page load
  (see Motion & interaction) while the career-hours total is not; project names are stylized as
  written (e.g. "onleJobs," verified via the page's own DOM text, not a misread).
- **Content breadth:** the 15 case studies span insurance, health & wellness, climate/energy, AI/
  entertainment, sports, employment, wearable tech, agency, non-profit, hospitality, product design and
  education; the separate 37-item Live Portfolio list is dominated by hospitality/hotel marketing
  sites, suggesting an agency work history distinct from the curated case studies.

## Scores
Justification for each `scores.*` value and `relevance` — see [Rubric](../Rubric.md).

- **distinctiveness: 5** — a bento-grid "product dashboard" homepage with a career gauge, a live
  cursor-speed counter and a WebGL globe isn't a layout borrowed from anywhere else in this benchmark
  set; the folder-card metaphor and the case studies' named-framework, bubble-chart, SWOT-wheel
  component library are a second and third, equally specific idea. Recognizable without the logo.
- **typography: 3** — the shell runs on one typeface (Inter) for every role, including a `font-mono`
  token that isn't actually monospace on a numbers-heavy site; hierarchy leans on size/weight jumps
  rather than a crafted scale. The Profile page's script-and-display headline pairing is genuinely
  deliberate and well-executed, but it's a single, isolated flourish rather than a system — solid and
  legible everywhere else, deliberate in exactly one place.
- **motion: 3** — captured with motion frozen, so this is a partial read: confirmed generative/live
  behavior (skill scores change every load; the cursor-speed counter tracks real movement) and many
  segmented tab controls imply a genuinely interactive system, but restraint, transition polish and a
  reduced-motion path are unconfirmed, and 60+ AI-page thumbnails were still showing loading
  placeholders after a scripted scroll-through.
- **brand: 5** — dashboard stats, a modular case-study system that ranges from pure UX process to
  founder/strategy to shipped-product to named-behavioral-science, a 37-item live-work list, and an
  about page built from testimonial + reading list + original articles all repeat one claim — "I
  quantify and ship AI-assisted design work, and I can prove it several different ways" — with no part
  of the site contradicting it. The randomized skill scores are a credibility wrinkle noted under
  Avoid, not a break in the theme.
- **mobile: 5** — every surface captured here — Dashboard, Case Studies, AI, two full case-study
  detail pages (including a custom bubble chart and multi-card persona/journey-map layouts), and the
  Profile page — reflows to a clean single column with no lost content, and the nav collapses to a
  real, working drawer that deliberately drops the hardware-heavy "3D" mode rather than shipping it
  broken. The only real mark against it is the Awwwards ribbon staying fixed to the screen edge at
  390px.
- **relevance: 4** — Avg 4.2. Not a 5 because the site's overall identity — the dashboard gimmicks,
  the AI-tools volume wall, the randomized stats — is a specific, quirky "AI-native operator" persona
  that doesn't map directly onto Sina's brand-first, design+marketing+product positioning (D-007). But
  as a reference for two specific parts — the case-study format (modular components, named
  frameworks, a fixed reflective close) and the about page (bio + testimonial + reading list +
  articles) — it's one of the strongest in this set, and it offers real, if partial, material on
  typography pairing that Pleurat's benchmark didn't raise. Nothing here helps on bilingual/RTL
  (D-009).

## Screenshots
Local-only, in `assets/zalak-patel-com/` (gitignored, D-008): `desktop.png` (1440) · `mobile.png`
(390) · `desktop-fold.png` (1440×900, first viewport) · `mobile-menu.png` (the confirmed nav drawer).

Profile page: `profile-desktop.png` · `profile-mobile.png`. Case Studies index:
`case-studies-desktop.png` · `case-studies-mobile.png`. AI page: `ai-desktop.png` · `ai-mobile.png`
(full "Domain Expertise + AI Tools" gallery, ~16,000–20,000px tall, many lazy-loaded thumbnails still
show "LOADING"). Six case-study details, read in full: `case-pocket-protector-desktop.png` /
`-mobile.png`, `case-z-fit-desktop.png`, `case-civic-energy-desktop.png`,
`case-manga-creator-desktop.png`, `case-the-sinclair-desktop.png`, `case-live-portfolio-desktop.png` /
`-mobile.png`. Plus `toggle-3d-desktop.png` (Dashboard with the 3D pill active).
