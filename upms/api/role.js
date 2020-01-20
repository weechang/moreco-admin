define(function (require, exports, module) {
    "use strict";

    let axios = require('@/utils/request').service;

    let base = 'moreco/upms/role/';

    let api = {
        page: base,
        detail: base,
        saveOrUpdate: base,
        delRow: base,
        list: base + 'list'
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

    /*** 删除 */
    let list = function () {
        return axios({
            url: api.list,
            method: 'get',
        })
    };

    module.exports = {
        page: page,
        detail: detail,
        saveOrUpdate: saveOrUpdate,
        delRow: delRow,
        list: list
    };
});
