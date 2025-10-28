<template>
  <div class="wrap">
    <Stepper :current-step="1" />
    <div class="background inner">
      <div class="container">
        <!-- 왼쪽 입력 카드 -->
        <div class="left">
          <!-- 사물함 예약 -->
          <div class="form_card" :class="{ open: openSection === 'locker' }">
            <div class="card_header" @click="toggleSection('locker')">
              <h3>사물함 예약</h3>
           <i
      v-if="isLockerComplete"
      class="fa-solid fa-check"
      style="color: #53b4a1;"
    ></i>
            </div>

            <transition name="fade">
              <div v-show="openSection === 'locker'" class="card_content" @click.stop>
                <!-- 이름 -->
                <div class="form_group">
                  <label>성함*</label>
                  <input type="text" placeholder="성함을 입력해주세요" v-model="form.name" />
                  <p class="label">문자만 입력하세요</p>
                </div>

                <!-- 전화번호 -->
                <div class="form_group">
                  <label>휴대폰 번호*</label>
                  <input type="text" placeholder="01012345678 (- 제외)" v-model="form.phone" />
                  <p class="label">숫자만 입력해주세요</p>
                </div>

                <!-- 사이즈 -->
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

                <!-- ✅ 주소 선택 -->
                <div class="form_group">
                  <label>대여 장소*</label>
                  <div class="addr-input">
                    <input
                      type="text"
                      placeholder="지번 및 주소를 입력해주세요"
                      v-model="form.address"
                      readonly
                    />
                    <button type="button" class="mini-btn" @click="showModal = true">
                      지점 선택
                    </button>
                  </div>
                  <p class="label">대여장소를 선택해 주세요</p>

                  <!-- ✅ 지점선택 모달 -->
                  <BranchSelectModal
                    :open="showModal"
                    :locations="locations"
                    @close="showModal = false"
                    @selected="handleSelect"
                  />
                </div>

                <!-- ✅ 예약 기간 -->
                <div class="form_group">
                  <label>예약 기간*</label>
                  <VueDatePicker
                    v-model="form.dateRange"
                    range
                    locale="ko"
                    placeholder="기간을 선택하세요"
                    :enable-time-picker="false"
                    format="yyyy-MM-dd"
                  />
                  <p class="label">시작일과 종료일을 한 번에 선택할 수 있습니다.</p>
                </div>
              </div>
            </transition>
          </div>

          <!-- 짐 가져오기 -->
          <div class="form_card" :class="{ open: openSection === 'arrival' }">
            <div class="card_header" @click="toggleSection('arrival')">
              <h3>짐 가져오기</h3>
           <i
      v-if="isArrivalComplete"
      class="fa-solid fa-check"
      style="color: #53b4a1;"
    ></i>
            </div>

            <transition name="fade">
              <div v-show="openSection === 'arrival'" class="card_content" @click.stop>
                <div class="form_group">
                  <label>주소*</label>
                  <div class="addr-input">
                    <input
                      type="text"
                      placeholder="지번 및 주소를 입력해주세요"
                      v-model="form.pickupAddress"
                      readonly
                      @click="openPickupAddr = true"
                    />
                    <button type="button" class="mini-btn" @click="openPickupAddr = true">
                      주소 검색
                    </button>
                  </div>
                  <p class="label">주소를 입력해 주세요</p>

                  <div class="blank16">{{ form.pickupAddress || '주소를 선택해주세요' }}</div>

                  <input
                    type="text"
                    placeholder="상세주소를 입력해주세요"
                    v-model="form.pickupAddressDetail"
                  />
                  <p class="label">상세주소를 입력해 주세요</p>
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
          <div class="form_card" :class="{ open: openSection === 'luggage' }">
            <div class="card_header" @click="toggleSection('luggage')">
              <h3>집으로 보내기</h3>
        <i
      v-if="isLuggageComplete"
      class="fa-solid fa-check"
      style="color: #53b4a1;"
    ></i>
 
            </div>

            <transition name="fade">
              <div v-show="openSection === 'luggage'" class="card_content" @click.stop>
                <div class="form_group">
                  <label>주소*</label>
                  <div class="addr-input">
                    <input
                      type="text"
                      placeholder="지번 및 주소를 입력해주세요"
                      v-model="form.homeAddress"
                      readonly
                      @click="openHomeAddr = true"
                    />
                    <button type="button" class="mini-btn" @click="openHomeAddr = true">
                      주소 검색
                    </button>
                  </div>
                  <p class="label">주소를 입력해 주세요</p>
                  <div class="blank16">{{ form.homeAddress || '주소를 선택해주세요' }}</div>
                  <input
                    type="text"
                    placeholder="상세주소를 입력해주세요"
                    v-model="form.homeAddressDetail"
                  />
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
                <col style="width: 65%;" />
                <col style="width: 35%;" />
              </colgroup>
              <tbody>
                <tr>
                  <td>예약 기간</td>
                  <td>
                    {{
                      form.dateRange
                        ? `${form.dateRange[0]} ~ ${form.dateRange[1]}`
                        : "선택 필요"
                    }}
                  </td>
                </tr>
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
                  <td><strong>{{ formatKrw(totalPrice) }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="submit_btn" @click="goTopayment">입력 완료</button>
        </div>
      </div>
    </div>

    <!-- 모달들 -->
    <HySearch
      v-if="openHySearch"
      :open="openHySearch"
      :location="selectedLocation"
      @close="openHySearch = false"
      @select="(location) => {
        form.address = location.address;
        openHySearch = false;
      }"
    />

    <!-- 짐 가져오기 주소 -->
    <AddressPicker
      v-model="form.pickupAddress"
      :open="openPickupAddr"
      @close="openPickupAddr = false"
    />

    <!-- 집으로 보내기 주소 -->
    <AddressPicker
      v-model="form.homeAddress"
      :open="openHomeAddr"
      @close="openHomeAddr = false"
    />
  </div>
</template>


<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import Stepper from "@/components/reserv/Stepper.vue";
import AddressPicker from "@/components/reserv/AddressPicker.vue";
import BranchSelectModal from "@/components/reserv/BranchSelectModal.vue";
import { watch, onMounted } from "vue";


const router = useRouter();
const goTopayment = () => {
  alert("입력완료");
  router.push("/reservation2");
};


//  DatePicker import
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// //HySearch
// import HySearch from "@/views/booking/HySearch.vue";

//=======로컬================


// ===============열닫토글=================
const openSection = ref("locker");
const toggleSection = (name) => {
  openSection.value = openSection.value === name ? null : name;
};

const showModal = ref(false);

// 지점 데이터 (실제로는 API에서 가져올 데이터)
const locations = [
  {
    id: 1,
    name: "칠성시장점",
    address: "대구광역시 중구 동성로2가 189-1",
    lockers: "잔여 사물함 S: 2개 XL: 2개",
    lat: 35.8714,
    lng: 128.6014,
    status: "운영중",
    distance: "0.2km",
  },
  {
    id: 2,
    name: "동성로점",
    address: "대구광역시 중구 동성로 123",
    lockers: "잔여 사물함 S: 5개 XL: 1개",
    lat: 35.87,
    lng: 128.6,
    status: "운영중",
    distance: "0.5km",
  },
  {
    id: 3,
    name: "중앙로점",
    address: "대구광역시 중구 중앙대로 456",
    lockers: "잔여 사물함 S: 3개 XL: 3개",
    lat: 35.872,
    lng: 128.602,
    status: "운영중",
    distance: "0.8km",
  },
  {
    id: 4,
    name: "서문시장점",
    address: "대구광역시 중구 대신동 115-1",
    lockers: "잔여 사물함 S: 4개 XL: 2개",
    lat: 35.8698,
    lng: 128.5856,
    status: "운영중",
    distance: "1.2km",
  },
  {
    id: 5,
    name: "반월당점",
    address: "대구광역시 중구 동성로1가 88-1",
    lockers: "잔여 사물함 S: 1개 XL: 4개",
    lat: 35.8667,
    lng: 128.5956,
    status: "운영중",
    distance: "1.5km",
  },
  {
    id: 6,
    name: "대구역점",
    address: "대구광역시 동구 동부로 149",
    lockers: "잔여 사물함 S: 6개 XL: 3개",
    lat: 35.8759,
    lng: 128.6285,
    status: "운영중",
    distance: "2.1km",
  },
  {
    id: 7,
    name: "수성못점",
    address: "대구광역시 수성구 두산동 100",
    lockers: "잔여 사물함 S: 3개 XL: 2개",
    lat: 35.8251,
    lng: 128.6304,
    status: "운영중",
    distance: "3.2km",
  },
  {
    id: 8,
    name: "동대구역점",
    address: "대구광역시 동구 동부로 149",
    lockers: "잔여 사물함 S: 2개 XL: 1개",
    lat: 35.8779,
    lng: 128.6285,
    status: "점검중",
    distance: "2.3km",
  },
];

function handleSelect(location) {
  console.log("선택된 지점:", location);
  showModal.value = false;
}

const openAddr = ref(false);

const openPickupAddr = ref(false); // 짐 가져오기용 모달
const openHomeAddr = ref(false);   // 집으로 보내기용 모달

const form = ref({
  name: "",
  phone: "",
  size: "",
  address: "",
  dateRange: null, // ✅ 추가 — 기간 저장
  pickupDate: "",
  pickupAddress: "",
  pickupAddressDetail: "",
  pickupDate: "",
  homeAddress: "",
  homeAddressDetail: "",
  deliveryDate: "",
});

// ================코드..==================
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
const totalPrice = computed(() => {
  let total = 0;
  if (isLockerComplete.value) total += prices.locker;
  if (isArrivalComplete.value) total += prices.arrival;
  if (isLuggageComplete.value) total += prices.luggage;
  return total;
});

const formatKrw = (value) => new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(value);

const handleSubmit = () => {
  alert(`"${selectedService.value}" 예약 정보가 저장되었습니다.`);
};
//=======체크표시=========
const isLockerComplete = computed(() => {
  const f = form.value;
  return (
    f.name.trim() !== "" &&
    f.phone.trim() !== "" &&
    f.size.trim() !== "" &&
    f.address.trim() !== "" &&
    f.dateRange &&
    f.dateRange[0] &&
    f.dateRange[1]
  );
});

const isArrivalComplete = computed(() => {
  const f = form.value;
  return (
    f.pickupAddress.trim() !== "" &&
    f.pickupAddressDetail.trim() !== "" &&
    f.pickupDate.trim() !== ""
  );
});

const isLuggageComplete = computed(() => {
  const f = form.value;
  return (
    f.homeAddress.trim() !== "" &&
    f.homeAddressDetail.trim() !== "" &&
    f.deliveryDate.trim() !== ""
  );
});


// ========================
defineProps({
  open: Boolean,
  locations: Array
});
defineEmits(["close", "selected"]);

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
    // max-width: 1400px;
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



// 기간입력 ui
/* =========================================================
VueDatePicker 라인형 입력창 커스터마이징
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
    border-bottom: 1px solid #53b4a1 !important; /* ✅ 메인 컬러 */
    outline: none !important;
  }
}

/* ✅ 불필요한 아이콘, 박스 제거 */
.form_group .dp__input_icon {
  display: none !important;
}
.form_group .dp__input_wrap {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}
.form_group .dp__main {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}

/* ✅ 팝업 달력 스타일 약간 정돈 */
.dp__outer_menu_wrap {
  border-radius: 10px !important;
  border: 1px solid #ddd !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}
:deep(.dp__input) {
  width: 100%;
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid #e7e7e7 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 0 !important; /* ✅ 패딩 완전 제거 */
  font-size: 14px !important;
  color: #333 !important;
  transition: border-color 0.25s ease;

  &::placeholder {
    color: #aaa !important;
  }

  &:focus {
    border-bottom: 1px solid #53b4a1 !important; /* ✅ 메인컬러 */
    outline: none !important;
  }
}

:deep(.dp__input:focus) {
  border-bottom: 1px solid #53b4a1 !important;
  outline: none !important;
}
:deep(.dp__input_icon) {
  display: none !important;
}
</style>
