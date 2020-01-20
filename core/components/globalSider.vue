<template>
    <div :class="['sider', (device === 'mobile' ? 'mobile' : (collapsed ? 'collapsed' : ''))]">
        <div v-if="device !== 'mobile'">
            <global-menu></global-menu>
        </div>
    </div>
</template>
<script>
    module.exports = {
        components: {
            "global-menu": httpVueLoader('core/components/globalMenu.vue')
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
    .sider {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 256px;
        transition: all ease-in-out 200ms;
    }

    .sider.collapsed {
        width: 80px;
    }

    .sider.mobile {
        width: 0;
    }
</style>
