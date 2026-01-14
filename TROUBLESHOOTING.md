# 문제 해결 가이드

## 페이지가 안 보일 때 체크리스트

### ✅ 1단계: 개발 서버 실행 확인

```bash
npm run dev
```

**확인 사항:**
- 터미널에 "Local: http://localhost:3000" 메시지가 보이는가?
- 브라우저가 자동으로 열리는가?
- 서버가 실행 중인가? (포트 3000이 사용 중인지 확인)

### ✅ 2단계: 브라우저 콘솔 확인

1. 브라우저에서 `F12` 또는 `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
2. Console 탭 열기
3. 오류 메시지 확인

**일반적인 오류:**
- `Failed to resolve import` → 파일 경로 문제
- `Cannot find module` → npm install 필요
- `Uncaught ReferenceError` → 스크립트 로드 문제

### ✅ 3단계: 네트워크 탭 확인

1. 개발자 도구 → Network 탭
2. 페이지 새로고침
3. 빨간색(실패) 요청이 있는지 확인

**확인할 파일:**
- `/src/main.js` - 200 OK여야 함
- CSS 파일들 - 모두 로드되는지 확인
- 이미지 파일들 - `/images/...` 경로가 작동하는지

### ✅ 4단계: Vue DevTools 확인

1. 브라우저 확장 프로그램: Vue.js DevTools 설치
2. 설치 후 페이지에서 Vue 탭 확인
3. Vue 컴포넌트 트리가 보이는지 확인

### ✅ 5단계: 간단한 테스트

`src/App.vue`를 이렇게 수정:

```vue
<template>
  <div id="app">
    <h1 style="padding: 50px; text-align: center;">
      Vue가 작동합니다! 🎉
    </h1>
  </div>
</template>

<script setup>
console.log('App loaded!')
</script>
```

이것도 안 보이면 → Vite 설정 문제

### ✅ 6단계: 파일 구조 확인

```bash
# 필수 파일들 확인
ls src/main.js
ls src/App.vue
ls src/router/index.js
ls src/stores/language.js
ls src/components/Header.vue
ls src/views/Home.vue
```

모든 파일이 있어야 합니다.

### ✅ 7단계: Vite 재설정

```bash
# 1. 서버 중지 (Ctrl+C)
# 2. 캐시 삭제
rm -rf node_modules/.vite
# 3. 재시작
npm run dev
```

### ✅ 8단계: 완전 재설치

```bash
# 1. 서버 중지
# 2. node_modules 삭제
rm -rf node_modules
# 3. package-lock.json 삭제 (있다면)
rm -f package-lock.json
# 4. 재설치
npm install
# 5. 재시작
npm run dev
```

## 특정 오류 해결

### "Cannot find module './App.vue'"
→ `src/App.vue` 파일이 있는지 확인

### "Failed to resolve import '@/...'"
→ `vite.config.js`의 alias 설정 확인

### "Uncaught TypeError: Cannot read property..."
→ 컴포넌트에서 undefined 변수 사용 확인

### 빈 화면 (콘솔에 오류 없음)
→ `#app` 요소가 있는지 확인
→ Vue가 마운트되었는지 확인: `document.querySelector('#app').__vue_app__`

## 도움 요청 시 포함할 정보

1. 브라우저 콘솔의 전체 오류 메시지
2. Network 탭의 실패한 요청들
3. `npm run dev` 실행 시 터미널 출력
4. 사용 중인 브라우저 및 버전
