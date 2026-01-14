<template>
  <div>
    <!-- 하단 -->
    <div class="footer_wrap">
      <div class="footerinner">
        <!-- 하단 top -->
        <div class="footer_top">
          <!-- 하단로고 -->
          <div class="footerLogo">
            <a href="#">NATIONAL MUSEUM OF KOREA</a>
          </div>
          <!-- 하단 right -->
          <div class="footer-right">
            <!-- 하단 메뉴 -->
            <ul class="footerMenu">
              <li v-if="languageStore.isKorean">전시 안내</li>
              <li v-else>Our Stories</li>
              <li v-if="languageStore.isKorean">케데헌 이벤트</li>
              <li v-else>Be A Hunter</li>
              <li v-if="languageStore.isKorean">문화 행사</li>
              <li v-else>For:eigner</li>
              <li v-if="languageStore.isKorean">관람 정보</li>
              <li v-else>e-Museum</li>
              <li v-if="languageStore.isKorean">굿즈</li>
              <li v-else>MU:DS</li>
            </ul>
            <!-- 하단아이콘 -->
            <div class="footerIcon">
              <img src="/images/footer/facebook.png" alt="SNS" />
              <img src="/images/footer/insta.png" alt="SNS" />
            </div>
          </div>
        </div>
        <!-- 하단 bottom -->
        <div class="footer-bottom">
          <img src="/images/footer/footer-sponsor.png" alt="sponsor" />
          <span>© 2025 national Museum</span>
        </div>
      </div>
    </div>
    <!-- 퀵 메뉴 /gotop-->
    <div class="fix-menu-wrap">
      <a href="#reservation" class="fix-menu">
        <img src="/images/footer/Group 218.png" alt="ticket" />
        <span>
          {{ languageStore.isKorean ? '티켓 구매하기' : 'Buy The Ticket!' }}
        </span>
      </a>
      <div class="top-btn" @click="scrollToTop">
        <img src="/images/footer/ei_arrow-up 1.png" alt="" />
      </div>
    </div>
    <img 
      v-if="languageStore.isKorean"
      src="/images/footer/keugibyeonhwan_ilweolobongdo.jpg" 
      alt="일월오봉도" 
      class="thumbnamil"
    >
  </div>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
