import {createRouter, createWebHistory} from 'vue-router';
import {RouteRecordRaw} from 'vue-router';
import SplashPage from './pages/SplashPage.vue';
import Unlock from './pages/Unlock.vue';
import Home from './pages/Home.vue';
import TryComponents from './pages/TryComponents.vue';

const isDev = import.meta.env.NODE_ENV !== 'production';

const routes: RouteRecordRaw[] = [
  //
  {path: '/unlock', component: Unlock},
  {path: '/home', component: Home},
  {path: '/', component: SplashPage},
  {path: '/.*', redirect: '/home'},
];

const devRoutes: RouteRecordRaw[] = [
  {path: '/try-components', component: TryComponents},
];

const router = createRouter({
  history: createWebHistory(),
  routes: (isDev ? devRoutes : []).concat(routes),
});

export default router;
