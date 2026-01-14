<template>
  <div id="app">
    <!-- 간단한 테스트 메시지 -->
    <div v-if="showTest" style="padding: 20px; background: #f0f0f0; text-align: center;">
      <h1>✅ Vue App이 정상적으로 작동합니다!</h1>
      <p>현재 언어: {{ languageStore.currentLanguage }}</p>
      <button @click="showTest = false">테스트 메시지 닫기</button>
    </div>
    
    <Modal />
    <Header />
    <Navigation />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLanguageStore } from './stores/language'
import Modal from './components/Modal.vue'
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'

const languageStore = useLanguageStore()
const showTest = ref(true) // 테스트용 - 나중에 false로 변경

onMounted(() => {
  console.log('Vue App mounted!')
  // 초기 언어 설정 (localStorage 또는 브라우저 언어)
  const savedLanguage = localStorage.getItem('language') || 'ko'
  languageStore.setLanguage(savedLanguage).catch(err => {
    console.error('Language setting error:', err)
  })
})
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
