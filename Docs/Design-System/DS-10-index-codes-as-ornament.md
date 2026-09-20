---
id: "DS-10"                    # DS-NN — equals this file's prefix
title: "Index codes as ornament"                 # Pattern name, e.g. "Single-accent rule"
slug: "index-codes-as-ornament"                  # kebab-case; the file is <id>-<slug>.md
category: "type-device"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Brand storytelling"
target:                   # where it lands in the codebase
  kind: "utility"
  path: "src/app/(frontend)/globals.css"
  name: ".index-code"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["font.family.mono"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-10-1-desktop-employer-index.png", "pleurat-com/DS-10-2-desktop-employer-card.png", "pleurat-com/DS-10-4-desktop-hero-index.png", "pleurat-com/DS-10.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "review"             # draft | review | ready
---

# DS-10 — Index codes as ornament

> Everything is numbered — employers A1–A10, sections 01–10, nav 01–05, tool “stations” R1/C4 — so the page reads like a drafting sheet and lists gain order for free.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-10.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **employer-index** | `span.ix` | 13.4×14px · font General Sans · size 10.5px · weight 400 · tracking 1.47px · leading 16.275px · color #8B8577 · display inline · border 0px none | `color.ink-3`, `font.size.eyebrow` |
| **employer-card** | `article.sv-card` | 265.3×252.3px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · padding 30px 24px 34px · height 252.344px · width 265.266px | `color.ink` |
| ↳ ix | `span` .ix | 13.4×14px · font General Sans · size 10.5px · weight 400 · tracking 1.47px · leading 16.275px · color #8B8577 · display inline · border 0px none — “A1” | `color.ink-3`, `font.size.eyebrow` |
| ↳ title | `h3` h3 | 216.3×32.5px · font General Sans · size 21px · weight 500 · tracking -0.42px · leading 32.55px · color #16140E · height 32.5469px · width 216.266px — “Hoopit AI” | `color.ink`, `font.size.h3` |
| **nav-index** | `span.ix` | font General Sans · size 10.5px · weight 400 · tracking 1.68px · leading 16.275px · color #C77E0A · border 0px none · transition none 1e-05s · opacity 0 | `font.size.eyebrow` |
| **hero-index** | `span.ix` | 12.7×16.3px · font General Sans · size 10.5px · weight 400 · tracking 1.68px · leading 16.275px · color #C77E0A · border 0px none · height 16.2656px · width 12.6562px | `font.size.eyebrow` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Direction-neutral — nothing to mirror.
- **Persian:** Short labels need `_fa` twins; decide once whether mono/uppercase labels stay Latin or get a Persian equivalent (uppercase does not exist in Persian — use tracking + size instead).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| utility | `src/app/(frontend)/globals.css` | .index-code | A small utility class in `globals.css` `@layer utilities`, next to `.container`. |

**Implemented (2026-09-19):** `@utility index-code` — mono, tabular digits, ink-3; Latin digits stay in every locale. Used by `SectionHeader`, `ExperienceGrid`, `MobileNav`. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-10-1-desktop-employer-index.png` — employer index · crop @2x · desktop
- `DS-10-2-desktop-employer-card.png` — employer card · crop @2x · desktop
- `DS-10-4-desktop-hero-index.png` — hero index · crop @2x · desktop
- `DS-10.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-10.json`
- [ ] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed
