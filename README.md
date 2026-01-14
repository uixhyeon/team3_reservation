# 국립중앙박물관 웹사이트 (Vue.js)

Vue.js 3 기반의 SPA(Single Page Application) 웹사이트입니다.

## 기술 스택

- **Vue 3** - 프론트엔드 프레임워크
- **Vue Router** - 라우팅
- **Pinia** - 상태 관리
- **Vite** - 빌드 도구
- **Swiper** - 슬라이더 라이브러리
- **Font Awesome** - 아이콘

## 기능

- ✅ 다국어 지원 (한국어/영어)
- ✅ 번역 API 연동 (Papago/Google Translate)
- ✅ 반응형 디자인
- ✅ SPA 라우팅
- ✅ 컴포넌트 기반 구조

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

### 3. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 프로젝트 구조

```
src/
├── api/              # API 관련 (번역 API 등)
├── assets/           # 정적 파일 (CSS, 이미지 등)
├── components/       # Vue 컴포넌트
│   ├── sections/     # 섹션 컴포넌트
│   ├── Header.vue
│   ├── Footer.vue
│   ├── Navigation.vue
│   └── Modal.vue
├── router/           # Vue Router 설정
├── stores/           # Pinia 스토어
│   └── language.js   # 언어 상태 관리
├── views/            # 페이지 컴포넌트
│   ├── Home.vue
│   ├── Info.vue
│   └── Sayu.vue
├── App.vue           # 루트 컴포넌트
└── main.js           # 엔트리 포인트
```

## 번역 API 설정

### Papago API 사용

1. `.env` 파일 생성:

```env
VITE_PAPAGO_CLIENT_ID=your_client_id
VITE_PAPAGO_CLIENT_SECRET=your_client_secret
```

**중요:** Vite에서는 환경 변수에 `VITE_` 접두사를 사용해야 합니다!

2. 네이버 개발자 센터에서 API 키 발급:
   - https://developers.naver.com/apps/#/register

3. 서버 재시작:
   ```bash
   npm run dev
   ```

### Google Translate API 사용 (선택사항)

```env
VITE_GOOGLE_API_KEY=your_api_key
```

## 언어 전환

언어 전환은 헤더의 KR/EN 버튼을 클릭하거나, `languageStore.setLanguage('ko' | 'en')`을 호출하여 변경할 수 있습니다.

```javascript
import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()
languageStore.setLanguage('en') // 영어로 변경
```

## 라우팅

- `/` - 홈페이지
- `/info` - 관람 정보
- `/sayu` - 사유의 방 전시
- `/sayu-eng` - 사유의 방 전시 (영문)

## 주요 컴포넌트

### Header
- 로고
- 언어 전환 버튼
- 검색 버튼
- 햄버거 메뉴
- 메인 배너

### Navigation
- 햄버거 메뉴
- 서브 메뉴
- 검색 모달

### Footer
- 푸터 메뉴
- SNS 링크
- 퀵 메뉴 (티켓 구매, 맨 위로)

## 개발 가이드

### 새 컴포넌트 추가

1. `src/components/` 또는 `src/components/sections/`에 `.vue` 파일 생성
2. 필요한 경우 `src/router/index.js`에 라우트 추가

### 다국어 텍스트 추가

컴포넌트에서 `data-translate` 속성을 사용하거나, `languageStore.isKorean`을 사용하여 조건부 렌더링:

```vue
<template>
  <p data-translate>
    {{ languageStore.isKorean ? '한국어 텍스트' : 'English Text' }}
  </p>
</template>
```

## 배포

### Vercel 배포

```bash
npm run build
vercel deploy
```

### 기타 플랫폼

빌드된 `dist` 폴더의 내용을 정적 호스팅 서비스에 업로드하세요.

## 라이선스

© 2025 National Museum of Korea
