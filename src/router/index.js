import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

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

// 인증 필요 페이지 처리 (router.beforeEach)
router.beforeEach((to, from, next) => {
    if (to.meta.auth && !store.getter.isLogin) {
        console.log('required auth')
        next('/page2')
        return
    }

    // 특정페이지에서 뒤로가기 선택시 redirect
    // if (from.path == '/cart' && to.path == '/my-menu/detail') {
	// 	next('/my-menu');
	// 	return;
	// }

    // if문마다 next(); return; 처리 해주고 마지막에 next() 해줘야 함
    next()
})