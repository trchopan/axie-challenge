import './style.scss';
import {createApp} from 'vue';
import App from './App.vue';
import {createRouter} from './router';
import {registerComponents} from './components';
import helpers from './plugins/helpers';

(async () => {
  const router = await createRouter();
  const app = createApp(App);
  app.use(router);
  app.use(helpers);
  registerComponents(app);

  app.mount('#app');
})();
