---
id: "DS-25"                    # DS-NN — equals this file's prefix
title: "Gallery with tabs and lightbox"                 # Pattern name, e.g. "Single-accent rule"
slug: "gallery-with-tabs-and-lightbox"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 3               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: content
    section: "Content model"
target:                   # where it lands in the codebase (no code yet)
  kind: "block"
  path: "src/blocks/Gallery/config.ts"
  name: "gallery"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-25-1-desktop-tabs.png", "pleurat-com/DS-25-2-desktop-tabs-viewport.png", "pleurat-com/DS-25-3-desktop-archive.png", "pleurat-com/DS-25-4-desktop-archive-viewport.png", "pleurat-com/DS-25-5-desktop-pager.png", "pleurat-com/DS-25-6-desktop-pager-viewport.png", "pleurat-com/DS-25.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-25 — Gallery with tabs and lightbox

> “Everything, up close.” — tabs with counts (APPS 33 / WEBSITES 36), a 4-column grid, pagination and a lightbox: a home for the long tail without a case study each.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-25.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **tabs** | `div.sv-tabs` | 1278.4×50.7px · font General Sans · size 17px · color #16140E · gap 6px · display flex · borderBottom 1px solid #16140E @16% | `color.ink` |
| ↳ tab-on | `button` button.is-on | 144.5×49.7px · font General Sans · size 14px · tracking 1.68px · case uppercase · color #16140E · padding 14px 18px · gap 9px · display flex — “WEBSITES 36” | `color.ink` |
| ↳ tab | `button` button:not(.is-on) | 104.2×49.7px · font General Sans · size 14px · tracking 1.68px · case uppercase · color #8B8577 · padding 14px 18px · gap 9px · display flex · border 0px none · borderBottom 0px none — “APPS 33” | `color.ink-3` |
| **archive** | `div.sv-rv.is-in` | 1278.4×1219.9px · font General Sans · size 17px · color #16140E · gap 18px · display grid · grid 306.094px 306.094px 306.094px 306.109px | `color.ink` |
| ↳ tile | `button` :scope > * | 306.1×229.6px · font General Sans · size 17px · color #16140E | `color.ink` |
| **pager** | `nav.sv-pager` | 1278.4×42px · font General Sans · size 17px · color #16140E · gap 6px · display flex | `color.ink` |
| ↳ page | `button` button, a | 42×42px · font General Sans · size 12px · tracking 1.2px · color #57534A · bg #FBF7E6 · padding 0px 12px · display grid · grid 16px · border 1px solid #16140E @16% · borderBottom 1px solid #16140E @16% | `color.ink-2` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Short labels need `_fa` twins; decide once whether mono/uppercase labels stay Latin or get a Persian equivalent (uppercase does not exist in Persian — use tracking + size instead).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/Gallery/config.ts` | gallery | New Payload block: `config.ts` + `Component.tsx` in `src/blocks/`, registered in `RenderBlocks.tsx`; fields per Content-Model §10. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-25-1-desktop-tabs.png` — tabs · crop @2x · desktop
- `DS-25-2-desktop-tabs-viewport.png` — tabs · viewport shot · desktop
- `DS-25-3-desktop-archive.png` — archive · crop @2x · desktop
- `DS-25-4-desktop-archive-viewport.png` — archive · viewport shot · desktop
- `DS-25-5-desktop-pager.png` — pager · crop @2x · desktop
- `DS-25-6-desktop-pager-viewport.png` — pager · viewport shot · desktop
- `DS-25.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-25.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
