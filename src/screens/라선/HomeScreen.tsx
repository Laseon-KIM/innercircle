import type { PrototypeMeta } from '../../prototypes'

export const meta: PrototypeMeta = {
  title: '홈',
}

/**
 * Figma에서 가져온 화면을 이 자리에 채워 넣는다.
 * 프레임(393×852)은 PhoneFrame이 잡아주므로 여기서는 콘텐츠만 그린다.
 */
export default function HomeScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-slate-50 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-900 text-xl font-semibold text-white">
        ic
      </div>
      <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">
        화면 준비 완료
      </h1>
      <p className="text-[15px] leading-relaxed text-slate-500">
        Figma 디자인을 연결하면
        <br />
        이 영역에 화면이 그려집니다.
      </p>
    </div>
  )
}
