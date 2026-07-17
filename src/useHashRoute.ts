import { useSyncExternalStore } from 'react'

/**
 * `#/bella/HomeScreen` 형태의 해시를 프로토타입 id(`bella/HomeScreen`)로 읽는다.
 *
 * 라우터 대신 해시를 쓰는 이유: 프로토타입 링크를 그대로 공유할 수 있으면서
 * GitHub Pages처럼 서버 리라이트가 없는 정적 호스팅에서도 새로고침이 깨지지 않는다.
 * 이동은 `<a href="#/...">` 로 하면 되므로 navigate 함수는 두지 않는다.
 */
export function useHashRoute(): string {
  return useSyncExternalStore(subscribe, getRouteId, getServerRouteId)
}

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getRouteId(): string {
  return decodeURIComponent(window.location.hash.replace(/^#\/?/, ''))
}

function getServerRouteId(): string {
  return ''
}
