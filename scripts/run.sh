#!/bin/bash
set -e
set -x

# 프로젝트 루트 디렉토리 기준 경로 확보
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# .env 로드
export $(grep -v '^#' "$ROOT_DIR/.env" | xargs)

echo "Running Playwright tests..."
pnpm exec playwright test

echo "Playwright Test completed. Cleaning up test artifacts..."
rm -rf playwright-report test-results

echo "Running production build..."
pnpm run build

echo "Build completed. Cleaning up build artifacts..."
rm -rf .next

echo "Cleaning Docker system all images, containers..."
docker system prune -a -f

# Compose 파일 경로 확인
COMPOSE_FILE="$ROOT_DIR/docker/docker-compose.$MODE.yml"
if [ ! -f "$COMPOSE_FILE" ]; then
  echo "Compose file not found: $COMPOSE_FILE"
  exit 1
fi

echo "Building Docker images (no cache)..."
docker-compose -f "$COMPOSE_FILE" build --no-cache

echo "Starting Docker containers..."
docker-compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME-$MODE" up -d

echo "Access Test: http://localhost:$PORT_NUMBER"

MAX_RETRIES=5
RETRY_INTERVAL=5

for ((i=1; i<=MAX_RETRIES; i++)); do
  if curl --fail --silent --show-error "http://localhost:$PORT_NUMBER" > /dev/null; then
    echo "Service is responding on port $PORT_NUMBER"
    break
  fi

  if [ "$i" -lt "$MAX_RETRIES" ]; then
    echo "Service not ready (attempt $i). Retrying in $RETRY_INTERVAL seconds..."
    sleep $RETRY_INTERVAL
  else
    echo "Service failed to respond after $MAX_RETRIES attempts"
    exit 1
  fi
done

echo "All done!"
