/**
 * @name useRole
 * @description 处理角色权限
 */

import { usePermissioStoreWithOut } from '/@/store/modules/permission'

export function useRole() {
  const permissioStore = usePermissioStoreWithOut()

  function hasRole(value?: string | string[], def = true): boolean {
    if (value == null) {
      return def
    }

    if (typeof value === 'boolean') {
      return value
    }

    if (typeof value === 'number') {
      return permissioStore.getRole === value
    }
    return def
  }

  return { hasRole }
}
