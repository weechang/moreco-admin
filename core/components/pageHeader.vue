<template>
    <div class="page-header">
        <!--<a-breadcrumb class="breadcrumb">-->
            <!--<a-breadcrumb-item>首页</a-breadcrumb-item>-->
            <!--<a-breadcrumb-item>权限管理</a-breadcrumb-item>-->
            <!--<a-breadcrumb-item>管理页面</a-breadcrumb-item>-->
        <!--</a-breadcrumb>-->
        <div class="title"><h2>{{this.$route.name}}</h2></div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                pageTitle: this.$route.name,
            };
        }
    }
</script>
<style scoped>
    .page-header {
        background: #fff;
        padding: 16px 32px 0;
        border-bottom: 1px solid #e8e8e8;
    }

    .page-header .breadcrumb {
        margin-bottom: 16px;
    }

    .page-header .title {
        margin-bottom: 16px;
    }
</style>
