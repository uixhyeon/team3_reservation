<template>
  <div class="form_card">
    <div class="card_header">
      <h3>집으로 보내기</h3>
      <i v-if="isComplete" class="fa-solid fa-check" style="color:#53b4a1"></i>
    </div>

    <div class="card_content">
      <!-- 주소 -->
      <div class="form_group">
        <label>주소*</label>
        <div class="addr-input">
          <input
            type="text"
            placeholder="주소를 선택해주세요"
            v-model="localForm.homeAddress"
            readonly
          />
          <button type="button" class="mini-btn" @click="openAddrModal">주소 검색</button>
        </div>
        <p class="label">받으실 주소를 선택해 주세요</p>
      </div>

      <!-- 상세주소 -->
      <div class="form_group">
        <label>상세 주소*</label>
        <input
          type="text"
          placeholder="상세 주소를 입력해주세요"
          v-model="localForm.homeAddressDetail"
        />
        <p class="label">상세주소를 입력해 주세요</p>
      </div>

      <!-- 배송일 -->
      <div class="form_group">
        <label>배송일*</label>
        <VueDatePicker
          v-model="localForm.deliveryDate"
          locale="ko"
          :enable-time-picker="false"
          format="yyyy-MM-dd"
          placeholder="날짜를 선택하세요"
        />
        <p class="label">배송일을 지정해 주세요</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:form"]);

const localForm = computed({
  get: () => props.form,
  set: (val) => emit("update:form", val),
});

const isComplete = computed(() => {
  const f = props.form;
  return f.homeAddress && f.homeAddressDetail && f.deliveryDate;
});

const openAddrModal = () => {
  alert("주소 검색 모달을 연결하세요 (부모에서 AddressPicker로 연결됨)");
};
</script>

<style scoped lang="scss">
.form_card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px 40px;
  border: 1px solid #f0f0f0;
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

  input {
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
