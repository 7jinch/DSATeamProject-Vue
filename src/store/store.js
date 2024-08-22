// pinia로 전역으로 데이터를 관리하는 모듈
import { defineStore } from 'pinia'; // pinia 불러오기
import axios from 'axios';

import VueCookies from 'vue-cookies'; // VueCookies 가져오기

// store 만들기
export const useStore = defineStore('store', {
  // 상태변수
  state: () => ({
    // 서버에서 보낸 메시지
    serverMessage: {
      isMessage: false, // 메시지 존재 여부
      message: null, // 메시지
    },

    // 로그인 한 유저 정보
    loggedInUser: {
      email: '',
      name: '',
      isLoggedIn: false,
    },
  }),

  // pinia에서는 mutations(상태변수 갱신), actions(비동기로 상태변수 갱신)을 모두 actions에서 처리함
  actions: {
    // 서버 메시지 업데이트하는 메서드
    updateServerMessage(newServerMessage) {
      this.serverMessage.isMessage = true;
      this.serverMessage.message = newServerMessage;
    },

    // 서버 메시지 초기화하는 메서드
    deleteServerMessage() {
      this.serverMessage.isMessage = false;
      this.serverMessage.message = null;
    },

    // 회원가입하는 비동기 메서드
    async signup(signupMemberData) {
      const url = import.meta.env.VITE_SPRING_BOOT_URL + '/api/members';

      return await axios
        .post(url, signupMemberData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const res = {
            response,
            isTrue: true,
          };
          return res;
        })
        .catch((error) => {
          const errors = error.response.data;
          return errors;
        });
    },

    // 로그인하는 비동기 메서드
    async login(loginMemberData) {
      const url = import.meta.env.VITE_SPRING_BOOT_URL + '/api/auth/login';

      return await axios
        .post(url, loginMemberData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // reponse시 쿠키가 있으면 받음
        })
        .then((response) => {
          this.loggedInUser.email = response.data.email; // 상태값에 이메일 정보 저장
          this.loggedInUser.name = response.data.name; // 상태갑에 이름 정보 저장
          this.loggedInUser.isLoggedIn = true; // 상태값에 로그인 상태로 저장
          // this.loggedInUser.cookies = VueCookies.get('ourpreciousmember'); // 상태값에 쿠키를 저장
          const res = {
            response,
            isTrue: true,
          };
          return res;
        })
        .catch((error) => {
          const errors = error.response.data;
          return errors;
        });
    },

    // 로그아웃 메서드
    logout() {
      VueCookies.remove('ourpreciousmember'); // 브라우저에 저장된 쿠키 삭제
      this.loggedInUser.email = ''; // 이메일 정보 삭제
      this.loggedInUser.name = ''; // 이름 정보 삭제
      this.loggedInUser.isLoggedIn = false; // 로그아웃 상태로 만들기
    },

    // 비밀번호 찾기 메서드
    async findPassword(findPasswordMemberData) {
      const url = import.meta.env.VITE_SPRING_BOOT_URL + '';

      await axios
        .post(url, findPasswordMemberData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          return true;
        })
        .catch((error) => {
          const errors = error.response.data;
          return errors;
        });
    },
  },

  // pinia의 상태값을 localstorage에 저장하기
  persist: {
    enable: true,
    strategies: [{ storage: localStorage }],
  },
});
