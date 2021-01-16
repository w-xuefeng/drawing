<template>
  <FunctionIcon :tools="tools">
    <template v-slot:icon>
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2573"
        width="20"
        height="20"
      >
        <path
          d="M960 511.13a32 32 0 0 0-64 0.12v0.75c0 212.08-171.92 384-384 384S128 724.08 128 512s171.92-384 384-384c128.48 0 242.21 63.1 311.92 160H768a32 32 0 0 0 0 64h112a32 32 0 0 0 32-32V176a32 32 0 0 0-64 0v39.69C765.91 122.67 645.81 64 512 64 264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.58 448-448v-0.87z"
          p-id="2574"
          fill="#515151"
        ></path>
        <path
          d="M720 544a32 32 0 0 0-32-32H512V336a32 32 0 0 0-32-32 32 32 0 0 0-32 32v208a32 32 0 0 0 32 32h208a32 32 0 0 0 32-32z"
          p-id="2575"
          fill="#515151"
        ></path>
      </svg>
    </template>
    <template v-slot:function>
      <div class="history-record" :class="{ 'history-empty': list.size === 0 }">
        <HistoryItem
          v-for="item in list"
          :key="item[0]"
          :item="item"
          :active="item[0] === historyRecord.index"
          :currentTools="currentTools"
        />
        <span v-if="list.size === 0" class="history-empty-tips">
          暂无历史记录
        </span>
      </div>
    </template>
  </FunctionIcon>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import FunctionIcon from './FunctionIcon.vue'
import HistoryItem from './HistoryItem.vue'
import HistoryRecord from '../core/base/HistoryRecord'

export default defineComponent({
  name: 'HistoryWin',
  components: { FunctionIcon, HistoryItem },
  props: {
    historyRecord: {
      type: HistoryRecord,
      required: true,
    },
    currentTools: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const tools = reactive({ name: '历史', key: 'H' })
    const list = computed(() => props.historyRecord.list)
    return { list, tools }
  },
})
</script>

<style scoped>
.history-empty {
  justify-content: center;
  align-items: center;
}
.history-empty-tips {
  font-size: 14px;
  color: rgb(179, 179, 179);
  text-align: center;
}
.history-record {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
  border: 3px solid rgb(80, 80, 80);
  background: var(--theme-right-bar-function-background);
  overflow: auto;
  top: 10px;
  right: 54px;
  z-index: 3;
}
</style>
