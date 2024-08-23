<template>
  <div id="member-login-page" class="main-container">
    <div id="member-login-page-title">로그인</div>
    <form id="member-login-form" class="member-login-form">
      <label for="member-email">이메일</label>
      <div id="member-email-form" class="member-login-input">
        <input
          id="member-email"
          type="text"
          placeholder="이메일을 입력해 주세요."
          v-model="inputText.email"
        />
      </div>
      <div
        id="member-email-error"
        class="member-login-input"
        v-if="errorMessage.email"
        v-text="errorMessage.email"
      ></div>
      <label for="member-password">비밀번호</label>
      <div id="member-password-form" class="member-login-input">
        <input
          id="member-password"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          v-model="inputText.password"
        />
      </div>
      <div
        id="member-password-error"
        class="member-login-input"
        v-if="errorMessage.password"
        v-text="errorMessage.password"
      ></div>
    </form>
    <div id="login-button-box" class="login-button-box">
      <input
        id="login-button"
        type="button"
        value="로그인"
        @click="loginCheck"
      />
      <input
        id="find-password-button"
        type="button"
        value="비밀번호 재설정하기"
        @click="findPassword"
      />
      <input type="button" value="메인 페이지로" @click="moveHome" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../../store/store';

import regEx from '../../utils/regEx';

const inputText = ref({
  email: '',
  password: '',
});
const errorMessage = ref({
  email: '',
  password: '',
});

const tmpRouter = useRouter();
const store = useStore();

const moveHome = () => tmpRouter.push('/');

const findPassword = () => tmpRouter.push('/member/findpassword');

// errorMessage 초기화 함수
const initialization = () => {
  errorMessage.value.email = '';
  errorMessage.value.password = '';
};

const loginCheck = async () => {
  errorMessage.value.email = '';
  errorMessage.value.password = '';

  // 입력한 이메일 검사
  if (inputText.value.email === '') {
    initialization();
    errorMessage.value.email = '이메일을 입력해 주세요.';
    return;
  } else if (!regEx('email').test(inputText.value.email)) {
    initialization();
    errorMessage.value.email = '이메일의 형식에 맞춰서 입력해 주세요.';
    return;
  }
  // 입력한 비밀번호 검사
  else if (inputText.value.password === '') {
    initialization();
    errorMessage.value.password = '비밀번호를 입력해 주세요.';
    return;
  } else if (!regEx('password').test(inputText.value.password)) {
    initialization();
    errorMessage.value.password =
      '비밀번호는 6자에서 12자 사이로 입력해 주세요.';
    return;
  }

  initialization();

  const result = await store.login(inputText.value);
  if (result && result === true) {
    console.log('로그인 성공! 환영합니다!');
    tmpRouter.push('/');
  } else {
    console.log('로그인 실패... 에러를 확인해 주세요!');
    return;
  }
};
</script>

<style scope>
.main-container {
  gap: 50px;
}

.member-login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  width: 50%;
}

.member-login-input {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.login-button-box {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
</style>
