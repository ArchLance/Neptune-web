import request from '../request'
export function loginApi(data: object) {
    return request({
        url: 'user/login',
        method: 'post',
        data
    })
}

// 退出系统
export function loginOutApi() {
    return request({
        url: 'loginOut'
    })
}