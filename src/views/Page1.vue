<template>
    <div>
        <a @click="addData123()">{{temp}}</a>
    
        <grid v-if="gridData.length > 0"
            ref="tuiGrid2"
            :data="gridData"
            :columns="columns"
            :scrollX="scrollX"
            :scrollY="scrollY"
        ></grid>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
  inheritAttrs: false,
  name: "Page1",
  mounted() {
    this.getData();
  },
  data() {
    return {
        temp: '변경전',
        gridData: [],
        columns: [
            {
            header: '이름',
            name: 'name'
            },
            {
            header: '아티스트',
            name: 'artist'
            },
            {
            header: '형태',
            name: 'type'
            },
            {
            header: '출시일',
            name: 'release'
            },
            {
            header: '장르',
            name: 'genre'
            }
        ],
        scrollX: false,
        scrollY: false,
    }
  },
  methods: {
    getData () {
    //   axios.get('/json.json')
    //       .then((res) => {
    //         console.log(res.data);
    //         this.gridData = res.data;
    //       })
        this.gridData = tempData
        // this.gridData = tempData2
    },
    addData123 () {
        // alert('123')
        // this.gridData = null
        console.log('before', this.gridData)
        this.gridData = tempData2
        console.log('after', this.gridData)
        this.temp = '변경후'
    }
  }
}

let tempData2 = [
    {
      "name": "Beautiful Lies",
      "artist": "Birdy",
      "type": "Deluxe",
      "release": "2016.3.26",
      "genre": "Pop",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 5000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    }
]

let tempData = [
    {
      "name": "Beautiful Lies",
      "artist": "Birdy",
      "type": "Deluxe",
      "release": "2016.3.26",
      "genre": "Pop",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 5000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "X",
      "artist": "Ed Sheeran",
      "type": "Deluxe",
      "release": "2014.6.24",
      "genre": "Pop",
      "price": 7000,
      "downloadCount": 1000,
      "listenCount": 5000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "2"
    },
    {
      "name": "Moves Like Jagger",
      "artist": "Maroon5",
      "type": "Single",
      "release": "2011.8.8",
      "genre": "Pop,Rock",
      "price": 25000,
      "downloadCount": 1000,
      "listenCount": 5000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "3"
    },
    {
      "name": "A Head Full Of Dreams",
      "artist": "Coldplay",
      "type": "Deluxe",
      "release": "2015.12.4",
      "genre": "Rock",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "21",
      "artist": "Adele",
      "type": "Deluxe",
      "release": "2011.1.21",
      "genre": "Pop,R&B",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "Warm On A Cold Night",
      "artist": "HONNE",
      "type": "EP",
      "release": "2016.7.22",
      "genre": "R&B,Electronic",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "Take Me To The Alley",
      "artist": "Gregory Porter",
      "type": "Deluxe",
      "release": "2016.9.2",
      "genre": "Jazz",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "Make Out",
      "artist": "LANY",
      "type": "EP",
      "release": "2015.12.11",
      "genre": "Electronic",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "Get Lucky",
      "artist": "Daft Punk",
      "type": "Single",
      "release": "2013.4.23",
      "genre": "Pop,Funk",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "Valtari",
      "artist": "Sigur Rós",
      "type": "EP",
      "release": "2012.5.31",
      "genre": "Rock",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "Bush",
      "artist": "Snoop Dogg",
      "type": "EP",
      "release": "2015.5.12",
      "genre": "Hiphop",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "2",
      "artist": "Beyoncé",
      "type": "Deluxe",
      "release": "2011.7.26",
      "genre": "Pop",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "2"
    },
    {
      "name": "I Won't Give Up",
      "artist": "Jason Mraz",
      "type": "Single",
      "release": "2012.1.3",
      "genre": "Pop",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "Following My Intuition",
      "artist": "Craig David",
      "type": "Deluxe",
      "release": "2016.10.1",
      "genre": "R&B,Electronic",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "Blue Skies",
      "artist": "Lenka",
      "type": "Single",
      "release": "2015.3.18",
      "genre": "Pop,Rock",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "This Is Acting",
      "artist": "Sia",
      "type": "EP",
      "release": "2016.10.22",
      "genre": "Pop",
      "price": 1000,
      "downloadCount": 1000,
      "listenCount": 1000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "Blurryface",
      "artist": "Twenty One Pilots",
      "type": "EP",
      "release": "2015.5.19",
      "genre": "Rock",
      "price": 13000,
      "downloadCount": 1000,
      "listenCount": 5000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "1"
    },
    {
      "name": "I'm Not The Only One",
      "artist": "Sam Smith",
      "type": "Single",
      "release": "2014.9.15",
      "genre": "Pop,R&B",
      "price": 8000,
      "downloadCount": 1000,
      "listenCount": 5000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "2"
    },
    {
      "name": "The Magic Whip",
      "artist": "Blur",
      "type": "EP",
      "release": "2015.4.27",
      "genre": "Rock",
      "price": 15000,
      "downloadCount": 1000,
      "listenCount": 5000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "3"
    },
    {
      "name": "Chaos And The Calm",
      "artist": "James Bay",
      "type": "EP",
      "release": "2015.3.23",
      "genre": "Pop,Rock",
      "price": 12000,
      "downloadCount": 1000,
      "listenCount": 5000,
      "genreCode": "1",
      "typeCode": "1",
      "grade": "3"
    }
  ]
</script>