<template>
  <div class="information-wrap">
    <div class="information-wrap-inner">
      <div class="info-image">
        <img src="/images/info/imgi_out.png" alt="외부사진" />
      </div>

      <main class="wrap">
        <section class="hero">
          <div class="hero-card">
            <div class="eyebrow">{{ languageStore.isKorean ? '관람 정보' : 'Visitor Information' }}</div>
            <h1 class="h1" data-translate>
              {{ languageStore.isKorean ? '오늘 관람 시간' : "Today's Opening Hours" }}
            </h1>
            <div class="time-badge">
              <span class="time-dot"></span>
              <span>10:00 – 18:00</span>
              <span class="pill">
                {{ languageStore.isKorean ? '최종 입장 17:30' : 'Last Entry 17:30' }}
              </span>
            </div>
            <p class="sub" data-translate>
              {{ languageStore.isKorean 
                ? '수·토 야간개장: 10:00 – 21:00 (최종 입장 20:30)' 
                : 'Wed & Sat Night Opening: 10:00 – 21:00 (Last Entry 20:30)' 
              }}
            </p>
            <div class="cta-row">
              <a href="#" class="btn accent" data-translate>
                {{ languageStore.isKorean ? '방문 예약' : 'Book a Visit' }}
              </a>
              <a href="#" class="btn" data-translate>
                {{ languageStore.isKorean ? '오시는 길' : 'Directions' }}
              </a>
            </div>
          </div>

          <div class="hero-card">
            <div class="eyebrow">{{ languageStore.isKorean ? '입장료' : 'Admission' }}</div>
            <h2 class="h1" style="font-size: clamp(24px, 3.2vw, 36px); margin-top: 0" data-translate>
              {{ languageStore.isKorean ? '관람료' : 'Admission Fee' }}
            </h2>
            <div class="kv">{{ languageStore.isKorean ? '무료' : 'Free' }}</div>
            <p class="muted" data-translate>
              {{ languageStore.isKorean ? '일부 기획전 유료' : 'Some special exhibitions require tickets' }}
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px">
              <span class="pill" data-translate>
                {{ languageStore.isKorean ? '상설전시 무료' : 'Permanent Exhibitions: Free' }}
              </span>
              <span class="pill">야외정원 07:00–22:00</span>
              <span class="pill" data-translate>
                {{ languageStore.isKorean ? '가족·단체 환영' : 'Families & Groups Welcome' }}
              </span>
            </div>
          </div>
        </section>

        <!-- 핵심 카드 3종 -->
        <section class="grid">
          <article class="card">
            <h3 data-translate>{{ languageStore.isKorean ? '휴관일' : 'Closed Days' }}</h3>
            <p class="muted" data-translate>
              {{ languageStore.isKorean 
                ? '1월 1일, 설·추석 당일, 매년 지정 보수일' 
                : 'January 1, Lunar New Year & Chuseok Day, annual maintenance' 
              }}
            </p>
            <ul class="list">
              <li>2025 {{ languageStore.isKorean ? '임시 휴관' : 'Temporary Closures' }}: Apr 7 (Mon), Nov 3 (Mon)</li>
            </ul>
          </article>

          <article class="card">
            <h3 data-translate>
              {{ languageStore.isKorean ? '편의시설 운영' : 'Facilities' }}
            </h3>
            <ul class="list">
              <li data-translate>
                {{ languageStore.isKorean 
                  ? '푸드코트: 21:00 마감 (라스트 오더 20:30)' 
                  : 'Food Court: Closes 21:00 (Last Order 20:30)' 
                }}
              </li>
              <li data-translate>
                {{ languageStore.isKorean 
                  ? '레스토랑: 21:00 마감 (라스트 오더 20:30)' 
                  : 'Restaurant: Closes 21:00 (Last Order 20:30)' 
                }}
              </li>
              <li data-translate>
                {{ languageStore.isKorean 
                  ? '편의점: 21:00 마감' 
                  : 'Convenience Store: Closes 21:00' 
                }}
              </li>
            </ul>
          </article>

          <article class="card">
            <h3 data-translate>
              {{ languageStore.isKorean ? '문의 & 위치' : 'Contact & Location' }}
            </h3>
            <p class="muted">서울특별시 용산구 서빙고로 137 (04383)</p>
            <p class="muted">Tel: 02-2077-9000</p>
            <div class="cta-row" style="margin-top: 8px">
              <a class="btn" href="#" data-translate>
                {{ languageStore.isKorean ? '지도 보기' : 'View Map' }}
              </a>
              <a class="btn" href="#" data-translate>
                {{ languageStore.isKorean ? '주차 안내' : 'Parking Info' }}
              </a>
            </div>
          </article>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useLanguageStore } from '../stores/language'

const languageStore = useLanguageStore()
</script>
