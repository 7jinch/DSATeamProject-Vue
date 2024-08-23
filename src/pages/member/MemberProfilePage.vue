<template>
  <Header />
  <div id="main-page-title" class="main-container">프로필 페이지</div>
  <div>
    <div id="profile-image-box" class="profile-image-box">
      <div id="profile-name">{{ loggedInUser.name }}님의 프로필</div>
      <img
        id="profile-image"
        class="profile-image"
        src="https://pbs.twimg.com/media/Ezs7OyNX0AERQ3F.jpg"
      />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { useStore } from '../../store/store';
import { storeToRefs } from 'pinia';

import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

console.log('프로필 페이지');

const store = useStore();
const { loggedInUser } = storeToRefs(store);
</script>

<style scope>
.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
