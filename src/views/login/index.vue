<template>
  <div class="add-login-container rowCC">
    <a-card class="login">
      <div class="login-right-container">
        <div class="title-box">
          <h2 class="title">{{ APP_TITLE }}</h2>
        </div>
      </div>
      <LoginForm />
    </a-card>
  </div>
</template>
<script setup lang="ts">
import LoginForm from './form.vue'
import { APP_TITLE } from '../../../config/constant'
</script>

<style lang="less" scoped>
.add-login-container {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
  .login {
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
    &-right {
      padding-top: 80px;
      &-container {
        width: 360px;
        margin: 0 auto;
      }
    }
  }
  .title-box {
    display: flex;
    .title {
      font-size: 22px;
      color: #000000;
    }
  }
}
</style>
