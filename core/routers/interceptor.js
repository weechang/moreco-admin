define(function (require, exports, module) {
    "use strict";
    // 路由

    let router = require('@/routers/router.js');
    let store = require('@/store/store.js');
    let request = require('@/utils/request.js');
    let domUtil = require("@/utils/domUtil.js");

    const whiteList = ['/login', '/404'];
    const defaultRoutePath = '/index';

    router.beforeEach((to, from, next) => {
        if (to.name != null && to.name !== undefined) {
            domUtil.setDocumentTitle(to.name);
        }
        next();
    });

    router.afterEach((to, from) => {
       let currentMenu = to.fullPath;
       let selectedKeys = [];
       selectedKeys.push(currentMenu);
       store.dispatch('setOpenMenuKeys', ['sub1']);
       store.dispatch('setSelectedMenuKeys', selectedKeys);
    });

});
