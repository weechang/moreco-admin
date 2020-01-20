define(function (require, exports, module) {
    "use strict";
    // constant

    /**
     * vuex 用到的常量
     */
    const constant = {
        ACCESS_TOKEN: 'Access-Token',
        SIDEBAR_TYPE: 'SIDEBAR_TYPE',
        FOLD_MENU: 'FOLD_MENU',
        OPEN_MENU_KEYS: 'OPEN_MENU_KEYS',
        SELECTED_MENU_KEYS: 'SELECTED_MENU_KEYS',
        DEFAULT_THEME: 'DEFAULT_THEME',
        DEFAULT_LAYOUT_MODE: 'DEFAULT_LAYOUT_MODE',
        DEFAULT_COLOR: 'DEFAULT_COLOR',
        DEFAULT_COLOR_WEAK: 'DEFAULT_COLOR_WEAK',
        DEFAULT_FIXED_HEADER: 'DEFAULT_FIXED_HEADER',
        DEFAULT_FIXED_SIDEMENU: 'DEFAULT_FIXED_SIDEMENU',
        DEFAULT_FIXED_HEADER_HIDDEN: 'DEFAULT_FIXED_HEADER_HIDDEN',
        DEFAULT_CONTENT_WIDTH_TYPE: 'DEFAULT_CONTENT_WIDTH_TYPE',
        DEFAULT_MULTI_TAB: 'DEFAULT_MULTI_TAB',

        NICKNAME: 'NICKNAME',
        AVATAR: 'AVATAR',
        USER_INFO: 'USER_INFO',
        CURRENT_MENU: 'CURRENT_MENU',

        DESKTOP: 'desktop',
        TABLET: 'tablet',
        MOBILE: 'mobile'
    };

    module.exports = constant;
});
