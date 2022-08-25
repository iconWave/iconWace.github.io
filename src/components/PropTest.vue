<template>
  <div ref="root">This is a root element</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PropTest',
  setup() {
    const root = ref(null);
    onMounted(() => console.log(root.value));
    return {
      root,
    };
  },
});
</script>
