---
id: "DS-15"                    # DS-NN — equals this file's prefix
title: "Nav"                 # Pattern name, e.g. "Single-accent rule"
slug: "nav"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase (no code yet)
  kind: "component"
  path: "src/Header/Component.client.tsx"
  name: "Header"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-15-1-desktop-nav.png", "pleurat-com/DS-15-2-desktop-nav-hover.png", "pleurat-com/DS-15-3-desktop-link-work.png", "pleurat-com/DS-15-4-desktop-link-work-hover.png", "pleurat-com/DS-15-5-desktop-link-active.png", "pleurat-com/DS-15-6-desktop-link-active-hover.png", "pleurat-com/DS-15-7-desktop-contact.png", "pleurat-com/DS-15-8-desktop-contact-hover.png", "pleurat-com/DS-15.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-15 — Nav

> Lower-case wordmark, four text links, a theme toggle and one filled Contact button; the active link is marked by a small accent dot below.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-15.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **nav** | `div.sv-nav-in` | 1382.4×66.8px · font General Sans · size 17px · weight 400 · color #16140E · padding 15px 52px · gap 30px · display flex · height 66.7969px · position relative | `color.ink` |
| ↳ wordmark | `a` a:first-child, svg, .sv-logo | 94.6×28px · font General Sans · size 17px · weight 400 · color #16140E · display flex · height 28px | `color.ink` |
| ↳ links | `a` ul, .links, a:nth-child(2) | 38.5×24.8px · font General Sans · size 16px · weight 500 · color #16140E · height 24.7969px · position relative — “Work” | `color.ink` |
| **link-work** | `a` | 38.5×24.8px · font General Sans · size 16px · weight 500 · color #16140E · height 24.7969px · position relative | `color.ink` |
| **link-active** | `a` | 69.2×24.8px · font General Sans · size 16px · weight 500 · color #16140E · height 24.7969px · position relative | `color.ink` |
| ↳ dot | `::after` | font General Sans · size 16px · weight 500 · color #16140E · bg #F3B44A · height 6px · position absolute — "" | `color.brand`, `color.ink` |
| **contact** | `a.sv-btn.sv-btn--amber` | 87.4×36.8px · font General Sans · size 16px · weight 500 · color #16140E · bg #F3B44A · padding 6px 13px · gap 8px · display flex · height 36.7969px | `color.brand`, `color.ink`, `size.control.height-sm` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Short labels need `_fa` twins; decide once whether mono/uppercase labels stay Latin or get a Persian equivalent (uppercase does not exist in Persian — use tracking + size instead).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| component | `src/Header/Component.client.tsx` | Header | New React component; cva for interactive variants, plain `cn()` compound for layout (see `src/components/ui/button.tsx` vs `card.tsx`). |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-15-1-desktop-nav.png` — nav · crop @2x · desktop
- `DS-15-2-desktop-nav-hover.png` — nav · hover state · desktop
- `DS-15-3-desktop-link-work.png` — link work · crop @2x · desktop
- `DS-15-4-desktop-link-work-hover.png` — link work · hover state · desktop
- `DS-15-5-desktop-link-active.png` — link · active state · desktop
- `DS-15-6-desktop-link-active-hover.png` — link active · hover state · desktop
- `DS-15-7-desktop-contact.png` — contact · crop @2x · desktop
- `DS-15-8-desktop-contact-hover.png` — contact · hover state · desktop
- `DS-15.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-15.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
