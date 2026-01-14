import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // .env 파일이 샌드박스에서 접근 불가해 발생하는 오류를 피하기 위해
  // Vite가 환경 변수를 읽어올 디렉터리를 별도로 지정합니다.
  // 필요하면 /env 폴더 안에 .env 파일을 두어 사용하세요.
  envDir: 'env',
  server: {
    host: '127.0.0.1',
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  publicDir: 'public'
})
