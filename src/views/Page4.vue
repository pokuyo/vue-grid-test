<template>

    <div>
        <v-app> <!-- v-app 으로 감싸야 v-select, v-text-field 동작 -->
            
            <!-- 보이기 숨기기 -->
            <template v-if="isDivOpen  == true"> <!-- 빈 껍데기 -->

                <!-- for -->
                <div id="HIDE_DIV" v-for="(user, ui) in forTest" :key="ui" >
                    <img :src="imgUrl" >
                    이름 : {{ user.user }} / 나이 : {{ user.age }} / 순번 : {{ ui + 1 }} / list : 
                    <template v-for="(jVal, jKey, ji) in user.join" >
                        
                        <template v-if="ji  == 0">
                        // JOIN = 
                        </template>
                        {{ ji }} - { {{ jKey }} : {{ jVal }} }
                        <template v-if="ji != Object.keys(user.join).length - 1">
                            ,
                        </template>
                    </template>
                    <p v-for="lVal in user.list" :key="lVal">
                         {{ lVal }} ,
                    </p>
                    
                </div>
            </template>
            <v-text-field
                v-model="inVal" 
            />
             입력값 : {{ inVal }}

            <br/>
            <br/>

            주소 
            <!-- 값에 따라 화면 처리 -->

            <br/>
            <v-select 
                v-model="urlVal"
                :items="urlList"
            >
            </v-select>
            <a :href="urlVal" target="_blank" >{{ urlVal }}</a>

            <br/>
            <br/>
            <!-- class 처리 -->
            <v-select
                v-model="selCol"
                :items="colorOptionList"
                item-text="nm"
                item-value="val"
            >
            </v-select>

            <h2 :class="{ red : selCol === 'r' , blue : selCol === 'b'}" >색상</h2>
            
            <br/>
            <br/>
            
            <!-- if else -->
            <v-text-field type="number" v-model="inAge"  /> 살
            <h3 v-if="inAge >= 20"> 20대 이상</h3>
            <h3 v-else-if="inAge < 20 && inAge >= 10"> 10대</h3>
            <h3 v-else > 10대미만 </h3>

            <br/>
            <br/>

            <p>data: {{responseValues}}</p>
            <v-btn @click="retrieveData">test</v-btn>
            <p>data: {{authkey}}</p>
            <v-btn @click="getAuthkey">test</v-btn>
            <p> {{ openText }} </p>
            <v-btn @click="showDiv">숨김 화면 보이기</v-btn>

    <!-- 그리드 처리 -->
            <h1 style="text-align: center;">페이징 처리 없는 그리드</h1>

            <br/>

            <v-btn @click="getGridData" 
            >
                그리드 데이터 조회
            </v-btn>

            <br/>

            <v-data-table
                :headers="dataGridDeaders"
                :items="dataGridDataList"
                hide-default-footer
                class="elevation-1"
            >
            </v-data-table>


    <!-- 그리드 처리 -->

            <h1 style="text-align: center;">페이징 처리 그리드</h1>

            <br/>

            <v-btn @click="readDataFromAPI" 
            >
                그리드 데이터 조회
            </v-btn>

            <br/>
            
            <v-data-table
                :page="page"
                :headers="dataGridDeaders"
                :items="passengers"
                :options.sync="testOptions"
                :server-items-length="totalPassengers"
                :loading="loading"
                class="elevation-1"
                @dblclick:row="dataTabledblClick"
            >
            </v-data-table>


    <!-- 그리드 처리 -->
            <h1 style="text-align: center;"> 그리드 입력 처리 </h1>

            <br/>

            <v-btn @click="readDataFromAPI" 
            >
                그리드 데이터 조회
            </v-btn>

            <br/>
            <v-card
                    v-click-outside="onClickOutside"
            >
                <v-data-table 
                    :headers="testdataGridHeader" 
                    :items="desserts" 
                    :search="testSearch" 
                    class="elevation-1" 
                    fixed-header height="350px"
                    @click:row="editItem"
                    @click="testGridClick"
                >
                    <v-divider inset></v-divider>
                    <template v-slot:top >
                        <v-toolbar flat color="white"
                            @click="close"
                        >
                            <div class="d-flex w-100">
                                <v-text-field v-model="testSearch" append-icon="mdi-magnify" label="Search" dense outlined single-line hide-details></v-text-field>
                                <v-btn
                                    color="primary"
                                    class="ml-2 white--text"
                                    @click="addNew">
                                    Add
                                </v-btn>

                                <v-btn
                                    color="primary"
                                    class="ml-2 white--text"
                                    @click="getEditTableData">
                                    신규 수정정보 조회
                                </v-btn>
                            </div>
                        </v-toolbar>
                    </template>
                    <template v-slot:[`item.name`]="{ item }">
                        <v-text-field v-model="editedItem.name" :hide-details="true" dense single-line v-if="item.$dataGridId === editedItem.$dataGridId"></v-text-field>
                        <span v-else>{{item.name}}</span>
                    </template>
                    <template v-slot:no-data>
                        데이터 없음
                    </template>

                    <template v-slot:[`footer.page-text`] >
                                <v-text-field
                                    ref="gridFooter"
                                    type="hidden"
                                >
                                Button
                            </v-text-field>
                    </template>

                </v-data-table>
                
            </v-card>
        
        </v-app>

    </div>
    
</template>

<script>
import { instanceWithAuth } from '../api/index'
export default {
    data() {
        return {
             responseValues: 'test'
            ,authkey: '0000'
            ,forTest : [
                 {user : 'test1' , age : 20, join : { k1 : 1, k3 :2, k2 :3 }      , list : [11, 22, 33]}
                ,{user : 'test2' , age : 22, join : { k10 : 10, k20 :20, k3 :30 } }
                ,{user : 'test3' , age : 23 , list : [110, 220, 330] }
            ]
            ,isDivOpen : false
            ,openTexts : ['숨겨진중', '보이는중']
            ,openText : '숨겨진중'
            ,imgUrl : '../assets/logo.png'
            ,inVal : ''
            ,urlVal : ''
            ,urlList : ['https://www.naver.com', 'https://www.daum.net/', 'https://www.google.co.kr/']
            ,selCol : { val : 'n', nm : '색없음'}
            ,inAge : 0
            ,colorOptionList : [
                 { val : 'n', nm : '색없음'}
                ,{ val : 'r', nm : '빨간색'}
                ,{ val : 'b', nm : '파란색'}
            ]


            ,dataGridDeaders: [
                { text: 'comments_count', value: 'comments_count'},
                { text: 'domain', value: 'domain'},
                { text: 'id', value: 'id'},
                { text: 'points', value: 'points'},
                { text: 'time', value: 'time'},
                { text: 'time_ago', value: 'time_ago'},
                { text: 'title', value: 'title'},
                { text: 'type', value: 'type'},
                { text: 'url', value: 'url'},
                { text: 'user', value: 'user'}
            ]
            ,dataGridDataList : []
            ,getDataGridUrl: '/api/sample/requestdata'
            ,itemsPerPage : 10 //페이지사이즈
            ,nowPage : 1
            ,pageCount : 0

            ,
            page: 1,
            totalPassengers: 0,
            passengers: [],
            loading: false,
            testOptions: {},
            


            testGridInit : 0,
            testSearch: '',
            testdataGridHeader : [
                { text: 'user', value: 'user'},
                { text: 'name', value: 'name'},
            ],
            desserts : [],
            editedIndex: -1,
            editedItem: {
                $dataGridId: 0,
                user : '',
                name: '',
            },
            defaultItem: {
                $dataGridId: 0,
                user : '',
                name: '초기 세팅값',
            },

      }
    },
    
    watch: {
        testOptions: {
            handler() {
                this.readDataFromAPI();
            },
        },
        deep: true,
    },

    mounted () {
        this.readDataFromAPI()

        var footerarea = this.$refs.gridFooter.$el.parentNode.parentNode

        footerarea.onclick = this.close;

    },
    
    methods: {

        retrieveData () {
            instanceWithAuth.post('/api/sample/requestdata', {page: 1})
            .then(res => {
                console.log('res', res)
                this.responseValues = res
            })
            .catch(e => {
                alert(e.message)
            })
        },
        getAuthkey () {
            this.authkey = this.$getAuth()
        }
        ,showDiv () {
            if(this.isDivOpen){
                this.isDivOpen = false;
                this.openText = this.openTexts[0];
            }else{
                this.isDivOpen = true;
                this.openText = this.openTexts[1];

                // window.location.href = '#HIDE_DIV'
                //document.getElementById("HIDE_DIV").scrollIntoView();
                //this.$refs.showDiv.scrollIntoView(true);
            }

        }
        ,getGridData() {
            
            var param =  { search: 'test', indexer: 99 };
            
            window.instanceWithAuth.post( this.getDataGridUrl, param )
            .then(res => {
                this.dataGridDataList = res.data.data.contents;
            })
            .catch(e => {
                alert(e.message)
            })

        }


        //페이지 처리 
        ,readDataFromAPI () {

            if(!this.loading){

                this.loading = true;
                const { page, itemsPerPage } = this.testOptions;
                
                var sechPage = page
                if(sechPage < 1){
                    sechPage = 1
                }

                var param =  { search: 'test', indexer: 99, 'page' :sechPage, 'itemsPerPage' : itemsPerPage };

                window.instanceWithAuth.post( this.getDataGridUrl, param )
                .then((res) => {
                    //Then injecting the result to datatable parameters.

                    this.passengers = res.data.data.contents;
                    this.totalPassengers = res.data.data.pagination.totalCount
                    this.page = res.data.data.pagination.page
                    
                    this.loading = false;
                });
            }
        }
    // 더블 클릭 이벤트
        ,dataTabledblClick(value){
            console.log(' value ', value)

            let td = event.target;
            
            alert(td.innerHTML);

            let tr = event.target.parentNode;
            tr.classList.add('aaaa');
            
        },





        editItem (item) {
            if(this.desserts.indexOf(item) != this.editedIndex){
                this.close ()
                this.editedIndex = this.desserts.indexOf(item);
                this.editedItem = Object.assign({}, item);
            }
        },

        deleteItem (item) {
            const index = this.desserts.indexOf(item);
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
        },
        close () {
            if (this.editedIndex > -1) {
                this.editedItem.isUpdate = true;
                Object.assign(this.desserts[this.editedIndex], this.editedItem)

                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;

            }
            
        },
        addNew() {
            this.close()
            const addObj = Object.assign({}, this.defaultItem);
            this.testGridInit = this.testGridInit + 1;
            addObj.$dataGridId = this.testGridInit;
            addObj.isNew = true;
            this.desserts.unshift(addObj);
        },
        save () {
            this.close()
        },

        onClickOutside () {
            this.close();
        },

        testGridClick (value){
            console.log(' value ', value)

            let td = Event.target;
            
            alert(td.innerHTML);

            let tr = Event.target.parentNode;
            tr.classList.add('aaaa');
        },

        getEditTableData () {
            var newList = new Array();
            var updateList = new Array();
            if(this.desserts != null && this.desserts.length > 0){
                for( var di = 0 ; di < this.desserts.length ; di++ ){
                    if( this.desserts[di].isNew ){
                        newList.push(this.desserts[di]);
                    }else if( this.desserts[di].isUpdate ){
                        updateList.push(this.desserts[di]);
                    }
                    
                }

                console.log(' newList ', newList)
                console.log(' updateList ', updateList)
            }else {
                alert(' 데이터가 없습니다. ');
            }
        }
            
    }
}
</script>

<style scoped>
    .red {
        color: red;
    }
    .blue {
        color: blue;
    }
</style>
