---
id: "DS-24"                    # DS-NN — equals this file's prefix
title: "Project rail column"                 # Pattern name, e.g. "Single-accent rule"
slug: "project-rail-column"                  # kebab-case; the file is <id>-<slug>.md
category: "component"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 2               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Key screens"
target:                   # where it lands in the codebase (no code yet)
  kind: "block"
  path: "src/blocks/ProjectGrid/config.ts"
  name: "projectGrid"
rtl: "mirrors"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-24-1-desktop-rail.png", "pleurat-com/DS-24-2-desktop-rail-hover.png", "pleurat-com/DS-24-3-desktop-card.png", "pleurat-com/DS-24-4-desktop-card-hover.png", "pleurat-com/DS-24.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-24 — Project rail column

> Six tall project cards side by side — cover, `+` corner, title, category label, “Open project” — the whole portfolio in one glance on /work.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-24.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **rail** | `div.sv-wx` | 1326.4×432px · font General Sans · size 17px · color #16140E · display flex · height 432px | `color.ink` |
| ↳ card | `a` :scope > * | 221.1×431px · font General Sans · size 17px · color #16140E · height 431px — “MindPath Website and Web App MindPath Mi” | `color.ink` |
| **card** | `a.sv-wx-p` | 221.1×431px · font General Sans · size 17px · color #16140E · height 431px | `color.ink` |
| ↳ category | `span` small, span, p | 228.9×448.2px · font General Sans · size 17px · color #16140E · height 431px · transform matrix(1.04, 0, 0, 1.04, 0, 0) | `color.ink` |
| ↳ media | `img` img, picture, video | 228.9×448.2px · font General Sans · size 17px · color #16140E · height 431px | `color.ink` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Mirrors with `dir="rtl"` if built with logical properties (`margin-inline-start`, `text-align: start`); verify anything absolutely positioned.
- **Persian:** Body copy needs `_fa` twins; keep the English at Pleurat's length (2–4 sentences) so the Persian stays in parity.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/ProjectGrid/config.ts` | projectGrid | New Payload block: `config.ts` + `Component.tsx` in `src/blocks/`, registered in `RenderBlocks.tsx`; fields per Content-Model §10. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-24-1-desktop-rail.png` — rail · crop @2x · desktop
- `DS-24-2-desktop-rail-hover.png` — rail · hover state · desktop
- `DS-24-3-desktop-card.png` — card · crop @2x · desktop
- `DS-24-4-desktop-card-hover.png` — card · hover state · desktop
- `DS-24.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-24.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
