<template>
    <div id="login" class="login-wrapper desktop">
        <div class="container">
            <div class="top">
                <div class="header">
                    <a>
                        <span class="title">Moreco Admin</span>
                    </a>
                </div>
                <div class="desc">专为后端人员而生的前端脚手架</div>
            </div>

            <div class="main">
                <a-form id="formLogin" class="user-layout-login" ref="formLogin">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="账户: admin" v-model="username">
                            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-item>

                    <a-form-item>
                        <a-input size="large" type="password" auto-complete="false" placeholder="密码: admin"
                                 v-model="password">
                            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-item>

                    <a-form-item>
                        <a-checkbox>自动登录</a-checkbox>
                    </a-form-item>

                    <a-form-item style="margin-top:24px">
                        <a-button size="large" type="primary" htmlType="submit" class="login-button" @click="doLogin">
                            登录
                        </a-button>
                    </a-form-item>
                </a-form>
            </div>

            <div class="footer">
                <div class="links">
                    <a href="https://github.com/weechang/moreco" target="_blank">Moreco</a>
                    <a href="https://github.com/weechang" target="_blank">
                        <a-icon class="item-icon" type="github"></a-icon>
                    </a>
                    <a href="https://github.com/weechang/moreco-admin" target="_blank">MorecoAdmin</a>
                </div>
                <div class="copyright">Copyright &copy; 2019 耒耒耒耒耒</div>
            </div>
        </div>
    </div>
</template>

<script>
    let API = null;
    module.exports = {
        data: function () {
            return {
                username: null,
                password: null
            };
        },
        methods: {
            /*** 登录 */
            doLogin: function () {
                let enPassword = '21232f297a57a5a743894a0e4a801fc3';
                this.API.login(this.username, enPassword).then(res => {
                    let token = res.data.jwt_token;
                    if (token != null && token !== undefined) {
                        this.$message.success('登录成功');
                        this.$store.dispatch('afterLogin');
                        this.$router.push({
                            path: `/index/`,
                        });
                    }
                }).catch(e => {
                    console.log(e)
                    this.$message.error('用户名/密码错误');
                });
            }
        },
        mounted: function () {
            let that = this;
            seajs.use('@/api/user', function (api) {
                that.API = api;
            });
        }
    }
</script>

<style scoped>
    #login.login-wrapper {
        height: 100vh;
    }

    #login.login-wrapper.mobile .container .main {
        max-width: 368px;
        width: 98%;
    }

    #login.login-wrapper .container {
        width: 100%;
        min-height: 100%;
        background: #f0f2f5 url('../../assets/background.svg') no-repeat 50%;
        background-size: 100%;
        padding: 110px 0 144px;
        position: relative;
    }

    #login.login-wrapper .container a {
        text-decoration: none;
    }

    #login.login-wrapper .container .top {
        text-align: center;
    }

    #login.login-wrapper .container .top .header {
        height: 44px;
        line-height: 44px;
    }

    #login.login-wrapper .container .top .header .badge {
        position: absolute;
        display: inline-block;
        line-height: 1;
        vertical-align: middle;
        margin-left: -12px;
        margin-top: -10px;
        opacity: 0.8;
    }

    #login.login-wrapper .container .top .header .title {
        font-size: 33px;
        color: rgba(0, 0, 0, 0.85);
        font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
    }

    #login.login-wrapper .container .top .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
    }

    #login.login-wrapper .container .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
    }

    #login.login-wrapper .container .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;
    }

    #login.login-wrapper .container .footer .links {
        margin-bottom: 8px;
        font-size: 14px;
    }

    #login.login-wrapper .container .footer .links a {
        color: rgba(0, 0, 0, 0.45);
        transition: all 0.3s;
    }

    #login.login-wrapper .container .footer .links a:not(:last-child) {
        margin-right: 40px;
    }

    #login.login-wrapper .container .footer .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
    }

    .user-layout-login label {
        font-size: 14px;
    }

    .user-layout-login .getCaptcha {
        display: block;
        width: 100%;
        height: 40px;
    }

    .user-layout-login .forge-password {
        font-size: 14px;
    }

    .user-layout-login button.login-button {
        padding: 0 15px;
        font-size: 16px;
        height: 40px;
        width: 100%;
    }

    .user-layout-login .user-login-other {
        text-align: left;
        margin-top: 24px;
        line-height: 22px;
    }

    .user-layout-login .user-login-other .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;
    }

    .user-layout-login .user-login-other .item-icon:hover {
        color: #1890ff;
    }

    .user-layout-login .user-login-other .register {
        float: right;
    }
</style>

