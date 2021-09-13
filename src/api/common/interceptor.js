// import store from '@/store/index';
const storage = window.sessionStorage;
const prefix = 'Bearer '

export function setInterceptor(instance) {
    instance.interceptors.request.use (
        function (config) {
            // config.headers.Authorization = store.state.token
            
            config.headers.Authorization = prefix + storage.getItem('authorization')
            console.log('▶ interceptor config', config)
            return config
        },
        function (error) {
            return Promise.reject(error)
        }
    )
    
    // add additional interceptor
    // instance.interceptors.request.use (
    //     function (config) {
    //         config.headers.Authorization = store.state.token
    //         return config
    //     },
    //     function (error) {
    //         return Promise.reject(error)
    //     }
    // )
    return instance
}