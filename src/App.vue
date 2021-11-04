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
@import 'global.css';

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
