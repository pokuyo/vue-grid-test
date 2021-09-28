<template>

    <div>
        <!-- 보이기 숨기기 -->
        <template v-if="isDivOpen  == true"> <!-- 빈 껍데기 -->

            <!-- for -->
            <div v-for="(user, ui) in forTest" :key="user">
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
                <template v-for="(lVal, li) in user.list" >
                    
                    <template v-if="li  == 0">
                       // LIST = 
                    </template>
                    {{ li }} - {{ lVal }} 
                    <template v-if="li != user.list.length - 1">
                        ,
                    </template>
                </template>
                
            </div>
        </template>
        <input type="text" v-model="inVal" /> / 입력값 : {{ inVal }}

        <br/>
        <br/>

        주소 
        <!-- 값에 따라 화면 처리 -->
        <select v v-model="urlVal">
            <option v-for="urlkey in urlList" :key="urlkey">{{ urlkey }}</option>
        </select>
        <a :href="urlVal" target="_blank" >{{ urlVal }}</a>

        <br/>
        <br/>
        <!-- class 처리 -->
         <select v-model="selCol">
            <option v-for="colorOption in colorOptionList" :key="colorOption" :value="colorOption.val" >{{ colorOption.nm }}</option>
        </select>
        <h2 :class="{ red : selCol === 'r' , blue : selCol === 'b'}" >색상</h2>
        
        <br/>
        <br/>
        
        <!-- if else -->
        <input type="number" v-model="inAge"  /> 살
        <h3 v-if="inAge >= 20"> 20대 이상</h3>
        <h3 v-else-if="inAge < 20 && inAge >= 10"> 10대</h3>
        <h3 v-else > 10대미만 </h3>

        <br/>
        <br/>

        <p>data: {{responseValues}}</p>
        <button @click="retrieveData">test</button>
        <p>data: {{authkey}}</p>
        <button @click="getAuthkey">test</button>
        <p> {{ openText }} </p>
        <button @click="showDiv">test</button>
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
            ,openTexts : ['보이기', '숨기기']
            ,openText : '보이기'
            ,imgUrl : '../assets/logo.png'
            ,inVal : ''
            ,urlVal : ''
            ,urlList : ['https://www.naver.com', 'https://www.daum.net/', 'https://www.google.co.kr/']
            ,selCol : ''
            ,inAge : 0
            ,colorOptionList : [
                 { val : 'n', nm : '색없음'}
                ,{ val : 'r', nm : '빨간색'}
                ,{ val : 'b', nm : '파란색'}
            ]
      }
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
