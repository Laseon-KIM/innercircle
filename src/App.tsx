import { PhoneFrame } from './components/PhoneFrame'
import { HomeScreen } from './screens/HomeScreen'

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0b0f] p-10">
      <PhoneFrame>
        <HomeScreen />
      </PhoneFrame>
    </main>
  )
}

export default App
