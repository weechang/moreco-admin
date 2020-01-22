define(function (require, exports, module) {
    "use strict";

    require('npm/enquire.js@2.1.6/dist/enquire.min.js');

    let CONSTANT = require('@/store/constant.js');
    let store = require('@/store/store.js');

    let deviceEnquire = function (callback) {
        let matchDesktop = {
            match: () => {
                callback && callback(CONSTANT.DESKTOP);
            }
        };

        let matchLablet = {
            match: () => {
                callback && callback(CONSTANT.TABLET);
            }
        };

        let matchMobile = {
            match: () => {
                callback && callback(CONSTANT.MOBILE);
            }
        };

        enquire
            .register('screen and (max-width: 576px)', matchMobile)
            .register('screen and (min-width: 576px) and (max-width: 1199px)', matchLablet)
            .register('screen and (min-width: 1200px)', matchDesktop)
    };

    deviceEnquire(deviceType => {
        switch (deviceType) {
            case CONSTANT.DESKTOP:
                store.commit('TOGGLE_DEVICE', CONSTANT.DESKTOP);
                break;
            case CONSTANT.TABLET:
                store.commit('TOGGLE_DEVICE', CONSTANT.TABLET);
                break;
            case CONSTANT.MOBILE:
                store.commit('TOGGLE_DEVICE', CONSTANT.MOBILE);
            default:
                store.commit('TOGGLE_DEVICE', CONSTANT.MOBILE);
                break;
        }
    });

    module.exports = deviceEnquire;
});

