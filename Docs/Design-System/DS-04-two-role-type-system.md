---
id: "DS-04"                    # DS-NN — equals this file's prefix
title: "Two-role type system"                 # Pattern name, e.g. "Single-accent rule"
slug: "two-role-type-system"                  # kebab-case; the file is <id>-<slug>.md
category: "foundation"              # foundation | type-device | layout | component | motion | signature
take: "adapt"                  # borrow | adapt | avoid
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
  name: "font.family.{sans,mono,sans-fa} → --font-sans --font-mono --font-sans-fa"
rtl: "neutral"                   # mirrors | neutral | needs-redesign
localization: "typeface"          # none | labels | copy | typeface — what needs a fa twin
tokens: ["font.family.sans", "font.family.mono", "font.weight.heading", "font.weight.body"]                # token paths in tokens/<benchmark>.tokens.json, e.g. [color.brand, motion.ease.out]
evidence: ["pleurat-com/DS-04-1-desktop-sans-heading.png", "pleurat-com/DS-04-2-desktop-sans-body.png", "pleurat-com/DS-04-3-desktop-mono-role-eyebrow.png", "pleurat-com/DS-04-4-desktop-mono-caption.png", "pleurat-com/DS-04-5-desktop-mono-console.png", "pleurat-com/DS-04.json"]              # local-only files under assets/, e.g. [pleurat-com/DS-01-1.png] — filled by docs:ds-capture
related: []               # other DS ids
open_questions: 0         # ❓ count in the body — computed by docs:index
date_added: "2026-09-19"
updated: "2026-09-19"
status: "ready"             # draft | review | ready
---

# DS-04 — Two-role type system

> One humanist sans for everything readable, one mono for metadata (eyebrows, meta strips, captions, stats labels) — two roles, two faces, nothing else.

## What it is
Two roles, and — surprisingly — one face. Everything readable is General Sans (Fontshare, 400 and 500 loaded; 600/700 declared but never used). The “mono” role (eyebrows, index codes, captions, the console) is *styled* to read as mono — 10.5px, uppercase, tracking 1.47–1.68px, weight 400 — but is still General Sans: IBM Plex Mono is loaded in the `<head>` and stays `unloaded` in `document.fonts`; the console falls back to the system `ui-monospace`. The `--mono` variable itself is overridden to General Sans.

## Measured
Measured on pleurat.com at 1440×900 (and 390×844 where a mobile row is shown); values are computed styles from `assets/pleurat-com/DS-04.json`, matched back to `tokens/pleurat-com.tokens.json` where a token exists.

| Property | Value | Where measured | Token |
|---|---|---|---|
| family.sans | `General Sans, system-ui, -apple-system, sans-serif` | computed · `/ body` | `font.family.sans` |
| family.mono | `General Sans, Helvetica Neue, Helvetica, Arial, sans-serif` | computed · `/ .sv-cn-foot span, .sv-card .ix` | `font.family.mono` |
| weight.heading | `500` | computed · `/ h1, .sv-head h2, .sv-card h3` | `font.weight.heading` |
| weight.body | `400` | computed · `/ .sv-hero-right p, .sv-card p` | `font.weight.body` |

Representative elements:

| Part | Role | Measured | Token |
|---|---|---|---|
| **sans-heading** | `h1.sv-lines.is-in` | 700.6×121.3px · font General Sans · size 58.32px · weight 500 · tracking -1.7496px · leading 60.6528px · color #16140E · height 121.281px · width 700.562px | `color.ink`, `font.size.h1` |
| **sans-body** | `p` | 435.3×88.3px · font General Sans · size 19px · weight 400 · leading 29.45px · color #57534A · border 0px none · height 88.3125px · width 435.328px | `color.ink-2` |
| **mono-role-eyebrow** | `span.ix` | 13.4×14px · font General Sans · size 10.5px · weight 400 · tracking 1.47px · leading 16.275px · color #8B8577 · display inline · border 0px none | `color.ink-3`, `font.size.eyebrow` |
| **mono-caption** | `div.sv-cn-foot` | 1276.4×41.3px · font General Sans · size 10.5px · weight 400 · tracking 1.47px · leading 16.275px · case uppercase · color #8B8577 · bg #EFE9D2 · padding 12px 16px · gap 18px · display flex · height 41.2656px · width 1276.39px | `color.ink-3`, `font.size.eyebrow` |
| **mono-console** | `div.sv-cn-log.sv-ink-surface` | 1060.4×186px · font ui-monospace · size 12.5px · weight 400 · leading 23.75px · color #FBF7E6 @78% · bg #16140E · padding 14px 22px · height 186px · width 1060.39px | `color.ink` |

## Why it works
Two *roles* is what matters, not two files: a readable humanist sans for prose and a small, spaced, uppercase treatment for metadata gives every screen a clear “read this / this is a label” split with one download. It also shows the trap — declaring a second family you never use costs a request and confuses the tokens.

## For Sina
- **Take:** Adapt — keep the two-role system, but *decide* whether the label role is a real mono face or a styled sans (Pleurat accidentally did the latter). Then choose the Latin sans and its Persian partner together; see Q1/Q2.
- **RTL:** Direction-neutral; label tracking and uppercase are the parts that don't exist in Persian.
- **Persian:** General Sans has no Arabic-script glyphs. Pair each role: Latin sans ↔ Persian sans with matching x-height and weight (candidates worth testing: Vazirmatn, Estedad, Yekan Bakh, Peyda); Latin mono/labels can stay Latin for codes and numbers, but Persian labels need a Persian treatment (size + weight instead of uppercase + tracking).

## Target mapping
| Kind | Path | Name | Notes |
|---|---|---|---|
| token | `src/app/(frontend)/globals.css` | --font-sans / --font-mono | `--font-sans` / `--font-mono` already exist (Geist); swap via `next/font` or the Fontshare/Google CSS, add `--font-sans-fa` and select by `lang`. Keep the label role as a utility (DS-09) so the face can change underneath it. |

**Implemented (2026-09-19):** Geist Sans + Geist Mono (installed) and Vazirmatn via `next/font/google` (`--font-vazirmatn`, not preloaded); `font.fa.family.sans` swaps `--font-sans` inside `:lang(fa)` and a `[lang='fa'] { font-family }` base rule in `globals.css` re-applies it. Labels are a real mono (D-016). Shown on `/design`.

## Evidence
Local-only, in `assets/pleurat-com/` (gitignored):

- `DS-04-1-desktop-sans-heading.png` — sans heading · crop @2x · desktop
- `DS-04-2-desktop-sans-body.png` — sans body · crop @2x · desktop
- `DS-04-3-desktop-mono-role-eyebrow.png` — mono role eyebrow · crop @2x · desktop
- `DS-04-4-desktop-mono-caption.png` — mono caption · crop @2x · desktop
- `DS-04-5-desktop-mono-console.png` — mono console · crop @2x · desktop
- `DS-04.json` — bounding boxes, computed styles and parts for every target above

## Open questions
None — decided in D-016:

- **Q1 (Persian face):** Vazirmatn, loaded with `next/font/google` as `--font-sans-fa`; Geist Sans stays the Latin face. Estedad / Yekan Bakh / Peyda remain candidates if the pairing disappoints in real copy.
- **Q2 (mono captions in Persian):** Latin codes and numbers stay in Geist Mono in every locale (`.index-code`); Persian *labels* switch to the Persian sans with size and weight instead of uppercase and tracking (`.eyebrow:lang(fa)`).

## Review checklist
- [x] Q1 — Which Persian face pairs with the Latin sans for body and headings (matching x-height and weight)?
- [x] Q2 — Mono captions stay Latin/numeric in the Persian version?
- [x] Measured table filled from `assets/pleurat-com/DS-04.json`
- [x] For Sina written (take · RTL · Persian)
- [x] Target mapping agreed
