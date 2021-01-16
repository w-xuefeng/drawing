<template>
  <Draw />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Draw from './components/Draw.vue'

export default defineComponent({
  name: 'App',
  components: { Draw },
})
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  background: rgb(187, 187, 187);
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
