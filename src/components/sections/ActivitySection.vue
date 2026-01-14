<template>
  <div class="activity-wrap">
    <section class="activity">
      <div class="activity-txt">
        <h1 data-translate>
          {{ languageStore.isKorean 
            ? '국립 중앙 박물관을 생생하게 체험해 보세요.' 
            : 'Experience vividly.' 
          }}
        </h1>
        <h6 data-translate>
          {{ languageStore.isKorean 
            ? '모두를 위한 열린 무대, 함께 즐기는 문화의 장' 
            : 'An open stage for everyone, a cultural space to enjoy together.' 
          }}
        </h6>
        <div class="goto">
          <h3>
            <a href="#" data-translate>
              {{ languageStore.isKorean ? '체험하러 가기' : 'go to experience' }}
            </a>
          </h3>
          <div class="imgbox">
            <img src="/images/activity/arrow.png" alt="화살표 사진" />
          </div>
        </div>
      </div>

      <!-- 카드 섹션 -->
      <div class="swiper swiper-activity" ref="swiperContainer">
        <div class="swiper-wrapper">
          <div 
            v-for="(image, index) in activityImages" 
            :key="index"
            class="swiper-slide"
          >
            <img :src="image" :alt="`액티비티 ${index + 1}`" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useLanguageStore } from '../../stores/language'
import Swiper from 'swiper'
import 'swiper/css'

const languageStore = useLanguageStore()
const swiperContainer = ref(null)
let swiper = null

const activityImages = computed(() => {
  const basePath = '/images/activity/'
  if (languageStore.isKorean) {
    return [
      `${basePath}activity-1-kor.png`,
      `${basePath}activity-2-kor.png`,
      `${basePath}activity-3-kor.png`,
      `${basePath}activity-4-kor.png`,
      `${basePath}activity-5-kor.png`
    ]
  } else {
    return [
      `${basePath}activity-1.png`,
      `${basePath}activity-2.png`,
      `${basePath}activity-3.png`,
      `${basePath}activity-4.png`,
      `${basePath}activity-5.png`
    ]
  }
})

onMounted(() => {
  initSwiper()
})

watch(() => languageStore.currentLanguage, () => {
  if (swiper) {
    swiper.destroy(true, true)
    setTimeout(() => {
      initSwiper()
    }, 100)
  }
})

const initSwiper = () => {
  if (swiperContainer.value) {
    swiper = new Swiper(swiperContainer.value, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      }
    })
  }
}
</script>
