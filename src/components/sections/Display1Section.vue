<template>
  <div class="display1_wrap">
    <div class="inner-display1">
      <h1 data-translate>
        {{ languageStore.isKorean ? '조각공예관' : 'Sculpture and Crafts' }}
      </h1>
      <div class="swiper display1Swiper" ref="swiperContainer">
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
      { image: '/images/display1/Sculpture1.png', alt: '공예전시1', title: '청자' },
      { image: '/images/display1/Sculpture2.png', alt: '공예전시2', title: '금속공예' },
      { image: '/images/display1/Sculpture3.png', alt: '공예전시3', title: '백자' }
    ]
  } else {
    return [
      { image: '/images/display1/Sculpture1.png', alt: '공예전시1', title: 'Celadon' },
      { image: '/images/display1/Sculpture2.png', alt: '공예전시2', title: 'Metal Crafts' },
      { image: '/images/display1/Sculpture3.png', alt: '공예전시3', title: 'White Porcelain' }
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
