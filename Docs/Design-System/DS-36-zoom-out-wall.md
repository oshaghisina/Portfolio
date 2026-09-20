---
id: "DS-36"                    # DS-NN — equals this file's prefix
title: "Zoom-out wall"                 # Pattern name, e.g. "Single-accent rule"
slug: "zoom-out-wall"                  # kebab-case; the file is <id>-<slug>.md
category: "motion"              # foundation | type-device | layout | component | motion | signature
take: "adapt"                  # borrow | adapt | avoid
priority: 3               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Key screens"
target:                   # where it lands in the codebase (no code yet)
  kind: "hero"
  path: "src/heros/HighImpact/index.tsx"
  name: "wall variant"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "none"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-36-f01-wall.png", "pleurat-com/DS-36-f02-wall.png", "pleurat-com/DS-36-f03-wall.png", "pleurat-com/DS-36-f04-wall.png", "pleurat-com/DS-36-f05-wall.png", "pleurat-com/DS-36-f06-wall.png", "pleurat-com/DS-36-f07-wall.png", "pleurat-com/DS-36-f08-wall.png", "pleurat-com/DS-36-f09-wall.png", "pleurat-com/DS-36-f10-wall.png", "pleurat-com/DS-36-f11-wall.png", "pleurat-com/DS-36-f12-wall.png", "pleurat-com/DS-36-wall.webm", "pleurat-com/DS-36.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 1         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-36 — Zoom-out wall

> One screenshot zooms out into a 5-wide mosaic of ~20 screens as you scroll, ending on a lone accent CTA — the portfolio shown as volume.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-36.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **wall** | `section.sv-mosaic-track` | 1440×2880px · height 2880px · position relative | — |
| ↳ pin | `div` .sv-mosaic-pin | 1440×900px · display grid · grid 1440px · height 900px · position sticky | — |
| ↳ window | `a` .sv-mosaic-window | 1326.4×846.6px · height 846.609px · position relative | — |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Adapt — the pattern is right, the content or metaphor is Pleurat's; see the open question(s) below.
- **RTL:** Direction-neutral — nothing to mirror.
- **Persian:** Nothing to localize.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| hero | `src/heros/HighImpact/index.tsx` | wall variant | New hero type in `src/heros/config.ts` `type` select + `RenderHero.tsx` map. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-36-f01…f12-wall.png` — 12 viewport frames, wall, taken every few hundred ms while scrolling through
- `DS-36-wall.webm` — short video, scrolls the section into and through view
- `DS-36.json` — bounding boxes, computed styles and parts for every target above

## Open questions
> ❓ **Q1 — Confirm:** Does Sina have ~20 presentable screens (product, campaign, dashboard) for a wall, or is this a v2 item?

## Review checklist
- [ ] Q1 — Does Sina have ~20 presentable screens (product, campaign, dashboard) for a wall, or is this a v2 item?
- [x] Measured table filled from `assets/pleurat-com/DS-36.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
