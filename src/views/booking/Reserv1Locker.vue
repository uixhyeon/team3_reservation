<template>
  <div class="form_card">
    <div class="card_header">
      <h3>사물함 예약*</h3>
      <i v-if="isComplete" class="fa-solid fa-check" style="color:#53b4a1"></i>
    </div>

    <div class="card_content">
      <!-- 이름 -->
      <div class="form_group">
        <label>성함*</label>
        <input type="text" placeholder="성함을 입력해주세요" v-model="localForm.name" />
        <p class="label">문자를 입력하세요</p>
      </div>

      <!-- 휴대폰 -->
      <div class="form_group">
        <label>휴대폰 번호*</label>
        <input type="text" placeholder="01012345678" v-model="localForm.phone" />
        <p class="label">숫자를 입력해주세요 (- 제외)</p>
      </div>

      <!-- 사이즈 -->
      <div class="form_group">
        <label>사물함 사이즈*</label>
        <select v-model="localForm.size">
          <option value="">사이즈를 선택해 주세요</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          <option>XXL</option>
        </select>
        <p class="label">상세길이는 이용안내를 확인해주세요</p>
      </div>

      <!-- 대여 장소 -->
      <div class="form_group">
        <label>대여 장소*</label>
        <div class="addr-input">
          <input
            type="text"
            placeholder="지점 선택"
            v-model="localForm.address"
            readonly
          />
          <button type="button" class="mini-btn" @click="$emit('openBranch')">지점 선택</button>
        </div>
        <p class="label">대여장소를 선택해 주세요</p>
      </div>

      <!-- 예약 기간 -->
      <div class="form_group">
        <label>예약 기간*</label>
        <VueDatePicker
          v-model="localForm.dateRange"
          range
          locale="ko"
          :enable-time-picker="false"
          format="yyyy-MM-dd"
          placeholder="기간을 선택하세요"
        />
        <p class="label">시작일과 종료일을 모두 선택하세요</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// 부모 form 받아오기
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:form", "openBranch"]);

// form을 로컬로 바인딩 (양방향)
const localForm = computed({
  get: () => props.form,
  set: (val) => emit("update:form", val),
});

// 체크 조건
const isComplete = computed(() => {
  const f = props.form;
  return (
    f.name &&
    f.phone &&
    f.size &&
    f.address &&
    f.dateRange &&
    f.dateRange[0] &&
    f.dateRange[1]
  );
});
</script>

<style scoped lang="scss">
.form_card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px 40px;
  border: 1px solid #f0f0f0;
  transition: 0.2s ease;
}

.card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
  }
}

.form_group {
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    border: none;
    border-bottom: 1px solid #ddd;
    padding: 8px 6px;
    font-size: 0.9rem;
    color: #333;
    background: transparent;
    &:focus {
      border-bottom: 1px solid #53b4a1;
      outline: none;
    }
  }

  select {
    appearance: none;
  }

  .label {
    font-size: 12px;
    color: #888;
    margin-top: 4px;
  }
}

.addr-input {
  display: flex;
  gap: 8px;
  align-items: center;

  .mini-btn {
    background: #53b4a1;
    color: #fff;
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    &:hover {
      background: #3a8c88;
    }
  }
}
</style>
