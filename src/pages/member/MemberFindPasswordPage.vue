<template>
  <div id="member-find-password-page" class="main-container">
    <div id="member-find-password-page-title">비밀번호 재설정하기</div>
    <form id="member-find-password-form" class="member-find-password-form">
      <label for="member-email"
        >가입할 때 입력했던 이메일을 입력해 주세요.</label
      >
      <div id="member-email-form">
        <input
          id="member-email-input"
          type="text"
          placeholder="이메일을 입력해 주세요"
          v-model="inputText.email"
          v-bind:disabled="newPasswordform"
        />
        <div
          id="member-email-error"
          v-if="errorMessage.email"
          v-text="errorMessage.email"
        ></div>
      </div>
      <label for="member-question-answer"
        >비밀번호 찾기 질문: {{ inputText.question }}</label
      >
      <div id="member-question-answer" class="member-question-answer">
        <select
          id="member-select-question"
          v-model="inputText.question"
          v-bind:disabled="newPasswordform"
        >
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
          placeholder="답변을 입력해주세요"
          v-model="inputText.answer"
          v-bind:disabled="newPasswordform"
        />
        <div
          id="member-question-answer-error"
          class="member-question-answer-error"
          v-text="errorMessage.answer"
        ></div>
      </div>
      <label for="member-new-password" v-if="newPasswordform"
        >새로운 비밀번호를 입력해 주세요.</label
      >
      <div id="member-password-form">
        <input
          id="member-new-password"
          class="member-new-password"
          placeholder="새로운 비밀번호를 입력해 주세요."
          type="text"
          v-model="newPassword.password"
          v-if="newPasswordform"
        />
        <div
          id="member-email-error"
          class="member-email-error"
          v-text="errorMessage.password"
        ></div>
      </div>
    </form>
    <div id="find-password-button-box" class="find-password-button-box">
      <input
        id="find-password-button-1"
        type="button"
        value="이메일 확인"
        @click="findPasswordButton"
        v-bind:disabled="newPasswordform"
      />
      <input
        id="find-password-button-2"
        type="button"
        value="비밀번호 변경"
        @click="newPasswordFunc"
        v-if="newPasswordform"
      />
      <input type="button" value="메인 페이지로" @click="moveHome" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '../../store/store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import regEx from '../../utils/regEx';

const inputText = ref({
  email: '',
  question: '',
  answer: '',
});
const errorMessage = ref({
  email: '',
  question: '',
  answer: '',
  password: '',
});
const newPasswordform = ref(false);
const newPassword = ref({
  email: '',
  question: '',
  answer: '',
  password: '',
});

const store = useStore();
const tmpRouter = useRouter();

// errorMessage 초기화 함수
const initialization = () => {
  errorMessage.value.email = '';
  errorMessage.value.question = '';
  errorMessage.value.answer = '';
};

const moveHome = () => tmpRouter.push('/');

const findPasswordButton = async () => {
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
  const result = await store.findPassword(inputText.value);
  if (result === true) {
    console.log('이메일, 질문, 답변이 일치함');
    store.deleteServerMessage();
    newPasswordform.value = !newPasswordform.value; // 비밀번호 재설정 input 요소 보이게 하기
  } else {
    console.log('이메일, 질문, 답변이 잘못됨');
    return;
  }
};

const newPasswordFunc = async () => {
  // 입력한 비밀번호 검사
  if (newPassword.value.password === '') {
    initialization();
    errorMessage.value.password = '비밀번호는 필수로 입력해 주세요.';
    return;
  } else if (!regEx('password').test(newPassword.value.password)) {
    initialization();
    errorMessage.value.password =
      '비밀번호는 6자에서 12자 사이로 입력해 주세요.';
    return;
  }

  initialization();
  newPassword.value.email = inputText.value.email;
  newPassword.value.question = inputText.value.question;
  newPassword.value.answer = inputText.value.answer;

  const result = await store.changePassword(newPassword.value);
  if (result === true) {
    console.log('비밀번호 재설정 완료');
    tmpRouter.push('/member/login');
  } else {
    console.log('비밀번호 재설정 실패');
    return;
  }
};
</script>

<style scoped>
.main-container {
  gap: 50px;
}

.member-find-password-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  width: 50%;
}

.member-question-answer {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.find-password-button-box {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
