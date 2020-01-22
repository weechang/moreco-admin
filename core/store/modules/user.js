define(function (require, exports, module) {
    "use strict";
    // user

    let local = require('@/utils/localStorage.js');
    let CONSTANT = require('@/store/constant.js');
    let USER_API = require('@/api/user.js');

    const user = {
        state: {
            token: '',
            name: '',
            avatar: '',
            info: {},
            currentMenu: []
        },

        mutations: {
            SET_TOKEN: (state, token) => {
                state.token = token;
                local.set(CONSTANT.ACCESS_TOKEN, token);
            },
            SET_NAME: (state, name) => {
                state.name = name;
                local.set(CONSTANT.NICKNAME, name);
            },
            SET_AVATAR: (state, avatar) => {
                state.avatar = avatar;
                local.set(CONSTANT.AVATAR, avatar);
            },
            SET_INFO: (state, info) => {
                state.info = info;
                local.set(CONSTANT.USER_INFO, info);
            },
            SET_MENU: (state, menu) => {
                state.currentMenu = menu;
                local.set(CONSTANT.CURRENT_MENU, menu);
            }
        },

        actions: {
            // 刷新token
            flushToken({commit}, token) {
                commit('SET_TOKEN', token);
            },
            // 登录完成
            afterLogin({commit}) {
                // 获取当前用户信息
                USER_API.current().then(res => {
                    let data = res.data;
                    commit('SET_NAME', data.nickName);
                    commit('SET_AVATAR', data.avatar);
                    commit('SET_INFO', data);
                });
                // 获取当前用户目录
            },
            // 清空登录信息
            clearLoginInfo({commit}) {
                // 清空token
                commit('SET_TOKEN', '');
                commit('SET_NAME', '');
                commit('SET_AVATAR', '');
                commit('SET_INFO', {});
                commit('SET_MENU', []);
            }
        }
    };

    module.exports = user;
});
