#!/usr/bin/env bash
# Production release: validate → build the image ONCE (linux/amd64, on this Mac) → smoke-test it →
# ship only the image layers the server does not already hold → switch the container → health check.
# The server never installs dependencies or compiles; it loads layers from local disk and restarts.
#
# Usage: pnpm deploy:prod [flags]      (or ./scripts/deploy.sh)
#   --dry-run      validate, build, smoke-test and report the transfer size; the server is not changed
#                  (apart from the one-time seed of its blob store from the live image)
#   --skip-checks  skip lint / tsc / test:int (the image build still runs Next's own type-check)
#   --force        deploy even if this release id is already live
#   --worktree     build the working tree, uncommitted changes included (tagged <sha>-dirty-<stamp>)
#   --rollback     switch back to the previous image; no build, no transfer
#
# By default the release is `git archive HEAD`, so uncommitted work never ships and the tag is truthful.
# The build recipe (Dockerfile, .dockerignore) always comes from the working tree, like this script.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

DRY_RUN=0 SKIP_CHECKS=0 FORCE=0 WORKTREE=0 ROLLBACK=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --skip-checks) SKIP_CHECKS=1 ;;
    --force) FORCE=1 ;;
    --worktree) WORKTREE=1 ;;
    --rollback) ROLLBACK=1 ;;
    *) echo "Unknown flag: $arg" >&2; exit 2 ;;
  esac
done

# Load SERVER_* and PROD_* from .env without printing values
load_env() {
  local key="$1"
  python3 - "$key" <<'PY'
import sys
from pathlib import Path
key = sys.argv[1]
for line in Path(".env").read_text().splitlines():
    if line.startswith(key + "=") and not line.strip().startswith("#"):
        print(line.split("=", 1)[1], end="")
        break
PY
}

SERVER_HOST="$(load_env SERVER_HOST)"
SERVER_PORT="$(load_env SERVER_PORT)"
SERVER_USER="$(load_env SERVER_USER)"
SERVER_APP_DIR="$(load_env SERVER_APP_DIR)"
PROD_SERVER_URL="$(load_env PROD_SERVER_URL)"

: "${SERVER_HOST:?}"
: "${SERVER_USER:?}"
: "${SERVER_APP_DIR:?}"
: "${PROD_SERVER_URL:?}"

PORT="${SERVER_PORT:-22}"
REMOTE="${SERVER_USER}@${SERVER_HOST}"
SSH=(ssh -o BatchMode=yes -p "$PORT" "$REMOTE")
RSYNC_RSH="ssh -o BatchMode=yes -p $PORT"
# Staging lives outside the repo so lint / tsc / vitest never see the exported tree.
STAGE="${PORTFOLIO_DEPLOY_DIR:-$HOME/.cache/portfolio-deploy}"
SRC="$STAGE/src"
OCI="$STAGE/oci"
SMOKE_NAME="portfolio-smoke"
SMOKE_PORT=3999

TIMINGS=()
PHASE=""
PHASE_T=$(date +%s)
START_T=$PHASE_T
phase() {
  local now
  now=$(date +%s)
  if [[ -n "$PHASE" ]]; then
    TIMINGS+=("$(printf '%-10s %4ss' "$PHASE" $((now - PHASE_T)))")
  fi
  PHASE="$1"
  PHASE_T=$now
  if [[ -n "$PHASE" ]]; then echo "==> $PHASE"; fi
}
report_timings() {
  phase ""
  echo "==> Timings"
  printf '    %s\n' "${TIMINGS[@]}"
  printf '    %-10s %4ss\n' "total" $(($(date +%s) - START_T))
}

SECRET_DIR="$(mktemp -d)"
cleanup() {
  rm -rf "$SECRET_DIR"
  docker rm -f "$SMOKE_NAME" >/dev/null 2>&1 || true
}
trap cleanup EXIT

# Server side. Modes: load (import the OCI layout, switch, health, auto-rollback, prune),
# rollback (switch to .previous-image). Compose reads PORTFOLIO_IMAGE / MONGO_ROOT_* from the
# server's own .env, so no secret crosses the ssh command line.
REMOTE_SCRIPT=$(cat <<'REMOTE'
set -euo pipefail
APP_DIR="$1"; MODE="$2"; TAG="${3:-}"; RELOAD_CADDY="${4:-0}"
cd "$APP_DIR"
compose() { docker compose -f docker-compose.prod.yml "$@"; }
set_image() {
  if grep -q '^PORTFOLIO_IMAGE=' .env; then sed -i "s|^PORTFOLIO_IMAGE=.*|PORTFOLIO_IMAGE=$1|" .env
  else echo "PORTFOLIO_IMAGE=$1" >> .env; fi
  docker tag "$1" portfolio:latest
}
healthy() {
  for _ in $(seq 1 60); do
    curl -sf -o /dev/null http://127.0.0.1:3000/ && return 0
    sleep 2
  done
  return 1
}
switch_to() {
  set_image "$1"
  echo "$1" > .current-image
  compose up -d app
}

CUR="$(cat .current-image 2>/dev/null || true)"

if [[ "$MODE" == rollback ]]; then
  PREV="$(cat .previous-image 2>/dev/null || true)"
  [[ -n "$PREV" ]] || { echo "No .previous-image recorded" >&2; exit 1; }
  docker image inspect "$PREV" >/dev/null
  echo "Rolling back ${CUR:-?} -> $PREV"
  switch_to "$PREV"
  [[ -n "$CUR" ]] && echo "$CUR" > .previous-image
  healthy && echo "APP_HEALTHY" || { echo "APP_NOT_HEALTHY" >&2; exit 1; }
  exit 0
fi

t=$(date +%s)
tar -C oci -cf - . | docker load -q
docker image inspect "$TAG" >/dev/null
echo "LOAD_SECONDS=$(( $(date +%s) - t ))"

[[ -n "$CUR" && "$CUR" != "$TAG" ]] && echo "$CUR" > .previous-image
PREV="$(cat .previous-image 2>/dev/null || true)"
switch_to "$TAG"
if [[ "$RELOAD_CADDY" == 1 ]]; then
  compose up -d caddy
  compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile || true
fi
compose ps app

echo "Waiting for app health on :3000"
if ! healthy; then
  echo "APP_NOT_HEALTHY" >&2
  compose logs --tail=80 app || true
  if [[ -n "$PREV" && "$PREV" != "$TAG" ]]; then
    echo "Auto-rollback to $PREV" >&2
    switch_to "$PREV"
    healthy && echo "ROLLED_BACK_HEALTHY" >&2
  fi
  exit 1
fi
echo "APP_HEALTHY"

# Keep current + previous images; keep only the blobs the current index references (next deploy's
# dedup base).
docker images portfolio --format '{{.Repository}}:{{.Tag}}' \
  | grep -vxF -e "$TAG" -e "$PREV" -e portfolio:latest \
  | xargs -r docker rmi >/dev/null 2>&1 || true
python3 - oci <<'PY'
import json, os, sys
root = sys.argv[1]
blobs = os.path.join(root, "blobs", "sha256")
keep = set()
def walk(desc):
    digest = desc["digest"]
    if digest in keep:
        return
    keep.add(digest)
    path = os.path.join(blobs, digest.split(":", 1)[1])
    if ("manifest" in desc.get("mediaType", "") or "index" in desc.get("mediaType", "")) and os.path.exists(path):
        doc = json.load(open(path))
        for child in doc.get("manifests", []) + doc.get("layers", []) + ([doc["config"]] if "config" in doc else []):
            walk(child)
for m in json.load(open(os.path.join(root, "index.json")))["manifests"]:
    walk(m)
removed = 0
for name in os.listdir(blobs):
    if "sha256:" + name not in keep:
        os.remove(os.path.join(blobs, name)); removed += 1
print(f"OCI_BLOBS_KEPT={len(keep)} OCI_BLOBS_PRUNED={removed}")
PY
REMOTE
)

remote() { "${SSH[@]}" "bash -s -- $*" <<<"$REMOTE_SCRIPT"; }

if [[ "$ROLLBACK" == 1 ]]; then
  phase "Rollback"
  remote "$SERVER_APP_DIR" rollback
  report_timings
  exit 0
fi

# ---------------------------------------------------------------------------------------------
phase "Preflight"
docker info >/dev/null
(exec 3<>/dev/tcp/127.0.0.1/27020) 2>/dev/null \
  || { echo "Local Mongo is not reachable on :27020 (docker compose up -d mongo)" >&2; exit 1; }
LIVE="$("${SSH[@]}" "cat '${SERVER_APP_DIR}/.current-image' 2>/dev/null || true")"

SHA="$(git rev-parse --short HEAD)"
rm -rf "$SRC"
mkdir -p "$SRC"
if [[ "$WORKTREE" == 1 ]]; then
  CONTEXT="$ROOT"
  RELEASE="$SHA"
  if [[ -n "$(git status --porcelain)" ]]; then
    RELEASE="${SHA}-dirty-$(date -u +%Y%m%d%H%M%S)"
  fi
else
  git archive HEAD | tar -x -C "$SRC"
  cp Dockerfile .dockerignore "$SRC/"
  CONTEXT="$SRC"
  RELEASE="$SHA"
  # An uncommitted recipe builds a different image from the same commit: give it its own tag so
  # the live/previous tags (and rollback) never get overwritten.
  if ! git diff --quiet HEAD -- Dockerfile .dockerignore; then
    RELEASE="${SHA}-recipe-$(cat Dockerfile .dockerignore | shasum | cut -c1-6)"
  fi
  if [[ -n "$(git status --porcelain -- . ':!Dockerfile' ':!.dockerignore' ':!scripts/deploy.sh')" ]]; then
    echo "    note: uncommitted changes are NOT part of this release (HEAD ${SHA} only)"
  fi
fi
TAG="portfolio:${RELEASE}"
echo "    release ${TAG}; live ${LIVE:-none}"

if [[ "$LIVE" == "$TAG" && "$FORCE" == 0 && "$DRY_RUN" == 0 ]]; then
  echo "==> ${TAG} is already live. Nothing to do (use --force to redeploy)."
  exit 0
fi

# ---------------------------------------------------------------------------------------------
if [[ "$SKIP_CHECKS" == 0 ]]; then
  phase "Checks"
  GATE_DIR="$CONTEXT"
  if [[ "$GATE_DIR" == "$SRC" ]]; then
    # Validate exactly what ships, reusing the local toolchain. Some int specs read the gitignored
    # Docs/ tree or connect to local Mongo through .env, so those are linked in for the checks only.
    for f in node_modules Docs .env; do [[ -e "$f" ]] && ln -s "$ROOT/$f" "$SRC/$f"; done
    for f in next-env.d.ts tsconfig.tsbuildinfo; do [[ -f "$f" ]] && cp "$f" "$SRC/"; done
  fi
  (cd "$GATE_DIR" && pnpm -s lint && npx tsc --noEmit && pnpm -s test:int)
  rm -f "$SRC/node_modules" "$SRC/Docs" "$SRC/.env" "$SRC/next-env.d.ts" "$SRC/tsconfig.tsbuildinfo"
fi

# ---------------------------------------------------------------------------------------------
phase "Build"
# Build-time DB is the Mac's published Mongo (the same content production gets).
printf '%s' "mongodb://host.docker.internal:27020/portfolio-cms" >"$SECRET_DIR/DATABASE_URL"
BUILD_PAYLOAD_SECRET="$(load_env PAYLOAD_SECRET)"
[[ -n "$BUILD_PAYLOAD_SECRET" ]] || BUILD_PAYLOAD_SECRET="$(openssl rand -hex 32)"
printf '%s' "$BUILD_PAYLOAD_SECRET" >"$SECRET_DIR/PAYLOAD_SECRET"

BUILDER=desktop-linux
docker buildx inspect "$BUILDER" >/dev/null 2>&1 || BUILDER=default

rm -rf "$OCI"
docker buildx build \
  --builder "$BUILDER" \
  --platform linux/amd64 \
  --provenance=false \
  --build-arg "NEXT_PUBLIC_SERVER_URL=${PROD_SERVER_URL}" \
  --secret "id=DATABASE_URL,src=${SECRET_DIR}/DATABASE_URL" \
  --secret "id=PAYLOAD_SECRET,src=${SECRET_DIR}/PAYLOAD_SECRET" \
  --add-host=host.docker.internal:host-gateway \
  -t "$TAG" \
  --output "type=oci,dest=${OCI},tar=false" \
  "$CONTEXT"
tar -C "$OCI" -cf - . | docker load -q

# ---------------------------------------------------------------------------------------------
phase "Smoke"
{
  echo "DATABASE_URL=mongodb://host.docker.internal:27020/portfolio-cms"
  echo "PAYLOAD_SECRET=${BUILD_PAYLOAD_SECRET}"
} >"$SECRET_DIR/smoke.env"
docker rm -f "$SMOKE_NAME" >/dev/null 2>&1 || true
docker run -d --name "$SMOKE_NAME" --platform linux/amd64 --memory 900m \
  --add-host=host.docker.internal:host-gateway \
  --env-file "$SECRET_DIR/smoke.env" \
  -p "127.0.0.1:${SMOKE_PORT}:3000" "$TAG" >/dev/null
for _ in $(seq 1 45); do
  curl -sf -o /dev/null "http://127.0.0.1:${SMOKE_PORT}/" && break
  sleep 2
done
SMOKE_FAIL=0
for path in / /fa /work /about /experience /lab /admin; do
  code="$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${SMOKE_PORT}${path}")"
  echo "    ${code} ${path}"
  [[ "$code" =~ ^[23] ]] || SMOKE_FAIL=1
done
if [[ "$SMOKE_FAIL" == 1 ]]; then
  docker logs --tail 60 "$SMOKE_NAME" || true
  echo "Smoke test failed; nothing was sent to the server." >&2
  exit 1
fi
docker rm -f "$SMOKE_NAME" >/dev/null

# ---------------------------------------------------------------------------------------------
phase "Transfer"
# Seed the server's blob store from the live image once, so the first transfer already skips
# every layer production holds (containerd keeps the original compressed blobs).
"${SSH[@]}" "cd '${SERVER_APP_DIR}' && if [ ! -f oci/index.json ] && [ -n \"\$(cat .current-image 2>/dev/null)\" ]; then mkdir -p oci && docker save \"\$(cat .current-image)\" | tar -x -C oci && echo '    seeded server blob store from' \"\$(cat .current-image)\"; fi; mkdir -p oci/blobs/sha256"
# Blobs are content-addressed: an existing name is an identical file. Already gzip-compressed, so no -z.
RSYNC_BLOBS=(rsync -a --ignore-existing --stats -e "$RSYNC_RSH" "$OCI/blobs/sha256/" "${REMOTE}:${SERVER_APP_DIR}/oci/blobs/sha256/")
if [[ "$DRY_RUN" == 1 ]]; then
  "${RSYNC_BLOBS[@]}" --dry-run | grep -E "files transferred|Total file size|Total transferred file size"
  echo "    image: $(du -sh "$OCI" | cut -f1) on disk; dry run, the server was not changed"
  report_timings
  exit 0
fi
"${RSYNC_BLOBS[@]}" | grep -E "files transferred|Total transferred file size|Total sent|Total bytes sent"
rsync -a -e "$RSYNC_RSH" "$OCI/index.json" "$OCI/oci-layout" "${REMOTE}:${SERVER_APP_DIR}/oci/"
CONFIG_CHANGES="$(rsync -ci -e "$RSYNC_RSH" docker-compose.prod.yml Caddyfile "${REMOTE}:${SERVER_APP_DIR}/")"
RELOAD_CADDY=0
if grep -q 'Caddyfile' <<<"$CONFIG_CHANGES"; then RELOAD_CADDY=1; fi
[[ -n "$CONFIG_CHANGES" ]] && echo "    config updated: $(awk '{print $2}' <<<"$CONFIG_CHANGES" | xargs)"

# ---------------------------------------------------------------------------------------------
phase "Activate"
remote "$SERVER_APP_DIR" load "$TAG" "$RELOAD_CADDY"

# ---------------------------------------------------------------------------------------------
phase "Verify"
HOST="${PROD_SERVER_URL#https://}"
HOST="${HOST#http://}"
VERIFY_FAIL=0
for path in / /work /about /experience /lab /admin /fa /fa/work; do
  code="$("${SSH[@]}" "curl -s -o /dev/null -w '%{http_code}' -H 'Host: ${HOST}' -H 'X-Forwarded-Proto: https' http://127.0.0.1:3000${path}")"
  echo "    ${code} ${path}"
  [[ "$code" =~ ^[23] ]] || VERIFY_FAIL=1
done
echo "    public: $(curl -s -o /dev/null -w '%{http_code}' "${PROD_SERVER_URL}/") ${PROD_SERVER_URL}/"
if [[ "$VERIFY_FAIL" == 1 ]]; then
  echo "Route check failed. Roll back with: pnpm deploy:prod --rollback" >&2
  exit 1
fi

report_timings
echo "==> Deployed ${TAG}"
