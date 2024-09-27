import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000,
    // 跨域时候允许携带凭证
    withCredentials: true
})
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 确保 config 和 config.headers 存在
        if (config && config.headers) {
            // 获取userStore
            const userStoreString = localStorage.getItem('userState')

            if (userStoreString) {
                try {
                    const userStore = JSON.parse(userStoreString)
                    const token = userStore.token // 假设token是userStore对象的一个字段

                    // 如果请求不是登录请求，且token存在，则添加到请求头
                    if (config.url !== 'api/user/login' && token) {
                        config.headers['Authorization'] = `${token}`
                    }
                } catch (error) {
                    console.error('Error parsing userStore:', error)
                }
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default service 