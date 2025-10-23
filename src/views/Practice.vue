<template>
  <h1>Practice</h1>

  <!-- ✅ 결제완료 (고정형 카드 UI 단독) -->
  <div class="card-test">
    <div class="form_card receipt_card">
      <div class="card_header">
        <h3>결제 완료</h3>
      </div>

      <div class="card_content">

        <table class="receipt_table">
          <tr><td>상품명</td><td>사물함 대여</td></tr>
          <tr><td>결제 수단</td><td>신용카드 (💳)</td></tr>
          <tr><td>쿠폰 할인</td><td>- 3,000원</td></tr>
          <tr><td>포인트 사용</td><td>- 2,500원</td></tr>
          <tr class="total">
            <td>최종 결제 금액</td>
            <td><strong>23,500원</strong></td>
          </tr>
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
          <tr><td>상품명</td><td>사물함 대여</td></tr>
          <tr><td>결제 수단</td><td>신용카드 (💳)</td></tr>
          <tr><td>쿠폰 할인</td><td>- 3,000원</td></tr>
          <tr><td>포인트 사용</td><td>- 2,500원</td></tr>
          <tr class="total">
            <td>최종 결제 금액</td>
            <td><strong>23,500원</strong></td>
          </tr>
        </table>


        <button class="submit_btn">홈으로 이동</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 💬 별도의 스크립트 없음 (정적 UI 예제)
</script>

<style scoped lang="scss">
/* ========== 💳 공통 토큰 ========== */
$main: #53b4a1;
$line: #e7e7e7;
/* 💡 그림자 색이 hover 시 변해 보이지 않도록 대비를 낮춘 고정값 사용 */
$shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
$form-radius: 10px;

/* ✅ 페이지 배경 (고정) */
.card-test {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7f7;
  padding: 120px 0;
}

/* ✅ 카드 기본 구조 (hover 완전 비활성화 + 이유 주석 포함) */
.form_card {
  background: #fff;
  border-radius: $form-radius;
  box-shadow: $shadow;         // ✔ 항상 동일한 그림자(hover 시에도 절대 변화 없음)
  padding: 30px 40px;
  border: 1px solid #fff;      // ✔ 'transparent' 대신 흰색 고정 → hover 시 재렌더링에 의한 색 흔들림 방지
  position: relative;
  width: 450px;

  /* 🎨 상단 색상바 (브랜드 컬러) */
  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 8px;
    background: $main;
    border-top-left-radius: $form-radius;
    border-top-right-radius: $form-radius;
  }

  /* 🚫 hover 효과 완전 비활성화
     ────────────────────────────────────────────────────────────────
     왜?
     1) hover 시 브라우저가 border/그림자 레이어를 재렌더링(repaint)하며
        명암이 달라 보이는 현상이 생김 (특히 투명 테두리일 때 두드러짐).
     2) 디자인 일관성을 위해 카드 상태를 '정적'으로 고정.
     어떻게?
     - hover 블록 전체를 주석 처리
     - transition(전환)도 주석 처리하여 미세 애니메이션까지 차단
  */
  // &:hover {
  //   border-color: $main;
  //   background: #f9fdfd;
  //   box-shadow: 0 8px 25px rgba(83, 180, 161, 0.25);
  // }
  // transition: all 0.3s ease;

  .card_header h3 {
    font-size: 18px;
    font-weight: 600;
    color: #222;
    margin: 0 0 15px;
  }

  /* ✅ 버튼은 UX를 위해 hover '만' 유지 (카드는 고정)
     ────────────────────────────────────────────────────────────────
     - 카드와 무관한 요소이므로 버튼 hover는 사용자 피드백용으로 살림
     - 카드 hover와 분리되어 카드 그림자/배경에는 영향 없음
  */
  .submit_btn {
    width: 100%;
    padding: 14px 0;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background: $main;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s ease; /* 버튼만 부드럽게 */

    &:hover {
      background: darken($main, 8%);
    }
  }
}

/* ✅ 결제완료 카드 (영수증 문구/표 스타일) */
.receipt_card {
  text-align: center;

  .check_icon {
    font-size: 48px;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 18px;
    color: #222;
    margin-bottom: 20px;
  }

  .receipt_table {
    width: 100%;
    font-size: 14px;
    border-collapse: collapse;
    margin-bottom: 24px;

    tr {
      border-bottom: 1px solid $line;

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
          color: $main;
          font-size: 16px;
        }
      }
    }
  }

  .receipt_footer {
    text-align: left;
    font-size: 13px;
    color: #888;
    border-top: 1px dashed $line;
    padding-top: 10px;
    margin-bottom: 20px;
  }
}
</style>
