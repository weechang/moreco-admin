define(function (require, exports, module) {
    "use strict";
    // Vuex

    require('npm/vuex@3.1.2/dist/vuex.js');

    let app = require('@/store/modules/app.js');
    let user = require('@/store/modules/user.js');
    let getters = require('@/store/getters.js');

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
