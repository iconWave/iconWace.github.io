import { Menu } from 'ant-design-vue'
import { defineComponent, PropType } from 'vue'
import { MenuDataItem } from '../utils/typeings'
import Icon from '/@/components/Icon/index.vue'
import router from '/@/router'

export default defineComponent({
  name: 'BaseMenu',
  props: {
    menuData: {
      type: Array as PropType<MenuDataItem[]>,
      default: () => []
    }
  },
  setup(props) {
    const state = reactive<any>({
      collapsed: false, // default value
      openKeys: [], // 当前展开的 Submenu 菜单项 key 数组
      selectedKeys: [] // 当前选中的菜单项 key 数组
    })

    const onSelect = (e: { key: string; item: { props: { routeid: number } } } | any) => {
      router.push(e.key)
    }

    watchEffect(() => {
      if (router.currentRoute) {
        const matched = router.currentRoute.value.matched.concat()
        state.selectedKeys = matched
          .filter((r) => r.name !== 'app' && r.path === router.currentRoute.value.path)
          .map((r) => r.path)
        state.openKeys = matched.filter((r) => r.path !== router.currentRoute.value.path).map((r) => r.path)
      }
    })

    const getIcon = (type?: string) => (type ? <Icon type={type} className="sideMenu-icon" /> : null)

    // 构建树结构
    const makeTreeDom = (data: MenuDataItem[]): JSX.Element[] => {
      return data.map((item: MenuDataItem) => {
        if (item.children) {
          return (
            <Menu.SubMenu
              key={item.path}
              title={
                <>
                  {getIcon(item.meta?.icon as string)}
                  <span>{item.meta?.title}</span>
                </>
              }
            >
              {makeTreeDom(item.children)}
            </Menu.SubMenu>
          )
        }
        return (
          <Menu.Item key={item.path}>
            {getIcon(item.meta?.icon as string)}
            <span>{item.meta?.title}</span>
          </Menu.Item>
        )
      })
    }

    return () => {
      return (
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={state.selectedKeys}
          {...(state.collapsed ? {} : { openKeys: state.openKeys })}
          onOpenChange={(keys: any[]) => (state.openKeys = keys)}
          onSelect={onSelect}
          class="my-sideMenu-sider_menu"
        >
          {makeTreeDom(props.menuData)}
        </Menu>
      )
    }
  }
})
