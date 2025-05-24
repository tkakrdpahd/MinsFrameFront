#!/bin/bash
set -e
set -x

# 프로젝트 루트 디렉토리 기준 경로 확보
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# .env 로드 (MODE, PORT_NUMBER 등 환경 변수 가져오기)
export $(grep -v '^#' "$ROOT_DIR/.env" | xargs)

# Compose 파일 경로 확인
COMPOSE_FILE="$ROOT_DIR/docker/docker-compose.${MODE}.yml"
if [ ! -f "$COMPOSE_FILE" ]; then
  echo "Compose file not found: $COMPOSE_FILE"
  exit 1
fi

echo "Building Docker images..."
docker-compose -f "$COMPOSE_FILE" build

echo "Starting Docker containers..."
docker-compose -f "$COMPOSE_FILE" up -d

echo "Access Test: http://localhost:${PORT_NUMBER}"

MAX_RETRIES=5
RETRY_INTERVAL=5

for ((i=1; i<=MAX_RETRIES; i++)); do
  if curl --fail --silent --show-error "http://localhost:${PORT_NUMBER}" > /dev/null; then
    echo "Service is responding on port ${PORT_NUMBER}"
    break
  fi

  if [ "$i" -lt "$MAX_RETRIES" ]; then
    echo "Service not ready (attempt $i). Retrying in ${RETRY_INTERVAL} seconds..."
    sleep ${RETRY_INTERVAL}
  else
    echo "Service failed to respond after ${MAX_RETRIES} attempts"
    exit 1
  fi
done

echo "All done!"
