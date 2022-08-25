<template>
  <div class="layout-header-right">
    <a-dropdown placement="bottom" class="menu-box">
      <template #overlay>
        <a-menu :selectedKeys="selectedKeys">
          <a-menu-item v-for="item in myNavs" :key="item.path" @click="handleRoute(item?.path)">
            <template #icon>
              <Icon align="1px" size="20px" :type="item.icon" />
            </template>
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-menu>
      </template>
      <a-space class="wrap" align="center" direction="horizontal">
        <Icon align="2px" type="xitongshezhi" />
        <span class="setting">系统设置</span>
        <Icon align="2px" type="xialajiantou" />
      </a-space>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { navs as myNavs } from './constant'
import { ref } from 'vue'
import { useUserStore } from '/@/store/modules/user'
import { usePermissionStore } from '/@/store/modules/permission'

const store = useUserStore()
const permissionStore = usePermissionStore()
const router = useRouter()
const navs = ref(myNavs)
const selectedKeys = ref<String[]>([])

watchEffect(() => {
  const getAuths = permissionStore.getAuths
  if (getAuths.length && permissionStore.getIsAdmin === 0) {
    navs.value = unref(navs).filter((n) => (n.auth ? getAuths.includes(n.auth) : true))
  }
})

watchEffect(() => {
  if (router.currentRoute) {
    const matched = router.currentRoute.value.matched.concat()
    console.log(matched)
    //selectedKeys.value = matched.filter((r) => r.name !== 'index').map((r) => r.path);
    selectedKeys.value = matched
      .filter((r) => {
        for (let i in myNavs) {
          if (myNavs[i].path === r.path) {
            return true
          }
        }
        return false
      })
      .map((r) => r.path)

    console.log(selectedKeys.value)
  }
})

const handleRoute = (path?: string) => {
  if (path) return router.push(path)
  // 退出登录
  store.logout()
}
</script>

<style lang="less">
.layout-header-right {
  height: 100%;
  display: flex;
  justify-content: center;
  padding-right: 16px;
  .wrap {
    height: 55px;
    .setting {
      font-size: 16px;
      font-weight: 600;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.85);
      margin: 0 8px 0 4px;
    }
  }
  .my-icon {
    font-size: 18px !important;
  }
  .menu-box :deep(.ant-dropdown-menu-item) {
    width: 142px;
    height: 42px;
    line-height: 42px;
    padding: 0 16px;
  }
  .menu-box :deep(.ant-dropdown-menu-item-selected) {
    background: #eaeffe;
    color: #3860f4;
  }
}
</style>
