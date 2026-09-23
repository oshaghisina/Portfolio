#!/usr/bin/env bash
# Build an amd64 image locally, stream it to the production server, and restart the stack.
# Usage: ./scripts/deploy.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

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
PROD_DATABASE_URL="$(load_env PROD_DATABASE_URL)"
PROD_PAYLOAD_SECRET="$(load_env PROD_PAYLOAD_SECRET)"
PROD_CRON_SECRET="$(load_env PROD_CRON_SECRET)"
PROD_PREVIEW_SECRET="$(load_env PROD_PREVIEW_SECRET)"
MONGO_ROOT_USER="$(load_env PROD_MONGO_ROOT_USER)"
MONGO_ROOT_PASSWORD="$(load_env PROD_MONGO_ROOT_PASSWORD)"

: "${SERVER_HOST:?}"
: "${SERVER_USER:?}"
: "${SERVER_APP_DIR:?}"
: "${PROD_SERVER_URL:?}"
: "${PROD_PAYLOAD_SECRET:?}"
: "${PROD_DATABASE_URL:?}"
: "${MONGO_ROOT_USER:?}"
: "${MONGO_ROOT_PASSWORD:?}"

SSH=(ssh -o BatchMode=yes -p "${SERVER_PORT:-22}" "${SERVER_USER}@${SERVER_HOST}")
SHA="$(git rev-parse --short HEAD)"
IMAGE_TAG="portfolio:${SHA}"
IMAGE_PREV_FILE="${SERVER_APP_DIR}/.previous-image"

echo "==> Building ${IMAGE_TAG} (linux/amd64) against local Mongo via host.docker.internal:27020"

# Build-time DB points at the Mac's published Mongo (same content as production will get)
BUILD_DATABASE_URL="mongodb://host.docker.internal:27020/portfolio-cms"

# Write secrets to temp files for buildx (not baked into layers)
SECRET_DIR="$(mktemp -d)"
trap 'rm -rf "$SECRET_DIR"' EXIT
printf '%s' "$BUILD_DATABASE_URL" >"$SECRET_DIR/DATABASE_URL"
# Use local PAYLOAD_SECRET for build if set, else a disposable build-only secret
BUILD_PAYLOAD_SECRET="$(load_env PAYLOAD_SECRET)"
if [[ -z "$BUILD_PAYLOAD_SECRET" ]]; then
  BUILD_PAYLOAD_SECRET="$(openssl rand -hex 32)"
fi
printf '%s' "$BUILD_PAYLOAD_SECRET" >"$SECRET_DIR/PAYLOAD_SECRET"

docker buildx use desktop-linux 2>/dev/null || docker buildx use default

docker buildx build \
  --platform linux/amd64 \
  --load \
  --build-arg "NEXT_PUBLIC_SERVER_URL=${PROD_SERVER_URL}" \
  --secret "id=DATABASE_URL,src=${SECRET_DIR}/DATABASE_URL" \
  --secret "id=PAYLOAD_SECRET,src=${SECRET_DIR}/PAYLOAD_SECRET" \
  --add-host=host.docker.internal:host-gateway \
  -t "$IMAGE_TAG" \
  -t portfolio:latest \
  .

echo "==> Streaming image to ${SERVER_HOST}"
docker save "$IMAGE_TAG" | gzip | "${SSH[@]}" "gunzip | docker load"
"${SSH[@]}" "docker tag ${IMAGE_TAG} portfolio:latest"

echo "==> Syncing compose + Caddyfile"
scp -P "${SERVER_PORT:-22}" \
  docker-compose.prod.yml Caddyfile \
  "${SERVER_USER}@${SERVER_HOST}:${SERVER_APP_DIR}/"

# Remember previous tag for rollback (best-effort)
"${SSH[@]}" "bash -s" <<REMOTE
set -euo pipefail
cd "${SERVER_APP_DIR}"
if [[ -f .current-image ]]; then
  cp .current-image .previous-image
fi
echo "${IMAGE_TAG}" > .current-image
export PORTFOLIO_IMAGE="${IMAGE_TAG}"
export MONGO_ROOT_USER="${MONGO_ROOT_USER}"
export MONGO_ROOT_PASSWORD="${MONGO_ROOT_PASSWORD}"
docker compose -f docker-compose.prod.yml up -d app caddy
docker compose -f docker-compose.prod.yml ps
echo "==> Waiting for app health on :3000"
for i in \$(seq 1 60); do
  if curl -sf -o /dev/null http://127.0.0.1:3000/; then
    echo "APP_HEALTHY"
    exit 0
  fi
  sleep 2
done
echo "APP_NOT_HEALTHY_YET" >&2
docker compose -f docker-compose.prod.yml logs --tail=80 app || true
exit 1
REMOTE

echo "==> Deploy of ${IMAGE_TAG} complete"
