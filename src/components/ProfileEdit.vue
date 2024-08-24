<template>
  <div id="edit-profile-component" class="edit-profile-component">
    <div id="edit-profile-title">프로필 수정하기</div>
    <div id="edit-profile-form" class="edit-profile-form">
      <img
        id="profile-image"
        class="profile-image"
        src="https://pbs.twimg.com/media/Ezs7OyNX0AERQ3F.jpg"
      />
      <div id="profile-content-box">
        <div id="profile-name">{{ userData.name }}님의 프로필</div>
        <div id="edit-profile-input-form" class="edit-profile-input-form">
          <div id="profile-email">
            {{ userData.name }}님의 이메일: {{ userData.email }}
          </div>
          <div id="profile-email">
            {{ userData.name }}님의 이름:
            <input
              type="text"
              placeholder="새 이름을 입력하세요."
              v-model="tmpValue.name"
            />
            <div
              id="profile-name-error"
              class="profile-error"
              v-if="errorMessage.name"
              v-text="errorMessage.name"
            ></div>
          </div>
          <div id="profile-email">
            {{ userData.name }}님의 생일: {{ userData.birth }}
          </div>
          <div id="profile-email">
            {{ userData.name }}님의 가입일: {{ userData.signupDate }}
          </div>
          <div id="profile-email">
            {{ userData.name }}님의 전화번호:
            <input
              type="text"
              placeholder="새 전화번호를 입력하세요."
              v-model="tmpValue.phoneNumber"
            />
            <div
              id="profile-phone-number-error"
              class="profile-error"
              v-if="errorMessage.phoneNumber"
              v-text="errorMessage.phoneNumber"
            ></div>
          </div>
          <div id="profile-email">
            {{ userData.name }}님의 성별: {{ userData.gender }}
          </div>
          <div id="profile-email">
            {{ userData.name }}님의 상태 메시지:
            <input
              type="text"
              placeholder="상태메시지를 입력하세요."
              v-model="tmpValue.messages"
            />
            <div
              id="profile-messages-error"
              class="profile-error"
              v-if="errorMessage.messages"
              v-text="errorMessage.messages"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, defineProps, defineEmits } from 'vue';

// 상위 컴포넌트에서 준 props 받기
// const props = defineProps({
//   userData: Object,
//   // tmpName: String,
//   errorMessage: Object,
// });

// v-model로 바인딩된 데이터 받기
const tmpValue = defineModel('tmpValue');
const userData = defineModel('userData');
const errorMessage = defineModel('errorMessage');
</script>

<style scope>
.edit-profile-component {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.edit-profile-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 100px;

  width: 100%;
}

.profile-content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
