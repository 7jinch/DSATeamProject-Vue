// pinia로 전역으로 데이터를 관리하는 모듈
import { defineStore } from 'pinia'; // pinia 불러오기
import axios from 'axios';

import Cookies from 'js-cookie';

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
      cookies: '',
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
          this.loggedInUser.email = response.data.email;
          this.loggedInUser.name = response.data.name;
          this.loggedInUser.isLoggedIn = true;
          this.loggedInUser.cookies = Cookies.get('ourpreciousmember');

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

    // 로그인 한 유저 정보 클리어하는 메서드
    clearLoggedInUser() {
      this.loggedInUser.email = '';
      this.loggedInUser.name = '';
      this.loggedInUser.isLoggedIn = false;
      this.loggedInUser.cookies = '';
    },
  },
});
