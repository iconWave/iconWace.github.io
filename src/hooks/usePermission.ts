/**
 * @name usePermission
 * @description 处理权限
 */

import intersection from 'lodash-es/intersection'
import { isArray } from '../utils/is'
import { usePermissioStoreWithOut } from '/@/store/modules/permission'

export function usePermission() {
  const permissioStore = usePermissioStoreWithOut()

  function hasPermission(value?: string | string[], def = true): boolean {
    // Visible by default
    if (!value) {
      return def
    }

    if (permissioStore.getIsAdmin === 1) {
      //是否为管理员
      return true
    }

    if (!isArray(value)) {
      return permissioStore.getAuths?.includes(value)
    }

    if (isArray(value)) {
      return intersection(value, permissioStore.getAuths).length > 0
    }

    return true
  }

  return { hasPermission }
}
