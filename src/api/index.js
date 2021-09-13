import axios from "axios";
import { setInterceptor } from "./common/interceptor";

// API 호출시
function createInstance() {
    const instance = axios.create()
    return instance;
}
export const instance = createInstance()

// 인증API 호출시
function createInstanceWithAuth() {
    const instance = axios.create()
    return setInterceptor(instance)
}
export const instanceWithAuth = createInstanceWithAuth()
