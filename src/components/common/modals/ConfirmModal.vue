<template>
  <transition name="fade">
    <div v-if="show" class="confirm-overlay" @click.self="closeModal">
      <div class="confirm-box">
        <!-- 상단 아이콘 -->
        <div class="icon-area">
          <i
            :class="{
              'fa-solid fa-circle-check': type === 'success',
              'fa-solid fa-triangle-exclamation': type === 'warning',
              'fa-solid fa-circle-info': type === 'info',
            }"
          ></i>
        </div>

        <!-- 메시지 -->
        <p class="confirm-message">{{ message }}</p>

        <!-- 버튼 -->
        <div class="btn-row">
          <button class="btn-cancel" @click="cancel">취소</button>
          <button class="btn-confirm" @click="confirm">확인</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: "info", // 'info' | 'success' | 'warning'
  },
});
const emit = defineEmits(["close", "confirm"]);

function closeModal() {
  emit("close");
}

function confirm() {
  emit("confirm");
  closeModal();
}

function cancel() {
  closeModal();
}
</script>

<style scoped lang="scss">
@use "/src/assets/style/variables" as *;
/* =============================
   Fade Animation
============================= */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* =============================
   Overlay
============================= */
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

/* =============================
   Confirm Box
============================= */
.confirm-box {
  background: #fff;
  border-radius: $radius-m;
  text-align: center;
  padding: 30px 38px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  width: 340px;
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
   Icon
============================= */
.icon-area {
  font-size: 38px;
  margin-bottom: 12px;

  .fa-circle-check {
    color: #53b4a1;
  }
  .fa-triangle-exclamation {
    color: #f26a3a;
  }
  .fa-circle-info {
    color: #2b9fd9;
  }
}

/* =============================
   Text
============================= */
.confirm-message {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 24px;
  word-break: keep-all;
}

/* =============================
   Buttons
============================= */
.btn-row {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn-cancel,
.btn-confirm {
  border: none;
  border-radius: $radius-s;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

/* 취소 버튼 */
.btn-cancel {
  background: #f1f1f1;
  color: #555;
}
.btn-cancel:hover {
  background: #e3e3e3;
}

/* 확인 버튼 */
.btn-confirm {
  background: #53b4a1;
  color: #fff;
}
.btn-confirm:hover {
  background: #3e9c8f;
}
</style>
