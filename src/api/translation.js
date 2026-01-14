/**
 * 번역 API 연동
 * Papago, Google Translate 등 다양한 번역 서비스 지원
 */

// API 설정
const API_CONFIG = {
  // Papago API (예시)
  papago: {
    url: 'https://openapi.naver.com/v1/papago/n2mt',
    clientId: import.meta.env.VITE_PAPAGO_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_PAPAGO_CLIENT_SECRET || ''
  },
  // Google Translate API (예시)
  google: {
    url: 'https://translation.googleapis.com/language/translate/v2',
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY || ''
  }
}

// 언어 코드 매핑
const LANGUAGE_CODES = {
  ko: 'ko',
  en: 'en'
}

/**
 * 텍스트 번역 (Papago API 사용)
 */
export async function translateText(text, targetLang = 'en') {
  if (!text || !text.trim()) return text
  
  // 같은 언어면 번역 불필요
  const sourceLang = targetLang === 'en' ? 'ko' : 'en'
  if (sourceLang === targetLang) return text

  try {
    // 방법 1: Papago API 사용
    if (API_CONFIG.papago.clientId && API_CONFIG.papago.clientSecret) {
      return await translateWithPapago(text, sourceLang, targetLang)
    }
    
    // 방법 2: Google Translate API 사용
    if (API_CONFIG.google.apiKey) {
      return await translateWithGoogle(text, sourceLang, targetLang)
    }
    
    // 방법 3: 로컬 번역 데이터 사용 (API 없을 때)
    return translateWithLocal(text, targetLang)
  } catch (error) {
    console.error('Translation error:', error)
    return text // 실패 시 원본 반환
  }
}

/**
 * Papago API로 번역
 */
async function translateWithPapago(text, sourceLang, targetLang) {
  const response = await fetch(API_CONFIG.papago.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Naver-Client-Id': API_CONFIG.papago.clientId,
      'X-Naver-Client-Secret': API_CONFIG.papago.clientSecret
    },
    body: JSON.stringify({
      source: LANGUAGE_CODES[sourceLang],
      target: LANGUAGE_CODES[targetLang],
      text: text
    })
  })

  if (!response.ok) {
    throw new Error(`Papago API error: ${response.status}`)
  }

  const data = await response.json()
  return data.message.result.translatedText
}

/**
 * Google Translate API로 번역
 */
async function translateWithGoogle(text, sourceLang, targetLang) {
  const url = `${API_CONFIG.google.url}?key=${API_CONFIG.google.apiKey}`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      q: text,
      source: LANGUAGE_CODES[sourceLang],
      target: LANGUAGE_CODES[targetLang]
    })
  })

  if (!response.ok) {
    throw new Error(`Google Translate API error: ${response.status}`)
  }

  const data = await response.json()
  return data.data.translations[0].translatedText
}

/**
 * 로컬 번역 데이터 사용 (API 없을 때 기본 번역)
 */
function translateWithLocal(text, targetLang) {
  // 기본 번역 데이터 (주요 텍스트만)
  const translations = {
    ko: {
      '국립중앙박물관': 'National Museum of Korea',
      '관람 정보': 'Visitor Information',
      '전시 안내': 'Exhibitions',
      '문화 행사': 'Cultural Events',
      '가이드 투어를 예약하고 싶으신가요?': 'Wanna Join a Guided Tour?',
      '400만 명이 경험한 이유': 'Why 4 million people experienced it',
      '지금 확인해 보세요': 'See for yourself',
      '국립중앙박물관의 진짜 이야기는 여기 있습니다': 'The true story of the National Museum of Korea is here',
      '조각공예관': 'Sculpture and Crafts',
      '서화관': 'Paintings',
      '국립 중앙 박물관을 생생하게 체험해 보세요': 'Experience vividly',
      '모두를 위한 열린 무대, 함께 즐기는 문화의 장': 'An open stage for everyone, a cultural space to enjoy together',
      '체험하러 가기': 'go to experience',
      '티켓 구매하기': 'Buy The Ticket!'
    },
    en: {
      'National Museum of Korea': '국립중앙박물관',
      'Visitor Information': '관람 정보',
      'Exhibitions': '전시 안내',
      'Cultural Events': '문화 행사',
      'Wanna Join a Guided Tour?': '가이드 투어를 예약하고 싶으신가요?',
      'Why 4 million people experienced it': '400만 명이 경험한 이유',
      'See for yourself': '지금 확인해 보세요',
      'The true story of the National Museum of Korea is here': '국립중앙박물관의 진짜 이야기는 여기 있습니다',
      'Sculpture and Crafts': '조각공예관',
      'Paintings': '서화관',
      'Experience vividly': '국립 중앙 박물관을 생생하게 체험해 보세요',
      'An open stage for everyone, a cultural space to enjoy together': '모두를 위한 열린 무대, 함께 즐기는 문화의 장',
      'go to experience': '체험하러 가기',
      'Buy The Ticket!': '티켓 구매하기'
    }
  }

  return translations[targetLang]?.[text] || text
}

/**
 * 여러 텍스트 일괄 번역
 */
export async function translateBatch(texts, targetLang = 'en') {
  const promises = texts.map(text => translateText(text, targetLang))
  return Promise.all(promises)
}
