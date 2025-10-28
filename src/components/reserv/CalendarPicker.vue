<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth">‹</button>
      <h2>{{ year }}년 {{ month + 1 }}월</h2>
      <button @click="nextMonth">›</button>
    </div>

    <table class="calendar-table">
      <thead>
        <tr>
          <th v-for="day in weekDays" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, w) in calendarDays" :key="w">
          <td
            v-for="date in week"
            :key="date?.toDateString()"
            :class="{ 'is-today': isToday(date), selected: isSelected(date) }"
            @click="selectDate(date)"
          >
            {{ date ? date.getDate() : '' }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="calendar-footer">
      <p>{{ selected ? formatDate(selected) : '날짜를 선택하세요' }}</p>
      <button class="reserve-btn" @click="$emit('confirm', selected)">예약</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const today = new Date();
const year = ref(today.getFullYear());
const month = ref(today.getMonth());
const selected = ref(null);
const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

const calendarDays = computed(() => {
  const first = new Date(year.value, month.value, 1);
  const last = new Date(year.value, month.value + 1, 0);
  const days = [];
  let week = [];
  for (let i = 0; i < first.getDay(); i++) week.push(null);
  for (let d = 1; d <= last.getDate(); d++) {
    const date = new Date(year.value, month.value, d);
    week.push(date);
    if (week.length === 7) {
      days.push(week);
      week = [];
    }
  }
  if (week.length) days.push(week);
  return days;
});

const selectDate = (date) => {
  if (date) selected.value = date;
};
const isToday = (d) =>
  d &&
  d.getDate() === today.getDate() &&
  d.getMonth() === today.getMonth() &&
  d.getFullYear() === today.getFullYear();

const isSelected = (d) => selected.value && d && d.toDateString() === selected.value.toDateString();
const formatDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const prevMonth = () => {
  if (month.value === 0) {
    year.value--;
    month.value = 11;
  } else month.value--;
};
const nextMonth = () => {
  if (month.value === 11) {
    year.value++;
    month.value = 0;
  } else month.value++;
};
</script>

<style scoped lang="scss">
@use "/src/assets/style/variables" as *;
.calendar {
  text-align: center;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 320px;
  margin: 0 auto;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  margin-bottom: 10px;
  button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #444;
  }
}
.calendar-table {
  width: 100%;
  border-collapse: collapse;
  th {
    font-weight: 500;
    padding-bottom: 6px;
    color: #333;
  }
  td {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s;
    color: #222;
    &:hover {
      background: #e0f2f1;
    }
    &.is-today {
      border: 1px solid #53b4a1;
    }
    &.selected {
      background: #53b4a1;
      color: #fff;
      font-weight: 700;
    }
  }
}
.calendar-footer {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  p {
    font-size: 0.9rem;
    color: #555;
  }
  .reserve-btn {
    background: #4a57ff;
    color: #fff;
    border: none;
    padding: 10px 40px;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 600;
    transition: 0.3s;
    &:hover {
      background: #3647e0;
    }
  }
}
</style>
