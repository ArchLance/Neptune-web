import request from '../request'

export function updateInfoApi(data: object, token: string) {
    return request({
        url: 'api/user/update',
        data,
        method: 'post',
        headers: {
            Authorization: token
        }
    })
}

export function updatePwdApi(data: object, token: string) {
    return request({
        url: 'api/user/changePassword',
        data,
        method: 'post',
        headers: {
            Authorization: token
        }
    })
}