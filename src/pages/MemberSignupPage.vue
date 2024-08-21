<template>
  <div id="member-signup-page" class="main-container">
    <div id="member-signup-page-title">회원가입</div>
    <form id="member-signup-form">
      <label for="member-email">이메일(추후 아이디로 활용됩니다.)</label>
      <input id="member-email" type="text" v-model="tmpEmail" /> @
      <input id="member-email-dotcom" type="text" v-model="dotComValue" />
      <select id="member-select-email" v-model="selectedDotComValue">
        <option value="" selected>---이메일을 선택하세요---</option>
        <option value="directInput">직접 입력하기</option>
        <option value="naver.com">네이버</option>
        <option value="daum.net">다음</option>
        <option value="google.com">구글</option>
      </select>
      <div id="member-email-error" v-text="errorMessage.email"></div>
      <br />
      <label for="member-password">비밀번호</label>
      <input
        id="member-password"
        type="password"
        v-model="inputText.password"
      />
      <div id="member-password-error" v-text="errorMessage.password"></div>
      <br />
      <label for="member-name">이름</label>
      <input id="member-name" type="text" v-model="inputText.name" />
      <div id="member-name-error" v-text="errorMessage.name"></div>
      <br />
      <label for="member-birth">생년월일</label>
      <input id="member-birth" type="date" v-model="inputText.birth" />
      <div id="member-birth-error" v-text="errorMessage.birth"></div>
      <br />
      <label for="member-phone">휴대전화 번호</label>
      <input id="member-phone" type="text" v-model="inputText.phone_number" />
      <div id="member-phone-error" v-text="errorMessage.phone_number"></div>
      <br />
      <label for="member-gender">성별</label>
      <input id="member-gender" type="text" v-model="inputText.gender" />
      <div id="member-gender-error" v-text="errorMessage.gender"></div>
    </form>
    <div id="signup-button-box">
      <input
        id="member-signup-button"
        type="button"
        value="회원가입"
        @click="signupCheck"
      />
      <input type="button" value="메인 페이지로" @click="moveHome" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from '../store/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import regEx from '../utils/regEx';

const store = useStore(); // store 객체 받기

const tmpRouter = useRouter();

// 상태값
const inputText = ref({
  email: '',
  password: '',
  name: '',
  birth: '',
  phone_number: '',
  gender: '',
});
const tmpEmail = ref('');
const dotComValue = ref('');
const selectedDotComValue = ref('');
const errorMessage = ref({
  email: '',
  password: '',
  name: '',
  birth: '',
  phone_number: '',
  gender: '',
});

// input 태그 초기화 함수
const initialization = () => {
  errorMessage.value.email = '';
  errorMessage.value.password = '';
  errorMessage.value.name = '';
  errorMessage.value.birth = '';
  errorMessage.value.phone_number = '';
  errorMessage.value.gender = '';
};

const signupCheck = async () => {
  // const regEmail = new RegExp('^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$'); // email 정규표현식
  // const regName = new RegExp('^[가-힣a-zA-Z0-9]+$'); // name 정규표현식
  // const regPhone = new RegExp('\\d{3}-\\d{4}-\\d{4}'); // phone_number 정규표현식

  const today = new Date();
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const yesterday = new Date(today.getTime() - oneDayInMillis);
  const birtDate = new Date(inputText.value.birth);

  if (inputText.value.email === '') {
    initialization();
    errorMessage.value.email = '이메일은 필수로 입력해 주세요.';
    return;
  } else if (!regEx('email').test(inputText.value.email)) {
    initialization();
    errorMessage.value.email = '이메일의 형식에 맞춰서 입력해 주세요.';
    return;
  } else if (inputText.value.password === '') {
    initialization();
    errorMessage.value.password = '비밀번호는 필수로 입력해 주세요.';
    return;
  } else if (!regEx('password').test(inputText.value.password)) {
    initialization();
    errorMessage.value.password =
      '비밀번호는 6자에서 12자 사이로 입력해 주세요.';
    return;
  } else if (inputText.value.name === '') {
    initialization();
    errorMessage.value.name = '이름은 필수로 입력해 주세요.';
    return;
  } else if (!regEx('name').test(inputText.value.name)) {
    initialization();
    errorMessage.value.name =
      '이름은 6자에서 12자 사이의 한글, 영문, 숫자로 입력해 주세요.';
    return;
  } else if (inputText.value.birth === '') {
    initialization();
    errorMessage.value.birth = '생년월일은 필수로 입력해 주세요.';
    return;
  } else if (birtDate >= yesterday) {
    initialization();
    errorMessage.value.birth = '오늘 이전의 날짜만 선택할 수 있어요.';
    return;
  } else if (inputText.value.phone_number === '') {
    initialization();
    errorMessage.value.phone_number = '전화번호는 필수로 입력해 주세요.';
    return;
  } else if (!regEx('phoneNumber').test(inputText.value.phone_number)) {
    initialization();
    console.log('error');
    errorMessage.value.phone_number =
      '전화번호의 형식에 맞춰서 입력해 주세요. (예시. 000-0000-0000)';
    return;
  } else if (inputText.value.gender === '') {
    initialization();
    errorMessage.value.gender = '성별은 필수로 입력해 주세요.';
    return;
  }

  initialization();
  const result = await store.signup(inputText.value);
  if (result.isTrue === true) {
    console.log('회원가입 성공');
    store.deleteServerMessage();
    tmpRouter.push('/');
  } else {
    store.updateServerMessage(result);
    console.log('회원가입 실패');
  }
};

const moveHome = () => {
  tmpRouter.push('/');
};

watch(
  [tmpEmail, selectedDotComValue, dotComValue],
  (
    [newEmail, newSelectedDotCome, newDotCom],
    [prevEmail, prevSelectedDotCom, prevDotcom]
  ) => {
    if (selectedDotComValue.value === 'directInput') {
      inputText.value.email = tmpEmail.value + '@' + dotComValue.value;
      // tmpEmail.value = '';
    } else if (selectedDotComValue.value !== 'directInput') {
      dotComValue.value = selectedDotComValue.value;
      inputText.value.email = tmpEmail.value + '@' + selectedDotComValue.value;
    }
  }
);
</script>

<style></style>
