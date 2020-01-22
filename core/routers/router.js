define(function (require, exports, module) {
    "use strict";
    // 路由

    require('npm/vue-router@2.3.1/dist/vue-router.js');

    let fullLayout = httpVueLoader('core/layouts/fullLayout.vue');
    let blankLayout = httpVueLoader('core/layouts/blankLayout.vue');
    let pageLayout = httpVueLoader('core/layouts/pageLayout.vue');
    let asyncRouterMap = require("@/routers/async.js");

    let basicRouterMap = [
        {
            path: '/',
            component: blankLayout,
            redirect: '/index',
            children: [
                {
                    path: 'index',
                    name: '首页',
                    component: httpVueLoader('core/views/index/index.vue')
                },
            ]
        },
        {
            path: '/',
            component: fullLayout,
            children: [
                {
                    path: 'login',
                    name: '用户登录',
                    component: httpVueLoader('core/views/user/login.vue')
                }
            ]
        }
    ];

    const router = new VueRouter({
        routes: basicRouterMap.concat(asyncRouterMap)
    });

    module.exports = router;
});
