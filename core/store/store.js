define(function (require, exports, module) {
    "use strict";
    // Vuex

    require('npm/vuex@3.1.2/dist/vuex.js');

    let app = require('@/store/modules/app');
    let user = require('@/store/modules/user');
    let getters = require('@/store/getters');

    const store = new Vuex.Store({
        modules: {
            app,
            user
        },
        state: {},
        mutations: {},
        actions: {},
        getters
    });

    module.exports = store;
});
