// pinia로 전역으로 데이터를 관리하는 모듈
import { defineStore } from 'pinia'; // pinia 불러오기
import axios from 'axios';

// store 만들기
export const useStore = defineStore('store', {
  // 상태변수
  state: () => ({
    serverError: {
      isError: false,
      message: null,
    },
    loginUser: {
      user: null, // 로그인 한 유저
      isAuthenticated: false, // 세션 인증 여부
    },
  }),

  // pinia에서는 mutations(상태변수 갱신), actions(비동기로 상태변수 갱신)을 모두 actions에서 처리함
  actions: {
    // 서버 에러 업데이터하는 메서드
    updateServerError(newServerErrorMessage) {
      this.serverError.isError = true;
      this.serverError.message = newServerErrorMessage;
    },

    // 서버 에러 초기화하는 메서드
    deleteServerError() {
      this.serverError.isError = false;
      this.serverError.message = null;
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
  },
});
