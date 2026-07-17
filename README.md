# innercircle

Vite + React + TypeScript + Tailwind CSS 로 만든 웹 프로젝트. GitHub Pages로 배포됩니다.

**배포 URL:** https://laseon-kim.github.io/innercircle/

## 요구 사항

- Node.js 20 이상 (권장: 22)

## 시작하기

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 (http://localhost:5173/innercircle/)
npm run build    # 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 로컬 미리보기
npm run lint     # ESLint 검사
```

## 협업 규칙

- `main` 브랜치는 배포용입니다. 작업은 별도 브랜치를 만들어 진행하고 PR로 병합하세요.
- `main`에 push/merge되면 GitHub Actions가 자동으로 GitHub Pages에 배포합니다
  (`.github/workflows/deploy.yml`).

## 배포 설정 (최초 1회)

GitHub 저장소에서 아래 설정이 필요합니다:

1. **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 변경
2. 이후 `main`에 push하면 자동 배포됩니다.

> Vite `base`는 `/innercircle/`로 설정되어 있습니다 (`vite.config.ts`).
> 저장소 이름을 바꾸면 이 값도 함께 변경해야 합니다.

## 기술 스택

| 항목 | 사용 기술 |
| --- | --- |
| 빌드 도구 | Vite |
| 프레임워크 | React 19 |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS v4 |
| 배포 | GitHub Pages (GitHub Actions) |
