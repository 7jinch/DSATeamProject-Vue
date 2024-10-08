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
      member_id: '',
      email: '',
      name: '',
      birth: '',
      signupDate: '',
      phoneNumber: '',
      gender: '',
      question: '',
      answer: '',
      messages: '',
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
        .then((response) => true)
        .catch((error) => {
          const errorData = error.response.data;
          this.updateServerMessage(errorData);
          return;
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
          this.loggedInUser.member_id = response.data.member_id; // 상태값에 아이디 정보 저장
          this.loggedInUser.email = response.data.email; // 상태값에 이메일 정보 저장
          this.loggedInUser.name = response.data.name; // 상태값에 이름 정보 저장
          this.loggedInUser.birth = response.data.birth; // 상태값에 생년월일 정보 저장
          this.loggedInUser.signupDate = response.data.signupDate; // 상태값에 가입일 정보 저장
          this.loggedInUser.phoneNumber = response.data.phoneNumber; // 상태값에 전화번호 정보 저장
          this.loggedInUser.gender = response.data.gender; // 상태값에 성별 저장
          this.loggedInUser.question = response.data.question; // 상태값에 질문 정보 저장
          this.loggedInUser.answer = response.data.answer; // 상태값에 답변 저장
          this.loggedInUser.messages = response.data.messages;
          this.loggedInUser.isLoggedIn = true; // 상태값에 로그인 상태로 저장
          this.loggedInUser.cookies = VueCookies.get('ourpreciousmember'); // 상태값에 쿠키를 저장

          return true;
        })
        .catch((error) => {
          const errorData = error.response.data;
          this.updateServerMessage(errorData);
          return;
        });
    },

    // 로그아웃 메서드
    logout() {
      VueCookies.remove('ourpreciousmember'); // 브라우저에 저장된 쿠키 삭제
      this.loggedInUser.email = ''; // 이메일 정보 삭제
      this.loggedInUser.name = ''; // 이름 정보 삭제
      this.loggedInUser.birth = ''; // 생년월일 정보 저장
      this.loggedInUser.signupDate = ''; // 가입일 정보 삭제
      this.loggedInUser.phoneNumber = ''; // 전화번호 정보 삭제
      this.loggedInUser.gender = ''; // 성별 정보 삭제
      this.loggedInUser.question = ''; // 질문 정보 삭제
      this.loggedInUser.answer = ''; // 답변 정보 삭제
      this.loggedInUser.messages = ''; // 상태 메시지 정보 삭제
      this.loggedInUser.isLoggedIn = false; // 로그아웃 상태로 만들기
      this.loggedInUser.cookies = ''; // 쿠키 지우기
    },

    // 비밀번호 찾기 메서드
    async findPassword(findPasswordMemberData) {
      const url =
        import.meta.env.VITE_SPRING_BOOT_URL + '/api/auth/findpassword';

      return await axios
        .post(url, findPasswordMemberData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => true)
        .catch((error) => {
          const errorData = error.response.data;
          this.updateServerMessage(errorData);
          return;
        });
    },

    // 비밀번호 수정 메서드
    async changePassword(changePasswordData) {
      const url =
        import.meta.env.VITE_SPRING_BOOT_URL + '/api/auth/resetpassword';

      return await axios
        .post(url, changePasswordData, {
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then((response) => true)
        .catch((error) => {
          const errorData = error.response.data;
          this.updateServerMessage(errorData);
          return;
        });
    },

    // 발급받은 jwt 토큰이 유효한지 검사
    async validateJwtToken(email) {
      const url = import.meta.env.VITE_SPRING_BOOT_URL + '/api/auth/validate';

      return await axios
        .post(
          url,
          { email: email },
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.cookies}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => true) // 토큰 유효성 검사 성공하면 true
        .catch((error) => {
          const errorData = error.response.data;
          this.updateServerMessage(errorData);
          logout(); // 토큰 유효성 검사 실패시 로그아웃 처리
          return;
        });
    },

    async getUserData(member_id) {
      const url =
        import.meta.env.VITE_SPRING_BOOT_URL + `/api/members/${member_id}`;

      return await axios
        .get(url)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          const errorData = error.response.data;
          this.updateServerMessage(errorData);
          return false;
        });
    },
  },

  // pinia의 상태값을 localstorage에 저장하기
  persist: {
    enable: true,
    strategies: [{ storage: localStorage }],
  },
});
