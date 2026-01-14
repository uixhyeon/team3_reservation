<template>
  <section class="kdh" :class="{ 'kdh--contain': languageStore.isKorean }">
    <img 
      :class="{ 'kdh-media': languageStore.isKorean }"
      :src="languageStore.isKorean ? '/images/kdh/kdh-2.png' : '/images/kdh/kdh-1.png'" 
      :alt="languageStore.isKorean ? '케데헌 배경' : 'KDH background'"
    />
    <button class="kdh-start-btn" @click="startGame" data-translate>
      {{ languageStore.isKorean 
        ? '>> 테스트 시작' 
        : '>> GAME START' 
      }}
    </button>
  </section>
</template>

<script setup>
import { useLanguageStore } from '../../stores/language'

const languageStore = useLanguageStore()

const startGame = () => {
  // 게임 시작 로직
  console.log('Game started!')
  // router.push('/kdh-game') 등으로 게임 페이지로 이동 가능
}
</script>
