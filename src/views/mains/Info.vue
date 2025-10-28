<template>
  <div class="info-main">
    <section class="pricing-section" aria-label="요금 안내 섹션">
      <div class="inner">
        <h2 class="title">이용 요금이 궁금하신가요?</h2>

        <!-- 탭 -->
        <div class="tabs" role="tablist">
          <button
            class="tab"
            :class="{ active: activeTab === 'storage' }"
            role="tab"
            :aria-selected="activeTab === 'storage'"
            @click="activeTab = 'storage'">
            보관
          </button>
          <button
            class="tab"
            :class="{ active: activeTab === 'delivery' }"
            role="tab"
            :aria-selected="activeTab === 'delivery'"
            @click="activeTab = 'delivery'">
            배송
          </button>
        </div>

        <!-- 공통 캐러셀 패널 -->
        <div
          v-for="type in ['storage', 'delivery']"
          :key="type"
          v-show="activeTab === type"
          class="panel"
          role="tabpanel">
          <div class="carousel">
            <button class="nav prev" aria-label="이전" @click="prev(type)" :disabled="isAtStart(type)">‹</button>

            <div class="viewport">
              <div class="track" :style="trackStyle(type)">
                <article
                  v-for="(item, i) in type === 'storage' ? baseStorage : baseDelivery"
                  :key="item.id"
                  class="slide"
                  :id="item.id"
                  :style="slideStyle(type)">
                  <div class="thumb">
                    <img :src="item.img" :alt="item.label" loading="lazy" />
                  </div>
                  <h3 class="label">{{ item.label }}</h3>
                  <p class="meta">{{ item.meta }}</p>
                  <p v-if="item.price" class="price">{{ item.price }}</p>
                </article>
              </div>
            </div>

            <button class="nav next" aria-label="다음" @click="next(type)" :disabled="isAtEnd(type)">›</button>
          </div>

          <!-- ✅ 요금 안내 페이지로 이동 -->
          <div class="more-row">
            <router-link class="more" to="/information2"> 자세히 보러 가기 → </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, reactive, ref } from "vue";

/* ===== 데이터 ===== */
const baseStorage = [
  {
    id: "mini",
    label: "XS",
    meta: "에코백, 백팩, 서류 가방",
    price: "10,000원부터",
    img: "/public/images/mains/info/info-xs.png",
  },
  {
    id: "small",
    label: "S",
    meta: "에코백, 백팩, 서류 가방",
    price: "17,000원부터",
    img: "/public/images/mains/info/info-s.png",
  },
  {
    id: "medium",
    label: "M",
    meta: "에코백, 백팩, 서류 가방",
    price: "23,000원부터",
    img: "/public/images/mains/info/info-m.png",
  },
  {
    id: "large",
    label: "L",
    meta: "에코백, 백팩, 서류 가방",
    price: "29,000원부터",
    img: "/public/images/mains/info/info-l.png",
  },
  {
    id: "xlarge",
    label: "XL",
    meta: "에코백, 백팩, 서류 가방",
    price: "35,000원부터",
    img: "/public/images/mains/info/info-xl.png",
  },
];

const baseDelivery = [
  {
    id: "d1",
    label: "XS",
    meta: "도심 당일 픽업",
    price: "10,000원부터",
    img: "/public/images/mains/info/info-xs.png",
  },
  { id: "d2", label: "S", meta: "서울 · 수도권", price: "17,000원부터", img: "/public/images/mains/info/info-s.png" },
  { id: "d3", label: "M", meta: "전국 익일", price: "23,000원부터", img: "/public/images/mains/info/info-m.png" },
  { id: "d4", label: "L", meta: "공항 직행", price: "29,000원부터", img: "/public/images/mains/info/info-l.png" },
  { id: "d5", label: "XL", meta: "제주 · 도서", price: "35,000원부터", img: "/public/images/mains/info/info-xl.png" },
];

const activeTab = ref("storage");
const vw = ref(typeof window !== "undefined" ? window.innerWidth : 1920);
const onResize = () => (vw.value = window.innerWidth);
onMounted(() => window.addEventListener("resize", onResize));
onBeforeUnmount(() => window.removeEventListener("resize", onResize));

/* 반응형 설정 */
const perView = computed(() => {
  if (vw.value >= 1280) return 3;
  if (vw.value >= 769) return 2;
  return 1;
});

const state = reactive({
  storage: { index: 0 },
  delivery: { index: 0 },
});

function next(key) {
  const total = key === "storage" ? baseStorage.length : baseDelivery.length;
  const maxIndex = Math.max(0, total - perView.value);
  state[key].index = Math.min(state[key].index + 1, maxIndex);
}
function prev(key) {
  state[key].index = Math.max(state[key].index - 1, 0);
}
function isAtStart(key) {
  return state[key].index <= 0;
}
function isAtEnd(key) {
  const total = key === "storage" ? baseStorage.length : baseDelivery.length;
  const maxIndex = Math.max(0, total - perView.value);
  return state[key].index >= maxIndex;
}
function trackStyle(key) {
  const total = key === "storage" ? baseStorage.length : baseDelivery.length;
  const pct = -((100 / total) * state[key].index);
  return {
    width: `${(total * 100) / perView.value}%`,
    transform: `translateX(${pct}%)`,
    transition: "transform .45s ease",
    display: "flex",
  };
}
function slideStyle(key) {
  const total = key === "storage" ? baseStorage.length : baseDelivery.length;
  return { width: `${100 / total}%` };
}
</script>

<style scoped>
.info-main .pricing-section {
  padding: clamp(24px, 4vw, 56px) 0;
  color: #111;

  @media (max-width: 768px) {
    padding: 100px 0 0px;
  }
  @media (max-width: 390px) {
    padding: 100px 0 0px;
  }
}
.info-main .inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 24px);
  text-align: center;
}
.info-main .title {
  font-weight: 800;
  font-size: clamp(26px, 2.8vw, 38px);
  color: #333;
  margin-bottom: clamp(20px, 2.5vw, 32px);
}

/* ===== 탭 ===== */
.info-main .tabs {
  display: inline-flex;
  background: #f9fafa;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #d9e1e1;
  margin: 0 auto clamp(28px, 4vw, 44px);
  @media (max-width: 390px) {
    margin: 0;
  }
}
.info-main .tab {
  min-width: 160px;
  padding: 12px 18px;
  font-size: clamp(15px, 1.3vw, 18px);
  color: #888;
  background: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
}
.info-main .tab.active {
  background: #38b2ac;
  color: #fff;
}

/* ===== 캐러셀 ===== */
.info-main .carousel {
  position: relative;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;
  gap: 12px;
}
.info-main .nav {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #e1e8e8;
  background: #fff;
  font-size: 26px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.info-main .nav:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.info-main .nav:disabled {
  opacity: 0.3;
  cursor: default;
}
.info-main .viewport {
  overflow: hidden;
  min-height: 280px;
}

/* ===== 슬라이드 ===== */
.info-main .slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  /* height: 460px; */
  padding: clamp(8px, 1vw, 16px);
  box-sizing: border-box;
}

/* ===== 썸네일 ===== */
.info-main .thumb {
  width: 100%;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: clamp(10px, 1vw, 14px);
  overflow: visible;
  background: transparent;
}
.info-main .thumb img {
  height: 100%;
  max-height: 250px;
  width: auto;
  object-fit: contain;
  transition: none; /* ✅ hover 제거 */
}
.info-main .thumb img:hover {
  transform: none !important; /* ✅ hover 확대 완전 차단 */
}

/* ===== 세로 긴 이미지 (L, XL) ===== */
#large .thumb img,
#xlarge .thumb img {
  max-height: none;
  height: auto;
  max-width: 95%;
  transform: translateY(10px);
  object-fit: contain;
}

/* ===== XL 강조 ===== */
#xlarge .thumb {
  height: 330px;
  overflow: visible;
}
#xlarge .thumb img {
  max-height: none;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  transform: scale(1.1) translateY(15px);
  transform-origin: bottom center;
}

/* ===== 텍스트 ===== */
.info-main .label {
  font-weight: 800;
  color: #1a8f8d;
  font-size: clamp(18px, 1.8vw, 28px);
  margin-bottom: 6px;
}
.info-main .meta {
  color: #222;
  font-size: clamp(14px, 1.4vw, 16px);
  margin-bottom: 4px;
}
.info-main .price {
  color: #888;
  font-size: clamp(13px, 1.2vw, 15px);
}

/* ===== 자세히 보기 ===== */
.info-main .more-row {
  display: flex;
  justify-content: flex-end;
}
.info-main .more {
  color: #777;
  font-size: clamp(15px, 1.3vw, 17px);
  text-decoration: none;
}
.info-main .more:hover {
  text-decoration: underline;
}

/* ===== 세로 긴 이미지 (L, XL) ===== */
#large .thumb img,
#xlarge .thumb img {
  max-height: none;
  height: auto;
  max-width: 95%;
  transform: translateY(10px);
  object-fit: contain;
  transition: none !important; /* ✅ 효과 완전 차단 */
}

/* ===== XL 전용 (기본 확대 유지, hover 반응 없음) ===== */
#xlarge .thumb {
  height: 330px;
  overflow: visible;
}

#xlarge .thumb img {
  max-height: none;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  transform: scale(1.1) translateY(15px);
  transform-origin: bottom center;
  transition: none !important; /* ✅ hover 애니메이션 제거 */
}

/* ===== L, XL hover 시에도 완전히 고정 ===== */
#large .thumb img,
#xlarge .thumb img {
  transition: none !important; /* 전환 효과 제거 */
}

/* L은 원래 크기 그대로 유지 */
#large .thumb img:hover {
  transform: translateY(10px) !important; /* hover 시 그대로 고정 */
}

/* XL은 확대된 상태 유지 */
#xlarge .thumb img:hover {
  transform: scale(1.1) translateY(15px) !important; /* ✅ 기본 상태 유지 */
}
</style>
