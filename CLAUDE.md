# 브라더스 아카데미

## 스택
- Frontend: Next.js 14 + Tailwind CSS
- DB: Supabase (PostgreSQL)
- Deploy: Vercel (GitHub 자동배포)
- Auth: Supabase Auth
- 모델: claude-opus-4-6

## 코딩 규칙
- TypeScript 사용 필수
- 주석은 한국어로 작성
- 커밋 전 lint 실행
- .env.local 파일 절대 커밋 금지
- DB 변경 시 migration 파일 생성

## MCP 서버
- github: 커밋, 브랜치, PR 생성
- supabase: DB 테이블 조작, 쿼리

## 폴더 구조
src/app/        → Next.js 페이지
src/components/ → UI 컴포넌트
src/lib/        → Supabase 연결
supabase/       → DB 마이그레이션

## 개발 규칙
- 기능 단위로 브랜치 생성
- 커밋 메시지는 한국어로
- 에러 처리 항상 포함
- 컴포넌트는 재사용 가능하게 작성