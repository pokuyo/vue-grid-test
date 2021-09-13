import { router } from "../../../router";

// common function
const storage = window.sessionStorage;
const methods = {
    // grid response
    gridResponse: (res) => {
        const result = JSON.parse(res.xhr.response)
        let resultFlag = false
        if (result.resultCode != undefined) {
            if (result.resultCode === 0) {
                alert('완료되었습니다.')
                resultFlag = true
            } else {
                alert('수행중 에러가 발생하였습니다.\n' + result.resultMsg);
                resultFlag = false
            }
        }
        if (result.status === 401) {
            alert('로그인만료')
            router.push('/page2')
        }
        return resultFlag
    },
    getAuth: () => {
        let header = {
            headers: {
                'Authorization': 'Bearer '+storage.getItem('authorization')
            }
        }
        return header
    }
}

export default {
    install (Vue) {
        Vue.prototype.$gridResponse = methods.gridResponse
        Vue.prototype.$getAuth = methods.getAuth
    }
}

