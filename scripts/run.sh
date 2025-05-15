# run.sh
# pnpm 빌드 테스트
pnpm run build
# docker 시스템 초기화 (캐시 충돌 방지) - 자동으로 y 입력
docker system prune -a -f
# docker 빌드
docker-compose -f docker-compose.dev.yml build --no-cache
# docker 실행
docker-compose -f docker-compose.dev.yml -p mins-frame-dev up -d