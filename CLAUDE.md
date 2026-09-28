# Claude Code

This project uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs.

## Production updates: Payload API First (mandatory for every agent)

Binds every agent: Claude sessions, Codex, Cursor, planning, implementing and deploying agents.
Full policy, with the decision gate, categories, examples and the pre-deploy checklist:
[Docs/Production-Update-Policy.md](Docs/Production-Update-Policy.md) (D-052).

Before anything that pushes, builds, deploys or restarts production, classify the change:
content/data, code, schema, source asset, dependency, infrastructure, or mixed.

```text
PRODUCTION RULE
1. Decide whether the change is Payload-managed. Check the live record or grep src/; don't guess.
2. If Payload can safely produce the live state, use it: the MCP endpoint (POST /api/mcp) or an
   existing Payload sync script. Don't deploy.
3. Never deploy a content-only change. The image carries no content and seeds never run on the
   server, so a deploy can't change live content anyway.
4. Mixed change: deploy the code/schema part once, then fill the data through Payload.
5. Group deploy-requiring changes into one locally validated deploy. A deploy is never a test.
6. Read before writing and read back after. Send the smallest patch.
7. Keep other locales, relationships, drafts/_status and unrelated fields intact.
8. End the report with a "Production Update Decision" block: change type, Payload API
   applicable (YES/PARTIAL/NO), production action, deployment required, reason.
```

If you can't show that step 2 was checked, don't deploy. API-first chooses the path; it doesn't
grant permission. Live writes, deploys and restarts still need Sina's approval naming the action.
After a live-only edit, update the seed or laptop DB to match, or record the difference in
`Docs/Deploy.md`. Otherwise the next laptop → live sync reverts it.

## Production (local Docs)

Ops for the live VPS live in `Docs/Deploy.md` (gitignored with the rest of `Docs/`). Production is
moving to Coolify on a fresh server (`SERVER_HOST` in `.env`, D-046): `.github/workflows/image.yml` builds the `Dockerfile` into GHCR and Coolify runs
it; the old `pnpm deploy:prod` / compose stack was removed 2026-09-26. Do not seed on the server;
see that runbook for Mongo restore, SEO DB sync from the laptop (`pnpm seed:seo-sync`, D-037), Arvan Object Storage
(D-034), WireGuard constraints, Cloudflare Tunnel (D-036), Payload MCP / Cursor (`POST /api/mcp`,
D-039), and the HTTPS DNS-01 follow-up (D-027…D-030 in `Docs/Decisions.md`).

## Payload MCP

Plugin `@payloadcms/plugin-mcp@3.90.1` is registered in `src/plugins/index.ts`. Endpoint:
`POST /api/mcp` with `Authorization: Bearer <key>` from Admin → **MCP → API Keys**. Cursor reads
`PAYLOAD_MCP_URL` + `PAYLOAD_API_KEY` via `.cursor/mcp.json`. Do not use the Users REST “API” tab
URL as the MCP endpoint. Details: `README.md` (Admin → Payload MCP) and `Docs/Deploy.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
