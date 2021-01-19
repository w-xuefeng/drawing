<template>
  <FunctionIcon :tools="tools">
    <template v-slot:icon>
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3363"
        width="20"
        height="20"
      >
        <path
          d="M469.333333 597.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h193.322667l-52.693334-52.693334a44.330667 44.330667 0 0 1 62.677334-62.677333l125.397333 125.397333a44.117333 44.117333 0 0 1 8.874667 49.322667 43.648 43.648 0 0 1-10.112 16.810667l-124.629334 124.629333a44.032 44.032 0 0 1-62.293333-62.293333L705.706667 640H512a42.666667 42.666667 0 0 1-42.666667-42.666667z m-256 341.333334h597.333334a85.333333 85.333333 0 0 0 85.333333-85.333334v-85.333333a42.666667 42.666667 0 0 0-85.333333 0v42.666667a42.666667 42.666667 0 0 1-42.666667 42.666666H256a42.666667 42.666667 0 0 1-42.666667-42.666666V213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h512a42.666667 42.666667 0 0 1 42.666667 42.666666v213.333334a42.666667 42.666667 0 0 0 85.333333 0V170.666667a85.333333 85.333333 0 0 0-85.333333-85.333334H213.333333a85.333333 85.333333 0 0 0-85.333333 85.333334v682.666666a85.333333 85.333333 0 0 0 85.333333 85.333334z"
          p-id="3364"
          fill="#515151"
        ></path>
      </svg>
    </template>
    <template v-slot:function>
      <div class="output">
        <div
          class="output-item"
          v-for="item in outputList"
          :key="item.format"
          @click="item.onClick"
        >
          <span class="output-item-text">{{ item.format }}</span>
          <span class="output-item-tips">{{ item.key }}</span>
        </div>
      </div>
    </template>
  </FunctionIcon>
</template>

<script lang="ts">
import bindkey from '@w-xuefeng/bindkey'
import { defineComponent, reactive } from 'vue'
import FunctionIcon from './FunctionIcon.vue'

export default defineComponent({
  name: 'Output',
  components: { FunctionIcon },
  props: {
    currentTools: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const tools = reactive({ name: '导出', key: 'Ctrl+O' })
    const outputList = reactive([
      {
        format: '导出 JPEG',
        key: 'Ctrl+Shift+S',
        onClick: () => props.currentTools.output('jpeg'),
      },
      {
        format: '导出 PNG',
        key: 'Ctrl+Shift+D',
        onClick: () => props.currentTools.output('png'),
      },
      {
        format: '导出 WebP',
        key: 'Ctrl+Shift+X',
        onClick: () => props.currentTools.output('webp'),
      },
    ])
    outputList.forEach((item) => bindkey.add(item.key, item.onClick))
    return { tools, outputList }
  },
})
</script>

<style scoped>
.output {
  width: 175px;
  padding: 0;
  position: fixed;
  border: 3px solid rgb(80, 80, 80);
  background: var(--theme-right-bar-function-background);
  top: 260px;
  right: 54px;
  z-index: 3;
}

.output-item {
  padding: 0 10px;
  display: flex;
  height: 40px;
  line-height: 40px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.output-item:hover {
  background: var(--theme-tools-bar-color-active);
}

.output-item-text {
  font-size: 14px;
  color: var(--theme-right-bar-function-color);
}

.output-item-tips {
  font-size: 12px;
  color: var(--theme-right-bar-function-tips-color);
}
</style>
