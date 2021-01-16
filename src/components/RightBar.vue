<template>
  <div class="right-bar">
    <HistoryWin
      v-if="currentTools"
      :historyRecord="historyRecord"
      :currentTools="currentTools"
    />
    <PenSize v-if="currentTools" :currentTools="currentTools" />
    <Dashed v-if="currentTools" :currentTools="currentTools" />
    <Color v-if="currentTools" :currentTools="currentTools" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HistoryWin from './HistoryWin.vue'
import PenSize from './PenSize.vue'
import Dashed from './Dashed.vue'
import Color from './Color.vue'
import HistoryRecord from '../core/base/HistoryRecord'

export default defineComponent({
  name: 'RightBar',
  components: { HistoryWin, PenSize, Dashed, Color },
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
})
</script>

<style scoped>
.right-bar {
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
</style>
