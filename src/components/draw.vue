<template>
  <div class="wrap">
    <canvas canvas ref="canvas" :style="state.style"></canvas>
    <canvas canvasBackup ref="canvasBackup" :style="state.style"></canvas>
    <ToolsBar
      v-if="ready"
      :canvas="state.canvas"
      :canvasBackup="state.canvasBackup"
      :historyRecord="state.historyRecord"
      @onStyleChange="onStyleChange"
    />
  </div>
</template>

<script lang="ts">
import { onMounted, ref, reactive, defineComponent, CSSProperties } from 'vue'
import Pencil from '../core/tools/Pencil'
import HistoryRecord from '../core/base/HistoryRecord'
import ToolsBar from './ToolsBar.vue'
import { debounce } from '../utils'
import type { IDrawCanvas } from '../typing'

export default defineComponent({
  name: 'Draw',
  components: {
    ToolsBar,
  },
  setup() {
    const ready = ref(false)
    const state = reactive<IDrawCanvas>({
      canvas: null,
      canvasBackup: null,
      historyRecord: new HistoryRecord(),
      style: { cursor: 'auto' },
    })

    const setSzie = <T extends { width: number; height: number }>(
      wrapper: T,
      size: { width: number; height: number }
    ) => {
      const { width, height } = size
      wrapper.width = width
      wrapper.height = height
      return wrapper
    }

    const handleResize = () =>
      new Promise<boolean>((resolve, reject) => {
        if (state.canvas && state.canvasBackup) {
          const size = {
            width: document.documentElement.clientWidth * 0.9,
            height: document.documentElement.clientHeight - 90,
          }
          state.canvas = setSzie(state.canvas, size)
          state.canvasBackup = setSzie(state.canvasBackup, size)
          const lastRecord = state.historyRecord.list.get(
            state.historyRecord.list.size
          )
          if (typeof lastRecord?.tools?.recoverLastHistory === 'function') {
            lastRecord?.tools?.recoverLastHistory()
          }
          resolve(true)
        } else {
          reject('canvas is not ready')
        }
      })

    const canvasReady = () =>
      handleResize()
        .then((isReady) => (ready.value = isReady))
        .catch(console.log)

    const init = () => {
      state.canvas = document.querySelector(`canvas[canvas]`)
      state.canvasBackup = document.querySelector(`canvas[canvasBackup]`)
      canvasReady()
      window.addEventListener('resize', debounce(handleResize, 800))
    }

    const onStyleChange = (newStyle: CSSProperties) => {
      state.style = newStyle
    }

    onMounted(init)
    return { ready, state, onStyleChange }
  },
})
</script>

<style scoped>
.wrap {
  width: 90%;
  min-width: 300px;
  margin: 10px auto 0 auto;
  height: calc(100vh - 90px);
  background: #ffffff;
  border-radius: 10px;
  position: relative;
}
canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
