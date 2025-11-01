<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { ref, onMounted, onUnmounted } from "vue";

// 💚 전역 Alert 상태
const showAlert = ref(false);
const alertMessage = ref("");

// 전역 이벤트 리스너
function handleGlobalAlert(e) {
  alertMessage.value = e.detail;
  showAlert.value = true;
}

onMounted(() => {
  window.addEventListener("show-alert", handleGlobalAlert);
});
onUnmounted(() => {
  window.removeEventListener("show-alert", handleGlobalAlert);
});
</script>

<template>
  <div class="wrap">
    <Header />

    <main>
      <router-view></router-view>
    </main>

    <Footer />

    <!-- 💚 전역 알림 모달 -->
    <AlertModal
      :show="showAlert"
      :message="alertMessage"
      @close="showAlert = false"
    />
  </div>
</template>

<style scoped>
/* 필요 시 wrap padding 조정 가능 */
</style>
