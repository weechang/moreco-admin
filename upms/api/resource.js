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

    /*** 管理页初始化 */
    let toPage = function () {
        return axios({
            url: api.toPage,
            method: 'get'
        })
    };

    /*** 表格数据查询 */
    let page = function (queryParam, pageParam) {
        for(let i in pageParam){
            queryParam[i] = pageParam[i];
        }
        return axios({
            url: api.page,
            method: 'get',
            params: queryParam
        })
    };

    /*** 新增&编辑 */
    let detail = function (id) {
        return axios({
            url: api.detail + id,
            method: 'get'
        })
    };

    /*** 新增&编辑 */
    let saveOrUpdate = function (obj) {
        return axios({
            url: api.saveOrUpdate,
            method: 'post',
            data: obj
        })
    };

    /*** 删除 */
    let delRow = function (id) {
        return axios({
            url: api.delRow + id,
            method: 'delete',
        })
    };


    module.exports = {
        toPage: toPage,
        page: page,
        detail: detail,
        saveOrUpdate: saveOrUpdate,
        delRow: delRow
    };
});
