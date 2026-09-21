---
title: "RP1 (ReadyPlayerOne) — Multi-Game Play-to-Earn Arena"
title_fa: ""              # Persian title (shown on the fa site)
slug: "rp1-arena"
inventory_id: "PRJ-01"    # row in ../../Inventory.md
company: "Freelance / Independent Projects"
product: ""                # Product or business unit, if different from company
role: "Product Designer & Strategist"
period:
  start: "2026-02"
  end: ""
employment: "freelance"
domain: "gaming / play-to-earn"
team: ""
summary: "Product design and strategy for RP1, a multi-game play-to-earn arena — competitive-platform research, MVP scoping, and a full wireframe spec across 16 sections."
summary_fa: ""
tools: [Figma, React]
skills: [product-strategy, gamification-design, ui-design, wireframing, design-systems, competitive-research]
figma:
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=22074-26783"  # Profile
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=24923-2889"   # Chat
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=24930-1189"   # Games
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=24951-1114"   # Wallet
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=24923-5477"   # Notification
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=22074-28293"  # 1st Enter
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=25388-2282"   # Today Spotlight
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=25580-49729"  # Solo Challenge
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=25583-10086"  # Tournaments
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=25388-2283"   # Weekly Legend
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=25432-3901"   # Duel
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=25518-8252"   # Team Battle
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=25416-6339"   # Profile Animation
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=25433-9246"   # Level Up Animation
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=25438-12135"  # Event Based Actions
  - "https://www.figma.com/design/FRgdi4D9evbyeleeVIOFMu/Game-Design?node-id=25421-3503"   # Setting
links: []
metrics: []
featured: true
status: draft
---

# RP1 (ReadyPlayerOne) — Multi-Game Play-to-Earn Arena

> A multi-game play-to-earn arena, spec'd end-to-end — from Octalysis-driven research to a
> 16-section wireframe pass — currently pre-launch.

## Context
RP1 (short for "ReadyPlayerOne" in the project's own docs) is a mobile-first arena that
aggregates many lightweight HTML5 arcade games — Flappy Bird, Snake, Temple Run, Subway Surf and
others — under one competitive and economic layer: daily and weekly leaderboard competitions,
1v1 wagered duels, and ticket-gated tournaments, all settled in USDT through an on-chain wallet
(BNB Smart Chain, BEP-20). It isn't pitched as a social network — the project's own docs call it
a "competitive visibility engine." The closest reference points named throughout the research
are Skillz, MPL, WinZO, Kongregate and Plato, with an explicit anti-goal called out repeatedly:
don't become "the Telegram graveyard" — Hamster Kombat's collapse from 300M to 23M users after
its token airdrop faded is cited as the cautionary case. Sina worked on this as product design
and strategy lead, alongside a named product owner and a collaborator who authored the
project's later-stage game and community spec.

> ❓ **Q1 — Confirm:** Current status of RP1 (shipped / paused / still active) and, if known, an
> end date for `period.end` — nothing in the source material says which.

## Problem
Casual HTML5 games are plentiful but rarely have a durable competitive or monetization layer —
and the platforms that do add one (crypto-gaming, play-to-earn) tend to read as casino products
first and games second. The problem RP1 set out to solve was designing a system that feels
genuinely competitive and rewarding without tipping into exploitative mechanics: the research
explicitly scored every mechanic against the Octalysis framework's White-Hat/Black-Hat balance,
and the project's own tone guideline was blunt about it — "ESPN app, not Stake.com"; say a
player "earned" a prize, never that they "won big" or hit a "jackpot."

## My role
I drove the gamification research and framework work: applying Octalysis across all 8 Core
Drives to the product, and — rather than just writing that analysis up — building a small
interactive React tool that turns the framework into a live scoring instrument (an 8-drive
audit, an octagon radar chart, journey-phase and engagement-loop builders, an ethics checklist),
shipped in both English and Persian. I scoped the MVP: locking the navigation to three tabs
(Club / Game / Wallet) and cutting an earlier, much larger vision — a utility token, in-app
betting, player-owned clubs and club stores — down to a USDT-only, single-club product. I made
specific, documented calls credited in the project's own conflict-resolution log, including the
Duel → Tournament → Rumble naming that replaced an earlier "PVP / Public Battle / Family &
Friends Battle" scheme, and then produced the full wireframe spec across every section of the
app, working alongside the product owner and the collaborator who wrote the canonical
game/community spec that superseded my own earlier community draft.

> ❓ **Q2 — Confirm:** Whether the interactive Octalysis tool
> (`html5-game-gamification-system.jsx` + its English/Persian HTML demos) was solely Sina's
> build, for accurate attribution above.

## Process
Research came first: a wide pass across 20-plus competitive and casual-gaming platforms
(Skillz, MPL, WinZO, Kongregate, Telegram mini-apps and others), then an Octalysis framework
deep dive detailed enough to turn into the interactive scoring tool above. From there, mechanics
design: three mapped systems — a value-creation loop (how a low-balance player earns their way
back in), an engagement loop (tournament / duel / club-store choices for a funded player), and a
club retention loop with a formal state machine (open club → see an opportunity → compete →
result lands in a feed → open club again). MVP descoping followed, tracked in a dated
conflict-resolution log rather than left as silent rewrites. A 20-component reuse audit (ranked
by reuse score, with an 18-item gap list — no color/type tokens, no motion spec, undefined
avatar system) fed into a full wireframe pass across all 16 sections, each documented with its
own per-screen copy audit and a P1/P2/P3 issue log.

## Solution
The shipped spec covers the whole app: onboarding (1st Enter — Google/Apple/email, OTP verify);
a Games hub aggregating Solo Challenge, Duel, Team Battle and Tournaments; Today Spotlight (a
daily single-game competition with a ticket buy-in and live leaderboard); Weekly Legend (a
7-day, buy-in, cross-game competition); Lucky Wheel (a chance mechanic that pays into a duel
entry or straight to the wallet); Chat (Friends / Club / People); Notifications (Games / Friends
/ Payments, each a rich transactional card); Wallet (USDT-only balance, deposit, withdraw, and
an earnings breakdown by ads / referral / battle / deposit); Profile (achievements, friends, and
an XP-style roadmap); Settings (including a Danger Zone for log-out and delete-account); and
three animation systems — a profile-entry sequence, a six-keyframe level-up animation, and ten
event-based overlays (login greeting, duel winner, anniversary variants, birthday, and more).
Navigation is locked to three tabs — Club, Game, Wallet — with a single reusable Feed Card
pattern (win announcement, tournament-starting, near-miss, level-up, daily summary) carrying the
Club tab. All 73 exported screens are in `assets/`, organized to match these sections.

## Outcome & impact
RP1 is pre-launch — there's no shipped-product metric to report yet, and this case study doesn't
pretend otherwise. What did come out of this phase was concrete: a fully resolved MVP scope
(three-tab nav, single club, USDT-only economy), a 34-component build catalog (9 reused, 25
net-new) with a 3-week build order, and the interactive Octalysis tool itself, which stands as a
reusable artifact independent of RP1.

## Learnings
Two things from this project are worth carrying forward. First, an explicit, dated
conflict-resolution log turned out to matter more than expected — renaming Duel/Tournament/
Rumble, or formally marking an older community spec as superseded rather than quietly replacing
it, kept the whole team working from the same current truth instead of arguing from stale docs.
Second, this research pass itself caught a real inconsistency that had survived in the specs:
the wallet flow names BNB Smart Chain (BEP-20) in the newer, more detailed, Figma-linked
documentation, but an earlier draft specifies TRC-20/ERC-20 instead. Treating the more recent,
more thoroughly cross-referenced source as canonical (BEP-20) is the right call here, but it's a
good reminder that even a well-documented project accumulates small drifts that only a full
re-read surfaces.

## Assets
`assets/` — 73 exported screens across 12 sections (1st Enter, Games, Today Spotlight, Weekly
Legend, Duel, Lucky Wheel, Chat, Notification, Wallet, Profile, Setting, Animations), mirroring
the Figma canvas.

## Review checklist
- [ ] Q1 — RP1's current status and `period.end` confirmed
- [ ] Q2 — Interactive Octalysis tool's authorship confirmed
