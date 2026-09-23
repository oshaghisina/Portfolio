# syntax=docker/dockerfile:1
#
# One authoritative production build. `scripts/deploy.sh` runs this on the Mac (linux/amd64) and ships
# only the layers the server does not already hold; the server never installs or compiles.
# Layers are ordered rarely-changing → often-changing so unchanged ones keep their digest between
# releases (with `rewrite-timestamp=true` on the exporter).

FROM node:22.17.0-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable pnpm && corepack prepare pnpm@10.26.2 --activate && apk add --no-cache rsync
# Only the manifests: a source edit never invalidates the install. The workspace file (allowBuilds)
# and .npmrc keep the container install identical to the local one.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN --mount=type=cache,id=portfolio-pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir /pnpm/store

# Build in place on top of deps — no node_modules copy between stages.
FROM deps AS builder
COPY . .

ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_TELEMETRY_DISABLED=1

# Payload may query Mongo during `next build`; secrets exist only for this RUN.
# Only Turbopack's compiler cache persists between builds — never `.next/cache/fetch-cache`, which
# would carry CMS responses from a previous build into this one.
# The traced node_modules are synced by checksum into a persistent copy without touching the mtimes
# of unchanged files, so an unchanged dependency set yields a byte-identical layer (same digest →
# not re-sent to the server).
RUN --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=PAYLOAD_SECRET \
    --mount=type=cache,id=portfolio-next-turbopack,target=/app/.next/cache/turbopack \
    --mount=type=cache,id=portfolio-runtime-deps,target=/stable \
    export DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" \
    && export PAYLOAD_SECRET="$(cat /run/secrets/PAYLOAD_SECRET)" \
    && pnpm run build \
    && mkdir -p /out /stable/node_modules \
    && rsync -rlpc --delete .next/standalone/node_modules/ /stable/node_modules/ \
    && cp -a /stable/node_modules /out/node_modules \
    && rm -rf .next/standalone/node_modules \
    && mv .next/standalone /out/app

FROM base AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && mkdir -p .next public/media \
  && chown -R nextjs:nodejs /app

# Traced runtime dependencies change only when imports or the lockfile do.
COPY --from=builder --chown=nextjs:nodejs /out/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /out/app ./

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/',(r)=>process.exit(r.statusCode<500?0:1)).on('error',()=>process.exit(1))"

CMD ["node", "server.js"]
