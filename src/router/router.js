// 라우팅하는 모듈
import { createRouter, createWebHistory } from 'vue-router'; // vue router 불러오기

import MainPage from '../pages/MainPage.vue'; // 메인 페이지
import MemberSignupPage from '../pages/MemberSignupPage.vue'; // 회원가입 페이지

// 라우터 인스턴스를 생성해서 router 변수에 할당
const router = createRouter({
  history: createWebHistory(), // 새로고침하지 않고 url을 동적으로 생성하는 히스토리 모드
  routes: [
    // {path: '', component: Component}의 객체로 라우터가 사용할 경로와 컴포넌트(페이지)를 정의
    { path: '/', component: MainPage },
    { path: '/member/signup', component: MemberSignupPage },
  ],
});

export default router;
