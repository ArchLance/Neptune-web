import request from '../request'
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