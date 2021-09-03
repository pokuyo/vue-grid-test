// common function
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
        return resultFlag
    }
}

export default {
    install (Vue) {
        Vue.prototype.$gridResponse = methods.gridResponse
    }
}

