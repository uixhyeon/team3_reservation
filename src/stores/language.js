import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { translateText } from '../api/translation'

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref('ko') // 'ko' | 'en'
  const translations = ref({})
  const isLoading = ref(false)

  const isKorean = computed(() => currentLanguage.value === 'ko')
  const isEnglish = computed(() => currentLanguage.value === 'en')

  // 언어 설정
  async function setLanguage(lang) {
    if (currentLanguage.value === lang) return
    
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
    
    // 페이지 전체 번역 실행 (선택사항 - API가 설정되어 있을 때만)
    try {
      await translatePage()
    } catch (error) {
      console.warn('Translation skipped:', error)
      // 번역 실패해도 계속 진행
    }
  }

  // 언어 토글
  async function toggleLanguage() {
    const newLang = currentLanguage.value === 'ko' ? 'en' : 'ko'
    await setLanguage(newLang)
  }

  // 번역 텍스트 가져오기
  function t(key, defaultValue = '') {
    const translation = translations.value[key]
    if (translation) return translation
    
    // 번역이 없으면 기본값 반환
    return defaultValue || key
  }

  // 페이지 전체 번역
  async function translatePage() {
    isLoading.value = true
    try {
      // 페이지의 모든 텍스트 요소 수집
      const textElements = document.querySelectorAll('[data-translate]')
      const textsToTranslate = Array.from(textElements).map(el => ({
        element: el,
        text: el.getAttribute('data-translate') || el.textContent.trim()
      }))

      // API로 번역 요청
      const translationPromises = textsToTranslate.map(async ({ element, text }) => {
        if (!text) return
        
        try {
          const translated = await translateText(text, currentLanguage.value)
          element.textContent = translated
          translations.value[text] = translated
        } catch (error) {
          console.error('Translation error:', error)
        }
      })

      await Promise.all(translationPromises)
    } catch (error) {
      console.error('Page translation error:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    currentLanguage,
    translations,
    isLoading,
    isKorean,
    isEnglish,
    setLanguage,
    toggleLanguage,
    t,
    translatePage
  }
})
