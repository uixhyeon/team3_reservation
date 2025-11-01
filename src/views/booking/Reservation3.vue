<template>
  <!-- ✅ 결제 완료 -->
  <section class="reserve-page">
    <div class="inner">
      <Stepper :current-step="3" />

      <div class="card-test">
        <div class="form_card receipt_card">
          <!-- 💳 결제 완료 -->
          <div class="card_header">
            <h3>결제 완료</h3>
          </div>

          <div class="card_content">
            <table class="receipt_table">
              <colgroup>
                <col style="width: 65%;" />
                <col style="width: 35%;" />
              </colgroup>
              <tbody>
                <tr><td>결제 수단</td><td>{{ paymentLabel }}</td></tr>
                <tr v-if="useCoupon"><td>쿠폰 할인</td><td>- {{ formatKrw(3000) }}</td></tr>
                <tr v-if="usePoints"><td>포인트 사용</td><td>- {{ formatKrw(2500) }}</td></tr>
                <tr class="total">
                  <td>최종 결제 금액</td>
                  <td><strong>{{ formatKrw(finalTotal) }}</strong></td>
                </tr>
              </tbody>
            </table>

            <div class="receipt_footer">
              <p>주문번호 : 2025-1023-001</p>
              <p>결제일시 : {{ formattedNow }}</p>
            </div>
          </div>

          <!-- 📦 예약 완료 -->
          <div class="card_header">
            <h3>예약 완료</h3>
          </div>

          <div class="card_content">
            <!-- ✅ 요약 보기 -->
           <div v-if="!showDetail" class="summary-view">
  <h3 class="summary-title">예약 성공!</h3>

  <div class="branch-size">
    <span>{{ form.address || "지점 미선택" }}</span>
    <span>{{ form.size || "-" }} 사이즈</span>
  </div>

  <p class="service-type">{{ selectedServices.join(" | ") }}</p>

  <div class="date-box">
    {{ formatShortDate(form.dateRange[0]) }} ~ {{ formatShortDate(form.dateRange[1]) }}
  </div>

  <div class="pickup-delivery">
    <p v-if="form.pickupDate">픽업일 <span>{{ formatShortDate(form.pickupDate) }}</span></p>
    <p v-if="form.deliveryDate">배송요청일 <span>{{ formatShortDate(form.deliveryDate) }}</span></p>
  </div>

  <p class="toggle-mini" @click="showDetail = true">상세보기 ▸</p>

  
</div>


            <!-- ✅ 상세 보기 -->
            <div v-else class="detail-view">
              <table class="receipt_table">
                <colgroup>
                  <col style="width: 65%;" />
                  <col style="width: 35%;" />
                </colgroup>
                <tbody>
                  <tr v-if="form.name"><td>성함</td><td>{{ form.name }}</td></tr>
                  <tr v-if="form.phone"><td>휴대폰</td><td>{{ form.phone }}</td></tr>
                  <tr v-if="form.size"><td>사물함 사이즈</td><td>{{ form.size }}</td></tr>
                  <tr v-if="form.address"><td>대여 장소</td><td>{{ form.address }}</td></tr>
                  <tr v-if="form.dateRange && form.dateRange[0] && form.dateRange[1]">
                    <td>예약 기간</td>
                    <td>{{ formatDate(form.dateRange[0]) }} ~ {{ formatDate(form.dateRange[1]) }}</td>
                  </tr>
                  <tr v-if="form.pickupAddress"><td>픽업 주소</td><td>{{ form.pickupAddress }}</td></tr>
                  <tr v-if="form.pickupAddressDetail"><td>상세 주소</td><td>{{ form.pickupAddressDetail }}</td></tr>
                  <tr v-if="form.pickupDate"><td>픽업일</td><td>{{ formatDate(form.pickupDate) }}</td></tr>
                  <tr v-if="form.homeAddress"><td>배송 주소</td><td>{{ form.homeAddress }}</td></tr>
                  <tr v-if="form.homeAddressDetail"><td>상세 주소</td><td>{{ form.homeAddressDetail }}</td></tr>
                  <tr v-if="form.deliveryDate"><td>배송일</td><td>{{ formatDate(form.deliveryDate) }}</td></tr>
                </tbody>
              </table>

              <p class="toggle-mini" @click="showDetail = false">닫기 ▾</p>
            </div>
          </div>

          <!-- ✅ QR 코드는 항상 표시 (토글 밖으로 분리됨) -->
          <div class="qr-section always">
            <img :src="qrImage" alt="예약 QR코드" class="qr-thumb" @click="showQRModal = true" />
            <p class="qr-desc">예약 QR코드</p>
          </div>
        </div>

        <button class="submit_btn" @click="goToHome">홈으로 이동</button>
      </div>
    </div>

    <!-- ✅ QR 코드 확대 모달 -->
    <transition name="fade">
      <div v-if="showQRModal" class="qr-modal" @click.self="showQRModal = false">
        <div class="qr-modal-content">
          <img :src="qrImage" alt="예약 QR코드" class="qr-large" />
          <div class="qr-btn-row">
            <button @click="downloadQR">다운로드</button>
            <button @click="showQRModal = false">닫기</button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import Stepper from "@/components/reserv/Stepper.vue";

const route = useRoute();
const router = useRouter();

// ✅ 전달된 데이터 받기
const form = ref(
  route.query.form
    ? JSON.parse(route.query.form)
    : {
        name: "",
        phone: "",
        size: "",
        address: "",
        dateRange: [],
        pickupAddress: "",
        pickupAddressDetail: "",
        pickupDate: "",
        homeAddress: "",
        homeAddressDetail: "",
        deliveryDate: "",
      }
);

const useCoupon = ref(route.query.useCoupon === "true");
const usePoints = ref(route.query.usePoints === "true");
const selectedPayment = ref(route.query.payment || "card");
const total = Number(route.query.total) || 0;

// 결제 수단명
const paymentLabel = computed(() => {
  switch (selectedPayment.value) {
    case "card": return "💳 신용카드";
    case "kakao": return "💬 카카오페이";
    case "naver": return "N Pay";
    case "bank": return "🏦 무통장입금";
    default: return "-";
  }
});

// 할인 계산
const discount = computed(() => {
  let d = 0;
  if (useCoupon.value) d += 3000;
  if (usePoints.value) d += 2500;
  return d;
});

const finalTotal = computed(() => total);

// 통화 포맷
const formatKrw = (v) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(v);

// 현재 시각
const formattedNow = new Date().toLocaleString("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

// 홈으로 이동
const goToHome = () => {
  router.push("/");
};

// 모달띄우기
const showQRModal = ref(false);
const qrImage = "/public/images/reservation/qrcode.png"; // 실제 QR 이미지 경로

const downloadQR = () => {
  const link = document.createElement("a");
  link.href = qrImage;
  link.download = "예약_QR.png";
  link.click();
};



// ✅ 날짜 포맷 함수 제일 밑에 둑기

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// ✅ 요약 / 상세보기 상태
const showDetail = ref(false);

// ✅ 선택된 서비스 계산
const selectedServices = computed(() => {
  const list = [];
  if (form.value.size) list.push("사물함 대여");
  if (form.value.pickupAddress) list.push("짐 가져오기");
  if (form.value.homeAddress) list.push("짐 배송하기");
  return list;
});

// ✅ 짧은 날짜 포맷
const formatShortDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const y = String(d.getFullYear()).slice(2);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${y}.${m}.${day}`;
};

</script>
<style scoped lang="scss">
@use "/src/assets/style/variables" as *;

//====배경 레아웃================
.reserve-page {
  background: #f5f7f7;
}

.inner {
  width: 100%;
  // max-width: 1300px; 
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 40px 0 80px 0;
}

//====공통================
.form_card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06); 
  border: 1px solid #fff; 
  position: relative;
  width: 100%;           
  max-width: 768px;      
  padding: 30px 5vw;    
  box-sizing: border-box; 

  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; 
    height: 12px;
    background: $color_main;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .card_header h3 {
    font-size: $text-md;
    font-weight: 600;
    color: #333;
    margin: 0 0 15px;
  }
}

// 결제완료
.receipt_card {
  text-align: center;

  .check_icon {
    font-size: $title-md;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 18px;
    color: #222;
    margin-bottom: 20px;
  }

  .receipt_table {
    width: 100%;
    font-size: $text-sm;
    border-collapse: collapse;
    margin-bottom: 24px;

    tr {
      border-bottom: 1px solid #e7e7e7;

      td {
        padding: 10px 0;
        text-align: left;
        color: #444;

        &:first-child {
          width: 45%;
          color: #777;
        }
      }

      &.total td {
        font-weight: 500;
        color: #111;

        &:last-child {
          color: $color_main;
          font-size: $text-md;
        }
      }
    }
  }

  .receipt_footer {
    text-align: left;
    font-size: $label-md;
    color: #888;
    border-top: 1px dashed #e7e7e7;
    padding-top: 10px;
    margin-bottom: 20px;
  }
}

// 공통 버튼
.submit_btn {
  width: 80%;
  margin-top: 20px;
  max-width: 300px;
  padding: 14px 0;
  font-size: $button;
  font-weight: 600;
  color: #fff;
  background: $color_main;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease; 

  &:hover {
    background: $color_main_deep;
  }
}

.card-test {
  width: 100% ;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5f7f7;
}

// QR 코드
.qr-section {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;

  &.always {
    margin-top: 30px;
  }

  .qr-title {
    font-size: $text-md;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }

  .qr-thumb {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    border: 1px solid #ddd;
    cursor: pointer;
    transition: transform 0.2s ease;
    background: #fff;

    &:hover {
      transform: scale(1.05);
    }
  }

  .qr-desc {
    margin-top: 8px;
    font-size: $label-md;
    color: #777;
  }
}

// QR 모달
.qr-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.qr-modal-content {
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  text-align: center;
  max-width: 360px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

  .qr-large {
    width: 250px;
    height: 250px;
    border-radius: 10px;
    border: 1px solid #e7e7e7;
  }

  .qr-btn-row {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    gap: 10px;

    button {
      padding: 8px 14px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      transition: background 0.2s ease;

      &:first-child {
        background: $color_main;
        color: #fff;

        &:hover {
          background: $color_main_deep;
        }
      }

      &:last-child {
        background: #eee;

        &:hover {
          background: #ddd;
        }
      }
    }
  }
}

// 모달 애니메이션
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 토글 버튼
.toggle-mini {
  margin-top: 8px;
  font-size: 0.85rem;
  color: #999;
  cursor: pointer;
  text-align: right;
  padding-right: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: $color_main;
  }
}

// 요약 보기
.summary-view {
  width: 100%;

  &::before {
    content: "😊";
    display: block;
    font-size: 2.8rem;
    margin-bottom: 0.8rem;
  }

  .summary-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: $color_main;
    margin-bottom: 1.2rem;
  }

  .branch-size {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 0.8rem;

    span {
      border: 1px solid #ccc;
      border-radius: 30px;
      padding: 6px 20px;
      font-size: $label-md;
      color: #333;
      background: #fff;
    }
  }

  .service-type {
    color: #555;
    font-size: $label-md;
    margin-bottom: 1rem;
  }

  .date-box {
    background: $color_main_background;
    color: #222;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: $text-md;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 1.2rem;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .pickup-delivery {
    font-size: $label-md;
    color: #444;
    margin-bottom: 0.5rem;
    line-height: 1.6;

    p {
      display: flex;
      justify-content: center;
      gap: 10px;

      span {
        font-weight: 600;
        color: #111;
      }
    }
  }
}

// 미디어 쿼리
@media (max-width: 768px) {
  // .form_card {
  //   max-width: 90%;      
  //   padding: 24px 20px;  
  // }

  .receipt_table td {
    font-size: $label-sm; 
  }

  .submit_btn {
    width: 100%;         
    max-width: none;
  }
}
</style>