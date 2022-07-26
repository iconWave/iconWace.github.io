import { createApp } from 'vue';
import store from './store';
import router from './router';
import './style.css';
import App from './App.vue';

//创建vue实例
const app = createApp(App);

//挂载router
app.use(router);

//挂载pinia
app.use(store);

console.log(import.meta.env.BASE_URL);
//挂载实例
app.mount('#app');
