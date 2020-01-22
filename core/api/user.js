define(function (require, exports, module) {
    "use strict";

    let axios = require('@/utils/request.js').service;

    let base = '/';

    let api = {
        login: base + 'login',
        logout: base + 'logout',
        current: base + 'moreco/upms/user/current'
    };

    /*** 登入 */
    let login = function (username, password) {
        let data = {
            username: username,
            password: password
        };
        return axios({
            url: api.login,
            method: 'post',
            data: data
        })
    };

    /*** 登出 */
    let logout = function () {
        return axios({
            url: api.logout,
            method: 'get'
        })
    };

    /*** 获取用户信息 */
    let current = function () {
        return axios({
            url: api.current,
            method: 'get'
        })
    };

    module.exports = {
        login: login,
        logout: logout,
        current: current
    };
});
