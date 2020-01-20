define(function (require, exports, module) {
    "use strict";
    // getters
    let local = require('@/utils/localStorage');
    let CONSTANT = require('@/store/constant');

    const getters = {
        foldMenu: state => state.app.foldMenu,
        device: state => state.app.device,
        openMenuKeys: state => state.app.openMenuKeys,
        selectedMenuKeys: state => state.app.selectedMenuKeys,
        theme: state => state.app.theme,
        color: state => state.app.color,
        token: state => state.user.token,
        avatar: state => {
            let avatar = state.user.avatar;
            if (avatar == null || avatar === undefined || avatar === '') {
                avatar = local.get(CONSTANT.AVATAR);
            }
            return avatar;
        },
        nickname: state => {
            let nickname = state.user.name;
            if (nickname == null || nickname === undefined || nickname === '') {
                nickname = local.get(CONSTANT.NICKNAME);
            }
            return nickname;
        },
        welcome: state => state.user.welcome,
        roles: state => state.user.roles,
        userInfo: state => {
            let userInfo = state.user.info;
            if (userInfo == null || userInfo === undefined || userInfo === {}) {
                userInfo = local.get(CONSTANT.USER_INFO);
            }
            return userInfo;
        },
        addRouters: state => state.permission.addRouters,
        multiTab: state => state.app.multiTab,
        lang: state => state.i18n.lang
    };

    module.exports = getters;
});
