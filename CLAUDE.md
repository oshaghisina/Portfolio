# Claude Code

This project uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs.

## Production (local Docs)

Ops for the live VPS live in `Docs/Deploy.md` (gitignored with the rest of `Docs/`). Redeploy
with `./scripts/deploy.sh` / `pnpm deploy:prod`. Do not seed on the server; see that runbook for
Mongo restore, SEO DB sync from the laptop (`pnpm seed:seo-sync`, D-037), Arvan Object Storage
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
