<template>
  <section class="reserve inner">
<h1>reserveForm2 결제창</h1>
    <!-- ✅ 결제 영역 -->
    <div class="checkout">
      <!-- 좌: 요약 -->
      <div class="summary" aria-labelledby="summary-title">
        <h3 id="summary-title">선택 상품 요약</h3>
 <h2 class="card_title">선택 상품 요약</h2>
            <table>
              <tr>
                <td>선택상품</td>
                <td>사물함 대여</td>
              </tr>
              <tr>
                <td>도착지</td>
                <td>입력 필요</td>
              </tr>
              <tr>
                <td>수하물</td>
                <td>선택 필요</td>
              </tr>
              <tr class="total">
                <td>총 결제금액</td>
                <td><strong>29,000원</strong></td>
              </tr>
            </table>
      </div>
      <!-- 우: 요약 -->
      <div class="summary" aria-labelledby="summary-title">
        <h3 id="summary-title">선택 상품 요약</h3>

        <ul>
          <li v-for="tab in selectedTabs" :key="tab">
            {{ tab }} — {{ formatKrw(prices[tab]) }}
          </li>
        </ul>

        <div class="divider"></div>

        <!-- 혜택 -->
        <div class="benefits">
          <h4>마일리지 / 쿠폰 사용</h4>

          <div class="benefit-row">
            <label class="inline">
              <input type="checkbox" v-model="useCoupon" />
              Welcome 쿠폰 - 3,000원
            </label>
            <span class="muted" v-if="useCoupon">- {{ formatKrw(3000) }}</span>
          </div>

          <div class="benefit-row">
            <label class="inline">
              <input type="checkbox" v-model="usePoints" />
              포인트 - 2,500P
            </label>
            <span class="muted" v-if="usePoints">- {{ formatKrw(2500) }}</span>
          </div>
        </div>

        <!-- 총 결제금액 -->
        <div class="total-row">
          <span>총 결제금액</span>
          <strong>{{ formatKrw(finalTotal) }}</strong>
        </div>
      </div>

      <!-- 우: 결제수단 -->
      <div class="payment" aria-labelledby="payment-title">
        <h3 id="payment-title">결제방법 선택</h3>

        <div class="pay-grid" role="radiogroup">
          <button
            v-for="method in paymentMethods"
            :key="method.id"
            type="button"
            class="pay-card"
            :class="{ selected: selectedPayment === method.id }"
            @click="selectedPayment = method.id"
          >
            <span class="icon" aria-hidden="true">{{ method.icon }}</span>
            <span class="label">{{ method.label }}</span>
          </button>
        </div>

        <button class="btn primary" @click="saveAndPay">결제하기</button>
      </div>
    </div>

    <!-- ✅ 모바일 하단 요약바 -->
    <div class="mobile-checkout-bar">
      <div class="price">{{ formatKrw(finalTotal) }}</div>
      <button class="btn primary" @click="saveAndPay">결제하기</button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

/* ===============================
   🎯 데이터 및 상태 관리
================================= */
const selectedTabs = ref(["사물함 예약"]); // 기본 선택 탭 1개
const useCoupon = ref(true);
const usePoints = ref(true);
const selectedPayment = ref("card");

/* ===============================
   💰 가격 계산
================================= */
const prices = {
  "사물함 예약": 29000,
  "짐 가져오기": 15000,
  "집으로 배송하기": 20000,
};

const totalPrice = computed(() =>
  selectedTabs.value.reduce((sum, tab) => sum + prices[tab], 0)
);

const discountAmount = computed(() => {
  let discount = 0;
  if (useCoupon.value) discount += 3000;
  if (usePoints.value) discount += 2500;
  return Math.min(discount, totalPrice.value);
});

const finalTotal = computed(() =>
  Math.max(totalPrice.value - discountAmount.value, 0)
);

/* ===============================
   🧾 결제 관련
================================= */
const paymentMethods = [
  { id: "card", label: "신용카드", icon: "💳" },
  { id: "kakao", label: "카카오페이", icon: "💬 pay" },
  { id: "naver", label: "네이버페이", icon: "N pay" },
  { id: "bank", label: "무통장입금", icon: "🏦" },
];

// 금액 포맷
const formatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
});
const formatKrw = (v) => formatter.format(v);

// 결제 실행
const saveAndPay = () => {
  if (selectedTabs.value.length === 0) {
    alert("최소 한 가지 서비스를 선택해주세요!");
    return;
  }
  if (!selectedPayment.value) {
    alert("결제 수단을 선택해주세요!");
    return;
  }

  const payload = {
    selectedServices: selectedTabs.value,
    useCoupon: useCoupon.value,
    usePoints: usePoints.value,
    discountAmount: discountAmount.value,
    totalPrice: totalPrice.value,
    finalTotal: finalTotal.value,
    paymentMethod: selectedPayment.value,
  };

  localStorage.setItem("checkoutPayload", JSON.stringify(payload));

  // SPA 라우팅 (예시)
  if (window?.history?.pushState) {
    history.pushState({}, "", "/reser_check");
    window.dispatchEvent(new Event("popstate"));
  } else {
    window.location.href = "/reser_check";
  }
};
</script>

<style scoped>
/* ========== 🧱 레이아웃 ========== */
.inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
}

/* 단계 표시 */
.step ul {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
  color: #bbb;
}
.step li.active {
  color: #2ca39f;
  font-weight: 700;
}

/* 결제 영역 (좌우 grid) */
.checkout {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* 좌: 요약 */
.summary {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
}
.summary ul {
  list-style: none;
  padding: 0;
}
.summary .divider {
  height: 1px;
  background: #e6e6e6;
  margin: 12px 0 8px;
}
.benefits h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #333;
}
.benefit-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
.inline {
  display: flex;
  align-items: center;
  gap: 8px;
}
.muted {
  color: #888;
}
.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px dashed #ddd;
}
.total-row strong {
  color: #2ca39f;
  font-size: 18px;
}

/* 우: 결제수단 */
.payment {
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.pay-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 12px 0;
}
.pay-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
}
.pay-card:hover {
  border-color: #2ca39f;
}
.pay-card.selected {
  border-color: #2ca39f;
  background: #e9f8f8;
  color: #2ca39f;
}
.icon {
  width: 28px;
  text-align: center;
}

/* 버튼 */
.btn {
  width: 100%;
  padding: 14px;
  background: #2ca39f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
}
.btn:hover {
  background: #238c89;
}

/* 모바일 하단 요약바 */
.mobile-checkout-bar {
  display: none;
  position: sticky;
  bottom: 0;
  background: #ffffffcc;
  backdrop-filter: blur(10px);
  padding: 10px 12px;
  border-top: 1px solid #eee;
  gap: 12px;
  align-items: center;
}
.mobile-checkout-bar .price {
  font-weight: 800;
  color: #2ca39f;
}

/* 반응형 */
@media (min-width: 860px) {
  .checkout {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 600px) {
  .mobile-checkout-bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
