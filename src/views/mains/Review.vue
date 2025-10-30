<!-- 수정 필요한--
 490이하일때 스와이퍼의 중앙이 맞지 않음 
 
 -->
<template>
  <div class="review_wrap">
    <div class="inner-review">
      <div class="title">
        <h1>사용자들의 이유 있는 선택</h1>
        <h2><span class="strong">4.83</span>/5</h2>
        <p class="star">★★★★★</p>
        <p>*2025년 9월 기준</p>
      </div>
      <!-- Swiper -->
      <div class="swiper reviewSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(review, i) in reviews" :key="i">
            <div class="review_card">
              <div class="text_wrap">
                <p class="comment">{{ review.comment }}</p>
                <div class="rating">
                  <span class="star">⭐</span>
                  <span class="score">{{ review.rating.toFixed(1) }}</span>
                </div>
                <div class="user_info">
                  <p class="name">{{ review.name }} 님의 후기</p>
                  <p class="date">{{ review.date }}</p>
                </div>
              </div>
              <div class="img_wrap">
                <img :src="review.image" alt="리뷰 이미지" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
const reviews = ref([
  {
    name: "이**",
    rating: 5,
    date: "2025. 08. 19",
    comment: "출장 중에도 24시간 언제든 짐을 맡길 수 있어 편리했어요. 배송도 빨랐어요!",
    image: "/images/mains/revieww/image 128.png",
  },
  {
    name: "김**",
    rating: 5,
    date: "2025. 07. 11",
    comment: "보관만 하려다 배송까지 가능해서 놀랐어요. 무거운 짐 걱정 없이 여행할 수 있었어요.",
    image: "/images/mains/revieww/image 131.png",
  },
  {
    name: "이**",
    rating: 4.5,
    date: "2025. 06. 30",
    comment: "보관과 배송을 한 번에 해결해서 너무 편했어요. 짐도 깨끗하게 도착해서 만족했습니다.",
    image: "/images/mains/revieww/image 132.png",
  },
  {
    name: "박**",
    rating: 5,
    date: "2025. 08. 02",
    comment: "응대가 친절하고 배송도 제시간에 도착했어요. 덕분에 짐 없이 여행을 즐길 수 있었습니다.",
    image: "/images/mains/revieww/image 133.png",
  },
  {
    name: "홍**",
    rating: 4,
    date: "2025. 07. 15",
    comment: "기차역 근처에서 바로 맡기고 숙소로 배송받았어요. 다음에도 이용할게요!",
    image: "/images/mains/revieww/image 457.png",
  },
  {
    name: "이**",
    rating: 4.8,
    date: "2025. 09. 01",
    comment: "사물함 크기가 다양해 캐리어 보관도 문제없어요. 배송도 빠르고 서비스가 깔끔합니다.",
    image: "/images/mains/revieww/image 458.png",
  },
  {
    name: "최**",
    rating: 5,
    date: "2025. 09. 10",
    comment: "가격이 합리적이고 배송 품질도 좋아요. 친절한 고객센터 덕분에 신뢰가 갔습니다.",
    image: "/images/mains/revieww/image 470.png",
  },
  {
    name: "한**",
    rating: 4.2,
    date: "2025. 08. 05",
    comment: "예약이 간단했어요. 짐을 숙소로 바로 배송받을 수 있어 좋았습니다.",
    image: "/images/mains/revieww/image 469.png",
  },
  {
    name: "박**",
    rating: 5,
    date: "2025. 07. 28",
    comment: "보관함이 청결하고 냄새도 없었어요. 배송도 빠르고 기사님도 친절했습니다.",
    image: "/images/mains/revieww/image 471.png",
  },
  {
    name: "정**",
    rating: 4.7,
    date: "2025. 09. 12",
    comment: "예약부터 배송까지 간단하고 빠릅니다. 알림으로 진행 상황을 바로 볼 수 있어 좋아요.",
    image: "/images/mains/revieww/image 467.png",
  },
]);

onMounted(() => {
  new Swiper(".reviewSwiper", {
    centeredSlides: true, // ✅ 항상 중앙 기준 유지
    loop: true,
    loopedSlides: reviews.value.length,
    speed: 1000,
    spaceBetween: 40,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
breakpoints: {
  1600: { slidesPerView: 3.5, spaceBetween: 45 },
  1400: { slidesPerView: 3, spaceBetween: 40 },
  1200: { slidesPerView: 2.7, spaceBetween: 35 },
  1025: { slidesPerView: 2.3, spaceBetween: 30 },
  768: { slidesPerView: 1.5, spaceBetween: 25 },
  520: { slidesPerView: 1.2, spaceBetween: 10 },  // ✅ 살짝 올림
  0: { slidesPerView: 1, spaceBetween: 10 },       // ✅ 완전 중앙
},

  });
});
</script>
<style lang="scss" scoped>
@use "/src/assets/style/variables" as *;

/* =========================================================
   기본 스타일
========================================================= */
.strong {
  color: $color_dangr;
}

.star {
  color: yellow;
}

.review_wrap {
  padding: $title-big-gap-large;
  overflow: hidden;
  padding-top: 0;
}

.inner-review {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  text-align: center;
}

.inner-review > h1 {
  font-size: $title-md;
  color: #222;
}

.title h1 {
  font-weight: 700;
  font-size: clamp(25px, 2.8vw, 38px);
}

.title h2 {
  font-size: clamp(20px, 2.8vw, 34px);
}

.reviewSwiper {
  overflow: visible;
  margin-top: $text-big-gap-large;
}

/* =========================================================
   슬라이드 공통
========================================================= */
.swiper-slide {
  aspect-ratio: 1.4 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.6s ease;
  opacity: 0.1;
  transform: scale(0.9);
}

.swiper-slide-active {
  transform: scale(1);
  opacity: 1;
  z-index: 10;
}

.swiper-slide-prev,
.swiper-slide-next {
  opacity: 0.8;
  transform: scale(0.95);
}

/* =========================================================
   카드
========================================================= */
.review_card {
  width: 100%;
  max-width: 420px; /* ✅ 카드 폭 제한 → 중앙정렬 안정화 */
  margin: 0 auto;
  height: 100%;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  overflow: hidden; /* ✅ 글자 넘침 방지 */
}

/* =========================================================
   텍스트
========================================================= */
.text_wrap {
  flex: 1;
  min-width: 0; /* ✅ flex 내부 텍스트 줄바꿈 정상화 */
  word-break: keep-all;
  text-align: left;
}

.comment {
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  color: #333;
  line-height: 1.5;
  margin-bottom: $label-small-gap-small;
  overflow-wrap: anywhere; /* ✅ 긴 문장 줄바꿈 */
}

.rating {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.star {
  font-size: 26px;
  color: #facc15;
  margin-right: 5px;
  margin-top: -5px;
}

.score {
  font-size: $text-sm;
  font-weight: 600;
  color: #333;
}

.user_info {
  font-size: $label-sm;
  color: #888;
}

.user_info .name {
  margin-bottom: 4px;
  font-weight: 500;
}

/* =========================================================
   이미지
========================================================= */
.img_wrap {
  flex-shrink: 0;
  margin-left: 20px;
  text-align: center;

  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 6px;
  }
}

/* =========================================================
   반응형 (노트북 / 태블릿 / 모바일)
========================================================= */

/* ✅ 1200px 이하: 살짝 축소 */
@media (max-width: 1200px) {
  .review_card {
    max-width: 380px;
    padding: 1.5rem;
  }

  .img_wrap img {
    width: 80px;
    height: 80px;
  }
}

/* ✅ 1024px 이하 (태블릿): 폰트 약간 축소 */
@media (max-width: 1024px) {
  .comment {
    font-size: 1rem;
  }

  .img_wrap img {
    width: 75px;
    height: 75px;
  }

  .review_wrap {
    padding-top: 60px;
  }
}

/* ✅ 768px 이하 (세로 태블릿/모바일 가로) */
@media (max-width: 768px) {
  .review_card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem;
    max-width: 90%;
  }

  .text_wrap {
    text-align: center;
  }

  .img_wrap {
    margin-left: 0;
    margin-bottom: 1rem;

    img {
      width: 90px;
      height: 90px;
    }
  }

  .comment {
    font-size: 1rem;
  }
}

@media (max-width: 600px){

  .img_wrap {
    margin-left: 0;
    margin-bottom: 1rem;

    img {
      width: 70px;
      height: 70px;
    }
  }
.review_card {
    flex-direction: row;        /* ✅ 가로 정렬 유지 */
    align-items: center;
    justify-content: space-between;
    text-align: left;
    padding: 1.2rem;
    max-width: 92%;             /* ✅ 카드 폭 살짝 축소 */
  }

  .text_wrap {
    flex: 1;
    text-align: left;
  }

  .img_wrap {
    margin-left: 16px;          /* ✅ 글자와 이미지 간격 확보 */
    margin-bottom: 0;

    img {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .comment {
    font-size: 0.95rem;
    line-height: 1.5;
  }
}

/* ✅ 480px 이하 (모바일) */
@media (max-width: 480px) {
  .review_card {
    max-width: 85%;
    padding: 1rem;
    min-height: 300px;
  }

  .reviewSwiper {
    margin-top: 80px;
  }

  .comment {
    font-size: 0.9rem;
  }

  .img_wrap img {
    width: 60px;
    height: 60px;
  }

  .review_wrap {
    padding-top: 100px;
  }
}
@media (max-width: 395px) {
 
  .img_wrap {
   margin: 0;

    img {
     margin: 0;
    }
  } 
  .review_card{
    margin: 0;
    width: 370px;
  }
}
</style>
