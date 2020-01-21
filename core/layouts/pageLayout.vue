<template>
    <a-layout>
        <!-- SideMenu -->
        <global-sider></global-sider>
        <a-layout>
            <!-- layout header -->
            <global-header></global-header>
            <!-- layout content -->
            <a-layout-content :class="['content', (device === 'mobile' ? 'mobile' : (collapsed ? 'collapsed' : ''))]">
                <!--page header-->
                <page-header></page-header>
                <transition name="page-transition">
                    <router-view class="content-view"/>
                </transition>
                <!-- layout footer -->
                <a-layout-footer>
                    <global-footer></global-footer>
                </a-layout-footer>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    module.exports = {
        components: {
            "global-sider": httpVueLoader('core/components/globalSider.vue'),
            "global-header": httpVueLoader('core/components/globalHeader.vue'),
            "global-footer": httpVueLoader('core/components/globalFooter.vue'),
            "page-header": httpVueLoader('core/components/pageHeader.vue')
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
    .content {
        height: 100%;
        padding-left: 256px;
        margin-top: 64px;
        transition: all ease-in-out 200ms;
    }

    .content.collapsed {
        padding-left: 80px;
    }

    .content.mobile {
        padding-left: 0;
        margin: 0;
    }

    .content-view {
        margin: 24px 24px 0;
        min-height: calc(100vh - 250px);
    }

    .page-transition-enter {
        opacity: 0;
    }

    .page-transition-leave-active {
        opacity: 0;
    }

    .page-transition-enter .page-transition-container,
    .page-transition-leave-active .page-transition-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
