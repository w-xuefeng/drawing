<template>
  <div class="tools-bar">
    <Tools
      v-for="tool in state.tools"
      :key="tool.name"
      :tools="tool"
      @click="onEnable(tool)"
    />
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, defineComponent } from 'vue'
import bindkey from '@w-xuefeng/bindkey'
import Pencil from '../core/tools/Pencil'
import HistoryRecord from '../core/base/HistoryRecord'
import Rubber from '../core/tools/Rubber'
import BaseDrawTools from '../core/base/BaseDrawTools'
import Tools from './Tools.vue'
import type { IDarwToolsBarState } from '../typing'

export default defineComponent({
  name: 'ToolsBar',
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
  components: { Tools },
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

      const tools = [pencil, rubber]

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
  background: rgba(0, 0, 0, 0.75);
  border-radius: 30px;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.tools-bar-tool {
  width: 60px;
  height: 30px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.tools-bar-tool-active {
  background: rgb(203, 221, 255);
  color: #000;
}
</style>
