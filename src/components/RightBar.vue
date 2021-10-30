<template>
  <div class="right-bar" v-if="currentTools">
    <HistoryWin :currentTools="currentTools" :historyRecord="historyRecord" />
    <PenSize :currentTools="currentTools" />
    <Dashed :currentTools="currentTools" />
    <Color :currentTools="currentTools" />
    <Clear :currentTools="currentTools" />
    <Output :currentTools="currentTools" />
    <Recorder :currentTools="currentTools" :canvas="canvas" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HistoryWin from './HistoryWin.vue'
import PenSize from './PenSize.vue'
import Dashed from './Dashed.vue'
import Color from './Color.vue'
import Clear from './Clear.vue'
import Output from './Output.vue'
import Recorder from './Recorder.vue'
import HistoryRecord from '../core/base/HistoryRecord'

export default defineComponent({
  name: 'RightBar',
  components: { HistoryWin, PenSize, Dashed, Color, Clear, Output, Recorder },
  props: {
    historyRecord: {
      type: HistoryRecord,
      required: true,
    },
    currentTools: {
      type: Object,
      required: true,
    },
    canvas: {
      type: HTMLCanvasElement,
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
