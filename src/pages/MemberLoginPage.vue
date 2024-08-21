<template>
  <div id="member-login-pate" class="main-container">
    <div id="member-login-page-title">로그인</div>
    <form id="login-form">
      <label for="member-email">아이디</label>
      <input id="member-email" type="text" v-model="inputText.email" />
      <div id="member-email-error" v-text="errorMessage.email"></div>
      <br />
      <label for="member-password">비밀번호</label>
      <input
        id="member-password"
        type="password"
        v-model="inputText.password"
      />
      <div id="member-password-error" v-text="errorMessage.password"></div>
    </form>
    <div id="login-button-box">
      <input
        id="login-button"
        type="button"
        value="로그인"
        @click="loginCheck"
      />
      <input type="button" value="메인 페이지로" @click="moveHome" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store/store';
import { storeToRefs } from 'pinia';

import Cookies from 'js-cookie';
import regEx from '../utils/regEx';

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

const loginCheck = async () => {
  errorMessage.value.email = '';
  errorMessage.value.password = '';

  // 입력한 이메일 검사
  if (inputText.value.email === '') {
    errorMessage.value.email = '이메일을 입력해 주세요.';
    return;
  } else if (!regEx('email').test(inputText.value.email)) {
    errorMessage.value.email = '이메일의 형식에 맞춰서 입력해 주세요.';
    return;
  }

  // 입력한 비밀번호 검사
  if (inputText.value.password === '') {
    errorMessage.value.password = '비밀번호를 입력해 주세요.';
    return;
  } else if (!regEx('password').test(inputText.value.password)) {
    errorMessage.value.password =
      '비밀번호는 6자에서 12자 사이로 입력해 주세요.';
    return;
  }

  errorMessage.value.email = '';
  errorMessage.value.password = '';

  const result = await store.login(inputText.value);
  if (result && result.isTrue === true) {
    console.log('로그인 성공');
    store.deleteServerMessage();
    tmpRouter.push('/');
  } else {
    store.updateServerMessage(result);
    console.log('로그인 실패');
  }
};
</script>

<style lang="scss" scoped></style>
