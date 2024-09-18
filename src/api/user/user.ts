import request from '../request'

export function updateInfoApi(data: object, token: string) {
    return request({
        url: 'api/user/update',
        data,
        method: 'put',
        headers: {
            Authorization: token
        }
    })
}

export function updatePwdApi(data: object, token: string) {
    return request({
        url: 'api/user/changePassword',
        data,
        method: 'put',
        headers: {
            Authorization: token
        }
    })
}

export function sendEmailApi(email: string, type: number, token: string) {
    return request({
        url: 'api/user/sendEmail',
        method: 'get',
        params: {
            email,
            type,
        },
        headers: {
            Authorization: token
        }
    })
}
export function verifyCodeApi(code: string, token: string) {
    return request({
        url: 'api/user/verifyCode',
        params: {
            code
        },
        method: 'get',
        headers: {
            Authorization: token
        }
    })
}

export function updateEmailApi(email: string, code: string, token: string) {
    return request({
        url: 'api/user/updateEmail',
        data: {
            email,
            code
        },
        method: 'put',
        headers: {
            Authorization: token
        }
    })
}