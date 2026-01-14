<template>
  <div class="reservation-wrap" id="reservation">
    <div class="reservation-title">
      <p class="reservation-title-text" data-translate>
        {{ languageStore.isKorean 
          ? '가이드 투어를 예약하고 싶으신가요?' 
          : 'Wanna Join a Guided Tour?' 
        }}
      </p>
    </div>

    <div class="container">
      <!-- 캘린더 -->
      <div class="calendar-container">
        <div class="calendar-header">
          <button class="nav-btn" @click="prevMonth">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <div class="month-year">{{ monthYear }}</div>
          <button class="nav-btn" @click="nextMonth">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div class="calendar-grid" ref="calendarGrid"></div>
      </div>

      <div class="detail-panel" id="detailPanel">
        <div class="placeholder-message" data-translate>
          {{ languageStore.isKorean 
            ? '📅 날짜를 선택하여 투어 정보를 확인하세요' 
            : '📅 Select a date to view tour information' 
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLanguageStore } from '../../stores/language'

const languageStore = useLanguageStore()
const calendarGrid = ref(null)
const currentDate = ref(new Date())

const monthYear = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const monthNames = languageStore.isKorean
    ? ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return `${year} ${monthNames[month]}`
})

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
  renderCalendar()
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
  renderCalendar()
}

const renderCalendar = () => {
  if (!calendarGrid.value) return

  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const weekdays = languageStore.isKorean
    ? ['일', '월', '화', '수', '목', '금', '토']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  let html = '<div class="calendar-weekdays">'
  weekdays.forEach(day => {
    html += `<div>${day}</div>`
  })
  html += '</div><div class="calendar-days">'

  // 빈 칸
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="calendar-day empty"></div>'
  }

  // 날짜
  for (let day = 1; day <= daysInMonth; day++) {
    html += `<div class="calendar-day" data-date="${year}-${month + 1}-${day}">${day}</div>`
  }

  html += '</div>'
  calendarGrid.value.innerHTML = html

  // 날짜 클릭 이벤트
  calendarGrid.value.querySelectorAll('.calendar-day:not(.empty)').forEach(dayEl => {
    dayEl.addEventListener('click', () => {
      const date = dayEl.getAttribute('data-date')
      selectDate(date)
    })
  })
}

const selectDate = (date) => {
  const detailPanel = document.getElementById('detailPanel')
  if (detailPanel) {
    detailPanel.innerHTML = `
      <div class="selected-date">
        <h3>${date}</h3>
        <p>${languageStore.isKorean ? '투어 정보가 여기에 표시됩니다' : 'Tour information will be displayed here'}</p>
      </div>
    `
  }
}

onMounted(() => {
  renderCalendar()
})
</script>
