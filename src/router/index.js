import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/page1'
        },
        {
            path: '/page1',
            name: 'page1',
            component: () => import('../views/Page1')
        },
        {
            path: '/page2',
            name: 'page2',
            component: () => import('../views/Page2')
        },
        {
            path: '/page3',
            name: 'page3',
            component: () => import('../views/Page3')
        }
    ]
})