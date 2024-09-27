import request from '../request'

export function updateInfoApi(data: object) {
    return request({
        url: 'api/user/update',
        data,
        method: 'put',
    })
}

export function updatePwdApi(data: object) {
    return request({
        url: 'api/user/changePassword',
        data,
        method: 'put',
    })
}

export function sendEmailApi(email: string, type: number) {
    return request({
        url: 'api/user/sendEmail',
        method: 'get',
        params: {
            email,
            type,
        },
    })
}
export function verifyCodeApi(code: string,) {
    return request({
        url: 'api/user/verifyCode',
        params: {
            code
        },
        method: 'get',
    })
}

export function updateEmailApi(email: string, code: string,) {
    return request({
        url: 'api/user/updateEmail',
        data: {
            email,
            code
        },
        method: 'put',
    })
}