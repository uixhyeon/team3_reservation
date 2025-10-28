<template>
  <div class="wrap">
    <Stepper :current-step="1" />
    <div class="background inner ">
      <div class="container ">
        <!-- 왼쪽 입력 카드 -->
        <div class="left">
          <!-- 사물함 예약 -->
          <div class="form_card " :class="{ open: openSection === 'locker' }">
            <div class="card_header" @click="toggleSection('locker')">
              <h3>사물함 예약</h3>
              <img src="https://placehold.co/24x24/aaa/fff?text=▼" :class="{ rotate: openSection === 'locker' }" />
            </div>

            <transition name="fade">
              <div v-show="openSection === 'locker'" class="card_content" @click.stop>
                <div class="form_group">
                  <label>성함*</label>
                  <input type="text" placeholder="성함을 입력해주세요" v-model="form.name" />
                  <p class="label">문자만 입력하세요</p>
                </div>

                <div class="form_group">
                  <label>휴대폰 번호*</label>
                  <input type="text" placeholder="01012345678 (- 제외)" v-model="form.phone" />
                  <p class="label">숫자만 입력해주세요</p>
                </div>

                <div class="form_group">
                  <label>사물함 사이즈*</label>
                  <select v-model="form.size">
                    <option value="">사이즈를 선택해 주세요</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <p class="label">필수 입력 사항입니다.</p>
                </div>

                <!-- ✅ 주소 선택 (AddressPicker 연결) -->
                <div class="form_group">
                  <label>대여 장소*</label>
                  <div class="addr-input">
                    <input
                      type="text"
                      placeholder="지번 및 주소를 입력해주세요"
                      v-model="form.address"
                      readonly
                      @click="openAddr = true"
                    />
                    <button type="button" class="mini-btn" @click="openAddr = true">주소 검색</button>
                  </div>
                  <p class="label">대여장소를 선택해 주세요</p>
                </div>

                <div class="form_group">
                  <label>예약 날짜*</label>
                  <input type="date" v-model="form.date" />
                  <p class="label">날짜를 입력하세요</p>
                </div>
              </div>
            </transition>
          </div>

          <!-- 짐 가져오기 -->
          <div class="form_card " :class="{ open: openSection === 'arrival' }">
            <div class="card_header" @click="toggleSection('arrival')">
              <h3>짐 가져오기</h3>
              <img src="https://placehold.co/24x24/aaa/fff?text=▼" :class="{ rotate: openSection === 'arrival' }" />
            </div>

            <transition name="fade">
              <div v-show="openSection === 'arrival'" class="card_content" @click.stop>
                <div class="form_group">
                  <label>픽업 장소*</label>
                  <input type="text" placeholder="지번 및 주소를 입력해주세요" v-model="form.pickupAddress" />
                  <p class="label">픽업받으실 주소를 입력해 주세요</p>
                </div>

                <div class="form_group">
                  <label>배송 지정일*</label>
                  <input type="date" v-model="form.pickupDate" />
                  <p class="label">날짜를 입력하세요</p>
                </div>
              </div>
            </transition>
          </div>

          <!-- 집으로 보내기 -->
          <div class="form_card " :class="{ open: openSection === 'luggage' }">
            <div class="card_header" @click="toggleSection('luggage')">
              <h3>집으로 보내기</h3>
              <img src="https://placehold.co/24x24/aaa/fff?text=▼" :class="{ rotate: openSection === 'luggage' }" />
            </div>

            <transition name="fade">
              <div v-show="openSection === 'luggage'" class="card_content" @click.stop>
                <div class="form_group">
                  <label>주소*</label>
                  <input type="text" placeholder="지번 및 주소를 입력해주세요" v-model="form.homeAddress" />
                  <p class="label">주소를 입력해 주세요</p>
                  <div class="blank16">d</div>
                  <input type="text" placeholder="상세주소를 입력해주세요" v-model="form.detailAddress" />
                  <p class="label">상세주소를 입력해 주세요</p>
                </div>

                <div class="form_group">
                  <label>배송일*</label>
                  <input type="date" v-model="form.deliveryDate" />
                  <p class="label">배송일을 지정해 주세요</p>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- 오른쪽 요약 -->
        <div class="right">
          <div class="summary_card">
            <h2 class="card_title">선택 상품 요약</h2>
            <table>
                                <colgroup>
    <col style="width: 65%;" />   <!-- 왼쪽열 -->
    <col style="width: 35%;" />   <!-- 오른쪽열 -->
  </colgroup>
              <tbody>
                <tr>
                  <td>선택상품</td>
                  <td>{{ selectedService || "선택 필요" }}</td>
                </tr>
              <tr>
                <td>도착지</td>
                <td>{{ form.address || "입력 필요" }}</td>
              </tr>
              <tr>
                <td>수하물</td>
                <td>{{ form.size || "선택 필요" }}</td>
              </tr>
              <tr class="total">
                <td>총 결제금액</td>
                <td>
                  <strong>{{ formatKrw(totalPrice) }}</strong>
                </td>
              </tr>
            </tbody>
            </table>
          </div>
          <button class="submit_btn" @click="handleSubmit">입력 완료</button>
        </div>
      </div>
    </div>

    <!-- ✅ AddressPicker 모달 -->
    <AddressPicker v-model="form.address" :open="openAddr" @close="openAddr = false" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Stepper from "@/components/reserv/Stepper.vue";
import AddressPicker from "@/components/reserv/AddressPicker.vue";

const openSection = ref("locker");
const toggleSection = (name) => {
  openSection.value = openSection.value === name ? null : name;
};

const openAddr = ref(false);

const form = ref({
  name: "",
  phone: "",
  size: "",
  address: "",
  date: "",
  pickupAddress: "",
  pickupDate: "",
  homeAddress: "",
  detailAddress: "",
  deliveryDate: "",
});

const selectedService = computed(() => {
  switch (openSection.value) {
    case "locker":
      return "사물함 예약";
    case "arrival":
      return "짐 가져오기";
    case "luggage":
      return "집으로 보내기";
    default:
      return null;
  }
});

const prices = {
  locker: 29000,
  arrival: 15000,
  luggage: 20000,
};
const totalPrice = computed(() => prices[openSection.value] || 0);

const formatKrw = (value) => new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(value);

const handleSubmit = () => {
  alert(`"${selectedService.value}" 예약 정보가 저장되었습니다.`);
};
</script>

<style scoped lang="scss" >
@use "/src/assets/style/variables" as *;

/* =========================================================
페이지 전체 레이아웃
========================================================= */
.wrap {
  background: #f5f7f7;
  padding: 40px 0;
}

.inner {
  max-width: 1120px;
  margin: auto;

  .container {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 2.5rem;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    align-items: flex-start;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
  }

  .right {
    position: static; // 스크롤 고정 해제
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    align-items: center;
  }
}

.blank16 {
  height: 4px;
  color: transparent;
}

/* =========================================================
카드 공통 스타일
========================================================= */
.form_card,
.summary_card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
  position: relative;
  transition: all 0.3s ease;

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
왼쪽 입력 카드 (Form Card)
========================================================= */
.form_card {
  padding: 28px 40px 20px;

  .card_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    h3 {
      font-size: $text-md;
      font-weight: 600;
      margin: 0;
    }

    img {
      width: 20px;
      transition: transform 0.3s ease;
    }

    .rotate {
      transform: rotate(180deg);
    }
  }

  /* 입력 그룹 */
  .form_group {
    margin-bottom: 20px;

    label {
      display: block;
      font-size: $label-md;
      color: #555;
      margin-top: 20px;
      margin-bottom: 6px;
      font-weight: 500;
    }

    input,
    select {
      width: 100%;
      border: none;
      border-bottom: 1px solid #e7e7e7;
      background: transparent;
      font-size: $label-md;
      padding: 10px 5px;
      color: #333;
      transition: border-color 0.2s ease;

      &:focus {
        border-bottom: 1px solid #53b4a1;
        outline: none;
      }

      &::placeholder {
        color: #aaa;
      }
    }

    .label {
      font-size: $label-sm;
      color: #888;
      margin-top: 4px;
    }
  }

  /* 주소 입력 */
  .addr-input {
    display: flex;
    gap: 8px;
    align-items: center;

    .mini-btn {
      padding: 8px 10px;
      border-radius: 6px;
      background: #53b4a1;
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: $label-sm;

      &:hover {
        background: #449b8a;
      }
    }
  }
}

/* =========================================================
오른쪽 요약 카드 (Summary Card)
========================================================= */
.summary_card {
  width: 100%;
  border-radius: 8px;
  padding: 30px 40px;

  .card_title {
    font-size:$text-md;
    font-weight: 600;
    color: #222;
    margin-bottom: 20px;
  }

  /* ✅ 표 전체 구조 */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size:$text-sm;
    color: #444;
    margin-bottom: 24px;

    tr {
      display: table-row;
      border-bottom: 1px solid #e7e7e7;

      &:last-child {
        border-bottom: none;
      }

      &.total td {
        font-weight: 600;
        color: #111;

        &:last-child {
          font-size: $text-sm;
          color: #53b4a1;
        }
      }
    }

    td {
      display: table-cell;
      text-align: left; /* ✅ 왼쪽 정렬 */
      padding: 10px 0; /* ✅ 좌우 여백 제거 */
      vertical-align: middle;
    }

    td:first-child {
      color: #777;
      width: 40%;
    }
  }
}

/* =========================================================
버튼 (Submit)
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
  transition: 0.3s ease;

  &:hover {
    background: #449b8a;
  }
}

/* =========================================================
Transition 효과
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
Responsive 반응형
========================================================= */
@media (max-width: 1024px) {
  .inner {
    .container {
      width: 80%;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .left {
      gap: 20px;
    }
  }

  .form_card {
    padding: 30px 40px;
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
/* 1️⃣ Stepper와 카드의 공통 여백 기준을 동일하게 */
.inner {
  max-width: 1120px; /* ✅ Stepper와 카드 기준 통일 */
  margin: 0 auto;
  padding: 0 40px;   /* ✅ 좌우 여백 추가 (카드와 Stepper 간 기준선 일치) */
  box-sizing: border-box;
}

/* 2️⃣ container는 inner 안에 있으므로 max-width 빼기 */
.container {
  width: 100%;       /* ✅ inner 내부에서 꽉 차도록 */
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2.5rem;
  align-items: flex-start;
}

/* 3️⃣ Stepper 하단과 카드 상단 간격만 살짝 띄우기 */
.Stepper {
  margin-bottom: 40px;
}
</style>
