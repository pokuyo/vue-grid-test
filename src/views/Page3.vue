<template>
    <div>
        <p>data: {{responseValues}}</p>
        <button @click="retrieveData">test</button>
        <p>data: {{authkey}}</p>
        <button @click="getAuthkey">test</button>
    </div>
</template>

<script>
import { instanceWithAuth } from '../api/index'
export default {
    data() {
        return {
            responseValues: 'test',
            authkey: '0000'
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
    }
}
</script>
