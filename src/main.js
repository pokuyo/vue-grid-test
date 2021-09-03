import Vue from 'vue'
import App from './App.vue'
import { router } from './router/index.js'

import axios from 'axios'

import 'tui-grid/dist/tui-grid.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import 'tui-pagination/dist/tui-pagination.css'
import { Grid } from '@toast-ui/vue-grid'

import comm from './assets/common/js/common.js'

// import i18n from './assets/common/i18n'

Vue.component('grid',Grid)
Vue.use(comm)
// Vue.use(i18n)

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router,
  axios,
  // i18n
}).$mount('#app')
