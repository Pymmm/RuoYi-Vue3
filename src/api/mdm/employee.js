import request from '@/utils/request'

// 查询员工管理列表
export function listEmployee(query) {
    return request({
        url: '/mdm/employee/list',
        method: 'get',
        params: query
    })
}

// 查询员工管理详细
export function getEmployee(employeeCode) {
    return request({
        url: '/mdm/employee/' + employeeCode,
        method: 'get'
    })
}

// 新增员工管理
export function addEmployee(data) {
    return request({
        url: '/mdm/employee',
        method: 'post',
        data: data
    })
}

// 修改员工管理
export function updateEmployee(data) {
    return request({
        url: '/mdm/employee',
        method: 'put',
        data: data
    })
}

// 删除员工管理
export function delEmployee(employeeCode) {
    return request({
        url: '/mdm/employee/' + employeeCode,
        method: 'delete'
    })
}
