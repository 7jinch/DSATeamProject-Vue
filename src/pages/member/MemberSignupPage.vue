<template>
  <div id="member-signup-page" class="main-container member-signup-page">
    <div id="member-signup-page-title">회원가입</div>
    <form id="member-signup-form" class="member-signup-form">
      <label for="member-email">이메일(로그인시 아이디로 활용돼요.)</label>
      <div id="member-email-form" class="member-signup-input">
        <input
          id="member-email"
          type="text"
          placeholder="이메일을 입력해 주세요."
          v-model="tmpEmail"
        />
        @
        <input
          id="member-email-dotcom"
          type="text"
          v-model="dotComValue"
          v-bind:disabled="disabledInput"
        />
        <select id="member-select-email" v-model="selectedDotComValue">
          <option value="" disabled selected>---이메일을 선택하세요---</option>
          <option value="직접">직접 입력하기</option>
          <option value="naver.com">네이버</option>
          <option value="daum.net">다음</option>
          <option value="google.com">구글</option>
        </select>
      </div>
      <div
        id="member-email-error"
        class="member-signup-error"
        v-text="errorMessage.email"
      ></div>
      <label for="member-password">비밀번호</label>
      <div id="member-password-form" class="member-signup-input">
        <input
          id="member-password"
          type="password"
          placeholder="6자-12자로 입력해 주세요."
          v-model="inputText.password"
        />
      </div>
      <div
        id="member-password-error"
        class="member-signup-error"
        v-text="errorMessage.password"
      ></div>
      <label for="member-name">이름</label>
      <div id="member-name-form" class="member-signup-input">
        <input
          id="member-name"
          type="text"
          placeholder="6자-12자로 입력해 주세요."
          v-model="inputText.name"
        />
      </div>
      <div
        id="member-name-error"
        class="member-signup-error"
        v-text="errorMessage.name"
      ></div>
      <label for="member-birth">생년월일</label>
      <div id="member-birth-form" class="member-signup-input">
        <input id="member-birth" type="date" v-model="inputText.birth" />
      </div>
      <div id="member-birth-error" v-text="errorMessage.birth"></div>
      <label for="member-phone">휴대전화 번호</label>
      <div id="member-phone-form" class="member-signup-input">
        <input
          id="member-phone"
          type="text"
          placeholder="예시) 000-0000-0000"
          v-model="inputText.phone_number"
        />
      </div>
      <div
        id="member-phone-error"
        class="member-signup-error"
        v-text="errorMessage.phone_number"
      ></div>
      <label for="member-gender">성별</label>
      <div id="member-gender-form" class="member-signup-input">
        <input id="member-gender" type="text" v-model="inputText.gender" />
      </div>
      <div
        id="member-gender-error"
        class="member-signup-error"
        v-text="errorMessage.gender"
      ></div>
      <label for="member-question-answer"
        >비밀번호 찾기 질문: {{ inputText.question }}</label
      >
      <div id="member-question-answer" class="member-signup-input">
        <select id="member-select-question" v-model="inputText.question">
          <option value="" disabled>---질문을 선택하세요---</option>
          <option>보물 1호</option>
          <option>어머니 고향</option>
          <option>주 교통수단</option>
          <option>태어난 곳</option>
        </select>
        <input
          id="member-question-answer"
          class="member-question-answer"
          type="text"
          placeholder="답변을 입력해주세요."
          v-model="inputText.answer"
        />
      </div>
      <div
        id="member-question-answer-error"
        class="member-signup-error"
        v-if="errorMessage.answer"
        v-text="errorMessage.answer"
      ></div>
    </form>
    <div id="signup-button-box" class="signup-button-box">
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
import { useStore } from '../../store/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import regEx from '../../utils/regEx';

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
  question: '',
  answer: '',
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
  answer: '',
});
const disabledInput = ref(true);

// errorMessage 초기화 함수
const initialization = () => {
  errorMessage.value.email = '';
  errorMessage.value.password = '';
  errorMessage.value.name = '';
  errorMessage.value.birth = '';
  errorMessage.value.phone_number = '';
  errorMessage.value.gender = '';
  errorMessage.value.answer = '';
};

const signupCheck = async () => {
  // const regEmail = new RegExp('^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$'); // email 정규표현식
  // const regName = new RegExp('^[가-힣a-zA-Z0-9]+$'); // name 정규표현식
  // const regPhone = new RegExp('\\d{3}-\\d{4}-\\d{4}'); // phone_number 정규표현식

  const today = new Date();
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const yesterday = new Date(today.getTime() - oneDayInMillis);
  const birtDate = new Date(inputText.value.birth);

  // 입력한 이메일 검사
  if (inputText.value.email === '') {
    initialization();
    errorMessage.value.email = '이메일은 필수로 입력해 주세요.';
    return;
  } else if (!regEx('email').test(inputText.value.email)) {
    initialization();
    errorMessage.value.email = '이메일의 형식에 맞춰서 입력해 주세요.';
    return;
  }
  // 입력한 비밀번호 검사
  else if (inputText.value.password === '') {
    initialization();
    errorMessage.value.password = '비밀번호는 필수로 입력해 주세요.';
    return;
  } else if (!regEx('password').test(inputText.value.password)) {
    initialization();
    errorMessage.value.password =
      '비밀번호는 6자에서 12자 사이로 입력해 주세요.';
    return;
  }
  // 입력한 이름 검사
  else if (inputText.value.name === '') {
    initialization();
    errorMessage.value.name = '이름은 필수로 입력해 주세요.';
    return;
  } else if (!regEx('name').test(inputText.value.name)) {
    initialization();
    errorMessage.value.name =
      '이름은 6자에서 12자 사이의 한글, 영문, 숫자로 입력해 주세요.';
    return;
  }
  // 입력한 생년월일 검사
  else if (inputText.value.birth === '') {
    initialization();
    errorMessage.value.birth = '생년월일은 필수로 입력해 주세요.';
    return;
  } else if (birtDate >= yesterday) {
    initialization();
    errorMessage.value.birth = '오늘 이전의 날짜만 선택할 수 있어요.';
    return;
  }
  // 입력한 전화번호 검사
  else if (inputText.value.phone_number === '') {
    initialization();
    errorMessage.value.phone_number = '전화번호는 필수로 입력해 주세요.';
    return;
  } else if (!regEx('phoneNumber').test(inputText.value.phone_number)) {
    initialization();
    console.log('error');
    errorMessage.value.phone_number =
      '전화번호의 형식에 맞춰서 입력해 주세요. (예시. 000-0000-0000)';
    return;
  }
  // 입력한 성별 검사
  else if (inputText.value.gender === '') {
    initialization();
    errorMessage.value.gender = '성별은 필수로 입력해 주세요.';
    return;
  }
  // 입력한 질문과 답변 검사
  else if (inputText.value.question === '') {
    initialization();
    errorMessage.value.answer = '질문을 선택해 주세요.';
    return;
  } else if (inputText.value.answer === '') {
    initialization();
    errorMessage.value.answer = '답변은 필수로 입력해 주세요.';
    return;
  } else if (inputText.value.answer.length > 30) {
    initialization();
    errorMessage.value.answer = '답변은 30자 이내로 입력해 주세요.';
    return;
  }

  initialization();
  const result = await store.signup(inputText.value);
  if (result === true) {
    console.log('회원가입 성공');
    tmpRouter.push('/member/login');
  } else {
    console.log('회원가입 실패');
    return;
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
    if (selectedDotComValue.value === '직접') {
      inputText.value.email = tmpEmail.value + '@' + dotComValue.value;
      // tmpEmail.value = '';
    } else if (selectedDotComValue.value !== '직접') {
      dotComValue.value = selectedDotComValue.value;
      inputText.value.email = tmpEmail.value + '@' + selectedDotComValue.value;
    }
  }
);

watch(selectedDotComValue, (newVale, prevValue) => {
  if (selectedDotComValue.value === '직접') disabledInput.value = false;
  else if (selectedDotComValue.value !== '직접') disabledInput.value = true;
});
</script>

<style scope>
.main-container {
  gap: 50px;
}

.member-signup-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  width: 50%;
}

.member-signup-input {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.signup-button-box {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
