<template>
  <div class="summary_card">
    <h2 class="card_title">선택 상품 요약</h2>

    <!-- 입력 전 안내문 -->
    <div v-if="!hasInput" class="summary-guide">원하시는 상품을 선택해주세요 🧳</div>

    <!-- 입력 후 요약 테이블 -->
    <table v-else>
      <colgroup>
        <col style="width: 45%" />
        <col style="width: 55%" />
      </colgroup>
      <tbody>
        <!-- 사물함 예약 -->
        <template v-if="lockerComplete">
          <tr class="section-title"><td colspan="2" class="s-title">사물함 예약</td></tr>
          <tr><td>성함</td><td>{{ form.name }}</td></tr>
          <tr><td>휴대폰</td><td>{{ form.phone }}</td></tr>
          <tr><td>사물함 사이즈</td><td>{{ form.size }}</td></tr>
          <tr><td>대여 장소</td><td>{{ form.address }}</td></tr>
          <tr v-if="form.dateRange && form.dateRange[0] && form.dateRange[1]">
            <td>예약 기간</td>
            <td>{{ formatDate(form.dateRange[0]) }} ~<br />{{ formatDate(form.dateRange[1]) }}</td>
          </tr>
        </template>

        <!-- 짐 가져오기 -->
        <template v-if="arrivalComplete">
          <tr class="section-title"><td colspan="2" class="s-title">짐 가져오기</td></tr>
          <tr><td>픽업 주소</td><td>{{ form.pickupAddress }}</td></tr>
          <tr><td>상세주소</td><td>{{ form.pickupAddressDetail }}</td></tr>
          <tr><td>픽업일</td><td>{{ formatDate(form.pickupDate) }}</td></tr>
        </template>

        <!-- 집으로 보내기 -->
        <template v-if="luggageComplete">
          <tr class="section-title"><td colspan="2" class="s-title">집으로 보내기</td></tr>
          <tr><td>배송 주소</td><td>{{ form.homeAddress }}</td></tr>
          <tr><td>상세주소</td><td>{{ form.homeAddressDetail }}</td></tr>
          <tr><td>배송일</td><td>{{ formatDate(form.deliveryDate) }}</td></tr>
        </template>

        <!-- 총 결제금액 -->
        <tr v-if="totalPrice > 0" class="total">
          <td class="s-title">총 결제금액</td>
          <td><strong>{{ formatKrw(totalPrice) }}</strong></td>
        </tr>
      </tbody>
    </table>

    <button class="submit_btn" @click="$emit('submit')">입력 완료</button>
  </div>
</template>

<script setup>
const props = defineProps({
  form: Object,
  lockerComplete: Boolean,
  arrivalComplete: Boolean,
  luggageComplete: Boolean,
  totalPrice: Number,
  hasInput: Boolean,
  formatDate: Function,
  formatKrw: Function,
});

defineEmits(["submit"]);
</script>

<style scoped lang="scss">
.summary_card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px 40px;
  border: 1px solid #f0f0f0;
}

.card_title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  color: #444;

  tr {
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 8px 0;
    text-align: left;
    vertical-align: middle;
  }

  td:first-child {
    color: #777;
    width: 40%;
  }

  .s-title {
    color: #333;
    font-weight: 600;
    font-size: 0.9rem;
    padding-top: 10px;
  }

  &.total td:last-child {
    color: #53b4a1;
    font-weight: 700;
  }
}

.summary-guide {
  text-align: center;
  padding: 60px 20px;
  color: #9aa6a9;
  font-size: 15px;
  font-weight: 500;
  background: #f9fbfb;
  border: 1px dashed #cfe2e2;
  border-radius: 10px;
}

.submit_btn {
  width: 70%;
  padding: 14px 0;
  font-weight: 600;
  font-size: 1rem;
  color: #fff;
  background: #53b4a1;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 20px auto 0;
  display: block;
  transition: 0.3s ease;

  &:hover {
    background: #3a8c88;
  }
}
</style>
