<template>
  <div>account 账户</div>
  <p>{{ account }}</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const account = ref('tao')
</script>
