define(function (require, exports, module) {
    "use strict";

    let axios = require('@/utils/request').service;

    let base = 'moreco/upms/resource/';

    let api = {
        toPage: base + 'toPage',
        page: base,
        detail: base,
        saveOrUpdate: base,
        delRow: base
    };

    /*** 目录树 */
    let menuTree = function () {
        return axios({
            url: api.toPage,
            method: 'get'
        })
    };

    /*** 页面组件 */
    let component = function (menuId) {
        return axios({
            url: api.page,
            method: 'get'
        })
    };

    module.exports = {
        menuTree: menuTree,
        component: component
    };
});
