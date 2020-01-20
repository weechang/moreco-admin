define(function (require, exports, module) {
    "use strict";
    // app

    let local = require('@/utils/localStorage');
    let CONSTANT = require('@/store/constant');

    const app = {
        state: {
            sidebar: true,
            foldMenu: local.getTrue(CONSTANT.FOLD_MENU),
            device: 'desktop',
            theme: '',
            openMenuKeys: [],
            selectedMenuKeys: [],
            layout: '',
            contentWidth: '',
            fixedHeader: false,
            fixSiderbar: false,
            autoHideHeader: false,
            color: null,
            weak: false,
            multiTab: true
        },
        mutations: {
            SET_SIDEBAR_TYPE: (state, type) => {
                state.sidebar = type;
                local.set(CONSTANT.SIDEBAR_TYPE, type);
            },
            TOGGLE_FOLD_MENU: (state) => {
                state.foldMenu = !state.foldMenu;
                local.set(CONSTANT.FOLD_MENU, state.foldMenu);
            },
            CLOSE_SIDEBAR: (state) => {
                state.sidebar = false
            },
            TOGGLE_DEVICE: (state, device) => {
                state.device = device
            },
            SET_OPEN_MENU_KEYS: (state, keys) => {
                state.openMenuKeys = keys;
            },
            SET_SELECTED_MENU_KEYS: (state, keys) => {
                state.selectedMenuKeys = keys;
            },
            TOGGLE_THEME: (state, theme) => {
                state.theme = theme
            },
            TOGGLE_LAYOUT_MODE: (state, layout) => {
                state.layout = layout
            },
            TOGGLE_FIXED_HEADER: (state, fixed) => {
                state.fixedHeader = fixed
            },
            TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
                state.fixSiderbar = fixed
            },
            TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
                state.autoHideHeader = show
            },
            TOGGLE_CONTENT_WIDTH: (state, type) => {
                state.contentWidth = type
            },
            TOGGLE_COLOR: (state, color) => {
                state.color = color
            },
            TOGGLE_WEAK: (state, flag) => {
                state.weak = flag
            },
            TOGGLE_MULTI_TAB: (state, bool) => {
                state.multiTab = bool
            }
        },
        actions: {
            setSidebar({commit}, type) {
                commit('SET_SIDEBAR_TYPE', type)
            },
            ToggleFoldMenu({commit}) {
                commit('TOGGLE_FOLD_MENU')
            },
            CloseSidebar({commit}) {
                commit('CLOSE_SIDEBAR')
            },
            ToggleDevice({commit}, device) {
                commit('TOGGLE_DEVICE', device)
            },
            setOpenMenuKeys: ({commit}, keys) => {
                commit('SET_OPEN_MENU_KEYS', keys)
            },
            setSelectedMenuKeys: ({commit}, keys) => {
                commit('SET_SELECTED_MENU_KEYS', keys)
            },
            ToggleTheme({commit}, theme) {
                commit('TOGGLE_THEME', theme)
            },
            ToggleLayoutMode({commit}, mode) {
                commit('TOGGLE_LAYOUT_MODE', mode)
            },
            ToggleFixedHeader({commit}, fixedHeader) {
                if (!fixedHeader) {
                    commit('TOGGLE_FIXED_HEADER_HIDDEN', false)
                }
                commit('TOGGLE_FIXED_HEADER', fixedHeader)
            },
            ToggleFixSiderbar({commit}, fixSiderbar) {
                commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar)
            },
            ToggleFixedHeaderHidden({commit}, show) {
                commit('TOGGLE_FIXED_HEADER_HIDDEN', show)
            },
            ToggleContentWidth({commit}, type) {
                commit('TOGGLE_CONTENT_WIDTH', type)
            },
            ToggleColor({commit}, color) {
                commit('TOGGLE_COLOR', color)
            },
            ToggleWeak({commit}, weakFlag) {
                commit('TOGGLE_WEAK', weakFlag)
            },
            ToggleMultiTab({commit}, bool) {
                commit('TOGGLE_MULTI_TAB', bool)
            }
        }
    };

    module.exports = app;
});
