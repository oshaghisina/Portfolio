---
id: "DS-26"                    # DS-NN — equals this file's prefix
title: "Accordion with media pane"                 # Pattern name, e.g. "Single-accent rule"
slug: "accordion-with-media-pane"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 3               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Key screens"
target:                   # where it lands in the codebase (no code yet)
  kind: "block"
  path: "src/blocks/Accordion/config.ts"
  name: "accordion"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-26-1-desktop-log.png", "pleurat-com/DS-26-2-desktop-open-row.png", "pleurat-com/DS-26.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-26 — Accordion with media pane

> Numbered accordion rows on the left, the open row's media on the right, one CTA below — three AI builds explained in the space of one.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-26.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **log** | `div.sv-rv.is-in` | 1278.4×460.4px · font General Sans · size 17px · weight 400 · color #16140E · gap 57.6px · display grid · grid 585.969px 634.812px | `color.ink` |
| ↳ row | `div` :scope > * > *, :scope > * | 610×460.4px · font General Sans · size 17px · weight 400 · color #16140E · padding 0px 0px 0px 24px · display flex · borderTop 1px solid #16140E @16% — “01 Sena Building a design system complet” | `color.ink` |
| ↳ media | `video` img, video, picture | 645.5×402.6px · font General Sans · size 17px · weight 400 · color #16140E | `color.ink` |
| **open-row** | `div.sv-log-stage` | 634.8×396.8px · font General Sans · size 17px · weight 400 · color #16140E · borderTop 1px solid #16140E @16% · borderBottom 1px solid #16140E @16% | `color.ink` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Body copy needs `_fa` twins; keep the English at Pleurat's length (2–4 sentences) so the Persian stays in parity.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/Accordion/config.ts` | accordion | New Payload block: `config.ts` + `Component.tsx` in `src/blocks/`, registered in `RenderBlocks.tsx`; fields per Content-Model §10. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-26-1-desktop-log.png` — log · crop @2x · desktop
- `DS-26-2-desktop-open-row.png` — open row · crop @2x · desktop
- `DS-26.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-26.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
