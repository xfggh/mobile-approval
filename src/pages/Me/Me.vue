<template>
    <div class="me">
        <div class="me-header">
            <img src="./../../assets/icon/黄桃.png" width="50" height="50" alt="">
            <div class="header-info">
                <h1>{{ userName }}<span>欢迎您</span></h1>
                <span>{{ groupName }}</span>
            </div>
        </div>
        <div class="me-main">
            <div class="main-item">
                <span>2</span>
                <h2>待办</h2>
            </div>
            <div class="main-item">
                <span>22</span>
                <h2>提交</h2>
            </div>
            <div class="main-item">
                <span>33</span>
                <h2>审核中</h2>
            </div>
        </div>
        <div class="me-footer">
            <van-cell-group style="margin-top:5px;">
                <van-cell title="单元格" is-link value="内容" />
                <van-cell title="单元格" is-link value="内容" />
                <van-cell title="单元格" is-link value="内容" />
            </van-cell-group>
            <van-cell-group style="margin-top:5px;">
                <van-cell @click="logout" title="注销" is-link value="注销用户" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    name: "Me",
    data(){
        return {
            userName: '',
            groupName: '',
        }
    },
    mounted(){
        this._getUserInfo();
    },
    methods: {
        _getUserInfo(){
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.userName = userInfo.userName;
            this.groupName = userInfo.groupName;
        },
        logout(){
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userToken');
            Toast('注销成功!');
            this.$router.push('/login');
        }
    }
    
}
</script>

<style lang="stylus" scoped>
.me
    width 100%
    height 100%
    display flex
    flex-direction column
    align-items center
    background-color #F1F3F4
    .me-header
        width 100%
        height 125px
        background #74ebd5
        background linear-gradient(to right, #74ebd5, #acb6e5)
        display flex
        color #fff
        padding 20px 2.5% 0
        box-sizing border-box
        img
            border 1px solid #F1F3F4
            border-radius 3px
            margin-right 10px
        .header-info
            display flex
            flex-direction column
            h1
                font-size 15px
                margin-bottom 10px
                span
                    font-size 12px
                    color #F1F3F4
                    margin-left 5px
            span
                font-size 15px
    .me-main
        width 95%
        display flex
        justify-content space-between
        align-items center
        border 1px solid #F1F3F4
        border-radius 3px
        height 50px
        margin -25px 0 5px
        background-color #fff
        .main-item
            width 100%
            height 100%
            display flex
            flex-direction column
            align-items center
            justify-content center
            border-right 1px solid #F1F3F4
            h2
                font-size 14px
                margin-top 5px
                color #ccc
            span
                font-size 14px
        .main-item:last-child
            border none
    .me-footer
        width 95%




</style>