import { createRouter, createWebHistory } from "vue-router";
import Reser_check from "@/views/Reser_check.vue";
import ReserveForm from "@/components/ReserveForm.vue";
import Complete from "@/views/Complete.vue";
import App from "@/App.vue";
import Reservation_ui from "@/views/Reservation_ui.vue";
import Zimm_ref from "@/views/Zimm_ref.vue";
import ReserveForm2 from "@/views/ReserveForm2.vue";

const routes = [
  // { path: "/", redirect: "/reserve" },
  { path: "/", component: App },
  { path: "/zimm", component: Zimm_ref },
  { path: "/reserve", component: ReserveForm },
  { path: "/reser_check", component: Reser_check },
  { path: "/complete", component: Complete },
  { path: "/reservation_ui", component: Reservation_ui},
  { path: "/reserv_form2", component: ReserveForm2},
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
