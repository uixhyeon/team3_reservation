<template>
  <main>
    <!-- 히어로 -->
    <section class="exhibit-hero">
      <div class="wrap">
        <h1 class="title" data-translate>사유의 방</h1>
        <p class="subtitle" data-translate>
          {{ languageStore.isKorean 
            ? '고요한 빛 속에서 만나는 반가사유상의 사유' 
            : 'The contemplation of the contemplative bodhisattva in quiet light' 
          }}
        </p>
        <span class="location-pill">2F {{ languageStore.isKorean ? '전시실' : 'Exhibition Hall' }}</span>
      </div>
    </section>

    <!-- 전면 배너 -->
    <section class="wrap exhibit-banner">
      <img 
        src="/images/sayu/_aUkuvfdoKfr1DvQzSBqcChz7-nYSyT2qaZNMiio8jc1vr8pOj9LsIb2UHVHdgqAQpo6hzuHcZxkH457pURY5Q.webp" 
        alt="사유의 방 전시 전경" 
      />
    </section>

    <!-- 전시품 카드 -->
    <section class="wrap exhibit-grid" aria-label="전시품">
      <article class="exhibit-card">
        <img src="/images/sayu/sayu-1.jpg" alt="반가사유상 1" />
        <div class="cap">반가사유상 (1)</div>
      </article>
      <article class="exhibit-card">
        <img src="/images/sayu/sayu-2.jpg" alt="반가사유상 2" />
        <div class="cap">반가사유상 (2)</div>
      </article>
    </section>

    <!-- 전시설명 -->
    <section class="wrap exhibit-desc">
      <p data-translate>
        {{ languageStore.isKorean 
          ? '사유의 방은 우리나라를 대표하는 불교 조각, 반가사유상 두 점이 나란히 놓인 공간입니다. 조용한 어둠 속에서 빛과 그림자가 만들어내는 미세한 표정의 변화와 함께, 사유의 시간을 온전히 경험할 수 있습니다.' 
          : 'The Room of Contemplation is a space where two contemplative bodhisattvas, representative Buddhist sculptures of Korea, are placed side by side. In the quiet darkness, you can fully experience the time of contemplation along with the subtle changes in expression created by light and shadow.' 
        }}
      </p>
      <p class="highlight" data-translate>
        {{ languageStore.isKorean 
          ? '고요함과 균형, 그리고 비움의 미학. 관람객 각자만의 사유가 시작되는 순간을 만나 보세요.' 
          : 'The aesthetics of stillness, balance, and emptiness. Experience the moment when each visitor\'s own contemplation begins.' 
        }}
      </p>
    </section>

    <!-- 영상 -->
    <section class="wrap exhibit-videos">
      <h2 data-translate>{{ languageStore.isKorean ? '관련 영상' : 'Related Videos' }}</h2>
      <div class="video-grid">
        <iframe 
          src="https://www.youtube.com/embed/9Nx-lSkyHI8" 
          title="사유의방 – A Room of Quiet Contemplation" 
          allowfullscreen
        ></iframe>
        <iframe 
          src="https://www.youtube.com/embed/fweiKkCCeZc" 
          title="국립중앙박물관 & 사유의 방" 
          allowfullscreen
        ></iframe>
      </div>
    </section>

    <!-- 빠른 링크 -->
    <section class="wrap quick-links">
      <div class="qgrid">
        <a class="qtile" href="#" data-translate>
          {{ languageStore.isKorean ? '전시 안내' : 'Exhibition Guide' }}
        </a>
        <a class="qtile" href="#" data-translate>
          {{ languageStore.isKorean ? '체험 프로그램' : 'Experience Programs' }}
        </a>
        <a class="qtile" href="#" data-translate>
          {{ languageStore.isKorean ? '오시는 길' : 'Directions' }}
        </a>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
</script>
