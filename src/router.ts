import {createRouter, createWebHistory} from 'vue-router';
import {RouteRecordRaw} from 'vue-router';
import SplashPage from './pages/SplashPage.vue';
import Unlock from './pages/Unlock.vue';
import Home from './pages/Home.vue';

const routes: RouteRecordRaw[] = [
  //
  {path: '/unlock', component: Unlock},
  {path: '/home', component: Home},
  {path: '/', component: SplashPage},
  {path: '/.*', redirect: '/home'},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
