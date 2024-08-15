<template>
  <div id="modal">알림</div>
  <p>{{ serverError.message }}</p>
  <input type="button" value="닫기" @click="store.deleteServerError" />
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useStore } from '../store/store';
import { storeToRefs } from 'pinia';

const store = useStore(); // store 가져오기
const { serverError } = storeToRefs(store); // 래핑하기
</script>

<style lang="scss" scoped></style>
