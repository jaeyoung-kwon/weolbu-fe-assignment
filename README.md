# 월급쟁이부자들 FE 과제

> 모바일 웹 기반 강의 플랫폼 (회원가입, 강의 등록, 강의 조회/수강 신청)

## 🎯 핵심 포인트

### ✅ 타입 안전성과 가드 중심 설계

- TypeScript `strict` 모드 활성화
- TanStack Router 파일 라우팅 + `AuthGuard`/`RoleGuard`로 권한 제어
- API 요청/응답 타입 정의 (`src/shared/apis`)
- mutation 훅은 관심사 분리를 위해 커스텀 훅으로 분리하고, query는 query factory로 관리

### ✅ 사용자 흐름에 맞춘 화면 구성

- 회원가입/로그인 → 강의 목록 → 강의 상세/등록
- 강의 목록: 정렬 3종 + 무한 스크롤 + 다중 선택 수강 신청
- 강의 등록: 강사 전용 접근
- 페이지 컴포넌트는 전체 레이아웃을 한눈에 볼 수 있도록 구성

---

## 📋 프로젝트 개요

모바일 웹 기준의 강의 플랫폼으로, 회원 가입과 강의 등록/조회/수강 신청 흐름을 구현했습니다.

### 주요 기능

- **회원 가입/로그인** - 실시간 입력 파서/검증 + 가입 후 목록 이동
- **강의 등록** - 강사 전용 폼 + 입력값 검증
- **강의 목록** - 무한 스크롤 + 정렬 (최근/신청자/신청률)
- **수강 신청** - 다중 선택 후 Batch API로 신청
- **강의 상세** - 개별 강의 정보 조회

---

## 🧩 구현 하이라이트

### 1. 무한 스크롤 훅

`IntersectionObserver` 기반으로 안전한 연속 호출을 방지합니다.

```ts
const { observerRef } = useInfiniteScroll({
  enabled: hasNextPage && !isFetchingNextPage,
  onReachEnd: () => fetchNextPage(),
});
```

### 2. 배치 수강 신청 + 결과 피드백

Batch API 응답을 성공/실패로 분리해 사용자에게 상세 메시지를 제공합니다.

```ts
const { mutate: enrollCourses } = useEnrollCourseMutation();
enrollCourses({ courseIds: selectedCourseIds });
```

### 3. 공통 Fetcher + 에러 표준화

`fetcher`가 인증 헤더와 에러 파싱을 책임집니다.

```ts
export const fetcher = {
  get: async <TResponse>({ path, query }: FetcherOptions<never>) =>
    request<never, TResponse>({ path, query, method: 'GET' }),
};
```

---

## 📁 프로젝트 구조

```
src/
├── routes/                    # TanStack Router 파일 라우트
│   ├── __root.tsx
│   ├── _public.tsx
│   ├── _protected.tsx
│   └── _protected/_instructor.tsx
│
├── pages/                     # 화면 단위 구성
│   ├── home/                  # 강의 목록 + 신청
│   ├── signup/                # 회원가입/로그인
│   ├── course-create/         # 강의 등록
│   └── course-detail/         # 강의 상세
│
├── shared/
│   ├── apis/                  # API 타입/요청
│   ├── components/            # 공통 UI 컴포넌트
│   ├── contexts/              # AuthContext/Provider
│   ├── hooks/                 # useScrollLock, useClickOutsideRef 등
│   └── utils/                 # format, localStorage 유틸
│
├── lib/                       # fetcher, react-query 설정
├── styles/                    # theme, global styles
├── main.tsx
└── routeTree.gen.ts           # TanStack Router 생성 파일 (수정 금지)
```

---

## 🛠 기술 스택

### Core

- React 19
- Vite 7
- TypeScript

### State / Routing / Styling

- TanStack Query v5
- TanStack Router
- Emotion (Theme + Styled)

### Testing & Quality

- Vitest
- Testing Library
- ESLint / Stylelint / Prettier

---

## 🚀 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 테스트 실행
pnpm test

# 린트
pnpm lint
pnpm stylelint

# 자동 수정
pnpm lint:fix
pnpm stylelint:fix
```

### 환경 설정

- API Base URL: `http://localhost:8080/api`
- 수정 위치: `src/lib/fetcher/fetcher.ts`

---

## ✅ 테스트 현황

### 테스트 파일

공통 훅, 유틸 함수, 그리고 필요한 폼 관련 훅까지 테스트 코드를 작성해 핵심 로직을 안정적으로 검증했습니다.

- `src/pages/course-create/useCourseForm.test.ts`
- `src/pages/signup/hooks/useSignupForm.test.ts`
- `src/pages/signup/hooks/useLoginForm.test.ts`
- `src/shared/hooks/useClickOutsideRef.test.tsx`
- `src/shared/hooks/useScrollLock.test.tsx`
- `src/shared/hooks/useLocalStorageState.test.tsx`
- `src/shared/utils/format.test.ts`
- `src/shared/utils/localStorage.test.ts`
- `src/pages/signup/utils/validator.test.ts`
- `src/pages/signup/utils/parser.test.ts`
- `src/pages/course-create/utils/validator.test.ts`
- `src/pages/course-create/utils/parser.test.ts`

---

## 🔐 API 연동

| Method | Endpoint                 | 설명                     |
| ------ | ------------------------ | ------------------------ |
| POST   | `/api/users/signup`      | 회원가입                 |
| POST   | `/api/users/login`       | 로그인                   |
| GET    | `/api/courses`           | 강의 목록 (페이지네이션) |
| GET    | `/api/courses/:id`       | 강의 상세                |
| POST   | `/api/courses`           | 강의 등록                |
| POST   | `/api/enrollments/batch` | 다중 수강 신청           |

---

## 📚 참고 문서

- [REQUIREMENTS.md](./docs/REQUIREMENTS.md)
