import type { ReactNode } from 'react'
import { StatusBar, STATUS_BAR_HEIGHT } from './StatusBar'

/** iPhone 15/16 Pro 논리 해상도(pt). 모든 화면은 이 크기를 기준으로 그린다. */
export const SCREEN_WIDTH = 393
export const SCREEN_HEIGHT = 852

/** 화면 모서리를 감싸는 알루미늄 테두리 두께 */
const BEZEL = 12
const SCREEN_RADIUS = 56

type PhoneFrameProps = {
  children: ReactNode
  statusBarVariant?: 'dark' | 'light'
  /** 상태바 아래에서 콘텐츠를 시작할지 여부. false면 콘텐츠가 상태바 밑으로 흐른다. */
  insetTop?: boolean
  /** 홈 인디케이터 색상 */
  homeIndicator?: 'dark' | 'light' | 'none'
  className?: string
}

export function PhoneFrame({
  children,
  statusBarVariant = 'dark',
  insetTop = false,
  homeIndicator = 'dark',
  className = '',
}: PhoneFrameProps) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        width: SCREEN_WIDTH + BEZEL * 2,
        height: SCREEN_HEIGHT + BEZEL * 2,
      }}
    >
      {/* 바디: 티타늄 프레임 */}
      <div
        className="absolute inset-0 rounded-[68px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08)]"
        style={{
          padding: BEZEL,
          background:
            'linear-gradient(160deg,#5b5b60 0%,#2b2b2f 18%,#1b1b1e 50%,#3a3a3f 82%,#6a6a70 100%)',
        }}
      >
        {/* 스크린 */}
        <div
          className="relative overflow-hidden bg-white"
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            borderRadius: SCREEN_RADIUS,
          }}
        >
          <StatusBar variant={statusBarVariant} />

          <div
            className="h-full w-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ paddingTop: insetTop ? STATUS_BAR_HEIGHT : 0 }}
          >
            {children}
          </div>

          {/* 다이내믹 아일랜드 */}
          <div
            className="absolute left-1/2 top-[11px] z-30 -translate-x-1/2 rounded-full bg-black"
            style={{ width: 125, height: 36 }}
          />

          {/* 홈 인디케이터 */}
          {homeIndicator !== 'none' && (
            <div
              className={`absolute bottom-[8px] left-1/2 z-30 h-[5px] w-[139px] -translate-x-1/2 rounded-full ${
                homeIndicator === 'dark' ? 'bg-black/85' : 'bg-white/85'
              }`}
            />
          )}
        </div>
      </div>

      {/* 측면 버튼 */}
      <div className="absolute -left-[3px] top-[118px] h-[32px] w-[3px] rounded-l-sm bg-[#4a4a50]" />
      <div className="absolute -left-[3px] top-[178px] h-[62px] w-[3px] rounded-l-sm bg-[#4a4a50]" />
      <div className="absolute -left-[3px] top-[254px] h-[62px] w-[3px] rounded-l-sm bg-[#4a4a50]" />
      <div className="absolute -right-[3px] top-[212px] h-[100px] w-[3px] rounded-r-sm bg-[#4a4a50]" />
    </div>
  )
}
