<template>
  <Header />
  <div id="profile-page" class="profile-page main-container">
    <div id="profile-page-title" class="title">프로필 페이지</div>
    <div id="profile-container" class="profile-container" v-if="showProfile">
      <Profile v-if="!showEditInputbutton" :userData="userData" />
      <ProfileEdit
        v-if="showEditInputbutton"
        v-model:userData="userData"
        v-model:tmpValue="tmpValue"
        v-model:errorMessage="errorMessage"
      />
      <div id="edit-button-box" class="edit-button-box">
        <input
          type="button"
          id="show-edit-input-button"
          class="how-edit-input-button"
          value="프로필 수정"
          @click="showEditInput"
          v-if="loggedInUser.isLoggedIn"
          v-bind:disabled="showEditInputbutton"
        />
        <input
          type="button"
          id="show-edit-input-button"
          class="how-edit-input-button"
          value="취소"
          @click="showEditInput"
          v-if="loggedInUser.isLoggedIn"
          v-bind:disabled="!showEditInputbutton"
        />
        <input
          type="button"
          id="show-edit-input-button"
          class="how-edit-input-button"
          value="프로필 수정 완료"
          @click="editProfile"
          v-if="loggedInUser.isLoggedIn"
          v-bind:disabled="!showEditInputbutton"
        />
      </div>
    </div>
    <div id="not-found-user" class="not-found-user" v-if="!showProfile">
      존재하지 않는 회원
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useStore } from '../../store/store';
import { storeToRefs } from 'pinia';

import regEx from '../../utils/regEx.js';
import NumOrStr from '../../utils/NumberOrString.js';

import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import Profile from '../../components/Profile.vue';
import ProfileEdit from '../../components/ProfileEdit.vue';

const route = useRoute();
const store = useStore();
const { loggedInUser } = storeToRefs(store);

// const props = defineProps({
//   member_id: {
//     type: String,
//     required: true,
//   },
// });

// 조회하려는 유저 정보 상태값
const userData = ref({
  member_id: '',
  email: '',
  name: '',
  birth: '',
  signupDate: '',
  phoneNumber: '',
  gender: '',
  messages: '',
});
const showProfile = ref(true);
// const myProfile = ref(false);
const showEditInputbutton = ref(false);
const tmpValue = ref({
  name: '',
  phoneNumber: '',
  messages: '',
});
const errorMessage = ref({
  name: '',
  phoneNumber: '',
  messages: '',
});

const showEditInput = () =>
  (showEditInputbutton.value = !showEditInputbutton.value);

const fetchData = async (member_id) => {
  const tmp = await store.getUserData(member_id);
  if (tmp !== false) {
    userData.value.member_id = tmp.member_id.toString();
    userData.value.email = tmp.email;
    userData.value.name = tmp.name;
    userData.value.birth = tmp.birth;
    userData.value.signupDate = tmp.signupDate;
    userData.value.phoneNumber = tmp.phone_number;
    userData.value.gender = tmp.gender;
    userData.value.messages = tmp.messages;
    // userData.value.messages = String(tmp.messages);
    // userData.value = { ...userData, ...tmp };

    // myProfile.value = loggedInUser.value.member_id === userData.value.member_id;
    showProfile.value = true;
  } else showProfile.value = false;
};

// errorMessage 초기화 함수
const initialization = () => {
  errorMessage.value.name = '';
  errorMessage.value.phoneNumber = '';
  errorMessage.value.messages = '';
};

// 프로필 정보 수정하기
const editProfile = () => {
  // 입력한 이름 검사
  if (tmpValue.value.name === '') {
    initialization();
    errorMessage.value.name = '이름은 필수로 입력해 주세요.';
    return;
  } else if (!regEx('name').test(tmpValue.value.name)) {
    initialization();
    errorMessage.value.name =
      '이름은 6자에서 12자 사이의 한글, 영문, 숫자로 입력해 주세요.';
    return;
  }
  // 입력한 전화번호 검사
  else if (tmpValue.value.phoneNumber === '') {
    initialization();
    errorMessage.value.phoneNumber = '전화번호는 필수로 입력해 주세요.';
    return;
  } else if (!regEx('phoneNumber').test(tmpValue.value.phoneNumber)) {
    initialization();
    errorMessage.value.phoneNumber =
      '전화번호의 형식에 맞춰서 입력해 주세요. (예시. 000-0000-0000)';
    return;
  }
  // 입력한 상태메시지 검사
  else if (tmpValue.value.messages.length > 200) {
    initialization();
    console.log('error');
    errorMessage.value.messages = '상태메시지는 200자 이내로 작성해 주세요.';
    return;
  }

  initialization();
  userData.value.name = tmpValue.value.name;
  userData.value.phoneNumber = tmpValue.value.phoneNumber;
  userData.value.messages = tmpValue.value.messages;

  console.log(tmpValue.value);
  console.log(userData.value);
};

onMounted(() => {
  // 경로변수가 숫자인지 문자인지 검사: 숫자라면 숫자 그대로 반환(문자열로 반환 안 함), 문자라면 null 반환
  const result = NumOrStr(route.params.member_id);
  if (result != null) fetchData(result);
  else showProfile.value = false;
});

onBeforeRouteUpdate((to, from, next) => {
  // 경로변수가 숫자인지 문자인지 검사: 숫자라면 숫자 그대로 반환(문자열로 반환 안 함), 문자라면 null 반환
  const result = NumOrStr(to.params.member_id);
  if (result != null) fetchData(result).then(next);
  else showProfile.value = false;
});
</script>

<style scope>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  width: 100%;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.edit-button-box {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
