# ----- Base Stage -----
FROM rockylinux/rockylinux:9 AS base

# 시스템 업데이트 및 필요한 패키지 설치
RUN dnf update -y && dnf install -y --allowerasing epel-release curl bash

# nvm 및 Node.js 버전 설정
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=22

# nvm 설치
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# nvm을 로드하여 지정된 Node.js 버전 설치 및 기본 버전으로 설정
RUN . $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION

# 환경 변수에 Node.js 경로 추가
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Install pnpm
RUN . $NVM_DIR/nvm.sh && npm install -g pnpm && npm install heroui-cli -g

# 작업 디렉토리 설정
WORKDIR /app

# .env 파일 복사 (필요한 경우)
COPY .env .env

# ----- Build Stage -----
FROM base AS build

# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
# COPY .npmrc ./
RUN . $NVM_DIR/nvm.sh && pnpm install

# 소스 코드 복사 및 빌드 수행 (프로덕션 빌드)
COPY . .
RUN . $NVM_DIR/nvm.sh && pnpm run build

# ----- Final Stage -----
FROM base

# 빌드 결과물 복사
COPY --from=build /app .

# 포트 노출 (Next.js 기본 포트 3000)
EXPOSE 3000

# 빌드 인수 MODE를 환경 변수로 설정하여 런타임에도 전달 (빌드 인수는 최종 이미지에 남지 않으므로)
ARG MODE=production
ENV MODE=${MODE}

# 개발 모드면 npm run dev, 아니면 프로덕션 모드면 npm run start를 실행
CMD [ "sh", "-c", "if [ \"$MODE\" = \"development\" ]; then . $NVM_DIR/nvm.sh && npm run dev; else . $NVM_DIR/nvm.sh && npm run start; fi" ]