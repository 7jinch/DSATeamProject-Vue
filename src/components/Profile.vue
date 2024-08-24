<template>
  <div id="profile-component" class="profile-component">
    <img
      id="profile-image"
      class="profile-image"
      src="https://pbs.twimg.com/media/Ezs7OyNX0AERQ3F.jpg"
    />
    <div id="profile-content-box">
      <div id="profile-name">{{ userData.name }}님의 프로필</div>
      <div id="profile-email">
        {{ userData.name }}님의 이메일: {{ userData.email }}
      </div>
      <div id="profile-email">
        {{ userData.name }}님의 생일: {{ userData.birth }}
      </div>
      <div id="profile-email">
        {{ userData.name }}님의 가입일: {{ userData.signupDate }}
      </div>
      <div id="profile-email">
        {{ userData.name }}님의 전화번호: {{ userData.phoneNumber }}
      </div>
      <div id="profile-email">
        {{ userData.name }}님의 성별: {{ userData.gender }}
      </div>
      <div id="profile-email">
        {{ userData.name }}님의 상태 메시지: {{ userData.messages }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// 상위 컴포넌트에서 준 props 받기
const props = defineProps({
  userData: Object,
});

const userData = props.userData;
</script>

<style scope>
.profile-component {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 100px;

  width: 100%;
}
</style>
