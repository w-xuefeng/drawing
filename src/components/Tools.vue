<template>
  <div class="tools" :class="{ 'tools-active': tools.active }">
    <i v-if="tools.icon" class="material-icons tools-icon">{{ tools.icon }}</i>
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
  width: 90px;
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
  color: var(--theme-tools-bar-color-active);
}

.tools-icon {
  font-size: 20px;
  line-height: 30px;
}
</style>
