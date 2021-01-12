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
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
}

.tools-active {
  background: rgb(255, 255, 255);
  color: #000;
}
</style>
