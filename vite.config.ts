import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages는 https://laseon-kim.github.io/innercircle/ 로 서빙되므로
// 저장소 이름을 base로 지정한다.
export default defineConfig({
  base: '/innercircle/',
  plugins: [react(), tailwindcss()],
})
