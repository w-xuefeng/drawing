<template>
  <div @click="toggleShow" class="function-icon">
    <slot name="icon"></slot>
    <span class="function-icon-text">{{ tools.name }}({{ tools.key }})</span>
  </div>
  <div v-if="show">
    <slot name="function"></slot>
  </div>
</template>

<script lang="ts">
import bindkey from '@w-xuefeng/bindkey'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'FunctionIcon',
  props: {
    tools: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const show = ref(false)
    const toggleShow = () => (show.value = !show.value)
    bindkey.add(props.tools.key, toggleShow)
    return { show, toggleShow }
  },
})
</script>

<style scoped>
.function-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 5px auto;
}
.function-icon-text {
  font-size: 12px;
  color: rgb(59, 59, 59);
}
</style>
