<template>
  <FunctionIcon
    ref="functionIconRef"
    :tools="tools"
    :labelStyle="recording ? { color: '#d81e06' } : undefined"
  >
    <template v-slot:icon>
      <svg
        v-if="recording"
        t="1635566296002"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3370"
        width="20"
        height="20"
      >
        <path
          d="M729.9072 856.576H40.3456V167.0144h689.5616z m-607.6416-81.92h525.7216V248.9344H122.2656z"
          fill="#d81e06"
          p-id="3371"
        ></path>
        <path
          d="M983.04 815.7184L647.3728 512 983.04 208.2816zM769.4336 512L901.12 631.1936V392.9088zM280.576 410.0096h81.92v203.6736h-81.92zM407.7568 410.0096h81.92v203.6736h-81.92z"
          fill="#d81e06"
          p-id="3372"
        ></path>
      </svg>
      <svg
        v-else
        t="1635566256894"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2906"
        width="20"
        height="20"
      >
        <path
          d="M729.9072 856.576H40.3456V167.0144h689.5616z m-607.6416-81.92h525.7216V248.9344H122.2656z"
          fill="#515151"
          p-id="2907"
        ></path>
        <path
          d="M983.04 815.7184L647.3728 512 983.04 208.2816zM769.4336 512L901.12 631.1936V392.9088zM483.84 512l-148.0704-101.888v203.776L483.84 512z"
          fill="#515151"
          p-id="2908"
        ></path>
      </svg>
    </template>
    <template v-slot:function>
      <div class="recorder">
        <div
          class="recorder-item"
          v-for="item in menuList"
          :key="item.key"
          :class="{ 'recorder-item-disable': item.disabled }"
          @click="item.onClick"
        >
          <span class="recorder-item-text">{{ item.format }}</span>
          <span class="recorder-item-tips">{{ item.key }}</span>
        </div>
      </div>
    </template>
  </FunctionIcon>
</template>

<script lang="ts">
import bindkey from '@w-xuefeng/bindkey'
import { ref, defineComponent, computed, reactive } from 'vue'
import FunctionIcon from './FunctionIcon.vue'
import Record from '../core/utils/Record'

const toolsOptions = {
  startKey: 'R',
  startText: '录制',
  endKey: 'Alt+E',
  endText: '停止',
}

export default defineComponent({
  name: 'Recorder',
  components: { FunctionIcon },
  props: {
    canvas: {
      type: HTMLCanvasElement,
      required: true,
    },
    currentTools: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const functionIconRef = ref()
    const recording = ref(false)
    const record = new Record(props.canvas)

    const state = reactive({
      backupToogleShow: () => {},
    })

    record.onRecordStart = () => {
      recording.value = true
    }

    record.onRecordEnd = (url) => {
      recording.value = false
      window.open(url)
      if (functionIconRef.value) {
        functionIconRef.value.toggleShow = state.backupToogleShow
        bindkey.remove(toolsOptions.startKey)
        bindkey.add(toolsOptions.startKey, state.backupToogleShow)
      }
    }

    const clickToStopRecord = () => {
      recording.value && record.endRecord()
    }

    const clickTostartRecord = (isWhite = false) => {
      record.startRecord(isWhite)
      if (functionIconRef.value) {
        state.backupToogleShow = functionIconRef.value.toggleShow
        functionIconRef.value.forceClosePanel()
        functionIconRef.value.toggleShow = clickToStopRecord
        bindkey.remove(toolsOptions.startKey)
      }
    }

    const tools = computed(() => ({
      name: recording.value ? toolsOptions.endText : toolsOptions.startText,
      key: recording.value ? toolsOptions.endKey : toolsOptions.startKey,
      noPanel: recording.value,
      cb: clickToStopRecord,
    }))

    const menuList = computed(() => [
      {
        format: recording.value ? '正在录制中...' : '开始录制（白色背景）',
        key: 'Alt+Shift+W',
        onClick: () => clickTostartRecord(true),
        disabled: recording.value,
      },
      {
        format: recording.value ? '正在录制中...' : '开始录制（透明背景）',
        key: 'Alt+Shift+R',
        onClick: () => clickTostartRecord(),
        disabled: recording.value,
      },
    ])

    bindkey.add(toolsOptions.endKey, clickToStopRecord)

    menuList.value.forEach((item) => bindkey.add(item.key, item.onClick))

    return { tools, menuList, recording, functionIconRef }
  },
})
</script>

<style scoped>
.recorder {
  width: 240px;
  padding: 0;
  position: fixed;
  border: 3px solid rgb(80, 80, 80);
  background: var(--theme-right-bar-function-background);
  top: 330px;
  right: 54px;
  z-index: 3;
}

.recorder-item {
  padding: 0 10px;
  display: flex;
  height: 40px;
  line-height: 40px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.recorder-item-disable {
  cursor: not-allowed;
  color: var(--theme-tools-bar-color-disabled);
  background: var(--theme-tools-bar-background-disabled);
}

.recorder-item:hover {
  background: var(--theme-tools-bar-color-active);
}

.recorder-item-disable:hover {
  background: var(--theme-tools-bar-background-disabled);
}

.recorder-item-text {
  font-size: 14px;
  color: var(--theme-right-bar-function-color);
}

.recorder-item-tips {
  font-size: 12px;
  color: var(--theme-right-bar-function-tips-color);
}
</style>
