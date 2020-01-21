<template>
    <a-layout-header :class="['header', (device === 'mobile' ? 'mobile' : (collapsed ? 'collapsed' : ''))]">
        <a-icon v-if="(device === 'mobile')" type="menu-unfold" class="trigger" @click="mobileToggleCollapsed"></a-icon>
        <a-icon v-else :type="collapsed ? 'menu-unfold' : 'menu-fold'" class="trigger"
                @click="toggleCollapsed"></a-icon>
        <a-drawer class="mobile-menu"
                placement="left"
                :closable="false"
                @close="closeMobileMenu"
                :visible="mobileMenu"
        >
            <global-menu></global-menu>
        </a-drawer>
        <a-dropdown class="user" placement="bottomRight">
            <div class="ant-dropdown-link">
                <img v-if="avatar != null && avatar !== undefined && avatar !== ''" :src="avatar" class="avatar avatar-img" align="avatar"/>
                <a-avatar v-else icon="user" size="small" class="avatar"></a-avatar>
                <span>{{nickName}}</span>
            </div>
            <a-menu slot="overlay">
                <a-menu-item>个人中心</a-menu-item>
                <a-menu-item>个人设置</a-menu-item>
                <a-menu-divider></a-menu-divider>
                <a-menu-item @click="doLogout">退出登录</a-menu-item>
            </a-menu>
        </a-dropdown>
    </a-layout-header>
</template>

<script>
    let USER_API = null;
    module.exports = {
        data: function () {
            return {
                mobileMenu: false,
                nickName: this.$store.getters.nickname,
                avatar: this.$store.getters.avatar,
            };
        },
        components: {
            "global-menu": httpVueLoader('core/components/globalMenu.vue')
        },
        methods: {
            mobileToggleCollapsed() {
                this.mobileMenu = !this.mobileMenu;
            },
            closeMobileMenu() {
                this.mobileMenu = false;
            },
            toggleCollapsed() {
                this.$store.commit('TOGGLE_FOLD_MENU');
            },
            doLogout: function () {
                this.USER_API.logout().then(() => {
                    this.$store.dispatch('clearLoginInfo');
                    this.$router.push({
                        path: `/login/`,
                    });
                })
            }
        },
        computed: {
            device() {
                return this.$store.getters.device;
            },
            collapsed() {
                return this.$store.getters.foldMenu;
            }
        },
        watch: {
            device(val, oldVal) {
                if (val !== 'mobile') {
                    this.mobileMenu = false;
                }
            }
        },
        mounted: function () {
            let that = this;
            seajs.use('@/api/user', function (api) {
                that.USER_API = api;
            });
        }
    }
</script>

<style scoped>
    .ant-drawer-body {
        padding: 0 !important;
    }

    .trigger {
        font-size: 20px;
        height: 64px;
        cursor: pointer;
        transition: all .3s, padding 0s;
        padding: 22px 24px;
    }

    .header {
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
        background: #fff;
        padding: 0;
        position: fixed;
        top: 0;
        right: 0;
        width: calc(100% - 256px);
        z-index: 99;
        transition: all ease-in-out 200ms;
    }

    .header.mobile {
        width: 100%;
    }

    .header.collapsed {
        width: calc(100% - 80px);
    }

    .mobile-menu{
        height: 100vh;
        overflow-y: auto;
    }

    .user {
        float: right;
        margin-right: 2rem;
    }

    .user .avatar {
        margin-right: 10px;
    }

    .user .avatar-img {
        width: 24px;
        height: 24px;
        border-radius: 12px;
    }
</style>
