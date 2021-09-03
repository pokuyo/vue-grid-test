import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'

Vue.use(VueI18n)

async function setI18n () {
    Vue.use(VueI18n)
    let langs = await axios.post('V1/sample/getDBMessage')
    console.log(langs.data)
    let message = langs.data

    return new VueI18n({
        locale: 'ko',
        fallbackLocale: 'ko',
        message
    })
}
export default setI18n()