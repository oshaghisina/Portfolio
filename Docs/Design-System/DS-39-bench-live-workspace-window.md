---
id: "DS-39"                    # DS-NN — equals this file's prefix
title: "“Bench” live-workspace window"                 # Pattern name, e.g. "Single-accent rule"
slug: "bench-live-workspace-window"                  # kebab-case; the file is <id>-<slug>.md
category: "signature"              # foundation | type-device | layout | component | motion | signature
take: "adapt"                  # borrow | adapt | avoid
priority: 3               # 1 = first sprint · 2 = next · 3 = later
adoption: "candidate"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Brand storytelling"
target:                   # where it lands in the codebase (no code yet)
  kind: "hero"
  path: "src/heros/Signature/index.tsx"
  name: "signature window"
rtl: "needs-redesign"                   # mirrors | neutral | needs-redesign
localization: "copy"          # none | labels | copy | typeface — what needs a fa twin
tokens: []                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-39-1-desktop-bench.png", "pleurat-com/DS-39-bench.webm", "pleurat-com/DS-39-f01-bench.png", "pleurat-com/DS-39-f02-bench.png", "pleurat-com/DS-39-f03-bench.png", "pleurat-com/DS-39-f04-bench.png", "pleurat-com/DS-39-f05-bench.png", "pleurat-com/DS-39-f06-bench.png", "pleurat-com/DS-39.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 1         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "draft"             # draft | review | ready
---

# DS-39 — “Bench” live-workspace window

> A fake IDE — accent title bar, rail of four tracks, dotted canvas drawing a flowchart, chip row, black console typing a log — the portfolio presented as a live workbench.

## What it is
P2/P3 item — the one-line summary above and the Anatomy table below are the record so far; the prose is written when the item is picked up for review. Crops and frames are listed under Evidence.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-39.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Part | Role | Measured | Token |
|---|---|---|---|
| **bench** | `div.sv-console` | 1278.4×827.8px · font General Sans · size 17px · color #16140E · bg #F3EDD6 · border 1px solid #16140E @16% · height 827.797px | `color.panel`, `color.ink` |
| ↳ titlebar | `div` .sv-cn-bar | 1276.4×40px · font General Sans · size 17px · color #16140E · bg #F3B44A · gap 16px · display flex · height 40px — “PORTFOLIO / WORKSPACE / WORKSPACE READY” | `color.brand`, `color.ink` |
| ↳ rail | `aside` .sv-cn-side | 216×744.5px · font General Sans · size 17px · color #16140E · bg #FBF7E6 · display flex · height 744.531px — “EXPERTISE Workspace BENCH · LIVE AI Work” | `color.ink` |
| ↳ rail-item | `button` .sv-cn-side .item | 215×60.2px · font General Sans · size 17px · color #16140E · bg #EFE9D2 · gap normal 10px · display grid · grid 6px 167px · gridTemplateRows 22.4688px 14.7188px · height 60.1875px — “Workspace BENCH · LIVE” | `color.ink` |
| ↳ canvas | `span` .grid, .sv-cn-stage, .stage | 1060.4×506.5px · font General Sans · size 17px · color #16140E · height 506.531px | `color.ink` |
| ↳ sticky | `article` .sticky | 172.2×106.2px · font General Sans · size 17px · color #16140E · bg #E7E2EE · border 1px solid #BDB4CD · height 99px — “Reuse before you add. Every new pattern ” | `color.ink` |
| ↳ chat | `article` .pane.chat | 234.6×153.3px · font General Sans · size 17px · color #16140E · bg #FBF7E6 · border 1px solid #16140E @16% · height 149.312px — “CHAT make the rail crop the second card ” | `color.ink` |
| ↳ chips | `div` .stageline, .tag | 1016.4×16.3px · font General Sans · size 10.5px · color #8B8577 · gap 14px · display flex · border 0px none · height 16.2656px — “WORKSPACE BENCH · LIVE” | `color.ink-3`, `font.size.eyebrow` |
| ↳ console | `div` .sv-cn-log, pre, .log | 1060.4×186px · font ui-monospace · size 12.5px · color #FBF7E6 @78% · bg #16140E · height 186px — “· the portfolio — type `help`, or press ” | `color.ink` |
| ↳ foot | `div` .sv-cn-foot | 1276.4×41.3px · font General Sans · size 10.5px · color #8B8577 · bg #EFE9D2 · gap 18px · display flex · height 41.2656px — “FIG. 004 — FOUR TRACKS, ONE BENCH WORKSP” | `color.ink-3`, `font.size.eyebrow` |

## Why it works
_To write when the item is picked up. Until then the measured table and crops carry the evidence._

## For Sina
- **Take:** Adapt — the pattern is right, the content or metaphor is Pleurat's; see the open question(s) below.
- **RTL:** Needs an RTL redesign — the direction of motion or reading order is part of the pattern.
- **Persian:** Body copy needs `_fa` twins; keep the English at Pleurat's length (2–4 sentences) so the Persian stays in parity.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| hero | `src/heros/Signature/index.tsx` | signature window | New hero type in `src/heros/config.ts` `type` select + `RenderHero.tsx` map. |

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-39-f01…f06-bench.png` — 6 viewport frames, bench, taken every few hundred ms while scrolling through
- `DS-39-1-desktop-bench.png` — bench · crop @2x · desktop
- `DS-39-bench.webm` — short video, scrolls the section into and through view
- `DS-39.json` — bounding boxes, computed styles and parts for every target above

## Open questions
> ❓ **Q1 — Choose:** What is Sina's metaphor? (a control room / campaign board / dashboard where design, growth numbers and roadmap share one surface — not a bench)

## Review checklist
- [ ] Q1 — What is Sina's metaphor? (a control room / campaign board / dashboard where design, growth numbers and roadmap share one surface — not a bench)
- [x] Measured table filled from `assets/pleurat-com/DS-39.json`
- [ ] For Sina written (take · RTL · Persian)
- [ ] Target mapping agreed
