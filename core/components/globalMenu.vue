<template>
    <div :class="['global-menu', (device === 'mobile' ? 'mobile' : '' )]">
        <div :class="['logo', (device === 'mobile' ? 'mobile' : (collapsed ? 'collapsed' : ''))]"></div>
        <a-menu
                mode="inline"
                theme="dark"
                :inline-collapsed="(device !== 'mobile' ? collapsed : false)"
                :class="['menu', (device === 'mobile' ? 'mobile' : (collapsed ? 'collapsed' : ''))]"
                :open-keys="openKeys"
                :default-open-keys="openKeys"
                :default-selected-keys="selectedKeys"
                @open-change="onOpenChange"
        >
            <a-sub-menu key="sub1">
                <span slot="title">
                    <a-icon type="mail"></a-icon>
                    <span>权限管理</span>
                </span>
                <a-menu-item key="/upms/views/app/list"><router-link to="/upms/views/app/list">应用管理</router-link></a-menu-item>
                <a-menu-item key="/upms/views/resource/list"><router-link to="/upms/views/resource/list">资源管理</router-link></a-menu-item>
                <a-menu-item key="/upms/views/role/list"><router-link to="/upms/views/role/list">角色管理</router-link></a-menu-item>
                <a-menu-item key="/upms/views/user/list"><router-link to="/upms/views/user/list">用户管理</router-link></a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>
<script>
    module.exports = {
        data() {
            return {
                openKeys: this.$store.getters.openMenuKeys,
                selectedKeys: this.$store.getters.selectedMenuKeys,
                rootSubmenuKeys: ['sub1']
            };
        },
        methods: {
            onOpenChange: function (openKeys) {
                const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
                if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                    this.openKeys = openKeys;
                } else {
                    this.openKeys = latestOpenKey ? [latestOpenKey] : [];
                }
            }
        },
        computed: {
            device() {
                return this.$store.getters.device;
            },
            collapsed() {
                return this.$store.getters.foldMenu;
            }
        }
    }
</script>
<style scoped>
    /*.global-menu{*/
    /*    box-shadow: 2px 0 6px rgba(0, 21, 41, .35);*/
    /*}*/
    .global-menu.mobile {
        margin-top: -24px;
        margin-left: -24px;
    }

    .logo {
        height: 64px;
        background: #00152A;
        width: 256px;
        transition: all ease-in-out 200ms;
    }

    .logo.mobile {
        margin-top: -24px;
    }

    .logo.collapsed {
        width: 80px;
    }

    .menu {
        overflow-y: auto;
        height: calc(100vh - 64px);
        min-width: 256px;
        transition: all ease-in-out 200ms;
    }

    .menu.mobile {
        margin-bottom: -24px;
    }

    .menu.collapsed {
        min-width: 80px;
    }
</style>
