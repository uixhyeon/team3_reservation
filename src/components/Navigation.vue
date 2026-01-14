<template>
  <div>
    <!-- Hamburger Navigation -->
    <nav id="ham-nav">
      <!-- Main Menu -->
      <div class="panel main-panel">
        <ul>
          <li>
            <a href="#" data-target="sub-design" @click.prevent="showSubMenu('sub-design')">
              {{ languageStore.isKorean ? '관람 정보' : 'Visitor Information' }}
            </a>
          </li>
          <li>
            <a href="#" data-target="sub-furn" @click.prevent="showSubMenu('sub-furn')">
              {{ languageStore.isKorean ? '전시 안내' : 'Exhibitions' }}
            </a>
          </li>
          <li>
            <a href="#" data-target="sub-fabric" @click.prevent="showSubMenu('sub-fabric')">
              {{ languageStore.isKorean ? '문화 행사' : 'Cultural Events' }}
            </a>
          </li>
          <li>
            <a href="https://www.museumshop.or.kr/kor/main.do">
              {{ languageStore.isKorean ? '굿즈' : 'Goods' }}
            </a>
          </li>
          <li>
            <a href="https://www.museum.go.kr/MUSEUM/contents/M0801000000.do">
              {{ languageStore.isKorean ? '박물관 소개' : 'About the Museum' }}
            </a>
          </li>
          <li>
            <div class="search-icon">
              <a href="#" @click.prevent="toggleSearch">
                <i class="fa-solid fa-magnifying-glass"></i>
              </a>
            </div>
          </li>
        </ul>
      </div>

      <!-- Sub Menus -->
      <div class="panel sub-panel" id="sub-design">
        <button class="back-btn" @click="hideSubMenu">
          {{ languageStore.isKorean ? '뒤로 ➜' : 'Back ➜' }}
        </button>
        <ul>
          <li>
            <a href="#">{{ languageStore.isKorean ? '이용 안내' : 'Visitor Guide' }}</a>
          </li>
          <li>
            <a href="#">{{ languageStore.isKorean ? '예약 안내' : 'Reservation Guide' }}</a>
          </li>
          <li>
            <a href="#">{{ languageStore.isKorean ? '자주 묻는 질문' : 'FAQ' }}</a>
          </li>
        </ul>
      </div>

      <div class="panel sub-panel" id="sub-furn">
        <button class="back-btn" @click="hideSubMenu">
          {{ languageStore.isKorean ? '뒤로 ➜' : 'Back ➜' }}
        </button>
        <ul>
          <li>
            <a href="#">{{ languageStore.isKorean ? '상설 전시' : 'Permanent Exhibition' }}</a>
          </li>
          <li>
            <a href="#">{{ languageStore.isKorean ? '특별 전시' : 'Special Exhibition' }}</a>
          </li>
          <li>
            <a href="#">{{ languageStore.isKorean ? 'E-박물관' : 'E-Museum' }}</a>
          </li>
        </ul>
      </div>

      <div class="panel sub-panel" id="sub-fabric">
        <button class="back-btn" @click="hideSubMenu">
          {{ languageStore.isKorean ? '뒤로 ➜' : 'Back ➜' }}
        </button>
        <ul>
          <li>
            <a href="#">{{ languageStore.isKorean ? '케데헌 행사' : 'KDH Events' }}</a>
          </li>
          <li>
            <a href="#">{{ languageStore.isKorean ? '스템프 행사' : 'Stamp Events' }}</a>
          </li>
          <li>
            <a href="#">{{ languageStore.isKorean ? '문화체험 행사' : 'Cultural Experience' }}</a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Search Bar Modal -->
    <div id="search-modal" class="search-modal">
      <div class="search-modal_content">
        <input 
          type="text" 
          :placeholder="languageStore.isKorean ? '검색어를 입력하세요' : 'Enter search term'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()

const showSubMenu = (targetId) => {
  const subPanel = document.getElementById(targetId)
  const mainPanel = document.querySelector('.main-panel')
  
  if (subPanel && mainPanel) {
    mainPanel.style.display = 'none'
    subPanel.style.display = 'block'
  }
}

const hideSubMenu = () => {
  const subPanels = document.querySelectorAll('.sub-panel')
  const mainPanel = document.querySelector('.main-panel')
  
  subPanels.forEach(panel => {
    panel.style.display = 'none'
  })
  
  if (mainPanel) {
    mainPanel.style.display = 'block'
  }
}

const toggleSearch = () => {
  const searchModal = document.getElementById('search-modal')
  if (searchModal) {
    searchModal.style.display = searchModal.style.display === 'block' ? 'none' : 'block'
  }
}
</script>
