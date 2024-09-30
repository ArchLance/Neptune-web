import request from '../request'
export function addPocApi(data: object) {
    return request({
        url: 'api/poc/create',
        method: 'post',
        data
    })
}
export function updatePocApi(data: object) {
    return request({
        url: 'api/poc/update',
        method: 'put',
        data
    })
}

export function filterPocApi(data: object) {
    return request({
        url: 'api/poc/',
        method: 'get',
        params: data,
    })
}

export function deletePocApi(id: number) {
    return request({
        url: 'api/poc/',
        method: 'delete',
        params: {
            id,
        },
    })
}