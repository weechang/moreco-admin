define(function (require, exports, module) {
    "use strict";
    // 主页面

    require('npm/http-vue-loader@1.4.1/src/httpVueLoader.js');
    require('npm/vconsole@3.3.4/dist/vconsole.min.js');
    require('npm/vue-dash-event@1.0.1/dist/index.min.js');
    Vue.use(window['vue-dash-event']);
    require('@/utils/device');
    require('@/routers/interceptor');

    let request = require('@/utils/request');
    Vue.use(request.installer);

    let router = require('@/routers/router');
    let store = require('@/store/store');
    const { LocaleProvider, locales } = window.antd;

    new Vue({
        router,
        store,
        el: '#app',
        data: {
            LocaleProvider: LocaleProvider,
            locales: locales
        }
    });
});

