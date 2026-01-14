<template>
  <div class="review-wrap">
    <section class="review">
      <div class="review-txt-1">
        <p data-translate>
          {{ languageStore.isKorean 
            ? '400만 명이 경험한 이유 지금 확인해 보세요.' 
            : 'Why 4 million people experienced it. See for yourself.' 
          }}
        </p>
      </div>
      <div class="review-txt-2">
        <p data-translate>
          {{ languageStore.isKorean 
            ? '국립중앙박물관의 진짜 이야기는 여기 있습니다' 
            : 'The true story of the National Museum of Korea is here.' 
          }}
        </p>
      </div>
      <div class="swiper-container-review" ref="swiperContainer">
        <div class="swiper-wrapper">
          <div 
            v-for="(review, index) in reviewImages" 
            :key="index"
            class="swiper-slide"
          >
            <img :src="review" :alt="`리뷰 이미지 ${index + 1}`" />
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

const reviewImages = computed(() => {
  const basePath = '/images/review/'
  if (languageStore.isKorean) {
    return [
      `${basePath}review1.png`,
      `${basePath}review2.png`,
      `${basePath}review3.png`,
      `${basePath}review4.png`,
      `${basePath}review5.png`
    ]
  } else {
    return [
      `${basePath}review-eng-1.png`,
      `${basePath}review-eng-2.png`,
      `${basePath}review-eng-3.png`,
      `${basePath}review-eng-4.png`,
      `${basePath}review-eng-5.png`
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
