<template>
  <div class="modal-wrap" v-if="isVisible">
    <div class="modal-txt">
      <p class="modalTitle">
        {{ languageStore.isKorean ? '당신만을 위한 특별한 티켓' : 'Special Ticket for You' }}
      </p>
      <div class="closeBtn">
        <a href="#" @click.prevent="closeModal">
          <p>x</p>
        </a>
      </div>
    </div>

    <div class="ticket" :id="languageStore.isKorean ? 'ticket' : 'ticketEng'">
      <div class="left">
        <img 
          :src="languageStore.isKorean ? '/images/modal/modal-1.png' : '/images/modal/modal-1-eng.png'" 
          alt="" 
        />
      </div>
      <div class="right">
        <img src="/images/modal/modal-2.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
const isVisible = ref(false)

onMounted(() => {
  // 페이지 로드 후 모달 표시 (예: 3초 후)
  setTimeout(() => {
    isVisible.value = true
  }, 3000)
})

const closeModal = () => {
  isVisible.value = false
}
</script>
