<template>
  <div class="tools-bar">
    <Tools
      v-for="tool in state.tools"
      :key="tool.name"
      :tools="tool"
      @click="onEnable(tool)"
    />
  </div>
  <RightBar
    v-if="state.currentTools"
    :historyRecord="historyRecord"
    :currentTools="state.currentTools"
  />
</template>

<script lang="ts">
import { onMounted, reactive, defineComponent } from 'vue'
import bindkey from '@w-xuefeng/bindkey'
import HistoryRecord from '../core/base/HistoryRecord'

import Pencil from '../core/tools/Pencil'
import Rubber from '../core/tools/Rubber'
import Line from '../core/tools/Line'
import Circle from '../core/tools/Circle'
import Square from '../core/tools/Square'
import Graffiti from '../core/tools/Graffiti'

import BaseDrawTools from '../core/base/BaseDrawTools'
import Tools from './Tools.vue'
import RightBar from './RightBar.vue'
import type { IDarwToolsBarState } from '../typing'

export default defineComponent({
  name: 'ToolsBar',
  emits: ['onStyleChange'],
  props: {
    canvas: {
      type: HTMLCanvasElement,
      required: true,
    },
    canvasBackup: {
      type: HTMLCanvasElement,
      required: true,
    },
    historyRecord: {
      type: HistoryRecord,
      required: true,
    },
  },
  components: { Tools, RightBar },
  setup(props, vueCTX) {
    const state = reactive<IDarwToolsBarState>({
      currentTools: null,
      tools: [],
    })

    const bindKeyToTools = (tool: BaseDrawTools) => {
      tool.key && bindkey.add(tool.key, () => onEnable(tool))
      return tool
    }

    const onEnable = (currentTool: BaseDrawTools) => {
      state.tools
        .filter((tool) => currentTool !== tool)
        .forEach((tool) => tool.disable())
      state.currentTools = currentTool
      state.currentTools.enable()
      vueCTX.emit('onStyleChange', {
        cursor: state.currentTools.cursor || 'auto',
      })
    }

    const initTools = () => {
      const pencil = new Pencil(
        props.canvas,
        props.canvasBackup,
        props.historyRecord,
        'B'
      )

      const rubber = new Rubber(
        props.canvas,
        props.canvasBackup,
        props.historyRecord,
        'E'
      )

      const line = new Line(
        props.canvas,
        props.canvasBackup,
        props.historyRecord,
        'L'
      )
      const circle = new Circle(
        props.canvas,
        props.canvasBackup,
        props.historyRecord,
        'C'
      )

      const square = new Square(
        props.canvas,
        props.canvasBackup,
        props.historyRecord,
        'S'
      )
      const graffiti = new Graffiti(
        props.canvas,
        props.canvasBackup,
        props.historyRecord,
        'G'
      )

      const tools = [pencil, rubber, line, circle, square, graffiti]

      return tools.map(bindKeyToTools)
    }

    const initFunctionShortKey = () => {
      bindkey.add('Ctrl+L', () => state.currentTools?.clearContext(true))
      bindkey.add('Ctrl+Z', () => state.currentTools?.undo())
      bindkey.add('Ctrl+Y', () => state.currentTools?.redo())
    }

    const init = () => {
      state.tools = initTools()
      initFunctionShortKey()
      onEnable(state.tools[0])
    }

    onMounted(init)

    return { state, onEnable }
  },
})
</script>

<style scoped>
.tools-bar {
  width: 90%;
  height: 60px;
  min-width: 300px;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--theme-tools-bar-background-color);
  border-radius: 30px;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
</style>
