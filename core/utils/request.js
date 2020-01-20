define(function (require, exports, module) {
    "use strict";

    let CONSTANT = require('@/store/constant');
    let local = require('@/utils/localStorage');
    let store = require('@/store/store');
    let _axios = require('@/utils/axios');
    require("https://cdn.bootcss.com/qs/6.7.0/qs.min.js");

    // 创建 axios 实例
    const service = axios.create({
        baseURL: 'http://localhost:8888/', // api base_url
        timeout: 30000 // 请求超时时间
    });

    const err = (error) => {
        if (error.response) {
            const data = error.response.data;
            const token = local.get(CONSTANT.ACCESS_TOKEN);
            if (error.response.status === 403) {
                this.$notification.error({
                    message: '无权访问',
                    description: data.message
                });
            }
            if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
                this.$notification.error({
                    message: '未登录',
                    description: '验证登录信息失败'
                });
                if (token) {
                    store.dispatch('Logout').then(() => {
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500)
                    });
                }
            }
        }
        return Promise.reject(error);
    };

    // 请求拦截
    service.interceptors.request.use(req => {
        // 设置token
        const token = local.get(CONSTANT.ACCESS_TOKEN);
        if (token) {
            req.headers['MORECO_TOKEN'] = token;
        }
        if (req.url === '/login' && req.data != null) {
            req.data = Qs.stringify(req.data);
        }
        // 改变delete & put
        // let _method = config.method.toLowerCase();
        // if (_method === 'delete' || _method === 'put') {
        //     config.method = "post";
        //     config.params = { '_method': _method };
        // }
        return req;
    }, err);

    // 返回拦截
    service.interceptors.response.use((res) => {
        let headers = res.headers;
        let token = headers.moreco_token;
        if (token != null && token !== undefined) {
            local.set(CONSTANT.ACCESS_TOKEN, token);
        }
        if (res.data.code === 401) {
            window.location.href = 'http://localhost:63343/MorecoAdminPlus/#/login'
        }
        return res.data;
    }, err);

    const installer = {
        vm: {},
        install(Vue) {
            Vue.use(_axios, service);
        }
    };

    module.exports = {
        installer: installer,
        service: service
    };
});
