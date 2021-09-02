<template>
    <div>
        <a @click="getData()">{{temp}}</a>
    
        <grid 
            ref="tuiGrid"
            :data="gridPros.gridData"
            :columns="gridPros.columns"
            :scrollX="gridPros.scrollX"
            :scrollY="gridPros.scrollY"
        ></grid>
    </div>
</template>

<script>
import axios from 'axios'

// const url = 'https://api.hnpwa.com/v0/news/1.json'

const dataSource = {
    api: {
        readData: {url: 'https://api.hnpwa.com/v0/news/1.json', methods: 'GET'}
    }
}

export default {
  inheritAttrs: false,
  name: "Page1",
  
  created() {
    // this.getData();

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
        data: dataSource,
        scrollX: false,
        scrollY: false,
    }

  },
  data() {
    return {
        temp: '변경전',
        gridPros: null
    }
  },
  methods: {
    getData () {
      axios.get('https://api.hnpwa.com/v0/news/1.json')
          .then((res) => {
            // console.log(res.data);
            this.gridData = res.data;
          })
          this.$refs.tuiGrid.invoke('readData', 1, null, true)
    },
    addData123 () {
        // console.log('before', this.gridData)
        // console.log('after', this.gridData)
        // this.temp = '변경후'
        let params = {
            a: 'test',
            b: 'text'
        }
        this.$refs.tuiGrid.invoke('readData', 1, params, true)
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