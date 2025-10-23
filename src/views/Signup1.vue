<template>
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
</template>

<script setup>
// 💬 정적 UI 예시 (로직 없음)
</script>
<style scoped lang="scss">
/* ✅ 전체 페이지 구조 */
.join-page {
  min-height: 100vh;
  background: #f5f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* z-index 기준 */
  z-index: 0;
}

/* ✅ 상단 헤더 (배경 뒤로 배치) */
.header {
  position: relative;
  width: 100%;
  background: #53b4a1;
  color: #fff;
  text-align: center;
  padding: 50px 0;
  z-index: 1; // 🎨 헤더는 배경 역할로 뒤에 위치

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

/* ✅ 회원가입 카드 (헤더 위로 올라옴) */
.join-card {
  background: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 50px 60px;
  width: 500px;
  position: relative;
  z-index: 10; // 🎯 카드가 헤더보다 위에 있도록 설정
  margin-top: -60px; // 헤더와 시각적으로 연결

  form {
    position: relative;
    z-index: 10;
  }
}

/* ✅ 입력 그룹 */
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
