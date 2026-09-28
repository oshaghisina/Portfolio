# Agent instructions

[CLAUDE.md](CLAUDE.md) is the canonical instruction file for **every** agent working in this repo:
Claude, Codex, Cursor and any other. Its rules are not Claude-specific. Read it before starting any
work.

Its **Production updates: Payload API First** rule is mandatory. Before any push, deploy or
restart, check whether Payload can make the production change. If it can, don't deploy. Full
policy: [Docs/Production-Update-Policy.md](Docs/Production-Update-Policy.md).

Keep rules in `CLAUDE.md`, not here, so the two files can't drift.
