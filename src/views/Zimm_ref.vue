<template>
  <div class="res-inner">

<h1>Zimm_ref 예약창</h1>
    <!-- ✅ 예약 페이지 -->
    <div class="reservation_page">
      <div class="container">
        <!-- 왼쪽 입력 카드 -->
        <div class="left">
          <!-- 사물함 예약 -->
          <div class="form_card toggle_card" :class="{ open: openSection === 'locker' }">
            <div class="card_header" @click="toggleSection('locker')">
              <h3>사물함 예약</h3>
              <img src="https://placehold.co/24x24/aaa/fff?text=▼" :class="{ rotate: openSection === 'locker' }" />
            </div>

            <transition name="fade">
              <div v-show="openSection === 'locker'" class="card_content" @click.stop>
                <div class="form_group">
                  <label>성함*</label>
                  <input type="text" placeholder="성함을 입력해주세요" />
                  <p class="label">문자만 입력하세요</p>
                </div>

                <div class="form_group">
                  <label>휴대폰 번호*</label>
                  <input type="text" placeholder="01012345678 (- 제외)" />
                  <p class="label">숫자만 입력해주세요</p>
                </div>

                <div class="form_group">
                  <label>사물함 사이즈*</label>
                  <select>
                    <option value="">사이즈를 선택해 주세요</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <p class="label">필수 입력 사항 입니다.</p>
                </div>

                <div class="form_group">
                  <label>대여 장소*</label>
                  <input type="text" placeholder="지번 및 주소를 입력해주세요" />
                  <p class="label">대여장소를 선택해 주세요</p>
                </div>

                <div class="form_group">
                  <label>예약 날짜*</label>
                  <input type="date" />
                  <p class="label">날짜를 입력하세요</p>
                </div>
              </div>
            </transition>
          </div>

          <!-- 짐 가져오기 -->
          <div class="form_card toggle_card" :class="{ open: openSection === 'arrival' }">
            <div class="card_header" @click="toggleSection('arrival')">
              <h3>짐 가져오기</h3>
              <img src="https://placehold.co/24x24/aaa/fff?text=▼" :class="{ rotate: openSection === 'arrival' }" />
            </div>

            <transition name="fade">
              <div v-show="openSection === 'arrival'" class="card_content" @click.stop>

                <div class="form_group">
                  <label>픽업 장소*</label>
                  <input type="text" placeholder="지번 및 주소를 입력해주세요" />
                  <p class="label">픽업받으실 주소를 입력해 주세요</p>
                </div>

                <div class="form_group">
                  <label>배송 지정일*</label>
                  <input type="date" />
                  <p class="label">날짜를 입력하세요</p>
                </div>
              </div>
            </transition>
          </div>

          <!-- 짐 배송하기 -->
          <div class="form_card toggle_card" :class="{ open: openSection === 'luggage' }">
            <div class="card_header" @click="toggleSection('luggage')">
              <h3>집으로 보내기</h3>
              <img src="https://placehold.co/24x24/aaa/fff?text=▼" :class="{ rotate: openSection === 'luggage' }" />
            </div>

            <transition name="fade">
              <div v-show="openSection === 'luggage'" class="card_content" @click.stop>
                <div class="form_group">
                  <label>주소*</label>
                  <input type="text" placeholder="지번 및 주소를 입력해주세요" />
                  <p class="label">대여장소를 선택해 주세요</p>
                </div>

                <div class="form_group">
                  <label>상세주소*</label>
                  <input type="text" placeholder="상세주소를 입력해주세요" />
                  <p class="label">상세주소를 입력해 주세요</p>
                </div>

                <div class="form_group">
                  <label>배송일*</label>
                  <input type="date" />
                  <p class="label">배송일을 지정해 주세요</p>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- ✅ 오른쪽 요약 -->
        <div class="right">
          <div class="summary_card">
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
            <button class="submit_btn">입력 완료</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const openSection = ref("locker");
const toggleSection = (name) => {
  openSection.value = openSection.value === name ? null : name;
};
</script>
<style scoped lang="scss">
/* ========== 기본 스타일 ========== */
.reservation_page {
  background: #f5f7f7;
  padding: 80px 0;
}

.reservation_page .container {
  display: grid;
  grid-template-columns: 3fr 2fr; /* 좌우 반 나눔 */
  gap: 40px;
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  align-items: flex-start;
}

/* 왼쪽 카드 묶음 */
.reservation_page .left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 오른쪽 요약 카드 */
.reservation_page .right {
  position: sticky;
  top: 100px;
  align-self: flex-start;
}

/* ✅ 반응형 (1024px 이하) */
@media (max-width: 1024px) {
  .reservation_page .container {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .reservation_page .right {
    position: static;
  }
}

/* ========== 🪄 카드 공통 스타일 ========== */
.form_card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px 40px;
  border: 1px solid transparent;
  position: relative;
  transition: all 0.3s ease;
}

.form_card::before {
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

/* 카드 헤더 */
.form_card .card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.form_card .card_header h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.form_card .card_header img {
  width: 20px;
  transition: transform 0.3s ease;
}

.form_card .card_header .rotate {
  transform: rotate(180deg);
}

/* 카드 활성화 상태 */
.form_card.open {
  border-color: #53b4a1;
  background: #f9fdfd;
  box-shadow: 0 8px 25px rgba(83, 180, 161, 0.25);
}

/* 카드 내용 */
.form_card .card_content {
  margin-top: 15px;
}

/* 입력 그룹 */
.form_card .form_group {
  margin-bottom: 20px;
}

.form_card .form_group label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
  font-weight: 500;
}

.form_card .form_group input,
.form_card .form_group select {
  width: 100%;
  border: none;
  border-bottom: 1px solid #e7e7e7;
  background: transparent;
  font-size: 14px;
  padding: 10px 5px;
  color: #333;
  transition: border-color 0.2s ease;
}

.form_card .form_group input:focus,
.form_card .form_group select:focus {
  border-bottom: 1px solid #53b4a1;
  outline: none;
}

.form_card .form_group input::placeholder {
  color: #aaa;
}

.form_card .form_group .label {
  font-size: 13px;
  color: #888;
  margin-top: 4px;
}

/* ========== ✨ 오른쪽 요약 카드 ========== */
.summary_card {
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 40px 40px 30px;
  border: 1px solid transparent;
  position: relative;
  transition: all 0.3s ease;
}

.summary_card:hover {
  border-color: #53b4a1;
  background: #f9fdfd;
}

.summary_card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: #53b4a1;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.summary_card .card_title {
  font-size: 18px;
  font-weight: 600;
  color: #222;
  margin: 12px 0 20px;
}

/* 요약 테이블 */
.summary_card table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #444;
  margin-bottom: 24px;
}

.summary_card table tr {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e7e7e7;
}

.summary_card table tr:last-child {
  border-bottom: none;
}

.summary_card table td:first-child {
  color: #777;
}

.summary_card table tr.total td {
  font-weight: 600;
  color: #111;
}

.summary_card table tr.total td:last-child {
  font-size: 16px;
  color: #53b4a1;
}

/* 버튼 */
.summary_card .submit_btn {
  width: 100%;
  padding: 14px 0;
  font-weight: 600;
  font-size: 15px;
  color: #fff;
  background: #53b4a1;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;
}

.summary_card .submit_btn:hover {
  background: #449b8a;
}

/* ========== 🎞 토글 전환 애니메이션 ========== */
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
</style>
