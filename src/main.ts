import './style.scss';
import {createApp} from 'vue';
import App from './App.vue';
import {createRouter} from './router';
import {registerComponents} from './components';

const router = await createRouter();
const app = createApp(App);
app.use(router);
registerComponents(app);

app.mount('#app');
