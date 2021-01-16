<template>
  <div class="tools" :class="{ 'tools-active': tools.active }">
    <span> {{ tools.name }} {{ tools.key ? `(${tools.key})` : '' }} </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tools',
  props: {
    tools: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style scoped>
.tools {
  width: 80px;
  height: 30px;
  color: var(--theme-tools-bar-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
}

.tools-active {
  background: var(--theme-tools-bar-background-active);
  color:var(--theme-tools-bar-color-active);
}
</style>
