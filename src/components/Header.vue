<template>
  <div id="header">
    <div id="header-title" @click="moveHome">닌니쿠 마켓</div>
    <div id="header-button-box">
      <input
        type="button"
        value="회원가입"
        @click="movePage($event)"
        v-if="!loggedInUser.isLoggedIn"
      />
      <input
        type="button"
        value="로그인"
        @click="movePage($event)"
        v-if="!loggedInUser.isLoggedIn"
      />
      <input
        type="button"
        value="로그아웃"
        @click="movePage($event)"
        v-if="loggedInUser.isLoggedIn"
      />
    </div>
    <div id="header-profile-box" v-if="loggedInUser.isLoggedIn">
      <div id="profile-button">임시 프로필 이미지</div>
      <div id="profile-name">{{ loggedInUser.name }}님, 환영합니다.</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store/store';
import { storeToRefs } from 'pinia';

const tmpRouter = useRouter();
const store = useStore(); // store 가져오기
const { loggedInUser } = storeToRefs(store); // 래핑하기

const moveHome = () => tmpRouter.push('/');
const movePage = (event) => {
  const page = event.target.value;
  if (page === '회원가입') tmpRouter.push('/member/signup');
  if (page === '로그인') tmpRouter.push('/member/login');
};
</script>

<style scoped>
#header {
  display: flex;
}
</style>
