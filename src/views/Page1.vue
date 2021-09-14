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
    // initialRequest: false 초기 렌더링 시 백엔드에 요청 안함 (기본값: true)
    initialRequest: false, 
}

function refreshAuth () {
    dataSource.headers = { 'Authorization': 'Bearer '+ window.sessionStorage.getItem('authorization') }
}

export default {
    data() {
        return {
            gridPros: null,
            authkey: '0000'
        }
    },
    created() {
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
    // 그리드데이터 호출
    getData () {
        refreshAuth()
        let params = { search: 'test', indexer: 99 }
        this.$refs.tuiGrid.invoke('readData', 1, params, true)
    },
    // 더블클릭 이벤트
    dblclick(ev) {
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
        // update 전 마지막 수정 row 있을때 edit finish
        if (ev != null) this.$refs.tuiGrid.gridInstance.finishEditing(ev.rowKey, ev.columnName, ev.value)

        let params = {
            url: '/api/sample/updatedata',
            method: 'POST',
            // [modifiedOnly:true] 수정항목만 전달 (false: 현 페이지 내 전체 row 전달)
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
    }
  }
}
</script>