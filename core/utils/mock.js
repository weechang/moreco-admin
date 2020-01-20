define(function (require, exports, module) {
    "use strict";

    require('npm/mockjs@1.1.0/dist/mock.min.js');

    const Rst = {
        "success": true,
        "app": null,
        "code": 0,
        "msg": null,
        "data": null
    };

    // 成功
    const ok = (data, headers = {}) => {
        Rst.data = data;
        if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
            Rst._headers = headers
        }
        return Rst
    };

    // 失败
    const fail = (code, msg, headers = {}) => {
        Rst.success = false;
        Rst.code = code;
        if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
            Rst._headers = headers
        }
        return Rst
    };

    // 获取URL参数
    const getParameters = (options) => {
        const url = options.url;
        const search = url.split('?')[1];
        if (!search) {
            return {}
        }
        return JSON.parse('{"' + decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') + '"}');
    };

    // 获取body
    const getBody = (options) => {
        return options.body && JSON.parse(options.body)
    };

    module.exports = {
        ok: ok,
        fail: fail,
        getParameters: getParameters,
        getBody: getBody
    };
});
