---
id: "DS-33"                    # DS-NN — equals this file's prefix
title: "Footer four columns"                 # Pattern name, e.g. "Single-accent rule"
slug: "footer-four-columns"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: content
    section: "Content model"
target:                   # where it lands in the codebase (no code yet)
  kind: "global"
  path: "src/Footer/Component.tsx"
  name: "Footer"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-33-1-desktop-footer.png", "pleurat-com/DS-33-2-desktop-grid.png", "pleurat-com/DS-33.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-33 — Footer four columns

> CONTACT · SITEMAP · ELSEWHERE · STUDIO — email, response time and location repeated on every page under a set-piece illustration.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-33.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **footer** | `footer.sv-footer.sv-ruled` | 1440×658.5px · font General Sans · size 17px · color #16140E · bg #FFFDF3 · padding 70px 0px 44px | `color.ink` |
| ↳ lead | `div` .sv-foot-lead | 1440×307px · font General Sans · size 17px · color #16140E · padding 0px 0px 36px — “Explore portfolio 01 Claude Daily kit Cl” | `color.ink` |
| ↳ grid | `div` .sv-foot-grid | 1278.4×157.3px · font General Sans · size 17px · color #16140E · gap 40px · display grid · grid 368.578px 263.266px 263.266px 263.281px — “CONTACT hello@pleurat.com Lets get in to” | `color.ink` |
| ↳ marks | `i` .sv-foot-marks | 1440×20px · font General Sans · size 17px · color #16140E | `color.ink` |
| **grid** | `div.sv-foot-grid` | 1278.4×157.3px · font General Sans · size 17px · color #16140E · gap 40px · display grid · grid 368.578px 263.266px 263.266px 263.281px | `color.ink` |
| ↳ column | `div` :scope > div | 368.6×157.3px · font General Sans · size 17px · color #16140E — “CONTACT hello@pleurat.com Lets get in to” | `color.ink` |
| ↳ heading | `h4` h4, h3, strong, span:first-child | 368.6×16.3px · font General Sans · size 10.5px · tracking 1.89px · case uppercase · color #8B8577 · borderTop 0px none — “CONTACT” | `color.ink-3`, `font.size.eyebrow` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Short labels need `_fa` twins; decide once whether mono/uppercase labels stay Latin or get a Persian equivalent (uppercase does not exist in Persian — use tracking + size instead).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| global | `src/Footer/Component.tsx` | Footer | Fields on an existing global (`src/Footer/config.ts` / `src/Header/config.ts`). |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-33-1-desktop-footer.png` — footer · crop @2x · desktop
- `DS-33-2-desktop-grid.png` — grid · crop @2x · desktop
- `DS-33.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-33.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
