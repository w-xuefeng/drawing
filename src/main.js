import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.min.css'

Vue.config.productionTip = false
Vue.use(MuseUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
