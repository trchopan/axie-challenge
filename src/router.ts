import {
  createRouter as _createRouter,
  createWebHistory,
  RouteRecordNormalized,
} from 'vue-router';
import {RouteRecordRaw} from 'vue-router';
import Unlock from './pages/Unlock.vue';
import Main from './pages/Main.vue';
import SendAsset from './pages/SendAsset/index.vue';
import TryComponents from './pages/TryComponents.vue';
import {User} from './domain';
import {authRepo} from './repository';

const isDev = import.meta.env.NODE_ENV !== 'production';

const routes: RouteRecordRaw[] = [
  //
  {path: '/', component: Main, meta: {requireAuth: true}},
  {path: '/unlock', component: Unlock},
  {path: '/send', component: SendAsset},
  {path: '/:notFound(.*)', redirect: '/'},
];

const devRoutes: RouteRecordRaw[] = [
  {path: '/try-components', component: TryComponents},
];

const router = _createRouter({
  history: createWebHistory(),
  routes: (isDev ? devRoutes : []).concat(routes),
});

const routeMetaMatch = (records: RouteRecordNormalized[]) => (key: string) =>
  records.some(record => record.meta[key]);

export const createRouter = async () => {
  let user: Maybe<User> = null;

  await new Promise<void>(resolve => {
    authRepo.onAuthStateChanged(maybeUser => {
      user = maybeUser;
      resolve();
    });
  });

  router.beforeEach((to, from, next) => {
    const routeToMatch = routeMetaMatch(to.matched);
    if (routeToMatch('requireAuth') && !user) {
      console.log('woo requireAuth');
      next('/unlock');
      return;
    }
    next();
  });

  return router;
};
