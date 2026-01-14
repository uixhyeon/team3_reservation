<template>
  <div class="header-wrap">
    <header class="header">
      <div class="inner">
        <!-- Logo Area -->
        <router-link to="/">
          <div class="header-logo">
            <div class="logo-1">
              <img src="/images/header/logo-1.png" alt="Icon Logo" />
            </div>
            <div class="logo-2">
              <img src="/images/header/logo-2.png" alt="Text Logo" />
            </div>
          </div>
        </router-link>

        <!-- Icon Area -->
        <div class="header-icon">
          <div class="lang">
            <a 
              href="#" 
              @click.prevent="languageStore.setLanguage('ko')"
              :class="{ active: languageStore.isKorean }"
            >
              KR
            </a>
            <a 
              href="#" 
              @click.prevent="languageStore.setLanguage('en')"
              :class="{ active: languageStore.isEnglish }"
            >
              EN
            </a>
          </div>
          <div class="search-icon">
            <button id="search-btn" @click="toggleSearch">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div class="menu-icon">
            <button id="hamburger" @click="toggleMenu">
              <i class="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Banner -->
    <div class="banner-wrap">
      <div class="main-banner-video">
        <video autoplay muted loop playsinline class="bg-video">
          <source
            src="/images/main-banner/main-banner-video.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div class="main-banner-txt">
        <h1 data-translate>
          {{ languageStore.isKorean ? '국립중앙박물관' : 'NATIONAL MUSEUM OF KOREA' }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()

const toggleSearch = () => {
  const searchModal = document.getElementById('search-modal')
  if (searchModal) {
    searchModal.style.display = searchModal.style.display === 'block' ? 'none' : 'block'
  }
}

const toggleMenu = () => {
  const hamNav = document.getElementById('ham-nav')
  if (hamNav) {
    hamNav.classList.toggle('active')
  }
}
</script>

<style scoped>
.lang a.active {
  font-weight: bold;
  color: #fff;
}
</style>
