import { PhoneFrame } from './components/PhoneFrame'
import { Sidebar } from './components/Sidebar'
import { folders, findPrototype } from './prototypes'
import { useHashRoute } from './useHashRoute'

function App() {
  const route = useHashRoute()
  // 해시가 없거나 가리키는 화면이 사라졌으면 첫 프로토타입으로 떨어진다.
  const active = findPrototype(route) ?? folders[0]?.prototypes[0]

  return (
    <div className="flex min-h-screen bg-[#0b0b0f]">
      <Sidebar activeId={active?.id ?? null} />

      <main className="flex flex-1 items-center justify-center overflow-auto p-10">
        {active ? (
          <PhoneFrame key={active.id} {...active.meta.frame}>
            <active.Component />
          </PhoneFrame>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="max-w-[380px] text-center">
      <h2 className="text-[17px] font-semibold text-white">
        아직 프로토타입이 없습니다
      </h2>
      <p className="mt-2 text-[14px] leading-relaxed text-white/50">
        <code className="text-white/70">src/screens/이름/화면.tsx</code> 를
        만들고 화면 컴포넌트를 <code className="text-white/70">export default</code>{' '}
        하면 왼쪽 사이드바에 자동으로 나타납니다.
      </p>
    </div>
  )
}

export default App
