<template>
  <!-- <router-view /> -->
   <Reservation_ui/>
   <br>
   <hr>
   <hr>
   <hr>
   <br>
  <ReserveForm />
     <br>
   <hr>
   <hr>
   <hr>
   <br>
   <Zimm_ref/>
   <br>
 <hr>
 <hr>
 <hr>
 <br>
 <ReserveForm2/>
 <hr>
 <hr>
 <hr>
 <br>
 <Practice/>
 <Signup1/>
 <Signup2/>
</template>
<script setup>
// 앱은 라우터 뷰만 렌더링합니다.
import ReserveForm from "./components/ReserveForm.vue";
import Practice from "./views/Practice.vue";
import Reservation_ui from "./views/Reservation_ui.vue";
import ReserveForm2 from "./views/ReserveForm2.vue";
import Signup1 from "./views/Signup1.vue";
import Signup2 from "./views/Signup2.vue";
import Zimm_ref from "./views/Zimm_ref.vue";
</script>
<style lang="scss" scoped></style>
