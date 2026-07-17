type StatusBarProps = {
  /** 상태바 아이콘/텍스트 색상. 어두운 화면 위에서는 "light"를 쓴다. */
  variant?: 'dark' | 'light'
  time?: string
}

/** iPhone 14 Pro 이후 기준 상태바 높이(pt). 다이내믹 아일랜드 영역을 포함한다. */
export const STATUS_BAR_HEIGHT = 54

export function StatusBar({ variant = 'dark', time = '9:41' }: StatusBarProps) {
  const tint = variant === 'dark' ? 'text-black' : 'text-white'
  const fill = variant === 'dark' ? 'currentColor' : 'currentColor'

  return (
    <div
      className={`absolute inset-x-0 top-0 z-20 flex items-end justify-between px-[27px] pb-[9px] ${tint}`}
      style={{ height: STATUS_BAR_HEIGHT }}
    >
      <span className="w-[54px] text-center text-[17px] font-semibold leading-[22px] tracking-[0.2px]">
        {time}
      </span>

      <div className="flex items-center gap-[7px]">
        {/* 신호 */}
        <svg width="19" height="12" viewBox="0 0 19 12" fill="none" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={i * 4.9}
              y={9 - i * 2.7}
              width="3"
              height={3 + i * 2.7}
              rx="1"
              fill={fill}
            />
          ))}
        </svg>

        {/* Wi-Fi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden>
          <path
            d="M8.5 11.2 6.2 8.6a3.6 3.6 0 0 1 4.6 0L8.5 11.2Zm4.4-4.9a7.1 7.1 0 0 0-8.8 0L2.3 4.2a10.1 10.1 0 0 1 12.4 0l-1.8 2.1Z"
            fill={fill}
          />
          <path
            d="M16.2 2.6a12.6 12.6 0 0 0-15.4 0"
            stroke={fill}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>

        {/* 배터리 */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden>
          <rect
            x="0.6"
            y="0.6"
            width="23"
            height="11.8"
            rx="3.8"
            stroke={fill}
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
          <rect x="2.4" y="2.4" width="19.4" height="8.2" rx="2.2" fill={fill} />
          <path
            d="M25.2 4.4v4.2a2.4 2.4 0 0 0 0-4.2Z"
            fill={fill}
            fillOpacity="0.45"
          />
        </svg>
      </div>
    </div>
  )
}
