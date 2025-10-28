<template>
  <div class="login-page">
    <!-- 왼쪽: 로그인 폼 -->
    <div class="login-left">
      <h1 class="title">마타주</h1>

      <form class="login-form" @submit.prevent="handleLogin">
        <input type="text" placeholder="아이디" v-model="userId" />
        <input type="password" placeholder="비밀번호" v-model="password" />
        <button type="submit" class="login-btn">로그인</button>

        <div class="link-row">
          <a href="#">아이디 찾기</a>
          <span>|</span>
          <a href="#">비밀번호 찾기</a>
          <span>|</span>
          <a href="/signup">회원가입</a>
        </div>
      </form>

      <div class="social-login">
        <button class="naver"><i class="fa-brands fa-naver"></i></button>
        <button class="kakao"><i class="fa-solid fa-comment"></i></button>
        <button class="google"><i class="fa-brands fa-google"></i></button>
      </div>
    </div>

    <!-- 오른쪽: 쿠폰 배너 -->
    <div class="login-right">
      <div class="coupon-banner">
        <div class="banner-text">
          <h2>마타주가 처음인 당신을 위한 쿠폰 혜택</h2>
          <p>
            신규회원 모두에게 가입 즉시 사용할 수 있는 쿠폰을 발송드립니다.<br />
            할인 혜택으로 여행을 가볍게 시작해보세요!
          </p>
        </div>
        <div class="coupon-card">
          <img src="/public/images/sign/Login_cupon.png" alt="">
          <!-- <div class="side">#COUPON</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const userId = ref("");
const password = ref("");

const handleLogin = () => {
  if (!userId.value || !password.value) {
    alert("아이디와 비밀번호를 입력하세요.");
    return;
  }
  alert(`로그인 시도: ${userId.value}`);
};
</script>

<style scoped lang="scss">
.coupon-card{
  width: 100%;
img{
  width: 100%
}
}
.login-page {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  min-height: 100vh;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

/* ✅ 왼쪽 로그인 폼 */
.login-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
}

.title {
  font-size: 28px;
  color: #378172;
  font-weight: 700;
  margin-bottom: 30px;
}

/* ✅ 로그인 폼 */
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
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #53b4a1;
    }
  }

  .login-btn {
    width: 100%;
    background: #53b4a1;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    padding: 14px 0;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #449b8a;
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
        color: #53b4a1;
      }
    }
  }
}

/* ✅ SNS 로그인 */
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

/* ✅ 오른쪽 쿠폰 배너 */
.login-right {
  // background: #f5f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.coupon-banner {
  width: 100%;
 background: linear-gradient(to bottom,#fff 65%, #53B4A1 35% );
  padding: 40px;
  border-radius: 6px;
  border: solid #e7e7e7 1px;
  // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 450px;

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
   background: #fff;
    color: #fff;
    border-radius: 6px;
    // padding: 40px 20px;
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
</style>
