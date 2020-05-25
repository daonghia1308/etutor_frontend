import request from './request'

export default {
    login: (data) => {
        return request('/api/auth/login', data, 'POST')
    },
    getUsers: (data) => {
        return request('/api/user/get-user', data, 'POST')
    },
    editUser: (data) => {
        return request('/api/user/update-user', data, 'PATCH')
    },
    deleteUser: (data) => {
        return request('/api/user/delete', data, 'POST')
    },
    createUser: (data) => {
        return request('/api/user/create', data, 'POST')
    },
    getUserDetail: (data) => {
        return request('/api/user/get-user-detail', data, 'POST')
    },
    getAction: (data) => {
        return request('/api/user/get-action-log', data, 'POST')
    },
    getClass: (data) => {
        return request('/api/class/find', data, 'POST')
    },
    editClass: (data) => {
        return request('/api/class/update', data, 'PATCH')
    },
    deleteClass: (data) => {
        return request('/api/class/delete', data, 'POST')
    },
    createClass: (data) => {
        return request('/api/class/create', data, 'POST')
    },
    getMess: (data) => {
        return request("/api/meeting/get-mess", data, "POST")
    },
    getRoles: (data) => {
        return request("/api/role/find", data , "POST")
    },
    createPost: (data) => {
        return request("/api/class/create-post", data, "POST")
    },
    createComment: (data) => {
        return request("/api/class/create-comment", data, "POST")
    },
    getClassDetail: (data) => {
        return request("/api/class/get-class-detail", data, "POST")
    },
    getListClass: (data) => {
        return request("/api/user/get-class", data, "POST")
    },
    upload: (data) => {
        return request("/api/file/upload", data, "POST")
    },
    createMeeting: (data) => {
        return request("/api/user/create-meeting", data, "POST")
    },
    getMeeting: (data) => {
        return request("/api/user/get-meeting", data, "POST")
    },
    getTotalUser: (data) => {
        return request("/api/statistic", data, "GET")
    }
}