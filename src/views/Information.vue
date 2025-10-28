<template>
  <div class="info-inner">
    <section class="info-guide">
  <div class="info-head">
    <h2 class="info-title">이용 안내</h2>
    <p class="info-sub">무인보관함 이용 방법과 배송은 어떻게 신청하나요?</p>
  </div>

  <ol class="info-steps">
    <!-- 01 -->
    <li class="step-card">
      <div class="step-head">
        <span class="step-first">01</span>
        <span class="step-second">사물함 예약</span>
      </div>
      <hr class="step-line" />
      <p class="step-txt">원하는 지점과 <br>사물함 크기, <br>이용 날짜를 선택합니다.</p>
      <!-- 네비 -->
      <div class="step-icon">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/>
  </svg>
</div>
    </li>

    <!-- 02 -->
    <li class="step-card">
      <div class="step-head">
        <span class="step-first">02</span>
        <span class="step-second">배송 여부 선택</span>
      </div>
      <hr class="step-line" />
      <p class="step-txt">원하는 배송 방식을 <br>선택하세요.</p>
      <!-- 박스 -->
      <div class="step-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 8.5 12 12 3 8.5V6l9 3.5L21 6v2.5ZM3 10l9 3.5 9-3.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10Z"/>
        </svg>
      </div>
    </li>

    <!-- 03 -->
    <li class="step-card">
      <div class="step-head">
        <span class="step-first">03</span>
        <span class="step-second">결제</span>
      </div>
      <hr class="step-line" />
      <p class="step-txt">예약 확인 후 결제합니다.</p>
      <!-- 카드 -->
      <div class="step-icon">
         <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 3v2h18V9H3Zm5 6h4v-1H8v1Z"/>
        </svg>
      </div>
    </li>

    <!-- 04 -->
    <li class="step-card">
      <div class="step-head">
        <span class="step-first">04</span>
        <span class="step-second">지점 방문</span>
      </div>
      <hr class="step-line" />
      <p class="step-txt">지점에 방문해 <br>짐을 보관하세요.</p>
      <!-- 지점 -->
      <div class="step-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 21V9l9-6 9 6v12h-6v-5H9v5H3Zm8-11h2v2h-2v-2Zm0 4h2v2h-2v-2Z"/>
        </svg>
      </div>
    </li>
  </ol>
</section>
  </div>

</template>


<script setup></script>

<style scoped>
.info-inner {
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding-inline: 280px
}
.info-guide {
  text-align: left;
  margin: 80px auto;
  padding: 0 20px;
}

.info-head {
  margin-bottom: 40px;
}

.info-title {
  font-size: 24px;
  font-weight: 700;
  color: #000;
}

.info-sub {
  font-size: 15px;
  color: #555353;
}

.info-steps {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  list-style: none;
  max-width: 900px;
}

.step-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  padding: 24px 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* hover 효과 (선택적으로 추가 가능) */
.step-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

/* 카드 상단 헤더 */
.step-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
}

.step-first {
  color: #028587;
  font-weight: 600;
  font-size: 14px;
}

.step-second {
  color: #028587;
  font-weight: 700;
  font-size: 16px;
}

/* 구분선 */
.step-line {
  width: 80%;
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 8px 0 12px;
}

/* 본문 텍스트 */
.step-txt {
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  min-height: 60px; /* 줄바꿈 균일하게 맞춤 */
}

/* 아이콘 (초록색 원 배경 + 중앙 정렬) */
.step-icon {
  width: 48px;
  height: 48px;
  background-color: #028587;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
}

.step-icon svg {
  width: 26px;
  height: 26px;
  fill: #ffffff;
}

</style>