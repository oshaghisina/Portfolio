---
id: "DS-03"                    # DS-NN — equals this file's prefix
title: "Fluid type scale"                 # Pattern name, e.g. "Single-accent rule"
slug: "fluid-type-scale"                  # kebab-case; the file is <id>-<slug>.md
category: "foundation"              # foundation | type-device | layout | component | motion | signature
take: "borrow"                  # borrow | adapt | avoid
priority: 1               # 1 = first sprint · 2 = next · 3 = later
adoption: "adopted"       # candidate | adopted | rejected | superseded
superseded_by: ""         # DS-NN, only when adoption = superseded
sources:                  # every benchmark where the pattern was seen — grows over time
  - benchmark: "pleurat-com"
    type: design
    section: "Visual language"
target:                   # where it lands in the codebase
  kind: "token"
  path: "Docs/Design-System/tokens/sina.tokens.json"
  name: "font.size.* → --text-*"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "typeface"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["font.size.h1", "font.size.h2", "font.size.h3", "font.size.body", "font.size.card-body", "font.size.caption", "font.size.eyebrow", "font.size.button", "font.size.num", "font.size.num-lg", "font.size.ghost", "font.leading.h1", "font.leading.body", "font.tracking.h1", "font.tracking.eyebrow", "font.size.theme.h1", "font.size.theme.display-lg", "font.size.theme.micro"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-03-1-desktop-h1.png", "pleurat-com/DS-03-10-mobile-h3.png", "pleurat-com/DS-03-11-mobile-body.png", "pleurat-com/DS-03-12-mobile-caption.png", "pleurat-com/DS-03-14-mobile-stat-number.png", "pleurat-com/DS-03-2-desktop-h2.png", "pleurat-com/DS-03-3-desktop-h3.png", "pleurat-com/DS-03-4-desktop-body.png", "pleurat-com/DS-03-5-desktop-caption.png", "pleurat-com/DS-03-6-desktop-eyebrow.png", "pleurat-com/DS-03-7-desktop-stat-number.png", "pleurat-com/DS-03-8-mobile-h1.png", "pleurat-com/DS-03-9-mobile-h2.png", "pleurat-com/DS-03.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "ready"             # draft | review | ready
---

# DS-03 — Fluid type scale

> A clamp()-based scale from 9px micro captions to 420px ghost numerals, with separate sizes for numbers so stats can be huge without touching the heading scale.

## What it is
Headings are fixed sizes per component rather than one fluid scale: h1 58.3px / weight 500 / leading 1.04 / tracking −1.75px; section h2 43.9px; card h3 21px; body 18–19px / 1.55 (hero lede 19, section ledes 18); card body 14.5px; captions 15px; eyebrows 10.5px. The stylesheet *does* define a fluid `clamp()` scale (`--fs-micro` 10.8px → `--fs-ghost` up to 420px, plus separate numeral sizes `--fs-num` / `--fs-num-lg`) but the visible components only use it for the big numbers and ghost numerals. Mobile keeps the same eyebrow and body sizes and drops the h1 to fit 390px (see the mobile rows).

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-03.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Property | Value | Where measured | Token |
|---|---|---|---|
| size.h1 | `58.32px` | computed · `/ h1` | `font.size.h1` |
| size.h2 | `43.92px` | computed · `/ .sv-head h2` | `font.size.h2` |
| size.h3 | `21px` | computed · `/ .sv-card h3` | `font.size.h3` |
| size.body | `18px` | computed · `/ .sv-hero-right p, .sv-head p` | `font.size.body` |
| size.card-body | `14.5px` | computed · `/ .sv-card p` | `font.size.card-body` |
| size.caption | `15px` | computed · `/ .sv-chart .lbl` | `font.size.caption` |
| size.eyebrow | `10.5px` | computed · `/ .sv-card .ix, .sv-cn-foot span` | `font.size.eyebrow` |
| size.button | `15px` | computed · `/ .sv-btn--amber` | `font.size.button` |
| size.num | `clamp(57.6px, 6.48vw, 100.8px)` | stylesheet · `--fs-num` | `font.size.num` |
| size.num-lg | `clamp(90px, 12.5vw, 192px)` | stylesheet · `--fs-num-lg` | `font.size.num-lg` |
| size.ghost | `clamp(180px, 28vw, 420px)` | stylesheet · `--fs-ghost` | `font.size.ghost` |
| leading.h1 | `1.04` | computed · `/ h1` | `font.leading.h1` |
| leading.body | `1.55` | computed · `/ .sv-hero-right p` | `font.leading.body` |
| tracking.h1 | `-1.75px` | computed · `/ h1` | `font.tracking.h1` |
| tracking.eyebrow | `1.47px` | computed · `/ .sv-card .ix, .sv-cn-foot span` | `font.tracking.eyebrow` |
| size.theme.h1 | `clamp(43.2px, 4.2vw, 64.8px)` | stylesheet · `--fs-h1` | `font.size.theme.h1` |
| size.theme.display-lg | `clamp(62.4px, 6.48vw, 100.8px)` | stylesheet · `--fs-display-lg` | `font.size.theme.display-lg` |
| size.theme.micro | `10.8px` | stylesheet · `--fs-micro` | `font.size.theme.micro` |

Representative elements:

| Part | Role | Measured | Token |
|---|---|---|---|
| **h1** (desktop) | `h1.sv-lines.is-in` | 700.6×121.3px · font General Sans · size 58.32px · weight 500 · tracking -1.7496px · leading 60.6528px · color #16140E · height 121.281px · width 700.562px | `color.ink`, `font.size.h1` |
| **h2** (desktop) | `h2.sv-lines.is-in` | 629.3×101px · font General Sans · size 43.92px · weight 500 · tracking -1.3176px · leading 45.6768px · color #16140E · height 101px · width 629.281px | `color.ink`, `font.size.h2` |
| **h3** (desktop) | `h3` | 216.3×32.5px · font General Sans · size 21px · weight 500 · tracking -0.42px · leading 32.55px · color #16140E · height 32.5469px · width 216.266px | `color.ink`, `font.size.h3` |
| **body** (desktop) | `p` | 435.3×88.3px · font General Sans · size 19px · weight 400 · leading 29.45px · color #57534A · border 0px none · height 88.3125px · width 435.328px | `color.ink-2` |
| **caption** (desktop) | `span.lbl` | 295.6×22.5px · font General Sans · size 15px · weight 400 · leading 22.5px · color #57534A · border 0px none · height 22.5px · width 295.594px | `color.ink-2`, `font.size.button` |
| **eyebrow** (desktop) | `span.ix` | 13.4×14px · font General Sans · size 10.5px · weight 400 · tracking 1.47px · leading 16.275px · color #8B8577 · display inline · border 0px none | `color.ink-3`, `font.size.eyebrow` |
| **stat-number** (desktop) | `div.sv-bar.is-hot` | 295.6×330px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · display flex · height 330px · width 295.594px | `color.ink` |
| **h1** (mobile) | `h1.sv-lines.is-in` | 340×168.9px · font General Sans · size 37.05px · weight 500 · tracking -1.1856px · leading 42.237px · color #16140E · height 168.875px · width 340px | `color.ink` |
| **h2** (mobile) | `h2.sv-lines.is-in` | 340×122.5px · font General Sans · size 33.93px · weight 500 · tracking -1.0179px · leading 38.3409px · color #16140E · height 122.484px · width 340px | `color.ink` |
| **h3** (mobile) | `h3` | 324×40.3px · font General Sans · size 26px · weight 500 · tracking -0.52px · leading 40.3px · color #16140E · height 40.2969px · width 324px | `color.ink` |
| **body** (mobile) | `p` | 340×108.5px · font General Sans · size 17.5px · weight 400 · leading 27.125px · color #57534A · border 0px none · height 108.5px · width 340px | `color.ink-2` |
| **caption** (mobile) | `span.lbl` | 160×22.5px · font General Sans · size 15px · weight 400 · leading 22.5px · color #57534A · border 0px none · height 22.5px · width 160px | `color.ink-2`, `font.size.button` |
| **eyebrow** (mobile) | `span.ix` | font General Sans · size 12px · weight 400 · tracking 1.68px · leading 18.6px · color #8B8577 · border 0px none | `color.ink-3` |
| **stat-number** (mobile) | `div.sv-bar.is-hot` | 160×118px · font General Sans · size 16.5px · weight 400 · leading 25.575px · color #16140E · display flex · height 118px · width 160px | `color.ink` |

## Why it works
The ratio between levels is what carries the hierarchy: 58 → 44 → 21 → 19 → 15 → 10.5 is roughly a 1.3–2× step at each level with a deliberate gap between h3 and body, so a card reads as *title / role / blurb* at a glance. Negative tracking on the display sizes and none on body is the classic humanist-sans move; separate numeral sizes let the stats be huge without dragging the heading scale along.

## For Sina
- **Take:** Borrow the *scale shape* (six roles: display, h1, h2, h3, body, caption, eyebrow, plus a numeral track) as `clamp()` tokens, not the pixel values — Pleurat's own vars show how to write them. Use the theme vars in `font.size.theme.*` as the clamp() reference and the computed sizes as the target at 1440.
- **RTL:** Direction-neutral.
- **Persian:** The sizes transfer, the leading and tracking do not: Persian needs ~1.6–1.8 body leading and zero or positive tracking on display sizes, and a Persian face at 10.5px is unreadable — the eyebrow role needs a larger Persian minimum (~12px). Persian digits vs Latin digits in the numeral track is a one-time decision (Q in DS-10).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| token | `src/app/(frontend)/globals.css` | --text-* | `--text-*` in `@theme` (Tailwind v4 uses `--text-<name>` for `text-<name>` utilities); fluid values emitted as `clamp(min, vw, max)` from the `{min, vw, max}` groups. |

**Implemented (2026-09-19):** roles display · h1 · h2 · h3 · lede · body · small · caption · eyebrow · button · num (fluid ones as `{min, vw, max}` → `clamp()`), with `font.leading.*` / `font.tracking.*` emitted as `--text-<role>--line-height` / `--letter-spacing` companions, so `text-h1` sets all three. Persian values live in `font.fa.*` and are emitted inside `:lang(fa)`. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-03-1-desktop-h1.png` — h1 · crop @2x · desktop
- `DS-03-2-desktop-h2.png` — h2 · crop @2x · desktop
- `DS-03-3-desktop-h3.png` — h3 · crop @2x · desktop
- `DS-03-4-desktop-body.png` — body · crop @2x · desktop
- `DS-03-5-desktop-caption.png` — caption · crop @2x · desktop
- `DS-03-6-desktop-eyebrow.png` — eyebrow · crop @2x · desktop
- `DS-03-7-desktop-stat-number.png` — stat number · crop @2x · desktop
- `DS-03-8-mobile-h1.png` — h1 · crop @2x · mobile
- `DS-03-9-mobile-h2.png` — h2 · crop @2x · mobile
- `DS-03-10-mobile-h3.png` — h3 · crop @2x · mobile
- `DS-03-11-mobile-body.png` — body · crop @2x · mobile
- `DS-03-12-mobile-caption.png` — caption · crop @2x · mobile
- `DS-03-14-mobile-stat-number.png` — stat number · crop @2x · mobile
- `DS-03.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-03.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed
