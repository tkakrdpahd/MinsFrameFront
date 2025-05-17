#!/bin/bash
set -e
set -x

echo "Running Playwright tests..."
pnpm exec playwright test

echo "Running production build..."
pnpm run build

echo "Cleaning Docker system all images, containers..."
docker system prune -a -f

echo "Building Docker images no cache..."
docker-compose -f docker-compose.dev.yml build --no-cache

echo "Starting Docker containers dev..."
docker-compose -f docker-compose.dev.yml -p mins-frame-dev up -d

echo "All done!"
