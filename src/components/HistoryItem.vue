<template>
  <div
    class="history-record-item"
    :class="{ 'history-record-item-current': active }"
    @click="onRecover"
  >
    <span class="history-record-item-index">{{ item[0] }}</span>
    <div class="history-record-item-img">
      <img :src="item[1].data" width="30" height="30" />
    </div>
    <span class="history-record-item-text">{{ item[1].tools.name }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HistoryItem',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    currentTools: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const onRecover = () => props.currentTools.undo(props.item[0])
    return { onRecover }
  },
})
</script>

<style scoped>
.history-record-item {
  display: flex;
  color: var(--theme-right-bar-history-record-item-color);
  align-items: center;
  border-bottom: 1px solid #525252;
  cursor: pointer;
}
.history-record-item-img {
  width: 30px;
  height: 30px;
  background: var(--theme-right-bar-history-record-item-img-background);
  border: 1px solid rgb(0, 0, 0);
  margin-right: 20px;
}
.history-record-item-index {
  width: 30px;
  height: 30px;
  color: var(--theme-right-bar-history-record-item-index-color);
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.history-record-item-text {
  color: var(--theme-right-bar-history-record-item-text-color);
}
.history-record-item-current {
  background: var(--theme-right-bar-history-record-item-current-background);
}
</style>
