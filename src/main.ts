import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import {registerComponents} from './components';

const app = createApp(App);
app.use(router);

registerComponents(app);

app.mount('#app');
