<template>
    <div class="login">
        <img class="login-logo" src="./../../assets/icon/logo.png" width="64" height="64" alt="">
        <div class="login-form">
            <div class="form-ipt">
                <img src="./../../assets/icon/user.png" alt="" width="25" height="25">
                <input v-model="userName" type="text" placeholder="请输入用户名">
            </div>
            <div class="form-ipt">
                <img src="./../../assets/icon/lock.png" alt="" width="25" height="25">
                <input v-model="passWord" type="password" placeholder="请输入密码">
            </div>
        </div>
        <span class="login-net" v-show="netShow">
            网络未设置! <a @click="_checkNetWork">去设置</a>
        </span>
        <span class="login-net" v-show="!netShow">
            <a @click="showDialog">设置网络</a>
        </span>
        <button class="login-btn" @click="login">登录</button>
        <h1>友审批</h1>

        <!-- 网络设置 -->
        <van-dialog
            v-model="show"
            title="请先设置网络"
            show-cancel-button
            :beforeClose = "beforeClose"
        >
            <van-cell-group>
                <van-field v-model="url" placeholder="地址" />
                <van-field v-model="port" placeholder="端口" />
            </van-cell-group>
        </van-dialog>
    </div>
</template>

<script>
import {Toast} from 'vant'
import { login } from './../../api/index'
export default {
    name: "Login",
    data(){
        return {
            userName: '',
            passWord: '',
            show: false,
            netShow: false,
            url: '',
            port: ''
        }
    },
    mounted(){
        this._checkNetWork();
    },
    methods: {
        async login(){
            if(!localStorage.getItem('NCNetWork')){
                Toast('请先设置网络!');
                return;
            }
            let params = {};
            if(this.userName === ''){
                Toast('请输入用户名!');
                return;
            }
            params.userName = this.userName;
            if(this.passWord === ''){
                Toast('请输入密码!');
                return;
            }
            params.passWord = this.passWord;
            let result = await login(params);
            if(result.code === '200'){ // 登录成功
                // 把 后台 token 存到 localStorage
                localStorage.setItem("userToken", JSON.stringify(result.token));
                localStorage.setItem('userInfo', JSON.stringify(result.data));
                this.$store.dispatch('userInfo', result.data);
                this.$router.push('/msg');
            }else{ // 登录失败
                Toast(result.msg);
            }
        },

        // 检查网络设置
        _checkNetWork(){
            if(!localStorage.getItem('NCNetWork')){
                this.showDialog();
            }
        },
        showDialog(){
            this.show = true;
        },
        // 设置网络
        setNetWork(done){
            localStorage.setItem('NCUrl', this.url);
            localStorage.setItem('NCPort', this.port);
            localStorage.setItem('NCNetWork', true);
            this.netShow = false;
            done();
            Toast(localStorage.getItem('NCUrl'));
        },

        // 关闭弹窗前
        beforeClose(action, done){
            //console.log(action);
            if(action === 'cancel'){
                if(!localStorage.getItem('NCNetWork')){
                    this.netShow = true;
                    done()
                }else{
                    done();
                }
            }else{
                if(this.url === ''){
                    Toast('输入地址!');
                    done(false);
                    return;
                    
                }
                if(this.port === ''){
                    Toast('输入端口!');
                    done(false);
                    return;
                }
                this.setNetWork(done);
            }
        }

    }
}
</script>

<style lang="stylus" scoped>
.login
    width 100%
    height 100%
    background #FAFAFA
    display flex
    flex-direction column
    align-items center
    .login-logo
        margin 50px
    .login-form
        width 100%
        display flex
        flex-direction column
        justify-content center
        align-items center
        .form-ipt
            border 1px solid #CCC
            display flex
            align-items center
            height 35px
            width 90%
            margin-bottom 10px
            border-radius 5px
            input
                width 100%
                height 90%
                border none
                border-radius 5px
            input::-webkit-input-placeholder
                font-size 12px
    .login-net
        font-size 12px
        color #FF6666
        a
            color #66CCFF
    .login-btn
        height 35px
        width 90%
        border none
        margin-top 10px
        background-color #66CCFF
        border-radius 5px
        color #fff
    .login-btn:hover
        background-color #F1F3F4
        color #000
    h1
        position fixed
        bottom 30px
        font-size 14px
        color #66CCFF

</style>