import { createRouter, createWebHistory } from 'vue-router'
import routes from './router.config'

const router = createRouter({
  // 解决 二级路径存在时，路径地址路由不匹配的问题
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
