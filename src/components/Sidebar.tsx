import { useState } from 'react'
import { folders, allPrototypes } from '../prototypes'

type SidebarProps = {
  /** 현재 열려 있는 프로토타입 id. 없으면 아무것도 선택되지 않은 상태다. */
  activeId: string | null
}

export function Sidebar({ activeId }: SidebarProps) {
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(new Set())

  function toggle(owner: string) {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(owner)) next.delete(owner)
      else next.add(owner)
      return next
    })
  }

  return (
    <aside className="sticky top-0 flex h-screen w-[240px] shrink-0 flex-col border-r border-white/10 bg-[#121217]">
      <header className="border-b border-white/10 px-4 py-4">
        <h1 className="text-[15px] font-semibold tracking-tight text-white">
          innercircle
        </h1>
        <p className="mt-0.5 text-[12px] text-white/40">
          프로토타입 {allPrototypes.length}개 · {folders.length}명
        </p>
      </header>

      <nav className="flex-1 overflow-y-auto p-2">
        {folders.map((folder) => {
          const isCollapsed = collapsed.has(folder.owner)

          return (
            <section key={folder.owner} className="mb-1">
              <button
                type="button"
                onClick={() => toggle(folder.owner)}
                aria-expanded={!isCollapsed}
                className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Chevron open={!isCollapsed} />
                <span className="flex-1 truncate">{folder.owner}</span>
                <span className="text-[11px] tabular-nums text-white/30">
                  {folder.prototypes.length}
                </span>
              </button>

              {!isCollapsed && (
                <ul className="mt-0.5 ml-[13px] border-l border-white/10 pl-2">
                  {folder.prototypes.map((prototype) => {
                    const isActive = prototype.id === activeId

                    return (
                      <li key={prototype.id}>
                        <a
                          href={`#/${prototype.id}`}
                          aria-current={isActive ? 'page' : undefined}
                          className={`block truncate rounded-md px-2 py-1.5 text-[13px] transition-colors ${
                            isActive
                              ? 'bg-white/10 font-medium text-white'
                              : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                          }`}
                        >
                          {prototype.title}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          )
        })}
      </nav>

      <footer className="border-t border-white/10 px-4 py-3">
        <p className="text-[11px] leading-relaxed text-white/30">
          폴더를 추가하려면
          <br />
          <code className="text-white/50">src/screens/이름/화면.tsx</code>
        </p>
      </footer>
    </aside>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
    >
      <path
        d="M3.5 2 6.5 5 3.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
