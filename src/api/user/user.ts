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

export function sendEmailApi(email: string, token: string) {
    return request({
        url: 'api/user/sendEmail',
        params: {
            email
        },
        method: 'get',
        headers: {
            Authorization: token
        }
    })
}
export function verifyCodeApi(email: string, code: string, token: string) {
    return request({
        url: 'api/user/verifyCode',
        params: {
            email,
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
        params: {
            email,
            code
        },
        method: 'put',
        headers: {
            Authorization: token
        }
    })
}