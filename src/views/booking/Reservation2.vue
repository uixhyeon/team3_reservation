<template>
  <div class="wrap">
    <Stepper :current-step="2" />

    <!-- ✅ 상단 wrapper 교체 -->
    <div class="background inner">

    <div class="wrap_reserv">
      <!-- ✅ 상단 2개 카드 (Grid 정렬) -->
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
                <col style="width: 35%" />
              </colgroup>
              <tbody>
<tr><td>이름</td><td>{{ form.name }}</td></tr>
            <tr><td>휴대폰</td><td>{{ form.phone }}</td></tr>
            <tr><td>사물함</td><td>{{ form.size }}</td></tr>
            <tr><td>주소</td><td>{{ form.address }}</td></tr>
            <tr><td>기간</td><td>{{ form.dateRange ? `${form.dateRange[0]} ~ ${form.dateRange[1]}` : '' }}</td></tr>

                <tr><td>성함</td><td>사물함 대여</td></tr>
                <tr><td>휴대폰</td><td>사물함 대여</td></tr>
                <tr><td>사물함사이즈</td><td>사물함 대여</td></tr>
                <tr><td>대여장소</td><td>사물함 대여</td></tr>
                <tr><td>예약날짜</td><td>사물함 대여</td></tr>
                <tr><td>픽업장소</td><td>사물함 대여</td></tr>
                <tr><td>배송지정일1</td><td>입력 필요</td></tr>
                <tr><td>주소</td><td>입력 필요</td></tr>
                <tr><td>상세주소</td><td>입력 필요</td></tr>
                <tr><td>배송일2</td><td>입력 필요</td></tr>
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

      <!-- ✅ 결제 카드 (아래) -->
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
</div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Stepper from "@/components/reserv/Stepper.vue";

// ✅ route로 전달된 form 데이터 가져오기
const route = useRoute();
const form = ref(
  route.query.form
    ? JSON.parse(route.query.form) // 문자열 → 객체로 변환
    : {
        name: "",
        phone: "",
        size: "",
        address: "",
        dateRange: [],
      }
);

// ✅ 선택 상품 관련
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

// ✅ 결제 수단 리스트
const paymentMethods = [
  { id: "card", label: "신용카드", icon: "💳" },
  { id: "kakao", label: "카카오페이", icon: "💬 pay" },
  { id: "naver", label: "네이버페이", icon: "N pay" },
  { id: "bank", label: "무통장입금", icon: "🏦" },
];

// ✅ 통화 포맷 함수
const formatKrw = (v) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(v);

const paymentLabel = computed(() => {
  const m = paymentMethods.find((p) => p.id === selectedPayment.value);
  return m ? m.label : "-";
});

const router = useRouter();

// ✅ 결제 완료 후 3단계로 이동
const saveAndPay = () => {
  alert(
    `✅ 결제가 완료되었습니다!\n결제수단: ${paymentLabel.value}\n결제금액: ${formatKrw(finalTotal.value)}`
  );
  router.push("/reservation3");
};
</script>

<style lang="scss" scoped>
@use "/src/assets/style/variables" as *;
/* =========================================================
✅ 페이지 전체 배경 / 기본 레이아웃 구조
========================================================= */
.background.inner {
  background: #f5f7f7;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
}

.wrap {
  background: #f5f7f7;
  padding: 40px 0;
}

/* =========================================================
✅ 공통 컨테이너 (내부 정렬 동일 유지)
========================================================= */
.wrap_reserv {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
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
✅ 카드 공통 스타일
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
✅ 첫 번째 카드 (정보표)
========================================================= */
.form_card table {
  width: 100%;
  border-collapse: collapse;
  font-size: $text-sm;
  color: #333;

  td {
    padding: 6px 0;
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
✅ Summary 카드 (쿠폰/포인트/합계)
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

    li {
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

    strong {
      color: #53b4a1;
      font-weight: 700;
      font-size: $text-md;
    }
  }
}

/* =========================================================
✅ 결제 카드 (세 번째 카드)
========================================================= */
.payment_card {
  width: 100%;
  padding: 24px 32px !important;

  .card_header {
    margin-bottom: 12px !important;
  }

  .card_content {
    margin-top: 0.25rem !important;
  }

  .pay-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px !important;
    margin-bottom: 12px !important;
  }

  .pay-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 0 !important;
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
}

/* =========================================================
✅ 결제 버튼
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
  transition: 0.3s ease;

  &:hover {
    background: #449b8a;
  }
}

/* =========================================================
✅ Summary 카드 UI 향상 (이미지 디자인 기준)
========================================================= */
.summary_card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px 40px;
  border: 1px solid #f0f0f0;

  .card_title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #222;
    margin-bottom: 1.2rem;
  }

  ul {
    margin: 0 0 1.5rem 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      justify-content: space-between;
      font-size: 0.95rem;
      color: #333;
      margin-bottom: 0.4rem;

      .name {
        font-weight: 500;
      }

      .price {
        color: #444;
      }
    }
  }

  .divider {
    height: 1px;
    background: #eee;
    margin: 1.25rem 0;
  }

  .benefits {
    .subtitle {
      font-weight: 600;
      color: #222;
      margin-bottom: 0.8rem;
      font-size: 0.95rem;
    }

    .benefit-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;

      label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.9rem;
        color: #333;
      }

      .muted {
        font-size: 0.9rem;
        color: #d72638;
        font-weight: 600;
      }
    }
  }

  .total-row {
    margin-top: 1.2rem;
    padding-top: 0.8rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    color: #222;
    font-size: 1rem;

    strong {
      color: #53b4a1;
      font-size: 1.2rem;
      font-weight: 800;
    }
  }
}

/* =========================================================
✅ 여백 / 정렬 통일 (wrap 기준)
========================================================= */
.inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 40px;
  box-sizing: border-box;
}

.reserve-container {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2.5rem;
  width: 100%;
  align-items: flex-start;
}

.paysection {
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.3rem;
  margin-top: 1rem;
}

/* =========================================================
✅ 폰트 / 라인 높이 / 컬러 통일
========================================================= */
h2, h3 {
  font-weight: 600;
  line-height: 1.3;
  color: #222;
}

label {
  font-size: $label-md;
  font-weight: 500;
  color: #555;
}

strong {
  color: #53b4a1;
  font-weight: 700;
}

.form_card,
.summary_card,
.payment_card {
  font-size: $text-sm;
  line-height: 1.6;
  color: #444;
}

.label {
  font-size: $label-sm;
  color: #888;
  margin-top: 4px;
}

table td {
  vertical-align: middle;
  line-height: 1.5;
}

table tr {
  border-bottom: 1px solid #e7e7e7;
}

table tr:last-child {
  border-bottom: none;
}

/* =========================================================
✅ Stepper / Container 여백 조정
========================================================= */
.Stepper {
  margin-bottom: 40px;
}

.container {
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2.5rem;
  align-items: flex-start;
}

/* =========================================================
✅ VueDatePicker 라인형 커스터마이징
========================================================= */
.form_group .dp__input_wrap {
  width: 100%;
}

.form_group .dp__input {
  width: 100%;
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid #e7e7e7 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 10px 5px !important;
  font-size: 14px !important;
  color: #333 !important;
  transition: border-color 0.25s ease;

  &::placeholder {
    color: #aaa !important;
  }

  &:focus {
    border-bottom: 1px solid #53b4a1 !important;
    outline: none !important;
  }
}

.form_group .dp__input_icon {
  display: none !important;
}

.form_group .dp__input_wrap,
.form_group .dp__main {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}

/* =========================================================
✅ Transition 효과
========================================================= */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 800px;
}

/* =========================================================
✅ 반응형
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

  .wrap_reserv {
    gap: 20px;
  }

  .submit_btn {
    width: 90%;
    font-size: $text-md;
  }

  .inner {
    .container {
      width: 100%;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .left {
      gap: 20px;
    }
  }
}

@media (max-width: 450px) {
  .inner {
    .container {
      width: 90%;
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .left {
      gap: 10px;
    }
  }
}


</style>
