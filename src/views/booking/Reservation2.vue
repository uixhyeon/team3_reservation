<template>
  <section class="reserve-page">
    <div class="inner">
      <Stepper :current-step="2" />

      <div class="wrap_reserv">
        <!-- 위쪽 2개 카드 (Grid 정렬) -->
        <div class="reserve-container">
          <!-- 사물함 예약 카드 -->
          <div class="form_card line">
            <div class="card_header">
              <h2>정보</h2>
            </div>
            <div class="card_content">
              <table>
                <colgroup>
                  <col style="width: 65%" />
                  <!-- 왼쪽열 -->
                  <col style="width: 35%" />
                  <!-- 오른쪽열 -->
                </colgroup>
                <tbody>
                  <tr>
                    <td>성함</td>
                    <td>사물함 대여</td>
                  </tr>
                  <tr>
                    <td>휴대폰</td>
                    <td>사물함 대여</td>
                  </tr>
                  <tr>
                    <td>사물함사이즈</td>
                    <td>사물함 대여</td>
                  </tr>
                  <tr>
                    <td>대여장소</td>
                    <td>사물함 대여</td>
                  </tr>
                  <tr>
                    <td>예약날짜</td>
                    <td>사물함 대여</td>
                  </tr>
                  <tr>
                    <td>픽업장소</td>
                    <td>사물함 대여</td>
                  </tr>
                  <tr>
                    <td>배송지정일1</td>
                    <td>입력 필요</td>
                  </tr>
                  <tr>
                    <td>주소</td>
                    <td>입력 필요</td>
                  </tr>
                  <tr>
                    <td>상세주소</td>
                    <td>입력 필요</td>
                  </tr>
                  <tr>
                    <td>배송일2</td>
                    <td>입력 필요</td>
                  </tr>
                  <tr class="total">
                    <td>총 결제금액</td>
                    <td><strong>29,000원</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 선택 상품 요약 카드 -->
          <div class="summary_card line">
            <h2 class="card_title">선택 상품 요약</h2>
            <ul>
              <li v-for="tab in selectedTabs" :key="tab">{{ tab }} — {{ formatKrw(prices[tab]) }}</li>
            </ul>

            <div class="divider"></div>

            <div class="benefits">
              <h4>마일리지 / 쿠폰 사용</h4>
              <div class="benefit-row">
                <label class="inline">
                  <input type="checkbox" v-model="useCoupon" />
                  Welcome 쿠폰 - 3,000원
                </label>
                <span class="muted" v-if="useCoupon"> - {{ formatKrw(3000) }} </span>
              </div>

              <div class="benefit-row">
                <label class="inline">
                  <input type="checkbox" v-model="usePoints" />
                  포인트 - 2,500P
                </label>
                <span class="muted" v-if="usePoints"> - {{ formatKrw(2500) }} </span>
              </div>
            </div>

            <div class="total-row">
              <span>총 결제금액</span>
              <strong>{{ formatKrw(finalTotal) }}</strong>
            </div>
          </div>
        </div>

        <!-- 결제 카드 (아래에) -->
        <div class="paysection">
          <div class="payment_card">
            <div class="card_header">
              <h3>결제방법 선택</h3>
            </div>
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
            </div>
          </div>
          <button class="submit_btn" @click="saveAndPay">결제하기</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import Stepper from "@/components/reserv/Stepper.vue";

const selectedTabs = ref(["사물함 예약"]);
const useCoupon = ref(true);
const usePoints = ref(true);
const selectedPayment = ref("card");

const prices = {
  "사물함 예약": 29000,
  "짐 가져오기": 15000,
  "집으로 배송하기": 20000,
};

const totalPrice = computed(() => selectedTabs.value.reduce((sum, tab) => sum + prices[tab], 0));

const discountAmount = computed(() => {
  let discount = 0;
  if (useCoupon.value) discount += 3000;
  if (usePoints.value) discount += 2500;
  return Math.min(discount, totalPrice.value);
});

const finalTotal = computed(() => Math.max(totalPrice.value - discountAmount.value, 0));

const paymentMethods = [
  { id: "card", label: "신용카드", icon: "💳" },
  { id: "kakao", label: "카카오페이", icon: "💬 pay" },
  { id: "naver", label: "네이버페이", icon: "N pay" },
  { id: "bank", label: "무통장입금", icon: "🏦" },
];

const formatKrw = (v) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(v);

const paymentLabel = computed(() => {
  const m = paymentMethods.find((p) => p.id === selectedPayment.value);
  return m ? m.label : "-";
});

const saveAndPay = () =>
  alert(`✅ 결제가 완료되었습니다!\n결제수단: ${paymentLabel.value}\n결제금액: ${formatKrw(finalTotal.value)}`);
</script>

<style lang="scss" scoped>
@use "/src/assets/style/variables" as *;

/* =========================================================
Reservation3 — 고정형 레이아웃 (max-width: 1320px)
========================================================= */
.reserve-page {
  background: #f5f7f7;
  min-height: 60rem;
  width: 100%;
  padding: 40px 0;
  overflow-x: hidden;
}

/* ✅ 공통 컨테이너 */
.inner {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  box-sizing: border-box;
}

.reserve-container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2.5rem;
  align-items: start;
}

.paysection {
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* =========================================================
 카드 공통
========================================================= */
.form_card,
.summary_card,
.payment_card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px 40px;
  position: relative;
  border: 1px solid transparent;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: #53b4a1;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}

/* =========================================================
   첫 번째 카드 (정보표)
========================================================= */
.form_card table {
  width: 100%;
  border-collapse: collapse;
  font-size: $text-sm;
  color: #333;

  td {
    padding: 6px 0; /* 위아래만 여백 — 좌우 여백 제거 */
    text-align: left;
    vertical-align: middle;
    line-height: 1.5;
  }

  td:first-child {
    width: 40%;
    color: #666;
    font-weight: 500;
  }

  td:last-child {
    width: 60%;
    color: #333;
  }

  tr.total {
    border-top: 1px solid #ddd;

    td:last-child {
      color: #53b4a1;
      font-weight: 700;
    }
  }
}

/* =========================================================
   Summary 카드
========================================================= */
.summary_card {
  .card_title {
    font-size: $text-md;
    font-weight: 600;
    color: #222;
    margin-bottom: 1rem;
  }

  ul {
    font-size: $text-md;
    color: #333;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  li{
     font-size: $text-sm;
  }
  
  }

  .benefit-row label {
    font-size: $text-sm;
    color: #444;
  }

  .muted {
    font-size: $text-sm;
    color: #d72638;
    font-weight: 500;
  }

  .total-row {
    font-size: $text-md;
    font-weight: 600;
    color: #222;
    // margin-top: 1rem;

    strong {
      color: #53b4a1;
      font-weight: 700;
      font-size: $text-md;
    }
  }
}

/* =========================================================
    결제 카드 (세 번째 카드)
========================================================= */
h2 {
  font-size: $text-md;
}
.payment_card {
  width: 100%;
  padding: 24px 32px !important; /* 내부 여백 20% 축소 */

  .card_header {
    margin-bottom: 12px !important; /* 제목-내용 간격 좁게 */
  }

  .card_content {
    margin-top: 0.25rem !important;
  }

  .pay-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px !important; /* 버튼 간격 축소 */
    margin-bottom: 12px !important;
  }

  .pay-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 0 !important; /* 버튼 높이 축소 */
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      border-color: #53b4a1;
    }

    &.selected {
      border-color: #53b4a1;
      background: #e9f8f8;
      color: #53b4a1;
      font-weight: 600;
    }

    .icon {
      font-size: $text-md;
    }
  }

  .submit_btn {
    margin-top: 16px !important; /* 결제 버튼 상단 여백 좁게 */
  }
}

/* =========================================================
    결제 버튼 공통
========================================================= */
.submit_btn {
  width: 70%;
  padding: 14px 0;
  font-weight: 600;
  font-size: $button;
  color: #fff;
  background: #53b4a1;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;

  &:hover {
    background: #449b8a;
  }
}

/* =========================================================
    반응형
========================================================= */
@media (max-width: 1024px) {
  .reserve-container {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 600px;
  }

  .form_card,
  .summary_card,
  .payment_card {
    width: 90%;
    margin-inline: auto;
  }
.wrap_reserv[data-v-cc353735] {
    display: flex
;
    flex-direction: column;
    gap: 20px;
}
}

/* =========================================================
   내부 구조 & 요약 카드 세부 스타일 보완
========================================================= */
.wrap_reserv {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
//  padding: 80px 0;
}

.card_header {
  margin-bottom: 15px; /* 결제완료 카드와 리듬 통일 */

  h3 {
    font-size: $text-md;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
}

.card_content {
  margin-top: 0.5rem;
}

.divider {
  height: 1px;
  background: #eee;
  margin: 1.25rem 0;
}

.benefit-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: 0.75rem;
  padding: 6px 0;

  label {
    font-size: $label-lg;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: $text-md;
  font-weight: 600;
  color: #333;
  margin-top: 20px; /* 여백 확장으로 시각적 안정감 */

  strong {
    color: #53b4a1;
    font-size: $text-md;
  }
}

</style>
