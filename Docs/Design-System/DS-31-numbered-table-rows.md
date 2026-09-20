---
id: "DS-31"                    # DS-NN — equals this file's prefix
title: "Numbered table rows"                 # Pattern name, e.g. "Single-accent rule"
slug: "numbered-table-rows"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "adapt"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Key screens"
target:                   # where it lands in the codebase (no code yet)
  kind: "block"
  path: "src/blocks/ProcessSteps/config.ts"
  name: "processSteps"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-31-1-desktop-uses.png", "pleurat-com/DS-31-2-desktop-row.png", "pleurat-com/DS-31.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 1         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-31 — Numbered table rows

> `01 · AUTOMATION · Task Automation · one-line description` — eight hairline rows explain a way of working without a diagram.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-31.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **uses** | `div.sv-uses` | 1278.4×844px · font General Sans · size 17px · weight 400 · color #16140E · borderTop 1px solid #16140E @16% | `color.ink` |
| ↳ row | `div` :scope > * | 1278.4×105.4px · font General Sans · size 17px · weight 400 · color #16140E · padding 23.4px 0px · gap 34.56px · display grid · grid 44px 132px 455.938px 542.812px — “01 AUTOMATION Task Automation Component ” | `color.ink` |
| ↳ index | `span` :scope > * > *:first-child | 44×16.3px · font General Sans · size 10.5px · weight 400 · tracking 1.68px · color #C77E0A · borderTop 0px none · borderBottom 0px none — “01” | `font.size.eyebrow` |
| ↳ title | `h3` h3, strong | 315.2×37.2px · font General Sans · size 24px · weight 500 · tracking -0.36px · color #16140E — “Task Automation” | `color.ink` |
| ↳ body | `p` p | 454×48.6px · font General Sans · size 15px · weight 400 · color #57534A · borderTop 0px none · borderBottom 0px none — “Component generation, documentation, rel” | `color.ink-2`, `font.size.button` |
| **row** | `div.sv-rv.is-in` | 1278.4×105.4px · font General Sans · size 17px · weight 400 · color #16140E · padding 23.4px 0px · gap 34.56px · display grid · grid 44px 132px 455.938px 542.812px | `color.ink` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Adapt — the pattern is right, the content or metaphor is Pleurat's; see the open question(s) below.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Body copy needs `_fa` twins; keep the English at Pleurat's length (2–4 sentences) so the Persian stays in parity.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/ProcessSteps/config.ts` | processSteps | New Payload block: `config.ts` + `Component.tsx` in `src/blocks/`, registered in `RenderBlocks.tsx`; fields per Content-Model §10. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-31-1-desktop-uses.png` — uses · crop @2x · desktop
- `DS-31-2-desktop-row.png` — row · crop @2x · desktop
- `DS-31.json` — bounding boxes, computed styles and parts for every target above

## Open questions
> ❓ **Q1 — Provide:** Sina's 6–8 practices that show how design, marketing and product compound (the rows of this list).

## Review checklist
- [ ] Q1 — Sina's 6–8 practices that show how design, marketing and product compound (the rows of this list).
- [x] Measured table filled from `assets/pleurat-com/DS-31.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
