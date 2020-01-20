define(function (require, exports, module) {
    "use strict";

    require('npm/axios@0.19.0/dist/axios.js');

    const VueAxios = {
        vm: {},
        install(Vue, instance) {
            if (this.installed) {
                return;
            }
            this.installed = true;

            if (!instance) {
                console.error('You have to install axios');
                return;
            }

            Vue.axios = instance;

            Object.defineProperties(Vue.prototype, {
                axios: {
                    get: function get() {
                        return instance;
                    }
                },
                $http: {
                    get: function get() {
                        return instance;
                    }
                }
            });
        }
    };

    module.exports = VueAxios;
});
