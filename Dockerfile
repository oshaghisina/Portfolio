# syntax=docker/dockerfile:1

FROM node:22.17.0-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && corepack prepare pnpm@10.26.2 --activate \
  && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NEXT_TELEMETRY_DISABLED=1

# Payload may query Mongo during `next build`. Pass secrets only for this layer.
RUN --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=PAYLOAD_SECRET \
    corepack enable pnpm && corepack prepare pnpm@10.26.2 --activate \
    && export DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" \
    && export PAYLOAD_SECRET="$(cat /run/secrets/PAYLOAD_SECRET)" \
    && pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir -p .next public/media \
  && chown -R nextjs:nodejs .next public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/',(r)=>process.exit(r.statusCode<500?0:1)).on('error',()=>process.exit(1))"

CMD ["node", "server.js"]
