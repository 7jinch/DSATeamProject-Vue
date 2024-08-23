<template>
  <div id="modal-background" class="modal-background">
    <div id="modal" class="modal">
      <div id="modal-title">알림</div>
      <!-- 메시지를 넣음 -->
      <p>{{ serverMessage.message }}</p>
      <input type="button" value="닫기" @click="store.deleteServerMessage" />
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../store/store';
import { storeToRefs } from 'pinia';

const store = useStore(); // store 가져오기
const { serverMessage } = storeToRefs(store); // 래핑하기
</script>

<style scope></style>
