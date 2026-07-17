import type { ComponentType } from 'react'

/**
 * 프로토타입 레지스트리.
 *
 * `src/screens/<사람>/<프로토타입>.tsx` 를 자동으로 수집한다.
 * 폴더 = 사람, 파일 = 프로토타입. 파일을 추가하면 사이드바에 바로 나타나므로
 * 이 파일을 손댈 필요는 없다.
 *
 * 각 프로토타입 파일의 규칙:
 *   - 화면 컴포넌트를 `export default` 한다.
 *   - 선택적으로 `export const meta: PrototypeMeta` 로 표시 이름과 프레임 옵션을 준다.
 *   - `_` 로 시작하는 파일은 화면이 아닌 부품으로 보고 수집하지 않는다.
 */

export type PrototypeMeta = {
  /** 사이드바에 표시할 이름. 없으면 파일명을 쓴다. */
  title?: string
  /** PhoneFrame 표현 옵션. 화면별로 상태바/홈 인디케이터를 조절할 때 쓴다. */
  frame?: {
    statusBarVariant?: 'dark' | 'light'
    insetTop?: boolean
    homeIndicator?: 'dark' | 'light' | 'none'
  }
}

type PrototypeModule = {
  default?: ComponentType
  meta?: PrototypeMeta
}

export type Prototype = {
  /** `bella/HomeScreen` — 해시 라우트(`#/bella/HomeScreen`)와 같은 값이다. */
  id: string
  owner: string
  title: string
  Component: ComponentType
  meta: PrototypeMeta
}

export type Folder = {
  owner: string
  prototypes: Prototype[]
}

const modules = import.meta.glob<PrototypeModule>('./screens/*/*.tsx', {
  eager: true,
})

const FILE_PATH = /^\.\/screens\/([^/]+)\/([^/]+)\.tsx$/

export const folders: Folder[] = buildFolders()

function buildFolders(): Folder[] {
  const byOwner = new Map<string, Prototype[]>()

  for (const [path, mod] of Object.entries(modules)) {
    const match = FILE_PATH.exec(path)
    if (!match) continue

    const [, owner, file] = match
    if (file.startsWith('_')) continue
    if (!mod.default) {
      console.warn(`[prototypes] ${path}: export default 가 없어 건너뜁니다.`)
      continue
    }

    const prototype: Prototype = {
      id: `${owner}/${file}`,
      owner,
      title: mod.meta?.title ?? file,
      Component: mod.default,
      meta: mod.meta ?? {},
    }

    const siblings = byOwner.get(owner)
    if (siblings) siblings.push(prototype)
    else byOwner.set(owner, [prototype])
  }

  return [...byOwner]
    .map(([owner, prototypes]) => ({
      owner,
      prototypes: prototypes.sort((a, b) => compareNames(a.title, b.title)),
    }))
    .sort((a, b) => compareNames(a.owner, b.owner))
}

/**
 * 로케일을 'en'으로 고정한다. 인자 없는 localeCompare는 실행 환경의 로케일을 따르므로
 * ko-KR 맥에서는 한글이, en-US 맥이나 CI에서는 영문이 먼저 온다 — 사람마다 사이드바
 * 순서가 달라진다는 뜻이다. 'en'이면 영문 폴더가 먼저, 한글 폴더끼리는 가나다순이 된다.
 */
function compareNames(a: string, b: string): number {
  return a.localeCompare(b, 'en')
}

export const allPrototypes: Prototype[] = folders.flatMap((f) => f.prototypes)

export function findPrototype(id: string): Prototype | undefined {
  return allPrototypes.find((p) => p.id === id)
}
