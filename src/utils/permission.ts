/**
 * @name permission
 * @description 路由处理工具
 */
import { RouteRecordRaw } from 'vue-router'
import intersection from 'lodash-es/intersection'

type IAuth = { auth?: string[]; role?: number }

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const { auth } = (route.meta as IAuth) || {}
    if (!auth) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, roles)
      }
      res.push(route)
    } else {
      if (intersection(auth, roles).length > 0) {
        if (route.children) {
          route.children = filterAsyncRoutes(route.children, roles)
        }
        res.push(route)
      }
    }
  })
  return res
}
