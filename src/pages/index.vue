<template>
  <img alt="Vue logo" src="../assets/vue.svg" />
  <br />
  <UserPinia />
  <br />
  <router-link to="/login">点击跳转至login</router-link>
  <br />
  <router-link to="/vueuse">点击跳转至vueUse页面</router-link>
  <br />
  <br />
  <PropTest class="dd" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserPinia from '/@/components/UserPinia.vue'
import PropTest from '/@/components/PropTest.vue'

export default defineComponent({
  name: 'Index',
  components: {
    UserPinia,
    PropTest,
  },
  setup() {
    //ref
    const message = ref(100)
    //reactive
    const todoList = ['Feed a cat', 'Buy milk']

    return { message, todoList: todoList }
  },
})
</script>

<style lang="less">
@fontSize: 30px;
@fontColor: red;

.root {
  font-size: @fontSize;
  color: @fontColor;
  user-select: none; // 添加 user-select 属性，测试浏览器前缀是否有添加
}
</style>
