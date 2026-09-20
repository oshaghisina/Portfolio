---
id: "DS-21"                    # DS-NN — equals this file's prefix
title: "NDA marquee"                 # Pattern name, e.g. "Single-accent rule"
slug: "nda-marquee"                  # kebab-case; the file is <id>-<slug>.md
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
  path: "src/blocks/Marquee/config.ts"
  name: "marquee"
rtl: "needs-redesign"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-21-1-desktop-nda.png", "pleurat-com/DS-21-2-desktop-track.png", "pleurat-com/DS-21-f01-nda.png", "pleurat-com/DS-21-f01-track.png", "pleurat-com/DS-21-f02-nda.png", "pleurat-com/DS-21-f02-track.png", "pleurat-com/DS-21-f03-nda.png", "pleurat-com/DS-21-f03-track.png", "pleurat-com/DS-21-f04-nda.png", "pleurat-com/DS-21-f04-track.png", "pleurat-com/DS-21-f05-nda.png", "pleurat-com/DS-21-f05-track.png", "pleurat-com/DS-21-f06-nda.png", "pleurat-com/DS-21-f06-track.png", "pleurat-com/DS-21.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-21 — NDA marquee

> “Plus many other projects I can't publicly share…” followed by a scrolling line of client names — big names claimed without a case study.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-21.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **nda** | `section.sv-wrap.sv-pad` | 1382.4×328.4px · font General Sans · size 17px · weight 400 · color #16140E | `color.ink` |
| ↳ title | `p` .sv-nda-title | 395.8×54.4px · font General Sans · size 17px · weight 400 · color #57534A — “Plus many other projects I can't publicl” | `color.ink-2` |
| ↳ strip | `div` .sv-nda-strip | 894.9×27.4px · font General Sans · size 17px · weight 400 · color #16140E — “Santander UK Hoopit AI FourTwoThree Toyo” | `color.ink` |
| ↳ run | `ul` .sv-nda-run | 909.5×27.4px · font General Sans · size 17px · weight 400 · color #16140E · display flex — “Santander UK Hoopit AI FourTwoThree Toyo” | `color.ink` |
| ↳ item | `li` .sv-nda-run li | 220.8×27.4px · font General Sans · size 17px · weight 400 · color #16140E · display flex — “Santander UK” | `color.ink` |
| **track** | `div.sv-nda-track` | 3638.1×27.4px · font General Sans · size 17px · weight 400 · color #16140E · display flex · animation 17s linear infinite sv-nda-roll · animationDuration 17s | `color.ink` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Borrow the structure as measured; only the values (colour, type) change with Sina's own tokens.
- **RTL:** Needs an RTL redesign — the direction of motion or reading order is part of the pattern.
- **Persian:** Body copy needs `_fa` twins; keep the English at Pleurat's length (2–4 sentences) so the Persian stays in parity.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| block | `src/blocks/Marquee/config.ts` | marquee | New Payload block: `config.ts` + `Component.tsx` in `src/blocks/`, registered in `RenderBlocks.tsx`; fields per Content-Model §10. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-21-f01…f06-track.png` — 6 viewport frames, track, taken every few hundred ms while scrolling through
- `DS-21-f01…f06-nda.png` — 6 viewport frames, nda, taken every few hundred ms while scrolling through
- `DS-21-1-desktop-nda.png` — nda · crop @2x · desktop
- `DS-21-2-desktop-track.png` — track · crop @2x · desktop
- `DS-21.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-21.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
