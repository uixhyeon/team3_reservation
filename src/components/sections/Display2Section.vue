<template>
  <div class="display2_wrap">
    <div class="display2_wrap-bg"></div>
    <div class="inner-display2">
      <h1 data-translate>
        {{ languageStore.isKorean ? '서화관' : 'Paintings' }}
      </h1>
      <div class="swiper display2Swiper" ref="swiperContainer">
        <div class="swiper-wrapper">
          <div 
            v-for="(item, index) in displayItems" 
            :key="index"
            class="swiper-slide"
          >
            <img :src="item.image" :alt="item.alt" />
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
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

const displayItems = computed(() => {
  if (languageStore.isKorean) {
    return [
      { image: '/images/display2/painting1.png', alt: '민화1', title: '민화' },
      { image: '/images/display2/painting2.png', alt: '민화2', title: '초상화' },
      { image: '/images/display2/painting3.png', alt: '민화3', title: '의궤' }
    ]
  } else {
    return [
      { image: '/images/display2/painting1.png', alt: '민화1', title: 'Painting' },
      { image: '/images/display2/painting2.png', alt: '민화2', title: 'Portrait' },
      { image: '/images/display2/painting3.png', alt: '민화3', title: 'Oegyujanggak Uigwe' }
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
