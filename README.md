# MinsFrame

모던 웹 프론트엔드 개발을 위한 보일러플레이트.  
Next.js 15 + React 19 + TypeScript + Tailwind + i18n + Docker 기반의 **프론트엔드 스타터 키트**입니다.

---

## Features

- **Next.js 15 (App Router, RSC 지원)**
  - 서버 컴포넌트 최적화
  - 자동 코드 스플리팅
  - 이미지 최적화
- **React 19, TypeScript 5**
  - 타입 안정성
  - 최신 React 기능 지원
- **TailwindCSS 4 + Radix UI**
  - 유틸리티 기반 스타일링
  - 접근성 높은 UI 컴포넌트
- **다국어 지원 (i18next, next-i18next)**
  - 한국어, 영어, 일본어 지원
  - 자동 언어 감지
- **Redux Toolkit + React Query**
  - 상태 관리
  - 서버 상태 관리
- **Playwright + Jest 테스트 환경 구성**
  - E2E 테스트
  - 단위 테스트
- **Docker 기반 dev/prod 환경 구성**
  - 개발 환경
  - 프로덕션 환경
- **자동화 스크립트 (`scripts/run.sh`)로 테스트 → 빌드 → 배포까지 실행**

---

## 프로젝트 실행

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm run dev
```

### 3. 빌드

```bash
pnpm run build
```

### 4. 프로덕션 서버 실행

```bash
pnpm run start
```

### 5. E2E 테스트 실행 (Playwright)

```bash
pnpm exec playwright test
```

### 6. 전체 파이프라인 실행 (테스트 + 빌드 + Docker 실행)

```bash
sh scripts/run.sh
```

---

## 테스트

| 종류      | 도구             | 위치                                         | 실행 방법                                    |
| ------- | -------------- | ------------------------------------------ | ----------------------------------------- |
| E2E 테스트 | Playwright     | `tests/`                                   | `pnpm exec playwright test`               |
| 유닛 테스트  | Jest + ts-jest | `*.test.ts(x)` (예: `counterSlice.test.ts`) | `pnpm test`                               |

테스트 리포트는 `playwright-report/index.html`에서 확인 가능합니다.

---

## 국제화 (i18n)

* `src/app/i18n/locales` 경로에 `en`, `ko`, `ja` 언어팩 포함
* `next-i18next`와 `i18next-browser-languagedetector`를 통한 자동 언어 감지 지원
* 언어 전환 기능 구현
* SEO 최적화를 위한 메타데이터 다국어 지원

---

## Docker 사용법

### 개발 환경

```bash
# 개발 환경 빌드
docker-compose -f docker-compose.dev.yml build --no-cache

# 개발 환경 실행
docker-compose -f docker-compose.dev.yml -p mins-frame-dev up -d

# 개발 환경 로그 확인
docker-compose -f docker-compose.dev.yml -p mins-frame-dev logs -f
```

### 프로덕션 환경

```bash
# 프로덕션 환경 빌드
docker-compose -f docker-compose.prod.yml build --no-cache

# 프로덕션 환경 실행
docker-compose -f docker-compose.prod.yml -p mins-frame-prod up -d

# 프로덕션 환경 로그 확인
docker-compose -f docker-compose.prod.yml -p mins-frame-prod logs -f
```

### 정리

```bash
# 모든 컨테이너, 이미지, 볼륨 정리
docker system prune -a -f
```

> 위 명령어는 `run.sh`에 포함되어 있습니다.

---

## 프로젝트 구조

```
src/
├── app/           # App router 및 다국어 페이지
│   ├── [lng]/     # 다국어 라우팅
│   ├── i18n/      # i18n 설정 및 언어팩
│   └── layout.tsx # 루트 레이아웃
├── fsd/           # FSD 기반 도메인 구조
│   ├── app/       # Redux store, slices
│   ├── entities/  # 도메인 엔티티
│   ├── features/  # 기능 모듈
│   ├── shared/    # 공유 유틸리티
│   └── widgets/   # Header, Footer 등 재사용 UI
├── middleware.ts  # Next.js Middleware
└── types/         # TypeScript 타입 정의
```

---

## 기술 스택

* **Framework:** Next.js 15, React 19
* **Lang/Style:** TypeScript, TailwindCSS, PostCSS
* **State:** Redux Toolkit, TanStack Query
* **i18n:** i18next, next-i18next
* **Test:** Playwright, Jest
* **Infra:** Docker, Docker Compose, Jenkins (Jenkinsfile 포함)

---

## 라이선스

MIT License
