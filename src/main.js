// 🎨 전역 스타일 (SCSS)
import "./assets/style/_main.scss";

// 📦 Vue 기본 셋업
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 💡 MatAju 공통 모달 컴포넌트 등록
// --------------------------------------------------
import AlertModal from "@/components/common/modals/AlertModal.vue";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";
// --------------------------------------------------

const app = createApp(App);

// 💚 전역 컴포넌트 등록
// --------------------------------------------------
app.component("AlertModal", AlertModal);
app.component("ConfirmModal", ConfirmModal);
// --------------------------------------------------
// ⚡ 전역 알림 함수 등록
// --------------------------------------------------
app.config.globalProperties.$alert = function (message) {
  const event = new CustomEvent("show-alert", { detail: message });
  window.dispatchEvent(event);
};

// ⚙️ 라우터 및 마운트
app.use(router);
app.mount("#app");
