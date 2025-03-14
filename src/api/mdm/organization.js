import request from '@/utils/request'

// 查询组织管理列表
export function listOrganization(query) {
    return request({
        url: '/mdm/organization/list',
        method: 'get',
        params: query
    })
}

// 查询组织管理详细
export function getOrganization(id) {
    return request({
        url: '/mdm/organization/' + id,
        method: 'get'
    })
}

// 新增组织管理
export function addOrganization(data) {
    return request({
        url: '/mdm/organization',
        method: 'post',
        data: data
    })
}

// 修改组织管理
export function updateOrganization(data) {
    return request({
        url: '/mdm/organization',
        method: 'put',
        data: data
    })
}

// 删除组织管理
export function delOrganization(id) {
    return request({
        url: '/mdm/organization/' + id,
        method: 'delete'
    })
}
