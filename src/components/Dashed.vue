<template>
  <FunctionIcon :tools="tools">
    <template v-slot:icon>
      <svg
        viewBox="0 0 1856 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="11250"
        width="20"
        height="20"
      >
        <path
          d="M1792 704v-64h64v64h-64zM0 0h1856v64H0V0z m64 704H0v-64h64v64z m64 0v-64h64v64H128zM64 320h192v64H64V320z m192 704H64v-64h192v64z m0-384h64v64H256v-64z m192 64H384v-64h64v64zM320 320h192v64H320V320z m128 704H384v-64h64v64z m128-320H512v-64h64v64z m64 0v-64h64v64h-64zM576 320h192v64H576V320z m192 704H576v-64h192v64z m0-384h64v64h-64v-64z m192 64h-64v-64h64v64z m-128-384h192v64h-192V320z m128 704h-64v-64h64v64z m128-320h-64v-64h64v64z m64 0v-64h64v64h-64z m-64-384h192v64h-192V320z m192 704h-192v-64h192v64z m0-384h64v64h-64v-64z m192 64h-64v-64h64v64z m-128-384h192v64h-192V320z m128 704h-64v-64h64v64z m128-320h-64v-64h64v64z m64 0v-64h64v64h-64z m-64-384h192v64h-192V320z m192 704h-192v-64h192v64z"
          fill="#484D55"
          p-id="11251"
        ></path>
      </svg>
    </template>
    <template v-slot:function>
      <div class="dashed-wrap">
        <div class="dashed">
          <span class="dashed-tips">
            线长 {{ currentTools.dashedLineLong }}
          </span>
          <span class="dashed-text">{{ min + 1 }}</span>
          <input
            type="range"
            v-model="currentTools.dashedLineLong"
            :min="min + 1"
            :max="max"
          />
          <span class="dashed-text">{{ max }}</span>
        </div>
        <div class="dashed">
          <span class="dashed-tips">
            线隙 {{ currentTools.dashedInterval }}
          </span>
          <span class="dashed-text">{{ min }}</span>
          <input
            type="range"
            v-model="currentTools.dashedInterval"
            :min="min"
            :max="max"
          />
          <span class="dashed-text">{{ max }}</span>
        </div>
      </div>
    </template>
  </FunctionIcon>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import FunctionIcon from './FunctionIcon.vue'

export default defineComponent({
  name: 'Dashed',
  components: { FunctionIcon },
  props: {
    currentTools: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const min = ref(0)
    const max = ref(100)
    const tools = reactive({ name: '虚线', key: 'D' })
    return { tools, min, max }
  },
})
</script>

<style scoped>
.dashed-wrap {
  width: 230px;
  height: 60px;
  padding: 0 10px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 3px solid rgb(80, 80, 80);
  background: var(--theme-right-bar-function-background);
  top: 110px;
  right: 54px;
  z-index: 3;
}
.dashed {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dashed-tips,
.dashed-text {
  font-size: 14px;
  color: var(--theme-right-bar-function-color);
}
.dashed-tips {
  margin-right: 5px;
  color: var(--theme-right-bar-function-tips-color);
}
</style>
