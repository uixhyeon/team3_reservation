<template>
  <section class="info-wrap">
    <div class="info-inner">
      <h3 data-translate>
        {{ languageStore.isKorean ? '관람 정보' : 'Info' }}
      </h3>

      <div class="tabs">
        <!-- 탭 1: 내부지도 -->
        <div class="tab">
          <input
            type="radio"
            name="css-tabs"
            id="tab-1"
            checked
            class="tab-switch"
          />
          <label for="tab-1" class="tab-label tab01">
            <img class="infoLogo" src="/images/info/Asset 4@4x.png" alt="logo" />
            <span data-translate>
              {{ languageStore.isKorean ? '내부지도' : 'Museum Map' }}
            </span>
          </label>
          <div class="tab-content" id="tab-01">
            <div class="info-map-item">
              <img class="info-map" src="/images/info/map.png" alt="지도" />
              <div class="map-scr">
                <p v-for="(item, index) in mapItems" :key="index">
                  {{ item }}
                </p>
                <p>
                  <router-link to="/info" class="read-more" target="_blank" data-translate>
                    {{ languageStore.isKorean ? '더보기' : 'more' }}
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 탭 2: 관람시간 -->
        <div class="tab">
          <input type="radio" name="css-tabs" id="tab-2" class="tab-switch" />
          <label for="tab-2" class="tab-label tab02">
            <img class="infoLogo" src="/images/info/Asset 4@4x.png" alt="logo" />
            <span data-translate>
              {{ languageStore.isKorean ? '관람시간' : 'Opening Hours' }}
            </span>
          </label>
          <div class="tab-content" id="tab-02">
            <div class="open_time">
              <div class="sc-top">
                <div class="sc-top-l">
                  <p><strong data-translate>
                    {{ languageStore.isKorean ? '관람 시간' : 'Opening Hours' }}
                  </strong></p>
                </div>
                <div class="sc-top-r">
                  <p data-translate>
                    {{ languageStore.isKorean 
                      ? '월, 화, 목, 금, 일: 10:00 ~ 18:00 (최종 입장: 17:30)' 
                      : 'Mon, Tue, Thu, Fri, Sun: 10:00 ~ 18:00 (Last entry time: 17:30)' 
                    }}
                  </p>
                  <p data-translate>
                    {{ languageStore.isKorean 
                      ? '수, 토: 10:00 ~ 21:00 (최종 입장: 20:30)' 
                      : 'Wed, Sat: 10:00 ~ 21:00 (Last entry time: 20:30)' 
                    }}
                  </p>
                  <p data-translate>
                    {{ languageStore.isKorean 
                      ? '옥외 전시장(정원)은 오전 7시부터 오후 10시까지 관람 가능합니다.' 
                      : 'The outdoor exhibition (Garden) is open for viewing from 7:00 AM to 10:00 PM.' 
                    }}
                  </p>
                </div>
              </div>
              <!-- 푸드코트, 레스토랑, 편의점 정보 -->
              <div class="sc-bt-1">
                <div class="sc-bt1-l">
                  <p><strong data-translate>
                    {{ languageStore.isKorean ? '푸드코트' : 'Food Court' }}
                  </strong></p>
                </div>
                <div class="sc-bt1-r">
                  <p data-translate>
                    {{ languageStore.isKorean 
                      ? '오후 9시 마감 (마지막 주문 20:30)' 
                      : 'Closes at 9:00 PM (Last order 20:30)' 
                    }}
                  </p>
                </div>
              </div>
              <div class="sc-bt-2">
                <div class="sc-bt2-l">
                  <p><strong data-translate>
                    {{ languageStore.isKorean ? '레스토랑' : 'Restaurant' }}
                  </strong></p>
                </div>
                <div class="sc-bt2-r">
                  <p data-translate>
                    {{ languageStore.isKorean 
                      ? '오후 9시 마감 (마지막 주문 20:30)' 
                      : 'Closes at 9:00 PM (Last order 20:30)' 
                    }}
                  </p>
                </div>
              </div>
              <div class="sc-bt-3">
                <div class="sc-bt3-l">
                  <p><strong data-translate>
                    {{ languageStore.isKorean ? '편의점' : 'Convenience Store' }}
                  </strong></p>
                </div>
                <div class="sc-bt3-r">
                  <p data-translate>
                    {{ languageStore.isKorean 
                      ? '오후 9시 마감 (마지막 주문 20:30)' 
                      : 'Closes at 9:00 PM (Last order 20:30)' 
                    }}
                  </p>
                  <router-link to="/info" class="read-more" target="_blank" data-translate>
                    {{ languageStore.isKorean ? '더보기' : 'more' }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 탭 3: 오시는길 -->
        <div class="tab">
          <input type="radio" name="css-tabs" id="tab-3" class="tab-switch" />
          <label for="tab-3" class="tab-label tab03">
            <img class="infoLogo" src="/images/info/Asset 4@4x.png" alt="logo" />
            <span data-translate>
              {{ languageStore.isKorean ? '오시는길' : 'Direction' }}
            </span>
          </label>
          <div class="tab-content" id="tab-03">
            <div class="info-diracr-item">
              <div class="info-dir-img-box">
                <img
                  :src="languageStore.isKorean ? '/images/info/direction.png' : '/images/info/eng-diract.png'"
                  alt="오시는 길"
                  class="info-direct"
                />
              </div>
              <div class="diract-scr">
                <p>
                  {{ languageStore.isKorean ? '국립중앙박물관' : 'National Museum of Korea' }}<br />
                  {{ languageStore.isKorean 
                    ? '주소: 서울특별시 용산구 서빙고로 137, 04383 (용산동6가 168-6)' 
                    : 'Address: 137 Seobinggo-ro, Yongsan-gu, Seoul, 04383 (Yongsan-dong 6-ga 168-6)' 
                  }}<br />
                </p>
                <p>Tel. 02-2077-9000</p>
                <router-link to="/info" class="read-more" target="_blank" data-translate>
                  {{ languageStore.isKorean ? '더보기' : 'more' }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguageStore } from '../../stores/language'

const languageStore = useLanguageStore()

const mapItems = computed(() => {
  if (languageStore.isKorean) {
    return [
      '① 으뜸관 상설전시실',
      '② 특별전시실',
      '③ 거울못',
      '④ 푸드코트',
      '⑤ 카페 / 편의점',
      '⑥ 이촌역 (지하철)',
      '⑦ 주차장'
    ]
  } else {
    return [
      '① Eudeum Hall Permanent Exhibition Hall',
      '② Special Exhibition Hall',
      '③ Mirror Pond',
      '④ Food Court',
      '⑤ Cafe / Convenience Store',
      '⑥ Ichon Station (Subway)',
      '⑦ Parking Lot'
    ]
  }
})
</script>
