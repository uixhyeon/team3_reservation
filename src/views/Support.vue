<template>
  <div class="cs-wrap">
    <h1 class="title">고객센터</h1>

    <!-- 카드 섹션 -->
    <div class="cards">
      <!-- 이용방법 -->
      <button class="card" @click="goTo('/information')">
        <div class="icon">
          <img src="/images/faq/faq-1.png" alt="이용방법 아이콘" />
        </div>
        <div class="card-tit">이용방법이 궁금하신가요?</div>
        <div class="card-sub">이용안내 보러가기 &gt;</div>
      </button>

      <!-- 이용요금 -->
      <button class="card" @click="goTo('/information2')">
        <div class="icon">
          <img src="/images/faq/faq-2.png" alt="이용요금 아이콘" />
        </div>
        <div class="card-tit">이용요금이 궁금하신가요?</div>
        <div class="card-sub">이용요금 보러가기 &gt;</div>
      </button>

      <!-- 문의하기 -->
      <button class="card" @click="goTo('/support2')">
        <div class="icon">
          <img src="/images/faq/faq-3.png" alt="문의하기 아이콘" />
        </div>
        <div class="card-tit">다른 문의가 있으신가요?</div>
        <div class="card-sub">문의하러 가기 &gt;</div>
      </button>
    </div>

    <!-- FAQ -->
    <div class="faq-head">자주 묻는 질문</div>

    <!-- 탭 -->
    <div class="tabs">
      <button
        v-for="t in tabs"
        :key="t.key"
        class="tab"
        :class="{ active: activeTab === t.key }"
        @click="handleTabClick(t.key)"
      >
        {{ t.label }}
      </button>
    </div>

    <!-- FAQ 리스트 -->
    <div class="faq-list">
      <div
        v-for="(item, i) in pagedFaqs"
        :key="item.id"
        class="faq-item"
        :class="{ open: openIndex === i }"
      >
        <button class="faq-q" @click="toggle(i)">
          <span>{{ item.q }}</span>
          <svg viewBox="0 0 24 24" class="chev">
            <path :d="openIndex === i ? upPath : downPath" />
          </svg>
        </button>
        <div v-show="openIndex === i" class="faq-a">
          {{ item.a }}
        </div>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div class="pager">
      <button class="ghost" @click="goPrev">이전</button>
      <span class="page-indicator">{{ currentPage }} / {{ totalPages }}</span>
      <button class="ghost" @click="goNext">다음</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function goTo(path) {
  router.push(path)
}

/* 탭 정의 */
const tabs = [
  { key: 'all', label: '전체' },
  { key: 'reserve', label: '예약' },
  { key: 'ship', label: '배송' },
  { key: 'service', label: '서비스' },
  { key: 'pay', label: '결제' },
  { key: 'cancel', label: '취소/환불' },
]
const activeTab = ref('all')

/* FAQ 데이터 */
const allFaqs = [
  // 기존 항목
  { id: 1, cat: 'service', q: '보관 가능한 짐의 종류에는 어떤 것이 있나요?', a: '일반 박스, 의류류, 소형 가전 등 일반 물품 보관이 가능합니다.' },
  { id: 2, cat: 'reserve', q: '보관 기간은 최대 얼마까지 가능한가요?', a: '기간 제한 없이 장기 보관이 가능합니다.' },
  { id: 3, cat: 'service', q: '보관 공간에 CCTV나 보안 시스템이 있나요?', a: '24시간 CCTV 및 출입 통제 시스템을 운영합니다.' },
  { id: 4, cat: 'ship', q: '해외로도 배송이 가능한가요?', a: '현재는 국내 배송만 지원합니다.' },
  { id: 5, cat: 'ship', q: '배송 시간은 지정할 수 있나요?', a: '희망 시간대 지정이 가능하며 지역에 따라 상이합니다.' },
  { id: 6, cat: 'ship', q: '주말이나 공휴일에도 배송이 되나요?', a: '지역·상황에 따라 일부 제한될 수 있습니다.' },
  { id: 7, cat: 'cancel', q: '예약 취소나 환불은 어떻게 하나요?', a: '마이페이지에서 취소 요청 가능하며 정책에 따라 환불됩니다.' },
  { id: 8, cat: 'service', q: '영업시간이 어떻게 되나요?', a: '평일 09:00~18:00 / 토 09:00~13:00 (일·공휴일 휴무).' },
  { id: 9, cat: 'pay', q: '결제 수단은 어떤 것들이 있나요?', a: '신용/체크카드, 간편결제를 지원합니다.' },
  { id: 10, cat: 'reserve', q: '예약 변경은 어떻게 하나요?', a: '예약 상세에서 날짜/시간 변경이 가능합니다.' },
  { id: 11, cat: 'service', q: '현장 방문 상담도 가능한가요?', a: '사전 예약 후 가능하며 일부 지역에 한정됩니다.' },
  { id: 12, cat: 'cancel', q: '부분 취소가 가능한가요?', a: '진행 상태에 따라 가능 여부가 달라집니다.' },

  // 추가 항목 (2배 확장)
  { id: 13, cat: 'reserve', q: '보관 예약은 어떻게 진행되나요?', a: '홈페이지 또는 모바일 앱을 통해 간편하게 예약 가능합니다.' },
  { id: 14, cat: 'reserve', q: '예약 후 변경은 몇 번까지 가능한가요?', a: '제한 없이 변경 가능하지만 배송 전까지만 가능합니다.' },
  { id: 15, cat: 'ship', q: '배송 중 상태를 확인할 수 있나요?', a: '마이페이지의 배송 조회 기능에서 실시간 추적이 가능합니다.' },
  { id: 16, cat: 'ship', q: '배송이 지연될 경우 어떻게 되나요?', a: '예상 배송일보다 지연 시 문자 또는 알림을 통해 안내드립니다.' },
  { id: 17, cat: 'pay', q: '현금 결제는 가능한가요?', a: '현재는 카드 및 간편결제만 지원합니다.' },
  { id: 18, cat: 'pay', q: '세금계산서 발급이 가능한가요?', a: '사업자 회원의 경우 결제 완료 후 발급 가능합니다.' },
  { id: 19, cat: 'cancel', q: '환불은 얼마나 걸리나요?', a: '결제 수단에 따라 영업일 기준 2~5일 소요됩니다.' },
  { id: 20, cat: 'cancel', q: '예약 후 부분 취소가 가능한가요?', a: '서비스 진행 상태에 따라 일부 취소가 가능합니다.' },
  { id: 21, cat: 'service', q: '보관 장소는 어디에 있나요?', a: '전국 주요 도시에 물류센터가 있으며, 예약 시 선택 가능합니다.' },
  { id: 22, cat: 'service', q: '보관품 파손 시 보상 기준은 어떻게 되나요?', a: '보험 기준에 따라 보상 처리되며, 고객센터로 문의 바랍니다.' },
  { id: 23, cat: 'ship', q: '도서산간 지역도 배송이 가능한가요?', a: '일부 지역은 추가 요금이 발생할 수 있습니다.' },
  { id: 24, cat: 'pay', q: '영수증은 어디서 확인하나요?', a: '결제 완료 후 마이페이지 > 결제 내역에서 확인 가능합니다.' },
]
/* 페이지네이션 */
const perPage = 8
const currentPage = ref(1)

const filteredFaqs = computed(() => {
  if (activeTab.value === 'all') return allFaqs
  return allFaqs.filter(f => f.cat === activeTab.value)
})
const totalPages = computed(() => Math.max(1, Math.ceil(filteredFaqs.value.length / perPage)))
const pagedFaqs = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredFaqs.value.slice(start, start + perPage)
})

/* 아코디언 */
const openIndex = ref(-1)
function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}

/* 탭 클릭 */
function handleTabClick(key) {
  activeTab.value = key
  currentPage.value = 1
  openIndex.value = -1
}

/* 이전/다음 */
function goPrev() {
  currentPage.value = currentPage.value > 1 ? currentPage.value - 1 : totalPages.value
  openIndex.value = -1
}
function goNext() {
  currentPage.value = currentPage.value < totalPages.value ? currentPage.value + 1 : 1
  openIndex.value = -1
}

/* 아이콘 path */
const downPath = 'M6 9l6 6 6-6'
const upPath = 'M6 15l6-6 6 6'
</script>

<style scoped>
.cs-wrap {
  max-width: 950px;
  margin: 0 auto;
  padding: 80px 16px 120px;
  font-family: "Pretendard", "Noto Sans KR", sans-serif;
  color: #222;
}

/* 타이틀 */
.title {
  text-align: center;
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 30px;
  margin-top: -30px;
}

/* 카드 */
.cards {
  display: flex;
  justify-content: center;
  gap: 3%; /* 약간 여유 */
  margin-bottom: 80px;
}
.card {
  width: 290px;  /* 기존 230 → 약 1.2배 */
  height: 290px; /* 기존 230 → 약 1.2배 */
  background: #fff;
  border: 1px solid #e6eae9;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform .2s ease, box-shadow .2s ease;
  padding: 10% 2%;
}
.card:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.08); }

/* 아이콘 */
.icon {
  width: 90px;   /* 기존 70 → 1.2배 */
  height: 90px;  /* 기존 70 → 1.2배 */
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 텍스트 */
.card-tit { font-size: clamp(18px, 1.5vw, 20px); font-weight: 700; margin-bottom: 8px; } /* 기존 17px → 20px */
.card-sub { font-size: 15px; color: #a0afaa; } /* 기존 13px → 15px */

/* FAQ */
.faq-head {
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #222;
}

/* 탭 */
.tabs {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 40px;
}
.tab {
  font-size: clamp(20px, 1.5vw, 20px);
  font-weight: 500;
  border: 1px solid #dcdedc;
  border-radius: 6px;
  padding: 10px 28px;
  background: #fff;
  color: #6b7a76;
  transition: all 0.2s ease;
  cursor: pointer;
}
.tab:hover { border-color: #bfcac7; }
.tab.active { background: #2b8c7f; color: #fff; border-color: #2b8c7f; font-weight: 600; }

/* FAQ 리스트 */
.faq-list {
  border: 1px solid #e8eeec;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.faq-item { border-bottom: 1px solid #eef2f1; }
.faq-item:last-child { border-bottom: none; }

/* 질문 버튼 */
.faq-q {
  appearance: none;
  border: none;
  background: #fff;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 22px 26px;
  font-size: clamp(17px, 2vw, 18px);
  color: #3d3d3d;
  cursor: pointer;
  transition: background 0.2s ease;
  font-weight: 600;
}
.faq-q:hover { background: #f8fbfa; }

/* 답변 */
.faq-a {
  padding: 18px 24px 20px;
  font-size: clamp(17px, 2vw, 18px);
  color: #657370;
  background: #fbfdfc;
  transition: all 0.25s ease;
  font-weight: 600;
}
.faq-item.open .faq-a {
  color: #ffffff;
  background-color: #469b97;
}

/* 아이콘 */
.chev {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  stroke-width: 1.8;
  fill: none;
}

/* 페이지네이션 */
.pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  margin-top: 30px;
}
.ghost {
  font-size: 14px;
  border: 1px solid #e2e5e4;
  background: #fff;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.ghost:hover { background: #f8fbfa; }
.page-indicator { font-size: 14px; color: #6b7a76; }

/* 반응형 */
@media (max-width: 769px) {
  .cards { flex-direction: column; align-items: center; gap: 24px; }
  .card { width: 260px; height: 240px; }
  .tabs { flex-wrap: wrap; gap: 10px; }
  .tab { font-size: 17px; padding: 9px 20px; }
}
</style>
