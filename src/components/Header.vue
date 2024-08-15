<template>
  <div id="header-title" @click="moveHome">닌니쿠 마켓</div>
  <div id="header-button-box">
    <input type="button" value="회원가입" @click="movePage($event)" />
    <input type="button" value="로그인" @click="movePage($event)" />
    <input type="button" value="로그아웃" @click="movePage($event)" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const tmpRouter = useRouter();

const moveHome = () => tmpRouter.push('/');
const movePage = (event) => {
  const page = event.target.value;
  if (page === '회원가입') tmpRouter.push('/member/signup');
};
</script>

<style lang="scss" scoped></style>
