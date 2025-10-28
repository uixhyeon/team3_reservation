<template>
  <div>
    <h1>회원가입</h1>
    <p>회원가입을 진행해주세요</p>
    <button @click="goToLogin">회원가입하기</button>
  </div>
<h1>임시 회원가입</h1>
<!-- ==================================================== -->

  <div class="join-page">
    <!-- ✅ 상단 영역 -->
    <header class="header">
      <div class="logo left">로고</div>
      <h1>회원가입</h1>
      <div class="logo right">로고</div>
    </header>

    <!-- ✅ 메인 카드 -->
    <div class="join-card">
      <form>
        <div class="form-group">
          <label>휴대폰 번호</label>
          <div class="input-row">
            <input type="text" placeholder="번호를 입력해 주세요" />
            <button type="button" class="btn small">인증 요청</button>
          </div>
          <p class="desc">-없이 입력</p>
        </div>

        <div class="form-group">
          <label>인증번호</label>
          <div class="input-row">
            <input type="text" placeholder="인증번호" />
            <button type="button" class="btn small">인증 하기</button>
          </div>
          <p class="desc">번호를 입력해 주세요</p>
        </div>

        <div class="terms">
          <div class="term-header">
            <label><input type="checkbox" /> 전체 동의합니다</label>
          </div>
          <ul>
            <li><label><input type="checkbox" /> [필수] 만 14세 이상입니다.</label></li>
            <li><label><input type="checkbox" /> [필수] 서비스 이용약관 동의 (보기)</label></li>
            <li><label><input type="checkbox" /> [필수] 개인정보 수집 및 이용동의 (보기)</label></li>
            <li><label><input type="checkbox" /> [필수] 개인정보 제3자 제공동의 (보기)</label></li>
            <li><label><input type="checkbox" /> [선택] 마케팅 목적 개인정보 수집 및 이용동의 (보기)</label></li>
          </ul>
        </div>

        <button type="submit" class="btn primary full">이용동의</button>
      </form>
    </div>
  </div>



<!-- ==================================================== -->
 <div class="join-page">
    <!-- ✅ 상단 영역 -->
    <header class="header">
      <div class="logo left">로고</div>
      <h1>회원가입</h1>
      <div class="logo right">로고</div>
    </header>

    <!-- ✅ 메인 카드 -->
    <div class="join-card">
      <form>
        <div class="form-group">
          <div class="form_group">
            <label>성함*</label>
            <input type="text" placeholder="성함을 입력해주세요" />
            <p class="label">문자만 입력하세요</p>
          </div>

          <div class="form_group">
            <label>휴대폰 번호*</label>
            <input type="text" placeholder="01012345678 (- 제외)" />
            <p class="label">숫자만 입력해주세요</p>
          </div>

          <div class="form_group">
            <label>사물함 사이즈*</label>
            <select>
              <option value="">사이즈를 선택해 주세요</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
            <p class="label">필수 입력 사항 입니다.</p>
          </div>

          <div class="form_group">
            <label>대여 장소*</label>
            <input type="text" placeholder="지번 및 주소를 입력해주세요" />
            <p class="label">대여장소를 선택해 주세요</p>
          </div>

          <div class="form_group">
            <label>예약 날짜*</label>
            <input type="date" />
            <p class="label">날짜를 입력하세요</p>
          </div>

             <button type="submit" class="btn primary full">이용동의</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
// useRouter() 이동할때 사용하는 함수
const router = useRouter();
const goToLogin = () => {
  alert("회원가입완료");
  router.push("/login");
};
</script>

<style scoped lang="scss">
/* ✅ 전체 페이지 구조 */
.join-page {
  min-height: 100vh;
  background: #f5f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 0;
}

/* ✅ 상단 헤더 */
.header {
  position: relative;
  width: 100%;
  background: #53b4a1;
  color: #fff;
  text-align: center;
  padding: 50px 0;
  z-index: 1;

  h1 {
    font-size: 26px;
    font-weight: 700;
    margin: 0;
    position: relative;
    z-index: 2;
  }

  .logo {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    background: rgba(255, 255, 255, 0.4);
    color: #333;
    width: 70px;
    height: 70px;
    line-height: 70px;
    font-weight: 600;
    text-align: center;
    border-radius: 4px;
    z-index: 2;

    &.left {
      left: 80px;
    }

    &.right {
      right: 80px;
      background: rgba(255, 255, 255, 0.6);
    }
  }
}

/* ✅ 회원가입 카드 */
.join-card {
  background: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 50px 60px;
  width: 500px;
  position: relative;
  z-index: 10;
  margin-top: -60px;

  form {
    position: relative;
    z-index: 10;
  }
}

/* ✅ 라인형 입력 폼 */
.form_group {
  margin-bottom: 25px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    display: block;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    border: none;
    border-bottom: 1px solid #e7e7e7;
    background: transparent;
    font-size: 14px;
    padding: 10px 4px;
    outline: none;
    color: #333;
    transition: border-color 0.2s ease;

    &:focus {
      border-bottom: 1px solid #53b4a1;
    }
  }

  select {
    appearance: none;
    background: url("data:image/svg+xml;utf8,<svg fill='%2355b4a1' height='10' viewBox='0 0 20 20' width='10'><path d='M5 7l5 5 5-5H5z'/></svg>")
      no-repeat right 10px center;
    background-size: 12px;
    padding-right: 28px;
  }

  .label {
    font-size: 12px;
    color: #888;
    margin-top: 4px;
  }
}

/* ✅ 새로운 입력 구조 (.form-group: 복수행 대응) */
.form-group {
  margin-bottom: 25px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    display: block;
    margin-bottom: 6px;
  }

  .input-row {
    display: flex;
    gap: 10px;

    input {
      flex: 1;
      border: none;
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      padding: 8px 4px;
      outline: none;

      &:focus {
        border-bottom-color: #53b4a1;
      }
    }
  }

  .desc {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
  }
}

/* ✅ 약관 영역 */
.terms {
  border-top: 1px solid #e7e7e7;
  padding-top: 15px;
  margin-top: 10px;

  .term-header {
    margin-bottom: 10px;
    label {
      font-weight: 700;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: 13px;
      color: #555;
      margin-bottom: 6px;
    }
  }

  input[type="checkbox"] {
    margin-right: 8px;
    accent-color: #53b4a1;
  }
}

/* ✅ 버튼 */
.btn {
  background: #53b4a1;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  padding: 12px 16px;

  &.small {
    padding: 8px 14px;
    font-size: 13px;
  }

  &.primary.full {
    width: 100%;
    padding: 16px 0;
    font-size: 15px;
    margin-top: 25px;
  }

  &:hover {
    background: #449b8a;
  }
}

/* ✅ 반응형 */
@media (max-width: 600px) {
  .join-card {
    width: 90%;
    padding: 30px 20px;
  }
  .header .logo {
    display: none;
  }
}
</style>
