<template>
  <FunctionIcon :tools="tools">
    <template v-slot:icon>
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2529"
        width="20"
        height="20"
      >
        <path
          d="M139.008 835.008h745.984c5.312 0 8 2.688 8 8v56c0 5.312-2.688 8-8 8H139.008c-5.312 0-8-2.688-8-8v-56c0-5.312 2.688-8 8-8z m6.016-184.128l129.024 100.8a44.16 44.16 0 0 0 27.072 9.344h315.392a43.712 43.712 0 0 0 34.688-16.96l239.488-306.56c23.104-29.504 17.92-72.32-11.712-95.36L573.056 103.04a67.968 67.968 0 0 0-95.488 11.712L133.312 555.52a67.968 67.968 0 0 0 11.712 95.424zM531.84 162.304l299.648 234.048-183.04 234.24-299.584-234.048 183.04-234.24zM304.512 453.312l299.584 234.048-1.28 1.664H310.848L192.512 596.608l112-143.36z"
          p-id="2530"
          fill="#515151"
        ></path>
      </svg>
    </template>
  </FunctionIcon>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import FunctionIcon from './FunctionIcon.vue'

export default defineComponent({
  name: 'Clear',
  components: { FunctionIcon },
  props: {
    currentTools: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const tools = reactive({
      name: '清空',
      key: 'Ctrl+L',
      noPanel: true,
      cb: () => props.currentTools.clearContext(true, true)
    })
    return { tools }
  },
})
</script>
