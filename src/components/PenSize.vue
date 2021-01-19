<template>
  <FunctionIcon :tools="tools">
    <template v-slot:icon>
      <svg
        viewBox="0 0 1724 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="11105"
        width="20"
        height="20"
      >
        <path
          d="M0 1024v-215.578947h1724.631579v215.578947H0zM0 485.052632h1724.631579v161.68421H0V485.052632z m0-269.473685h1724.631579v107.789474H0V215.578947z m0-215.578947h1724.631579v53.894737H0V0z"
          fill="#484D55"
          p-id="11106"
        ></path>
      </svg>
    </template>
    <template v-slot:function>
      <div class="pen-size">
        <span class="pen-size-tips">粗细 {{ currentTools.size }}</span>
        <span class="pen-size-text">{{ min }}</span>
        <input type="range" v-model="currentTools.size" :min="min" :max="max" />
        <span class="pen-size-text">{{ max }}</span>
      </div>
    </template>
  </FunctionIcon>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import FunctionIcon from './FunctionIcon.vue'

export default defineComponent({
  name: 'PenSize',
  components: { FunctionIcon },
  props: {
    currentTools: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const min = ref(1)
    const max = ref(100)
    const tools = reactive({ name: '粗细', key: 'W' })
    return { tools, min, max }
  },
})
</script>

<style scoped>
.pen-size {
  width: 230px;
  height: 30px;
  padding: 0 10px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 3px solid rgb(80, 80, 80);
  background: var(--theme-right-bar-function-background);
  top: 64px;
  right: 54px;
  z-index: 3;
}
.pen-size-tips,
.pen-size-text {
  font-size: 14px;
  line-height: 14px;
  color: var(--theme-right-bar-function-color)
}
.pen-size-tips {
  margin-right: 5px;
  color: var(--theme-right-bar-function-tips-color);
}
</style>
