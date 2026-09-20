---
id: "DS-19"                    # DS-NN — equals this file's prefix
title: "Scroll-filled stat bars"                 # Pattern name, e.g. "Single-accent rule"
slug: "scroll-filled-stat-bars"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "adapt"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase (no code yet)
  kind: "block"
  path: "src/blocks/MetricsStrip/config.ts"
  name: "bar variant"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "labels"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["color.brand", "color.line"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-19-chart.webm", "pleurat-com/DS-19-f01-chart.png", "pleurat-com/DS-19-f02-chart.png", "pleurat-com/DS-19-f03-chart.png", "pleurat-com/DS-19-f04-chart.png", "pleurat-com/DS-19-f05-chart.png", "pleurat-com/DS-19-f06-chart.png", "pleurat-com/DS-19-f07-chart.png", "pleurat-com/DS-19-f08-chart.png", "pleurat-com/DS-19-f09-chart.png", "pleurat-com/DS-19-f10-chart.png", "pleurat-com/DS-19-f11-chart.png", "pleurat-com/DS-19-f12-chart.png", "pleurat-com/DS-19.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 1         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-19 — Scroll-filled stat bars

> Four hatched outline bars that fill solid accent as you scroll — “the decade counted rather than described”.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-19.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **chart** | `section.sv-chart-sec` | 1440×2385px · height 2385px | — |
| ↳ bar | `div` .sv-bar | 295.6×330px · display flex · height 330px — “0+ Years designing” | — |
| ↳ fill | `div` .sv-bar .fill | 295.6×2px · bg #FFFDF3 · border 1px solid #16140E · height 2px · transition height 1.1s cubic-bezier(0.22, 0.9, 0.24, 1) | — |
| ↳ lit | `i` .sv-bar .fill .lit | 293.6×0px · bg #F3B44A | `color.brand` |
| ↳ label | `span` .sv-bar .lbl | 295.6×22.5px · border 0px none · height 22.5px — “Years designing” | — |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Adapt — the pattern is right, the content or metaphor is Pleurat's; see the open question(s) below.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Short labels need `_fa` twins; decide once whether mono/uppercase labels stay Latin or get a Persian equivalent (uppercase does not exist in Persian — use tracking + size instead).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/MetricsStrip/config.ts` | bar variant | New Payload block: `config.ts` + `Component.tsx` in `src/blocks/`, registered in `RenderBlocks.tsx`; fields per Content-Model §10. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-19-f01…f12-chart.png` — 12 viewport frames, chart, taken every few hundred ms while scrolling through
- `DS-19-chart.webm` — short video, scrolls the section into and through view
- `DS-19.json` — bounding boxes, computed styles and parts for every target above

## Open questions
> ❓ **Q1 — Provide:** Which of Sina's numbers have a source (NMV, CTR, conversion, NPS)? Only sourced numbers go in bars.

## Review checklist
- [ ] Q1 — Which of Sina's numbers have a source (NMV, CTR, conversion, NPS)? Only sourced numbers go in bars.
- [x] Measured table filled from `assets/pleurat-com/DS-19.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
