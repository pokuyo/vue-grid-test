<template>
    <div>
        <p>data: {{authkey}}</p>
        <grid ref="tuiGrid"
            :data="gridPros.data"
            :columns="gridPros.columns"
            :options="gridPros.options"
            :scrollX="gridPros.scrollX"
            :scrollY="gridPros.scrollY"
            @dblclick="dblclick"
            @focusChange="focusChange"
            @afterChange="afterChange"
            @response="response"
        ></grid>
        <div>
            <button @click="getData">getData</button>
            <!-- <p>{{ $t('dataPreprocessing_010') }}</p> -->
        </div>
        <div>
            <button @click="updateData">updateData</button>
            <!-- <p>{{ $t('dataPreprocessing_010') }}</p> -->
        </div>
    </div>
</template>

<script>
const storage = window.sessionStorage
const dataSource = {
    contentType: 'application/json',
    api: {
        /**
         * [PARAMS]
         * readData(page:[Page number], 
         * data:[Data(parameters) to send to the server], 
         * resetData:[If set to true, last requested data will be ignored.])
         */
        readData: {url: '/api/sample/requestdata', method: 'POST', initParams: { test: 'test'}},
        updateData: {url: '/api/sample/updatedata', method: 'POST'},
    },
    // headers: { 'Authorization': 'Bearer '+ storage.getItem('authorization') },
    initialRequest: false, // 초기 렌더링 시 백엔드에 요청 X
}

function refreshAuth () {
    console.log('refreshauth in')
    storage = window.sessionStorage
    dataSource.headers = { 'Authorization': 'Bearer '+ window.sessionStorage.getItem('authorization') }
    console.log('storage', storage)
    console.log('dataSource', dataSource)
}

export default {
    data() {
        return {
            gridPros: null,
            authkey: '0000'
            // authkey: null
            // storage: window.sessionStorage,
            // dataSource: {
            //     contentType: 'application/json',
            //     api: {
            //         /**
            //          * [PARAMS]
            //          * readData(page:[Page number], 
            //          * data:[Data(parameters) to send to the server], 
            //          * resetData:[If set to true, last requested data will be ignored.])
            //          */
            //         readData: {url: '/api/sample/requestdata', method: 'POST', initParams: { test: 'test'}},
            //         updateData: {url: '/api/sample/updatedata', method: 'POST'},
            //     },
            //     headers: { 'Authorization': 'Bearer '+ storage.getItem('authorization') },
            //     initialRequest: false, // 초기 렌더링 시 백엔드에 요청 X
            // }
        }
    },
    created() {
        this.getAuthkey()
        refreshAuth()
        this.gridPros = {
            columns: [
                { header: 'comments_count', name: 'comments_count', editor: 'text'},
                { header: 'domain', name: 'domain', editor: 'text'},
                { header: 'id', name: 'id', editor: 'text'},
                { header: 'points', name: 'points', editor: 'datePicker'},
                { header: 'time', name: 'time'},
                { header: 'time_ago', name: 'time_ago'},
                { header: 'title', name: 'title'},
                { header: 'type', name: 'type'},
                { header: 'url', name: 'url'},
                { header: 'user', name: 'user'},
            ],
            data: dataSource,
            scrollX: false,
            scrollY: false,
            options: {
                pageOptions: {
                    perPage: 10
                },
                columnOptions: {
                    resizable: true
                }
            }
        }
  },
  methods: {
    // 그리드데이터 호출 (후 호출)
    getData () {
        refreshAuth()
        dataSource.headers = { 'Authorization': 'Bearer '+ window.sessionStorage.getItem('authorization') }
        // console.log('▶ req token :: ', storage.getItem('authorization') )
        let params = {
            search: 'test',
            indexer: 99
        }
        this.$refs.tuiGrid.invoke('readData', 1, params, true)
    },
    // 더블클릭 이벤트
    dblclick(ev) {
        // console.log('clickCell', ev)
        console.log('clickCell', this.$refs.tuiGrid.gridInstance.getRow(ev.rowKey))
    },
    // 포커스 변경 이벤트
    focusChange () {
        // console.log('focusChange', ev)
    },
    // 셀값 변경 이벤트
    afterChange (ev) {
        console.log('afterChange', ev)
    },
    // 그리드 정보 저장
    updateData (ev) {
        // update 전 마지막 수정 row 있을때 edit finsih
        if (ev != null) {
            this.$refs.tuiGrid.gridInstance.finishEditing(ev.rowKey, ev.columnName, ev.value)
        }

        // this.$refs.tuiGrid.gridInstance.getModifiedRows()
        // console.log('update', this.$refs.tuiGrid.invoke('getModifiedRows'))
        // let params = this.$refs.tuiGrid.invoke('getModifiedRows')
        // this.$refs.tuiGrid.invoke('updateData', params)

        let params = {
            url: '/api/sample/updatedata',
            method: 'POST',
            // 수정항목만 전달 (false 지정 시 현 페이지 내 전체 row 전달)
            modifiedOnly: true
        }
        this.$refs.tuiGrid.gridInstance.request('updateData', params)
        // this.getData()
    },
    response (res) {
        // 응답함수(공통) : this.$responseData(res)
        if(this.$gridResponse(res)) {
            this.$refs.tuiGrid.gridInstance.reloadData();
        }
    },
    getAuthkey () {
        this.authkey = this.$getAuth()
    }
  }
}
</script>