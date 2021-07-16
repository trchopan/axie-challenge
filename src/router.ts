import {createRouter, createWebHistory} from 'vue-router';
import {RouteRecordRaw} from 'vue-router';
import SplashPage from './pages/SplashPage.vue';

const routes: RouteRecordRaw[] = [
  //
  {path: '/', component: SplashPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
