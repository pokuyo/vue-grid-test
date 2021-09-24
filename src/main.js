import Vue from 'vue'
import App from './App.vue'
import { router } from './router/index'
import store from './store/index'

// import axios from 'axios'
import axios from './plugins/axios'

// toastUi grid
import 'tui-grid/dist/tui-grid.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import 'tui-pagination/dist/tui-pagination.css'
import { Grid } from '@toast-ui/vue-grid'
import TuiGrid from 'tui-grid';

import comm from './assets/common/js/common.js'


TuiGrid.setLanguage('ko');
//TuiGrid.applyTheme('striped');

Vue.component('grid',Grid)


Vue.use(comm)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

import { instanceWithAuth } from './api/index'

window.instanceWithAuth = instanceWithAuth;

new Vue({
  render: h => h(App),
  router,
  store,
  axios,
}).$mount('#app')
