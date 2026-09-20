---
id: "DS-23"                    # DS-NN — equals this file's prefix
title: "Tool tile + row"                 # Pattern name, e.g. "Single-accent rule"
slug: "tool-tile-row"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 3               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase (no code yet)
  kind: "block"
  path: "src/blocks/ToolGrid/config.ts"
  name: "toolGrid"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-23-1-desktop-row.png", "pleurat-com/DS-23-2-desktop-tile.png", "pleurat-com/DS-23.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-23 — Tool tile + row

> Square cream tiles with a logo and a mono caption, ten in a row — the tool set reused as tiles, a stack list and footer “stations”.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-23.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **row** | `div.sv-tools` | 1278.4×146.5px · font General Sans · size 17px · gap 12.96px · display grid · grid 10 cols · height 146.453px · width 1278.39px | — |
| ↳ tile | `div` :scope > * | 116.2×146.5px · font General Sans · size 17px · height 146.453px · width 116.172px — “CLAUDE” | — |
| ↳ logo | `img` img | 63.1×63.1px · font General Sans · size 17px · height 63.0781px · width 63.0781px | — |
| ↳ caption | `span` span, figcaption, small | 63.1×63.1px · font General Sans · size 17px · display grid · grid 63.0781px · height 63.0781px · width 63.0781px | — |
| **tile** | `div.sv-tool` | 116.2×146.5px · font General Sans · size 17px · height 146.453px · width 116.172px | — |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Direction-neutral — nothing to mirror.
- **Persian:** Short labels need `_fa` twins; decide once whether mono/uppercase labels stay Latin or get a Persian equivalent (uppercase does not exist in Persian — use tracking + size instead).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/ToolGrid/config.ts` | toolGrid | New Payload block: `config.ts` + `Component.tsx` in `src/blocks/`, registered in `RenderBlocks.tsx`; fields per Content-Model §10. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-23-1-desktop-row.png` — row · crop @2x · desktop
- `DS-23-2-desktop-tile.png` — tile · crop @2x · desktop
- `DS-23.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-23.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
