---
id: "DS-02"                    # DS-NN — equals this file's prefix
title: "Surface + ink scale"                 # Pattern name, e.g. "Single-accent rule"
slug: "surface-ink-scale"                  # kebab-case; the file is <id>-<slug>.md
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
  name: "color.{light,dark}.* → --paper --panel --ink --ink-2 --ink-3 --line --line-soft"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "none"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["color.ground", "color.paper", "color.panel", "color.ink", "color.ink-2", "color.ink-3", "color.line", "color.line-2", "color.line-soft"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-02-1-desktop-body-viewport.png", "pleurat-com/DS-02-2-desktop-site-root-viewport.png", "pleurat-com/DS-02-3-desktop-panel-viewport.png", "pleurat-com/DS-02-4-desktop-h1-ink-viewport.png", "pleurat-com/DS-02-5-desktop-lede-ink-2-viewport.png", "pleurat-com/DS-02-6-desktop-index-ink-3-viewport.png", "pleurat-com/DS-02-7-desktop-muted-clause-viewport.png", "pleurat-com/DS-02-8-desktop-hairline-viewport.png", "pleurat-com/DS-02.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "ready"             # draft | review | ready
---

# DS-02 — Surface + ink scale

> A warm paper surface, a dark ground that only shows outside the paper, four ink steps and two hairline alphas — a complete neutral scale in eight tokens.

## What it is
Three surfaces and three inks do the whole page. Ground `#050711` (only visible outside the paper), paper `#FFFCF0` on `.site-root`, a slightly darker panel `#F3EDD6` for the bench/console. Ink `#16140E` for headings, ink-2 `#57534A` for body, ink-3 `#8B8577` for metadata and the muted headline clause. Hairlines are ink at low alpha (`.sv-ruled` 8%; card borders solid ink). Note the stylesheet's own `--ink`/`--bg` variables describe a *dark* theme (cream ink on dark bg) that is never shown — the shipped look is set per component.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-02.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Property | Value | Where measured | Token |
|---|---|---|---|
| ground | `#050711` | computed · `/ body` | `color.ground` |
| paper | `#FFFCF0` | computed · `/ .site-root` | `color.paper` |
| panel | `#F3EDD6` | computed · `/ .sv-console` | `color.panel` |
| ink | `#16140E` | computed · `/ h1, .sv-card h3` | `color.ink` |
| ink-2 | `#57534A` | computed · `/ .sv-hero-right p, .sv-head p, .sv-card p` | `color.ink-2` |
| ink-3 | `#8B8577` | computed · `/ .sv-card .ix, .sv-cn-foot span` | `color.ink-3` |
| line | `#16140E` | computed · `/ .sv-card` | `color.line` |
| line-2 | `#16140E @ 8%` | computed · `/ .sv-ruled` | `color.line-2` |
| line-soft | `#16140E` | computed · `/work/otee .sv-case-bar > div` | `color.line-soft` |

Representative elements:

| Part | Role | Measured | Token |
|---|---|---|---|
| **body** | `` | 1440×8035.1px · font General Sans · size 18px · weight 400 · leading 27px · color #EFEDE2 · bg #050711 · border 0px none · height 8035.14px · width 1440px | `color.ground`, `font.size.body` |
| **site-root** | `div.site-root` | 1440×8035.1px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · bg #FFFCF0 · height 8035.14px · width 1440px | `color.paper`, `color.ink` |
| **panel** | `div.sv-console` | 1278.4×827.8px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · bg #F3EDD6 · border 1px solid #16140E @16% · height 827.797px · width 1278.39px | `color.panel`, `color.ink` |
| **h1-ink** | `h1.sv-lines.is-in` | 700.6×121.3px · font General Sans · size 58.32px · weight 500 · tracking -1.7496px · leading 60.6528px · color #16140E · height 121.281px · width 700.562px | `color.ink`, `font.size.h1` |
| **lede-ink-2** | `p` | 435.3×88.3px · font General Sans · size 19px · weight 400 · leading 29.45px · color #57534A · border 0px none · height 88.3125px · width 435.328px | `color.ink-2` |
| **index-ink-3** | `span.ix` | 13.4×14px · font General Sans · size 10.5px · weight 400 · tracking 1.47px · leading 16.275px · color #8B8577 · display inline · border 0px none | `color.ink-3`, `font.size.eyebrow` |
| **muted-clause** | `span.sv-dim` | 524.6×73px · font General Sans · size 58.32px · weight 500 · tracking -1.7496px · leading 60.6528px · color #8B8577 · display inline · border 0px none | `color.ink-3`, `font.size.h1` |
| **hairline** | `article.sv-card` | 265.3×252.3px · font General Sans · size 17px · weight 400 · leading 26.35px · color #16140E · padding 30px 24px 34px · height 252.344px · width 265.266px | `color.ink` |

## Why it works
A warm, slightly yellow paper with a near-black ink reads as print and stays calm behind screenshots of colourful products; three ink steps are enough for heading / body / meta and keep contrast honest (ink-2 on paper 8.7:1, ink-3 4.1:1 — borderline for 10.5px meta, see DS-09). The dark ground framing the paper is what makes the page feel like a sheet on a desk.

## For Sina
- **Take:** Borrow the scale — 1 ground, 2 surfaces, 3 inks, 2 hairline alphas — and fill it with Sina's own values (the template already has `--background/--foreground/--muted-foreground/--border` slots, in oklch). Decide whether the warm paper is Sina's or whether a cooler neutral fits the design + marketing + product story better.
- **RTL:** Direction-neutral.
- **Persian:** Nothing to localize; Persian text at ink-3 needs re-checking for contrast because the face will differ.

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| token | `src/app/(frontend)/globals.css` | --background / --foreground / --muted-foreground / --border | Map: ground → `--background` (page), paper → `--card`/surface token, panel → `--muted`, ink → `--foreground`, ink-2 → body text token, ink-3 → `--muted-foreground`, hairlines → `--border` (+ a soft variant). Light/dark as sibling groups in `sina.tokens.json`. |

**Implemented (2026-09-19):** roles paper · panel · ink · ink-2 · ink-3 · line · line-soft (+ danger · success · warning) per theme; `--background / --foreground / --card / --muted / --muted-foreground / --border / --input` are aliases repeated in both scopes. Dark is a true slate, not an inversion (D-015). Contrast is asserted in `tests/int/tokens-build.int.spec.ts`. Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-02-1-desktop-body-viewport.png` — body · viewport shot · desktop
- `DS-02-2-desktop-site-root-viewport.png` — site root · viewport shot · desktop
- `DS-02-3-desktop-panel-viewport.png` — panel · viewport shot · desktop
- `DS-02-4-desktop-h1-ink-viewport.png` — h1 ink · viewport shot · desktop
- `DS-02-5-desktop-lede-ink-2-viewport.png` — lede ink 2 · viewport shot · desktop
- `DS-02-6-desktop-index-ink-3-viewport.png` — index ink 3 · viewport shot · desktop
- `DS-02-7-desktop-muted-clause-viewport.png` — muted clause · viewport shot · desktop
- `DS-02-8-desktop-hairline-viewport.png` — hairline · viewport shot · desktop
- `DS-02.json` — bounding boxes, computed styles and parts for every target above

## Open questions
_None yet — add one when writing Measured / For Sina raises a decision Sina has to make._

## Review checklist
- [x] Measured table filled from `assets/pleurat-com/DS-02.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed
