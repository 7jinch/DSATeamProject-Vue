<template>
  <!-- router에 지정한 url에 맞춰서 컴포넌트를 렌더링함 -->
  <router-view />
  <Footer />
  <modal v-if="isShowModal" />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from './store/store';
import { storeToRefs } from 'pinia';

import Footer from './components/Footer.vue';
import Modal from './components/Modal.vue';

let isShowModal = ref(false); // 서버 에러가 있는지

const store = useStore(); // store 가져오기
const { serverError } = storeToRefs(store); // 래핑하기

watch(
  () => serverError.value.isError,
  (newValue) => {
    console.log(serverError.value.isError);
    if (serverError.value.isError) isShowModal.value = true;
    else isShowModal.value = false;
  }
);
</script>

<style lang="scss" scoped></style>
