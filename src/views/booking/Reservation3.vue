<template>
  <!-- ✅ 결제완료 (고정형 카드 UI 단독) -->
  <section class="reserve-page">
    <div class="inner">
      <Stepper :current-step="3" />

      <div class="card-test">
        <div class="form_card receipt_card">
          <div class="card_header">
            <h3>결제 완료</h3>
          </div>

          <div class="card_content">
            <table class="receipt_table">
                <colgroup>
    <col style="width: 65%;" />   <!-- 왼쪽열 -->
    <col style="width: 35%;" />   <!-- 오른쪽열 -->
  </colgroup>
              <tbody>
                <tr><td>상품명</td><td>사물함 대여</td></tr>
                <tr><td>결제 수단</td><td>신용카드 (💳)</td></tr>
                <tr><td>쿠폰 할인</td><td>- 3,000원</td></tr>
                <tr><td>포인트 사용</td><td>- 2,500원</td></tr>
                <tr class="total">
                  <td>최종 결제 금액</td>
                  <td><strong>23,500원</strong></td>
                </tr>
              </tbody>
            </table>

            <div class="receipt_footer">
              <p>주문번호 : 2025-1023-001</p>
              <p>결제일시 : 2025.10.23 14:32</p>
            </div>
          </div>

          <div class="card_header">
            <h3>예약 완료</h3>
          </div>

          <div class="card_content">
            <table class="receipt_table">
                       <colgroup>
    <col style="width: 65%;" />   <!-- 왼쪽열 -->
    <col style="width: 35%;" />   <!-- 오른쪽열 -->
  </colgroup>
              <tbody>
                <tr><td>상품명</td><td>사물함 대여</td></tr>
                <tr><td>결제 수단</td><td>신용카드 (💳)</td></tr>
                <tr><td>쿠폰 할인</td><td>- 3,000원</td></tr>
                <tr><td>포인트 사용</td><td>- 2,500원</td></tr>
                <tr class="total">
                  <td>최종 결제 금액</td>
                  <td><strong>23,500원</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button class="submit_btn" @click="goToHome">홈으로 이동</button>
      </div>
    </div>
  </section>
</template>
    <script setup>
import { useRouter } from "vue-router";
import Stepper from "@/components/reserv/Stepper.vue";
const router = useRouter();
const goToHome= () => {
  router.push("/");
};


</script>

<style scoped lang="scss">
@use "/src/assets/style/variables" as *;

/* =========================================================
  페이지 배경 및 전체 레이아웃
========================================================= */
.reserve-page {
  background: #f5f7f7;
  // padding: 5rem 0;
  // min-height: 60rem;
}

.inner {
  width: 100%;
  max-width: 1120px; /* ✅ reservation2와 동일 폭 */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center; /* Stepper + 카드 중앙 정렬 */
  padding: 40px 0;
}

/* =========================================================
 카드 공통 스타일
========================================================= */
.form_card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06); // ✔ hover 시에도 변하지 않는 그림자
  padding: 30px 40px;
  border: 1px solid #fff; // ✔ hover 시 재렌더링 흔들림 방지
  position: relative;
  width: 600px;

  /* 상단 색상바 (브랜드 컬러) */
  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 8px;
    background: #53b4a1;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .card_header h3 {
    font-size:$text-md;
    font-weight: 600;
    color: #222;
    margin: 0 0 15px;
  }
}

/* =========================================================
  결제완료 / 영수증 카드
========================================================= */
.receipt_card {
  text-align: center;

  .check_icon {
    font-size:$title-md;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 18px;
    color: #222;
    margin-bottom: 20px;
  }

  /*  표 스타일 */
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
        font-weight: 700;
        color: #111;

        &:last-child {
          color: #53b4a1;
          font-size:$text-md;
        }
      }
    }
  }

  /* ✅ 하단 문구 */
  .receipt_footer {
    text-align: left;
    font-size: $label-md;
    color: #888;
    border-top: 1px dashed #e7e7e7;
    padding-top: 10px;
    margin-bottom: 20px;
  }
}

/* =========================================================
    버튼 (카드 내부 공통)
========================================================= */
.submit_btn {
  width: 80%;
  margin-top: 20px;
  max-width: 300px;
  padding: 14px 0;
  font-size: $button;
  font-weight: 600;
  color: #fff;
  background: #53b4a1;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease; /* 버튼만 부드럽게 */

  &:hover {
    background: #449b8a;
  }
}

/* =========================================================
   임시 레이아웃
========================================================= */
.card-test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f5f7f7;
}

</style>
