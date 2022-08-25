import { Layout, Space } from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { defineComponent, PropType, Transition } from 'vue'
import Icon from '/@/components/Icon/index.vue'
import { MenuDataItem } from '../utils/typeings'
import SideMenu from './Menu'
import './index.less'

type theme = 'light' | 'dark' | undefined
export default defineComponent({
  name: 'SideMenu',
  components: {
    SideMenu
  },
  props: {
    theme: {
      type: String,
      default: 'light'
    },
    menuWidth: {
      type: Number,
      default: 208
    },
    menuData: {
      type: Array as PropType<MenuDataItem[]>,
      default: () => []
    }
  },
  setup(props) {
    const state = reactive<any>({
      collapsed: false,
      openKeys: [], // 当前展开的 Submenu 菜单项 key 数组
      selectedKeys: [] // 当前选中的菜单项 key 数组
    })

    return () => {
      return (
        <Layout.Sider
          width={208}
          collapsedWidth={54}
          class="my-sideMenu-sider"
          theme={props.theme as theme}
          trigger={null}
          breakpoint="lg"
          collapsible
          collapsed={state.collapsed}
        >
          {/* logo */}
          <Transition name="fade-top">
            {!state.collapsed && (
              <div class="my-sideMenu-sider-logo">
                <Space>
                  <Icon type="guanlipingtai" size="20px" align="0px" />
                  <span class="font16 nowrap">管理平台</span>
                </Space>
              </div>
            )}
          </Transition>
          {/* menu */}
          <SideMenu menuData={props.menuData} />
          {/* footer */}
          <div class="my-sideMenu-sider-footer">
            {h(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              style: { fontSize: 16 },
              onClick: () => (state.collapsed = !state.collapsed)
            })}
          </div>
        </Layout.Sider>
      )
    }
  }
})
