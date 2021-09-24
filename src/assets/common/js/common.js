// import { router } from "../../../router";

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
            // router.push('/page2')
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
        // 그리드 조회
        Vue.prototype.$pamTuiGridReadData = function( params ){
            
            this.pamTuiApiEvent = 'readData';
            this.pamTuiApiData = params;
            
            this.$refs.tuiGrid.invoke('readData', 1, params, true)
        }
        // 그리드 조회 전 처리
        Vue.prototype.$pamTuiGridBeforeRequest = function( evt, dataSource ){
            
            evt.stopped = true;
            
            var pagination = evt.instance.paginationManager.getPagination();
            
            if(this.pamTuiApiData){
                this.pamTuiApiData.page = this.pamTuiApiPage + 0;
                this.pamTuiApiData.perPage = pagination._currentPage;
            }
            
            this.pamTuiApiPage = 1;
            
            if(window['instanceWithAuth'] && dataSource.api[this.pamTuiApiEvent]){
                var _tmpTuiGrid = this.$refs.tuiGrid;
                
                window.instanceWithAuth.post( dataSource.api[this.pamTuiApiEvent]['url'] , this.pamTuiApiData)
                .then(res => {
                    _tmpTuiGrid.invoke('resetData', res.data.data.contents, {pageState : res.data.data.pagination});
                    
                    // 수정 필요
                    //this.$gridResponse(res);
                })
                .catch(e => {
                    alert(e.message)
                })
            }
            
        }
        
        // 그리드 페이징 처리
        Vue.prototype.$pamTuiGridBeforePageMove = function( evt ){
            this.pamTuiApiPage = evt.page;
        }
        
    }
}
