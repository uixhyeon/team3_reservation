<template>
  <div class="login-page">
    <!-- 왼쪽: 로그인 폼 -->
    <div class="login-left">
      <h1 class="title">마타주</h1>



    <form class="login-form" @submit.prevent="handleLogin">
  <!-- ✅ 이메일 (앞+뒤 입력) -->
  <div class="email-row">
    <input
      type="text"
      placeholder="이메일 아이디"
      v-model="emailId"
    />
    <span>@</span>
    <select v-model="emailDomain">
      <option disabled value="">도메인 선택</option>
      <option value="gmail.com">gmail.com</option>
      <option value="naver.com">naver.com</option>
      <option value="daum.net">daum.net</option>
      <option value="kakao.com">kakao.com</option>
      <option value="custom">직접 입력</option>
    </select>
  </div>

  <!-- ✅ 직접입력 시 표시 -->
  <input
    v-if="emailDomain === 'custom'"
    type="text"
    class="custom-domain"
    placeholder="직접 입력 (예: company.com)"
    v-model="customDomain"
  />

  <!-- ✅ 비밀번호 -->
  <input type="password" placeholder="비밀번호" v-model="password" />

  <!-- ✅ 로그인 버튼 -->
  <button type="submit" class="login-btn">로그인</button>

  <!-- ✅ 비회원 예약 -->
  <button type="button" class="login-btn-2" @click="goGuestReserve">
    비회원 예약하기
  </button>

  <!-- ✅ 찾기 링크 -->
  <div class="link-row">
    <a href="#" @click.prevent="showFindId = true">아이디 찾기</a>
    <span>|</span>
    <a href="#" @click.prevent="showFindPw = true">비밀번호 찾기</a>
    <span>|</span>
    <a href="/signup">회원가입</a>
  </div>
</form>

      <div class="social-login">
        <button class="naver" aria-label="네이버 로그인">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="30"
            viewBox="0 0 600 500"
          >
            <path
              fill="#ffffff"
              d="M176 128h88l72 112V128h88v256h-88l-72-112v112h-88V128z"
            />
          </svg>
        </button>

        <button class="kakao"><i class="fa-solid fa-comment"></i></button>
        <button class="google"><i class="fa-brands fa-google"></i></button>
      </div>
    </div>

    <!-- 오른쪽: 쿠폰 배너 -->
    <div class="login-right">
      <div class="coupon-banner">
        <div class="banner-text">
          <div class="title-bg">
            <h2>마타주가 처음인 당신을 위해</h2>
          </div>
          <div class="scr-bg">
            <p>
              신규회원 가입 쿠폰을 발송드려요<br />
              가벼운 여행을 시작해 보세요!
            </p>
          </div>
        </div>
        <div class="coupon-card">
          <img src="/public/images/sign/Login_cupon.png" alt="쿠폰" />
        </div>
      </div>
    </div>
  </div>

  <!-- ✅ 모달 -->
  <FindIDModal v-if="showFindId" @close="showFindId = false" />
  <FindPwModal v-if="showFindPw" @close="showFindPw = false" />
</template>
<script setup>
import { ref, computed, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import FindIDModal from "@/views/sign/FindID.vue";
import FindPwModal from "@/views/sign/FindPw.vue";

const router = useRouter();
const { appContext } = getCurrentInstance(); // ✅ 전역 alert 접근

// 📧 이메일 구조
const emailId = ref("");
const emailDomain = ref("");
const customDomain = ref("");
const isCustom = computed(() => emailDomain.value === "custom");

// 📧 전체 이메일
const fullEmail = computed(() => {
  if (!emailId.value) return "";
  if (isCustom.value && customDomain.value)
    return `${emailId.value}@${customDomain.value}`;
  if (!isCustom.value && emailDomain.value)
    return `${emailId.value}@${emailDomain.value}`;
  return "";
});

// 🔐 비밀번호
const password = ref("");

// 📬 모달
const showFindId = ref(false);
const showFindPw = ref(false);

/* ======================
   로그인 처리
====================== */
const handleLogin = () => {
  // 둘 중 하나라도 비었거나 이메일 조합이 안되면 에러
  if (!fullEmail.value || !password.value) {
    appContext.config.globalProperties.$alert("아이디 또는 비밀번호가 맞지 않습니다 ❌");
    return;
  }

  // ✅ 형식 검사
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(fullEmail.value)) {
    appContext.config.globalProperties.$alert("아이디 또는 비밀번호가 맞지 않습니다 ❌");
    return;
  }

  // ✅ 성공 가정
  appContext.config.globalProperties.$alert(`로그인 성공 ✅\n${fullEmail.value}`);
  router.push("/");
};

/* ======================
   비회원 예약 이동
====================== */
const goGuestReserve = () => {
  router.push("/reservation");
};
</script>

<style scoped lang="scss">
@use "/src/assets/style/variables" as *;

/* ============================
   🎟️ 쿠폰 / 레이아웃 기본
============================ */
.coupon-card {
  width: 100%;
  img {
    width: 100%;
  }
}

.title-bg {
  // background-color: #2db400;
}
.scr-bg {
  // background-color: #ffe812;
  display: inline-block;
}

/* ============================
   🧩 메인 레이아웃
============================ */
.login-page {
  display: flex;
  justify-content: center;
  align-items: stretch;
  min-height: 60vh;
  max-width: 1120px;
  margin: 0 auto 40px;
  gap: 0;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }
}

/* ============================
   👈 왼쪽 로그인 폼
============================ */
.login-left {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.title {
  font-size: 28px;
  color: $color_main;
  font-weight: 700;
  margin-bottom: 30px;
}

/* ============================
   🧾 로그인 폼
============================ */
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  gap: 15px;

  input {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid #e7e7e7;
    border-radius: $radius-s;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: $color_main_light;
    }
  }

  .login-btn {
    width: 100%;
    background: $color_main;
    color: #fff;
    border: none;
    border-radius: $radius-s;
    font-weight: 600;
    padding: 14px 0;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.2s ease;

    &:hover {
      background: $color_main_deep;
    }
  }

  .login-btn-2 {
    width: 100%;
    background: rgb(201, 201, 201);
    color: #616161;
    border: none;
    border-radius: $radius-s;
    font-weight: 600;
    padding: 14px 0;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.2s ease;

    &:hover {
      background: rgb(180, 180, 180);
    }
  }

  .link-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    font-size: 13px;
    color: #666;

    a {
      color: #666;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: $color_main_deep;
      }
    }
  }
}

/* ============================
   🌐 SNS 로그인
============================ */
.social-login {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-top: 25px;

  button {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .naver {
    background: #2db400;
    color: #fff;
  }

  .kakao {
    background: #ffe812;
    color: #3c1e1e;
  }

  .google {
    background: #fff;
    border: 1px solid #ddd;
    color: #333;
  }
}

/* ============================
   👉 오른쪽 쿠폰 배너
============================ */
.login-right {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

.coupon-banner {
  width: 100%;
  background: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.4)
    ),
    url(/public/images/sign/2462865.png) no-repeat center center / cover;
  padding: 40px;
  border-radius: $radius-s;
  border: 1px solid #e7e7e7;
  text-align: center;
  max-width: 400px;
  background-color: #fff;

  .banner-text {
    h2 {
      font-size: 18px;
      color: #222;
      margin-bottom: 10px;
      font-weight: 700;
    }
    p {
      font-size: 14px;
      color: #555;
      line-height: 1.5;
      margin-bottom: 30px;
    }
  }

  .coupon-card {
    width: 100%;
    position: relative;
    color: #fff;
    border-radius: $radius-s;
    text-align: center;

    h1 {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
    }

    p {
      font-size: 14px;
      color: #ccc;
      margin-top: 8px;
    }

    .side {
      position: absolute;
      top: 50%;
      right: -28px;
      transform: translateY(-50%) rotate(90deg);
      font-size: 11px;
      letter-spacing: 1px;
      color: #fff;
      opacity: 0.7;
    }
  }
}

@media (max-width: 480px) {
  .coupon-banner {
    max-width: 320px;
  }
}

/* ============================
   📧 이메일 입력 (하나의 테두리형)
============================ */
.email-row {
  display: flex;
  align-items: center;
  width: 100%;
  height: 46px; /* 비밀번호 input과 동일 높이 */
  border: 1px solid #e7e7e7;
  border-radius: $radius-s;
  padding: 0 10px;
  background: #fff;
  transition: border-color 0.25s ease;

  &:focus-within {
    border-color: $color_main_light;
  }

  input,
  select {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    color: #333;
    background: transparent;
    padding: 0 6px;
    height: 100%;

    &::placeholder {
      color: #aaa;
    }
  }

  span {
    font-size: 15px;
    color: #555;
    padding: 0 4px;
  }

  select {
    appearance: none;
    cursor: pointer;
  }
}

/* 직접입력 시 */
.custom-domain {
  width: 100%;
  border: 1px solid #e7e7e7;
  border-radius: $radius-s;
  font-size: 14px;
  padding: 12px 10px;
  margin-top: 8px;
  outline: none;
  &:focus {
    border-color: $color_main_light;
  }
}
</style>
