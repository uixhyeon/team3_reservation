# 빠른 시작 가이드

## 문제 해결: 페이지가 안 보일 때

### 1. 개발 서버 실행 확인

```bash
npm run dev
```

서버가 `http://localhost:3000`에서 실행되어야 합니다.

### 2. 브라우저 콘솔 확인

브라우저 개발자 도구(F12)를 열고 Console 탭에서 오류 메시지를 확인하세요.

### 3. 주요 확인 사항

#### 컴포넌트 import 오류
- `src/components/` 폴더에 모든 컴포넌트가 있는지 확인
- `src/views/` 폴더에 모든 페이지가 있는지 확인

#### CSS 파일 경로
- `css/` 폴더에 필요한 CSS 파일들이 있는지 확인
- `src/main.js`의 CSS import 경로가 올바른지 확인

#### 이미지 경로
- `public/images/` 폴더에 이미지들이 있는지 확인
- 컴포넌트에서 이미지 경로가 `/images/...`로 시작하는지 확인

### 4. 간단한 테스트

`src/App.vue`를 간단하게 수정하여 테스트:

```vue
<template>
  <div id="app">
    <h1>Vue App이 작동합니다!</h1>
    <router-view />
  </div>
</template>
```

이렇게 해도 안 보이면 Vite 설정 문제일 수 있습니다.

### 5. Vite 재시작

```bash
# 서버 중지 (Ctrl+C)
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
npm run dev
```

### 6. 캐시 클리어

브라우저에서:
- Hard Refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
- 또는 개발자 도구에서 "Disable cache" 체크

## 일반적인 오류

### "Cannot find module"
- `npm install` 실행
- 파일 경로 확인

### "Failed to resolve import"
- 상대 경로 확인 (`./`, `../`)
- `@/` alias가 제대로 설정되었는지 확인

### 빈 화면
- 브라우저 콘솔 오류 확인
- `#app` 요소가 있는지 확인
- Vue 앱이 마운트되었는지 확인
