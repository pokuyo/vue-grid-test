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

import VueI18n from 'vue-i18n'

async function setI18n () {
  Vue.use(VueI18n)
  let langs = await axios.post('V1/sample/getDBMessage')
  console.log(langs.data.data)
  let message = langs.data

  return new VueI18n({
    locale: 'ko',
    fallbackLocale: 'ko',
    message
  })
}

Vue.component('grid',Grid)
Vue.use(comm)

Vue.config.productionTip = false
Vue.prototype.$http = axios

setI18n()
  .then((i18n) => {
    new Vue({
      render: h => h(App),
      router,
      axios,
      i18n
    }).$mount('#app')
  })
