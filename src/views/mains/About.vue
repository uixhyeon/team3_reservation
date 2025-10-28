<template>
  <section class="service-section">
    <div class="inner">
      <div class="left">
        <h2>짐보따리 제공 서비스</h2>
        <p>짐보따리에서 다양한 서비스를 이용해 보세요</p>
      </div>

      <div class="cards">
        <div class="card" v-for="(item, i) in services" :key="i" :class="item.class">
          <h3 v-html="item.title"></h3>
          <p class="desc">{{ item.desc }}</p>
          <div class="img-wrap">
            <img :src="item.img" :alt="item.title" loading="lazy" />
          </div>
          <router-link class="btn" :to="item.link">자세히 알아보기</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: "보관",
    desc: "짐이 많을 땐 잠시 맡기세요",
    img: "/images/mains/about/image 466.png",
    link: "/information2",
    class: "storage",
  },
  {
    title: '배송<span class="accent">(집 → 지점)</span>',
    desc: "무거운 짐은 문 앞에서 해결하세요",
    img: "/images/mains/about/Group 405.png",
    link: "/information2",
    class: "house-to-branch",
  },
  {
    title: '배송<span class="accent">(지점 → 집)</span>',
    desc: "마지막까지 편하게 여행하세요",
    img: "/images/mains/about/Group 406.png",
    link: "/information2",
    class: "branch-to-house",
  },
];
</script>

<style scoped lang="scss">
:root {
  --accent-color: #de3464;
}

.service-section {
  width: 100%;
  padding: 120px 0 80px;
  display: flex;
  justify-content: center;
  font-family: "Pretendard", "Inter", sans-serif;
  @media (max-width: 390px) {
    padding: 80px 0 0px;
  }
  .inner {
    // display: flex;
    // align-items: flex-start;
    // justify-content: center;
    gap: 80px;
    max-width: 1320px;
    width: 100%;
    padding: 0 40px;

    @media (max-width: 1080px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 60px;
    }
  }

  .left {
    // flex: 0 0 340px;
    text-align: center;
    padding: 5% 0;

    h2 {
      font-size: clamp(24px, 2.5vw, 35px);
      font-weight: 700;
      color: #111;
      // margin-bottom: 10px;
      line-height: 1.3;
    }

    p {
      font-size: clamp(15px, 1.4vw, 18px);
      color: #999;
      line-height: 1.6;
    }
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 34px;
    justify-content: center;
    justify-items: center;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;
    }

    @media (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    width: 290px;
    // height: 200px;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 14px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-items: center;
    text-align: center;
    padding: 32px 16px 28px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    }

    h3 {
      font-size: clamp(25px, 2.6vw, 27px);
      font-weight: 700;
      color: #111;
      margin-bottom: 4px; /* 제목과 설명 간격 약간만 남김 */
    }

    .desc {
      font-size: clamp(14px, 1.3vw, 15px);
      color: #333;
      margin: 0; /* ✅ 설명문 여백 제거 */
      line-height: 1.5;
    }

    .img-wrap {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0; /* ✅ 이미지 상하 여백 제거 */
      padding: 0;

      img {
        width: auto;
        height: auto;
        object-fit: contain;
        display: block;
      }
    }

    .btn {
      background: #3b9c91;
      color: #fff;
      font-weight: 600;
      font-size: 18px;
      border-radius: 6px;
      padding: 12px 52px;
      text-decoration: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      transition: all 0.25s ease;
      margin-top: 0; /* ✅ 버튼 위쪽 여백 제거 */

      &:hover {
        background: #2f857c;
      }
    }
  }

  /* 이미지 크기 */
  .storage img {
    max-height: 150px;
  }
  .house-to-branch img {
    max-height: 125px;
  }
  .branch-to-house img {
    max-height: 135px;
  }

  @media (max-width: 768px) {
    .card {
      width: 100%;
      max-width: 320px;
    }
  }
}

/* ✅ span 색상 유지 */
:deep(.accent) {
  color: #de3464 !important;
}

.service-section .card .img-wrap {
  flex-grow: 0 !important; /* ✅ 남는 공간 채우기 제거 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 !important;
  padding: 0 !important;
  height: auto !important; /* ✅ 이미지 높이만큼만 차지 */
  line-height: 0; /* 이미지 아래 줄간격 제거 */
}

.service-section .card .img-wrap img {
  display: block;
  max-height: 100%;
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
  object-fit: contain;
}

.service-section .card h3 {
  margin-bottom: 1px; /* 제목과 설명 사이 살짝 띄움 */
}

.service-section .card .desc {
  margin-bottom: 40px; /* 설명문과 이미지 사이 살짝 간격 */
}

.service-section .card .img-wrap {
  flex-grow: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  line-height: 0;
  margin-bottom: 14px; /* 이미지와 버튼 사이 여백 추가 */
}

.service-section .card .img-wrap img {
  display: block;
  width: auto;
  height: auto;
  object-fit: contain;
}
/* 카드 이미지 기본 설정 */
.service-section .card .img-wrap img {
  display: block;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: transform 0.2s ease;
}

/* 카드별 스케일 조정 */
.house-to-branch .img-wrap img {
  transform: scale(1); /* 살짝 확대 (5%) */
  margin-top: -14px !important; /* 살짝 위로 올려 균형 맞춤 */
  margin-bottom: 18px !important;
}

.branch-to-house .img-wrap img {
  transform: scale(1.01); /* 살짝 축소 (7%) */
  margin-bottom: 20px !important; /* 균형 맞춤용 */
  margin-top: 8px !important;
}

.storage .img-wrap img {
  margin-bottom: 17px !important; /* 균형 맞춤용 */
  margin-top: -14px !important;
}

:deep(.accent) {
  color: #de3464 !important;
  font-size: 0.8em !important; /* ✅ 기본 대비 약 3~4px 작게 */
  font-weight: 700;
  margin-left: 5px;
}
</style>
