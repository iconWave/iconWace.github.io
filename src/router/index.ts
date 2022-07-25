import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/pages/login.vue'),
  },
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '主页',
      KeepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/vueuse',
    name: 'VueUse',
    meta: {
      title: 'VueUse',
      KeepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/pages/vueUse.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
