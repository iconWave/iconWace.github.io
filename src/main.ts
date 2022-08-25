import { createApp } from 'vue'
import store from './store'
import router from './router'
import 'sanitize.css'
import '/@/styles/index.less'
import App from './App.vue'
import './router/permission'

//创建vue实例
const app = createApp(App)

//挂载router
app.use(router)

//挂载pinia
app.use(store)

console.log(import.meta.env.BASE_URL)
//挂载实例
app.mount('#app')
