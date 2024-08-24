// 라우팅하는 모듈
import { createRouter, createWebHistory } from 'vue-router'; // vue router 불러오기
import { useStore } from '../store/store';
import { storeToRefs } from 'pinia';

import MainPage from '../pages/member/MainPage.vue'; // 메인 페이지
import MemberSignupPage from '../pages/member/MemberSignupPage.vue'; // 회원가입 페이지
import MemberLoginPage from '../pages/member/MemberLoginPage.vue'; // 로그인 페이지
import MemberFindPasswordPage from '../pages/member/MemberFindPasswordPage.vue'; // 비밀번호 찾기 페이지
import MemberProfilePage from '../pages/member/MemberProfilePage.vue'; // 프로필 페이지

// 라우터 인스턴스를 생성해서 router 변수에 할당
const router = createRouter({
  history: createWebHistory(), // 새로고침하지 않고 url을 동적으로 생성하는 히스토리 모드
  routes: [
    // {path: '', component: Component}의 객체로 라우터가 사용할 경로와 컴포넌트(페이지)를 정의
    { path: '/', component: MainPage },
    { path: '/member/signup', component: MemberSignupPage },
    { path: '/member/login', component: MemberLoginPage },
    { path: '/member/findpassword', component: MemberFindPasswordPage },
    {
      path: '/member/profile/:member_id',
      component: MemberProfilePage,
      // props: true, // member_id를 props로 전달
      // key: (route) => route.params.member_id, // 컴포넌트 강제 리렌더링:
      // beforeEnter: async (to, from, next) => {
      //   const store = useStore();
      //   const { loggedInUser } = storeToRefs(store);
      //   const result = await store.validateJwtToken(loggedInUser.value.email);
      //   if (result) next(); // 유효한 토큰일 경우 프로필 페이지로 이동
      //   else next({ path: '/member/login' }); // 유효하지 않은 토큰일 경우 로그인 페이지로 이동
      // },
    },
  ],
});

// router 전역 가드
router.beforeEach((to, from, next) => {
  const store = useStore();
  store.deleteServerMessage();
  next();
});

export default router;
