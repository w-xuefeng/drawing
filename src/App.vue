<template>
  <DrawingBoard />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DrawingBoard from './components/DrawingBoard.vue'

export default defineComponent({
  name: 'App',
  components: {
    DrawingBoard,
  },
})
</script>

<style>
:root {
  --main-background-color: rgb(187, 187, 187);
}
</style>
<style>
/** theme */
:root {
  --theme-tools-bar-background-color: rgba(0, 0, 0, 0.75);
  --theme-tools-bar-color: rgb(255, 255, 255);
  --theme-tools-bar-background-active: rgb(255, 255, 255);
  --theme-tools-bar-color-active: rgb(0, 0, 0);
  --theme-tools-bar-background-disabled: rgb(68, 65, 65);
  --theme-tools-bar-color-disabled: #c3c3c3;
  --theme-right-bar-function-background: rgb(53, 52, 52);
  --theme-right-bar-function-color: #fff;
  --theme-right-bar-function-tips-color: rgb(194, 216, 229);
  --theme-right-bar-history-record-item-color: #fff;
  --theme-right-bar-history-record-item-img-background: #fff;
  --theme-right-bar-history-record-item-index-color: rgb(141, 141, 141);
  --theme-right-bar-history-record-item-text-color: #fff;
  --theme-right-bar-history-record-item-current-background: #000;
}
</style>
<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  background: var(--main-background-color);
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
