define(function (require, exports, module) {
    "use strict";
    // 路由

    let fullLayout = httpVueLoader('core/layouts/fullLayout.vue');
    let blankLayout = httpVueLoader('core/layouts/blankLayout.vue');
    let pageLayout = httpVueLoader('core/layouts/pageLayout.vue');

    let asyncRouterMap = [
        {
            path: '/demo/views/dashboard',
            component: blankLayout,
            children: [
                {
                    meta: {
                        menuItem: true
                    },
                    path: 'analysis',
                    name: '数据分析',
                    component: httpVueLoader('demo/views/dashboard/analysis.vue')
                }
            ]
        },
        {
            path: '/upms/views/app',
            component: pageLayout,
            children: [
                {
                    meta: {
                        menuItem: true
                    },
                    path: 'list',
                    name: '应用管理',
                    component: httpVueLoader('upms/views/app/list.vue')
                }
            ]
        },
        {
            path: '/upms/views/resource',
            component: pageLayout,
            children: [
                {
                    meta: {
                        menuItem: true
                    },
                    path: 'list',
                    name: '资源管理',
                    component: httpVueLoader('upms/views/resource/list.vue')
                }
            ]
        },
        {
            path: '/upms/views/role',
            component: pageLayout,
            children: [
                {
                    meta: {
                        menuItem: true
                    },
                    path: 'list',
                    name: '角色管理',
                    component: httpVueLoader('upms/views/role/list.vue')
                }
            ]
        },
        {
            path: '/upms/views/user',
            component: pageLayout,
            children: [
                {
                    meta: {
                        menuItem: true
                    },
                    path: 'list',
                    name: '用户管理',
                    component: httpVueLoader('upms/views/user/list.vue')
                }
            ]
        }
    ];

    module.exports = asyncRouterMap;
});
