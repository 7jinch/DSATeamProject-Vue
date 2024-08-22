import { createApp } from 'vue';
import router from './router/router'; // 라우터
import { createPinia } from 'pinia'; // 상태관리 라이브러리
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // pinia 플러그인 라이브러리
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faBarsStaggered,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'; // 사용할 아이콘 불러오기
import App from './App.vue';
import './style.css';

const pinia = createPinia(); // pinia 객체를 가져와서 변수에 할당하기
pinia.use(piniaPluginPersistedstate); // pinia에 등록

library.add(faBarsStaggered, faLocationDot); // 라이브러리에 아이콘 등록하기

createApp(App)
  .use(router) // router 등록하기
  .use(pinia) // pinia 등록하기
  // .use(VueCookies) // vue-cookie 등록하기
  .component('font-awesome-icon', FontAwesomeIcon) // 폰트어썸 라이브러리 등록하기
  .mount('#app');
