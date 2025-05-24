# ----- Base Stage -----
FROM rockylinux/rockylinux:9 AS base

# 시스템 업데이트 및 필요한 패키지 설치
RUN dnf update -y \
    && dnf install -y --allowerasing epel-release curl bash

# nvm 및 Node.js 버전 설정
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=22

# nvm 설치 및 Node.js 설치
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION

# 환경 변수에 Node.js 경로 추가
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# pnpm 전역 설치
RUN . $NVM_DIR/nvm.sh && npm install -g pnpm

# 작업 디렉토리 설정
WORKDIR /app

# ----- Dependencies Stage -----
FROM base AS deps

# package.json 만 복사하여 의존성 설치 (캐시 최적화)
COPY package*.json ./
RUN . $NVM_DIR/nvm.sh && pnpm install

# ----- Build Stage -----
FROM deps AS build

# 소스 전체 복사 및 프로덕션 빌드
COPY . .
RUN . $NVM_DIR/nvm.sh && pnpm run build

# ----- Test Stage -----
FROM build AS test

# .env 파일이 필요하다면 복사
COPY .env .env

# Jest & Playwright 테스트 실행
RUN set -ex \
    && echo "Running Jest tests..." \
    && . $NVM_DIR/nvm.sh && pnpm exec jest \
    && echo "Running Playwright tests..." \
    && . $NVM_DIR/nvm.sh && pnpm exec playwright test \
    && echo "Cleaning up test artifacts..." \
    && rm -rf playwright-report test-results

# ----- Final Stage -----
FROM base AS final

# 빌드 결과물 복사
COPY --from=build /app .

# 빌드 인수 MODE 환경 변수로 설정
ARG MODE=production
ENV MODE=${MODE}

# 포트 노출 (Next.js 기본 3000)
EXPOSE 3000

# 개발/프로덕션 모드에 따라 커맨드 분기
CMD ["sh", "-c", "\
    if [ \"$MODE\" = \"development\" ]; then \
    . $NVM_DIR/nvm.sh && npm run dev; \
    else \
    . $NVM_DIR/nvm.sh && npm run start; \
    fi"]
