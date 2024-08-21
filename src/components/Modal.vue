<template>
  <div id="modal">알림</div>
  <p>{{ serverMessage.message }}</p>
  <input type="button" value="닫기" @click="store.deleteServerMessage" />
</template>

<script setup>
import { useStore } from '../store/store';
import { storeToRefs } from 'pinia';

const store = useStore(); // store 가져오기
const { serverMessage } = storeToRefs(store); // 래핑하기
</script>

<style></style>
