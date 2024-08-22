<template>
  <div id="header" class="header">
    <div id="header-title" class="header-title" @click="moveHome">
      닌니쿠 마켓
    </div>
    <div id="header-button-box" class="header-button-box">
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
    </div>
    <div
      id="header-profile-box"
      class="header-profile-box"
      v-if="loggedInUser.isLoggedIn"
    >
      <img
        id="profile-image"
        class="profile-image"
        src="https://pbs.twimg.com/media/Ezs7OyNX0AERQ3F.jpg"
      />
      <div id="profile-name">{{ loggedInUser.name }}님, 환영합니다.</div>
      <input
        type="button"
        value="로그아웃"
        @click="movePage($event)"
        v-if="loggedInUser.isLoggedIn"
      />
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

const showButton = ref(true);

// 메인 페이지로 이동
const moveHome = () => tmpRouter.push('/');

// 각 페이지 이동
const movePage = (event) => {
  const page = event.target.value;
  if (page === '회원가입') tmpRouter.push('/member/signup');
  if (page === '로그인') tmpRouter.push('/member/login');
  if (page === '로그아웃') {
    store.logout();
    tmpRouter.push('/');
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;
}

.header-title:hover {
  cursor: pointer;
}

.header-button-box {
  display: flex;
  flex-direction: row;
  gap: 5px;
}

.header-profile-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
