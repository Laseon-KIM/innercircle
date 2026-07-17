# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev      # 개발 서버 → http://localhost:5173/innercircle/ (base 경로 포함 주의)
npm run build    # tsc -b && vite build — 타입체크가 빌드에 포함됨
npm run lint     # eslint .
npm run preview  # dist/ 결과 로컬 확인
```

- **타입체크 전용 스크립트는 없다.** 타입 검증은 `npm run build`로 한다.
- **테스트 러너가 설정되어 있지 않다.** 테스트 프레임워크 없이 변경을 검증하려면 `npm run dev`로 화면을 직접 확인한다.
- Node 20 이상 필요 (CI는 22 사용).

## 아키텍처

이 프로젝트는 **iPhone 목업 셸**이다. Figma 디자인을 실제 기기 크기의 프레임 안에 그려 넣는 것이 목적이다.

렌더 체인: `main.tsx` → `App.tsx` → `PhoneFrame` → `screens/*`

핵심 규칙은 **프레임과 화면의 분리**다:

- `PhoneFrame`(`src/components/PhoneFrame.tsx`)이 기기 크롬(티타늄 바디, 다이내믹 아일랜드, 홈 인디케이터, 측면 버튼), 고정 뷰포트, 스크롤 컨테이너를 모두 소유한다.
- `src/screens/*`는 **콘텐츠만** 그린다. 자체 프레임이나 상태바를 그리지 말 것. 화면은 뷰포트를 채우는 콘텐츠(`h-full`)로 작성한다.

### 좌표계

`SCREEN_WIDTH = 393`, `SCREEN_HEIGHT = 852` (PhoneFrame.tsx에서 export)이 뷰포트의 단일 출처다. iPhone 15/16 Pro 논리 해상도(pt)이며, Figma의 pt 값과 1:1로 대응한다. 그래서 화면 코드는 Tailwind 스케일 대신 **임의값**(`text-[17px]`, `px-[27px]`)을 의도적으로 쓴다 — 디자인 스펙을 그대로 옮기기 위함이다.

`STATUS_BAR_HEIGHT`(54)는 `StatusBar.tsx`에서 export되어 `PhoneFrame`이 콘텐츠 `paddingTop`으로 소비한다. 두 파일이 이 값으로 결합되어 있으므로 한쪽만 바꾸면 레이아웃이 어긋난다.

`PhoneFrame` props로 화면별 표현을 조절한다: `statusBarVariant`(어두운 배경 위에서는 `'light'`), `insetTop={false}`(콘텐츠를 상태바 밑으로 흘림), `homeIndicator`.

z-index 레이어: 콘텐츠 → 상태바(z-20) → 다이내믹 아일랜드·홈 인디케이터(z-30).

### 화면 추가

`src/screens/`에 컴포넌트를 만들고 `App.tsx`의 `PhoneFrame` 자식으로 넣는다. **라우터가 설치되어 있지 않다** — 현재는 `App.tsx`를 편집해 화면을 교체하는 구조다. 다중 화면 내비게이션이 필요하면 그 결정부터 해야 한다.

## 제약 사항

- **Tailwind v4**: `tailwind.config.js`가 없다. `@tailwindcss/vite` 플러그인 + `src/index.css`의 `@import "tailwindcss"`로 설정된다. 테마 커스터마이즈는 `index.css`의 `@theme` 블록에서 한다.
- **`verbatimModuleSyntax` + `erasableSyntaxOnly`**: 타입 전용 import는 반드시 `import type`으로 쓴다. enum, namespace, 파라미터 프로퍼티는 사용 불가.
- **`noUnusedLocals` / `noUnusedParameters`**: 미사용 변수는 린트 경고가 아니라 **빌드 실패**다.
- **`base: '/innercircle/'`** (`vite.config.ts`)는 GitHub Pages 저장소 이름과 결합되어 있다. 저장소 이름이 바뀌면 이 값도 바꿔야 하고, 개발 서버 URL에도 이 경로가 붙는다.

## 배포

`main`은 배포 브랜치다. push/merge되면 `.github/workflows/deploy.yml`이 GitHub Pages(https://laseon-kim.github.io/innercircle/)로 자동 배포한다. 작업은 별도 브랜치에서 하고 PR로 병합한다.
