#!/usr/bin/env sh
set -eu

APP_PORT="${APP_PORT:-3000}"
IMAGE_NAME="${IMAGE_NAME:-smartnest}"
CONTAINER_NAME="${CONTAINER_NAME:-smartnest-container}"
TAG="${TAG:-local-smoke}"

echo "[1/5] Install dependencies"
npm ci || npm install

echo "[2/5] Build"
npm run build

echo "[3/5] Test (lint)"
npm test

echo "[4/5] Package (docker build)"
docker build -t "${IMAGE_NAME}:${TAG}" .

echo "[5/5] Deploy (docker run)"
if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}$"; then
  docker rm -f "${CONTAINER_NAME}" >/dev/null
fi
docker run -d --name "${CONTAINER_NAME}" -p "${APP_PORT}:80" "${IMAGE_NAME}:${TAG}" >/dev/null

echo "Smoke pipeline finished. App should be available on http://localhost:${APP_PORT}"
