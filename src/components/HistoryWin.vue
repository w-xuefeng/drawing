<template>
  <div @click="toggleShow" class="history">
    <svg
      t="1610781578999"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2573"
      width="20"
      height="20"
      style="cursor: pointer"
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
    <span class="history-text">{{ tools.name }}({{ tools.key }})</span>
  </div>
  <div class="history-record" v-if="show">
    <HistoryItem
      v-for="item in list"
      :key="item[0]"
      :item="item"
      :active="item[0] === historyRecord.index"
      @click="undo(item)"
    />
  </div>
</template>

<script lang="ts">
import bindkey from '@w-xuefeng/bindkey'
import { computed, defineComponent, ref, reactive } from 'vue'
import Tools from './Tools.vue'
import HistoryItem from './HistoryItem.vue'
import HistoryRecord, { IHistoryRecordList } from '../core/base/HistoryRecord'
import BaseDrawTools from '../core/base/BaseDrawTools'

export default defineComponent({
  name: 'HistoryWin',
  components: {
    Tools,
    HistoryItem,
  },
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
    const show = ref(false)
    const tools = reactive({ name: '历史', key: 'H', active: show })
    const list = computed(() => props.historyRecord.list)
    const toggleShow = () => (show.value = !show.value)
    const undo = ([index]: [number]) => props.currentTools.undo(index)

    bindkey.add(tools.key, toggleShow)
    return { list, show, tools, toggleShow, undo }
  },
})
</script>

<style scoped>
.history {
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.history-text {
  font-size: 12px;
  color: rgb(59, 59, 59);
}
.history-record {
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
  border: 3px solid rgb(80, 80, 80);
  background: rgb(53, 52, 52);
  overflow: auto;
  top: 46px;
  right: 5px;
  z-index: 3;
}
</style>
