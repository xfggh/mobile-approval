<template>
    <div class="login">
        <img src="./../../assets/icon/logo.png" width="64" height="64" alt="">
        <div class="login-form">
            <div class="form-ipt">
                <img src="./../../assets/icon/user.png" alt="" width="32">
                <input type="text" placeholder="请输入用户名">
            </div>
            <div class="form-ipt">
                <img src="./../../assets/icon/lock.png" alt="" width="32">
                <input type="text" placeholder="请输入密码">
            </div>
        </div>
        <button class="login-btn">登录</button>
    </div>
</template>

<script>
export default {
    name: "Login"
}
</script>

<style lang="stylus" scoped>
.login
    height 100%
    display flex
    flex-direction column
    align-items center
    background #36d1dc
    background linear-gradient(to bottom , #5b86e5, #36d1dc)
    img
        margin 50px 0px 10px
    .login-form
        width 95%
        display flex
        flex-direction column
        .form-ipt
            display flex
            margin 10px 0
            width 100%
            border-bottom 2px solid #fff
            img
                margin 5px 10px
                border-right 1px solid #fff
                padding 0 5px
            input
                width 100%
                border none
                background-color  transparent
                outline none
            input::-webkit-input-placeholder
                color #fff
    .login-btn
        width 95%
        background #eecda3
        background linear-gradient(to right , #eecda3, #ef629f)
        border none
        margin-top 20px
        height 39px
        border-radius 5px
</style>