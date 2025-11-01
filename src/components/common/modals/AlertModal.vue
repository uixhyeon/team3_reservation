<template>
   <teleport to="body">

     <transition name="fade">
       <div v-if="show" class="alert-overlay" @click.self="closeAlert">
         <div class="alert-box">
           <!-- 아이콘 (선택사항) -->
           <div class="icon-area">
             <i class="fa-solid fa-circle-info"></i>
        </div>

        <!-- 메시지 -->
        <p class="alert-message">{{ message }}</p>

        <!-- 버튼 -->
        <button class="btn-primary" @click="closeAlert">확인</button>
      </div>
    </div>
  </transition>
</teleport>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  show: Boolean,
  message: String,
});
const emit = defineEmits(["close"]);

function closeAlert() {
  emit("close");
}
</script>

<style scoped lang="scss">
/* =============================
   Fade Animation
============================= */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* =============================
   Overlay
============================= */
.alert-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

/* =============================
   Alert Box
============================= */
.alert-box {
  background: #fff;
  padding: 28px 36px;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  width: 320px;
  max-width: 90%;
  animation: pop 0.25s ease-out;
}

@keyframes pop {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* =============================
   Icon & Text
============================= */
.icon-area {
  font-size: 36px;
  color: #53b4a1;
  margin-bottom: 12px;
}

.alert-message {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 20px;
  word-break: keep-all;
   white-space: pre-line;
}

/* =============================
   Button
============================= */
.btn-primary {
  background: #53b4a1;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover {
  background: #3e9c8f;
}
</style>
