<template>
  <section class="reserve inner">
    <h1>ReserveForm2</h1>

    <!-- 상단 -->
    <div class="checkout-area">
      <div class="card-test">
        <!-- 왼쪽 입력 -->
        <div class="form_card">
          <div class="card_header"><h3>사물함 예약</h3></div>
          <div class="card_content">
            <table>
              <tr><td>상품</td><td>사물함 대여</td></tr>
              <tr><td>도착지</td><td>입력 필요</td></tr>
              <tr class="total"><td>총 결제금액</td><td><strong>29,000원</strong></td></tr>
            </table>
            <button class="submit_btn">입력 완료</button>
          </div>
        </div>

        <!-- 오른쪽 요약 -->
        <div class="summary_card">
          <h2 class="card_title">선택 상품 요약</h2>
          <ul>
            <li v-for="tab in selectedTabs" :key="tab">
              {{ tab }} — {{ formatKrw(prices[tab]) }}
            </li>
          </ul>

          <div class="divider"></div>

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

          <div class="total-row">
            <span>총 결제금액</span>
            <strong>{{ formatKrw(finalTotal) }}</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ 마지막 결제 선택 구역 + 배경 -->
    <div class="payment_bg">
      <div class="form_card payment_card">
        <div class="card_header"><h3>결제방법 선택</h3></div>
        <div class="card_content">
          <div class="pay-grid" role="radiogroup">
            <button
              v-for="method in paymentMethods"
              :key="method.id"
              type="button"
              class="pay-card"
              :class="{ selected: selectedPayment === method.id }"
              @click="selectedPayment = method.id"
            >
              <span class="icon">{{ method.icon }}</span>
              <span class="label">{{ method.label }}</span>
            </button>
          </div>
          <button class="submit_btn" @click="saveAndPay">결제하기</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const selectedTabs = ref(["사물함 예약"]);
const useCoupon = ref(true);
const usePoints = ref(true);
const selectedPayment = ref("card");

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

const paymentMethods = [
  { id: "card", label: "신용카드", icon: "💳" },
  { id: "kakao", label: "카카오페이", icon: "💬 pay" },
  { id: "naver", label: "네이버페이", icon: "N pay" },
  { id: "bank", label: "무통장입금", icon: "🏦" },
];

const formatKrw = (v) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(v);

const paymentLabel = computed(() => {
  const m = paymentMethods.find((p) => p.id === selectedPayment.value);
  return m ? m.label : "-";
});

const saveAndPay = () =>
  alert(`✅ 결제가 완료되었습니다!\n결제수단: ${paymentLabel.value}\n결제금액: ${formatKrw(finalTotal.value)}`);
</script>

<style scoped lang="scss">
$main: #53b4a1;
$line: #e7e7e7;
$bg: #f5f7f7;
$shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
$form-radius: 10px;

/* ✅ 전체 배경 */
.checkout-area {
  background: $bg;
  padding: 80px 0;
  border-bottom: 1px solid #e3e3e3;
}

/* ✅ 마지막 카드 뒤 배경 */
.payment_bg {
  background: $bg;
  padding: 60px 0 120px;
}

/* 카드 정렬 */
.card-test {
  display: flex;
  justify-content: center;
  gap: 40px;
}

/* 공통 카드 스타일 */
.form_card,
.summary_card {
  background: #fff;
  border-radius: $form-radius;
  box-shadow: $shadow;
  padding: 30px 40px;
  border: 1px solid transparent;
  position: relative;
  transition: all 0.3s ease;
  width: 360px;

  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 8px;
    background: $main;
    border-top-left-radius: $form-radius;
    border-top-right-radius: $form-radius;
  }

  &:hover {
    border-color: $main;
    background: #f9fdfd;
    box-shadow: 0 8px 25px rgba(83, 180, 161, 0.25);
  }

  .submit_btn {
    width: 100%;
    padding: 14px 0;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background: $main;
    border: none;
    border-radius: 6px;
    margin-top: 10px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background: darken($main, 8%);
    }
  }
}

/* ✅ 결제방법 카드 */
.payment_card {
  width: 900px;
  margin: 0 auto;

  .pay-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }

  .pay-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px 0;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      border-color: $main;
    }

    &.selected {
      border-color: $main;
      background: #e9f8f8;
      color: $main;
    }
  }
}
</style>
