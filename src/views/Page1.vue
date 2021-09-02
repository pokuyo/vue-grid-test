<template>
    <div>
        <a @click="getData()">{{temp}}</a>
    
        <grid 
            ref="testGrid"
            :data="gridPros.gridData"
            :columns="gridPros.columns"
            :options="gridPros.options"
            :scrollX="gridPros.scrollX"
            :scrollY="gridPros.scrollY"
        ></grid>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios

// const url = 'V1/js/json.json'

// const dataSource = {
//     contentType: 'application/json',
//     api: {
//         readData: {url, methods: 'GET'},
//         initialRequest: false
//     }
// }

export default {
    inheritAttrs: false,
    name: "Page1",
    data() {
        return {
            temp: '변경전',
            gridPros: null
        }
  } ,
  created() {
    this.gridPros = {
        gridData: [],
        columns: [
            { header: 'comments_count', name: 'comments_count' },
            { header: 'domain', name: 'domain' },
            { header: 'id', name: 'id' },
            { header: 'points', name: 'points' },
            { header: 'time', name: 'time' },
            { header: 'time_ago', name: 'time_ago' },
            { header: 'title', name: 'title' },
            { header: 'type', name: 'type' },
            { header: 'url', name: 'url' },
            { header: 'user', name: 'user' },
        ],
        // data: dataSource,
        // scrollX: false,
        // scrollY: false,
        options: {
            pageOptions: {
                perPage: 10
            }
        }
    }
  },
  methods: {
    getData () {
        // axios.get('http://localhost:4000/js/json.json', {
        //     crossDomain: true
        // })
        // .then((res) => {
        // console.log(res.data);
        // // this.gridData = res.data;
        // })
        // let params = {
        //     'a': 'test',
        //     'b': 'text'
        // }
        // this.$refs.tuiGrid2.invoke('readData', 1, params, true)

        this.$http.get('V1/js/json2.json').then((res) => {
            console.log(res.data);
            const _grid = this.$refs.testGrid.gridInstance
            _grid.resetData(res.data);
            // this.$refs.testGrid.gridInstance.resetData(res.data);
            // this.$refs.tuiGrid.gridInstance.clear();
            // this.$refs.tuiGrid.gridInstance.appendRows(res.data);
        })
    }
  }
}

// let tempData2 = [
//     {
//       "name": "Beautiful Lies",
//       "artist": "Birdy",
//       "type": "Deluxe",
//       "release": "2016.3.26",
//       "genre": "Pop",
//       "price": 1000,
//       "downloadCount": 1000,
//       "listenCount": 5000,
//       "genreCode": "1",
//       "typeCode": "1",
//       "grade": "1"
//     }
// ]

// let tempData = [
//     {
//       "name": "Beautiful Lies",
//       "artist": "Birdy",
//       "type": "Deluxe",
//       "release": "2016.3.26",
//       "genre": "Pop",
//       "price": 1000,
//       "downloadCount": 1000,
//       "listenCount": 5000,
//       "genreCode": "1",
//       "typeCode": "1",
//       "grade": "1"
//     },
//     {
//       "name": "X",
//       "artist": "Ed Sheeran",
//       "type": "Deluxe",
//       "release": "2014.6.24",
//       "genre": "Pop",
//       "price": 7000,
//       "downloadCount": 1000,
//       "listenCount": 5000,
//       "genreCode": "1",
//       "typeCode": "1",
//       "grade": "2"
//     },
//     {
//       "name": "Moves Like Jagger",
//       "artist": "Maroon5",
//       "type": "Single",
//       "release": "2011.8.8",
//       "genre": "Pop,Rock",
//       "price": 25000,
//       "downloadCount": 1000,
//       "listenCount": 5000,
//       "genreCode": "1",
//       "typeCode": "1",
//       "grade": "3"
//     },
//   ]
</script>