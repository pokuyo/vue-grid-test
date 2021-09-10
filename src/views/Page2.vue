<template>
    <div>
        <label for="email">email</label>
        <input type="email" name="email" id="email" v-model="email" />
        <label for="pass">password</label>
        <input type="password" name="password" id="pass" v-model="password" />
        <input type="submit" value="login" id="login" @click="login" />
        <hr />
        <span>
            사용자정보<span>{{message}}</span>
        </span>
        <hr />
        <button id="getInfo" @click="getInfo">getInfo</button>
        <button id="logout" @click="logOut">logout</button>
        <hr />
        <table>
            <tr>
                <th>상태</th><td id="status">{{status}}</td>
            </tr>
            <tr>
                <th>토큰</th><td id="token">{{token}}</td>
            </tr>
            <tr>
                <th>정보</th><td id="info">{{info}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
const storage = window.sessionStorage;

// import axios from 'axios'

export default {
    data () {
        return {
            email: '',
            password: '',
            message: 'please login',
            status: '',
            token: '',
            info: ''
        }
    },
    methods: {
        setInfo (status, token, info) {
            this.status = status
            this.token = token
            this.info = info
        },
        logOut () {
            storage.setItem('jwt-auth-token', '')
            storage.setItem('login_user', '')
            this.message = 'please login'
            this.setInfo('success logout', '', '')
        },
        getInfo () {
            this.$axios.post(
                '/api/info',
                {
                    email: 'some@email.com',
                    password: 'somepassword'
                },
                {
                    headers: {
                        'jwt-auth-token': storage.getItem('jwt-auth-token')
                    }
                }
            )
            .then(res => {
                this.setInfo('success getInfo', res.headers.auth_token, JSON.stringify(res.data))
            })
            .catch(e => {
                this.setInfo('fail getInfo', '', e.response.data.message)
            })
        },
        login () {
            storage.setItem('authorization', '')
            storage.setItem('login_user', '')
            this.$axios.post('/api/user/signin', { usr_id: this.email, usr_pw: this.password }, {
                headers: {
                    Authorization: ''
                }
            })
            .then(res => {
                console.log(res)
                if (res.data.status) {
                    this.message = res.data.data.email + '로 로그인 되었습니다.'
                    console.dir(res.headers['authorization'])
                    this.setInfo('성공', res.headers['authorization'], JSON.stringify(res.data.data))
                    storage.setItem('authorization', res.headers['authorization'])
                    storage.setItem('login_user', res.data.data.email)
                } else {
                    this.setInfo('', '', '')
                    this.message = '로그인해주세요'
                    alert('입력정보 확인')
                }
            })
            .catch(e => {
                this.setInfo('실패', '', JSON.stringify(e.response || e.message))
            })
        },
        init () {
            if (storage.getItem('jwt-auth-token')) {
                this.message = storage.getItem('login_user') + '로 로그인 되었습니다.'
            } else {
                storage.setItem('jwt-auth-token', '')
            }
        }
    },
    mounted () {
        this.init()
    }
}
</script>
