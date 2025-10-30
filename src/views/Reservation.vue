<template>
  <div class="wrap">
    <Stepper :current-step="1" />

    <div class="background inner">
      <div class="container">
        <div class="left">
          <Reserv1Locker v-model:form="form" />
          <Reserv2Arrival v-model:form="form" />
          <Reserv3Luggage v-model:form="form" />
        </div>

        <div class="right">
          <Reserv4Summary :form="form" :totalPrice="totalPrice" />
          <button class="submit_btn" @click="goTopayment">입력 완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Stepper from "@/components/reserv/Stepper.vue";
import Reserv1Locker from "@/views/booking/Reserv1Locker.vue";
import Reserv2Arrival from "@/views/booking/Reserv2Arrival.vue";
import Reserv3Luggage from "@/views/booking/Reserv3Luggage.vue";
import Reserv4Summary from "@/views/booking/Reserv4Summary.vue";

const router = useRouter();

// 중앙 form 상태 (공유 데이터)
const form = ref({
  name: "",
  phone: "",
  size: "",
  address: "",
  dateRange: null,
  pickupAddress: "",
  pickupAddressDetail: "",
  pickupDate: "",
  homeAddress: "",
  homeAddressDetail: "",
  deliveryDate: "",
});

// 가격 계산
const prices = {
  S: { locker: 5000, delivery: 4000 },
  M: { locker: 8000, delivery: 6000 },
  L: { locker: 15000, delivery: 14000 },
  XL: { locker: 20000, delivery: 22000 },
  XXL: { locker: 28000, delivery: 32000 },
};

const totalPrice = computed(() => {
  const f = form.value;
  const size = f.size || "";
  let total = 0;
  if (f.name && f.phone && f.size && f.address) total += prices[size]?.locker ?? 0;
  if (f.pickupAddress && f.pickupDate) total += prices[size]?.delivery ?? 0;
  if (f.homeAddress && f.deliveryDate) total += prices[size]?.delivery ?? 0;
  return total;
});

// 결제 페이지 이동
const goTopayment = () => {
  alert("입력완료");
  router.push("/reservation2");
};
</script>

<style scoped lang="scss">
.wrap {
  background: #f5f7f7;
  padding: 40px 0 100px 0;
}

.container {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2.5rem;
  max-width: 1120px;
  margin: 0 auto;
}

.right {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit_btn {
  width: 70%;
  padding: 14px 0;
  background: #53b4a1;
  border: none;
  color: #fff;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #3a8c88;
  }
}

@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
  }
  .submit_btn {
    width: 90%;
  }
}
</style>
