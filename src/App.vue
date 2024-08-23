<template>
  <!-- router에 지정한 url에 맞춰서 컴포넌트를 렌더링함 -->
  <div id="inAppBody" class="inAppBody">
    <router-view />
    <modal v-if="isShowModal" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from './store/store';
import { storeToRefs } from 'pinia';

import Footer from './components/Footer.vue';
import Modal from './components/Modal.vue';

let isShowModal = ref(false); // 서버 에러가 있는지

const store = useStore(); // store 가져오기
const { serverMessage } = storeToRefs(store); // 래핑하기

watch(
  () => serverMessage.value.isMessage, // 서버에서 보낸 메시지가 있는지 감시하기
  (newValue) => {
    if (serverMessage.value.isMessage)
      isShowModal.value = true; // 만약 메시지가 있다면 모달을 띄움
    else isShowModal.value = false;
  }
);
</script>

<style>
.inAppBody {
  height: 100%;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
