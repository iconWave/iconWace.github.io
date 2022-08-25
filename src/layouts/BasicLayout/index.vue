<template>
  <a-layout class="basic-layout-container">
    <Header />
    <a-layout>
      <SideMenu v-bind="layoutConfig" />
      <a-layout class="basicLayout-content">
        <!-- breadcrumb -->
        <Breadcrumb v-if="routeMeta.breadcrumb" @handleClick="handleBreadcrumb" />
        <!-- content -->
        <a-layout-content>
          <!-- divider -->
          <a-divider v-if="routeMeta.breadcrumb" class="line" />
          <template v-if="routeMeta.hiddenWrap">
            <!-- <router-view /> -->
            <router-view v-slot="{ Component, route }">
              <transition name="fade-slide" mode="out-in" appear>
                <div :key="(route.name as string)">
                  <component :is="Component" />
                </div>
              </transition>
            </router-view>
          </template>
          <a-card v-else>
            <!-- <router-view /> -->
            <router-view v-slot="{ Component, route }">
              <transition name="fade-slide" mode="out-in" appear>
                <div :key="(route.name as string)">
                  <component :is="Component" />
                </div>
              </transition>
            </router-view>
          </a-card>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import type { Route } from 'ant-design-vue/es/breadcrumb/Breadcrumb'
import Header from './components/Header.vue'
import SideMenu from './components/SideMenu'
import { clearMenuItem, filterRoutes } from './utils'
const router = useRouter()
console.log(router.getRoutes())
const menuData = filterRoutes(clearMenuItem(router.getRoutes()).filter((n) => n.path.startsWith('/app/')))
console.log(clearMenuItem(router.getRoutes()))
console.log(menuData)
const layoutConfig = reactive({
  theme: 'light',
  menuWidth: 208,
  menuData
})

const routeMeta = computed(() => router.currentRoute.value.meta)

const breadcrumb = computed(
  () =>
    router.currentRoute.value.matched
      .filter((n) => !['/', '/app'].includes(n.path))
      .map((item) => {
        return {
          path: item.path,
          breadcrumbName: item.meta.title || ''
        }
      }) as Route[]
)

const handleBreadcrumb = () => {
  const path = breadcrumb.value?.[breadcrumb.value.length - 2]?.path
  path ? router.push(path) : router.push('/')
}
</script>
s
<style lang="less" scoped>
.basic-layout-container {
  height: 100vh;
  overflow: hidden;
  .basicLayout-content {
    height: calc(100vh - 80px);
    overflow-y: auto;
    margin: 0;
    padding: 24px;
    background: '#F0F1F4';
  }
}
</style>
