# run.sh
docker-compose -f docker-compose.dev.yml build --no-cache
docker-compose -f docker-compose.dev.yml -p my-app up -d