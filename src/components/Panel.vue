<template>
    <div class="tasks">
        <van-checkbox-group v-model="checkList" ref="checkboxGroup">
            <div class="panel" v-for="(task, key) in tasks" :key="key">
                <div class="panel-main">
                    <div class="panel-checkbox" v-show="actFlag">
                        <van-checkbox icon-size="15px" :disabled="task.status === 1" :ref="(task.status === 1)?'disable':'nodisable'" label-disabled shape="squre" :name="task.taskid">
                        </van-checkbox>
                    </div>
                    <div @click="toDetail(task.taskid, task.status)" class="panel-content">
                        <h1>{{ task.title }}</h1>
                        <span>{{ task.date }}</span>
                    </div>
                </div>
                <div class="panel-tag" v-show="task.status > -1">
                    <van-tag type="success" v-if="task.status === 1">已完成</van-tag>
                    <van-tag type="warning" v-if="task.status === 0">待审批</van-tag>
                </div>
                <!-- <van-icon name="arrow" /> -->
            </div>
        </van-checkbox-group>
        <div class="footer" v-show="actFlag">
            <van-checkbox icon-size="15px" ref="allCheck" v-model="allCheck" @click="checkAll" shape="squre" name="222">全选</van-checkbox>
            <div class="footer-btn">
                <van-button size="mini" :disabled="footerBtn" type="info" @click="batchApproval(1)">批量通过</van-button>
                <!-- <van-button size="mini" :disabled="footerBtn" type="info">批量驳回</van-button> -->
            </div>
        </div>
    </div>
</template>

<script>
import { approval } from './../api/index'
export default {
    name: "Panel",
    components: {
    },
    data(){
        return {
            checkList: [], // 选中的列表
            allCheck: false,
            footerBtn: true
        }
    },
    props: {
        tasks: Array,
        //status: Number,
        actFlag: Boolean
    },
    mounted(){
    },
    methods: {
        // 是否显示
        isShow(text, taskId, actFlag){
            // 子组件调用父组件的方法,并传递值 text
            this.$emit('showDialog' , text, taskId, actFlag);
        },

        // 是否全选
        checkAll(){
            console.log(this.allCheck)
            let num = this.$refs.checkboxGroup.children.length;
            if(!this.allCheck){
                for(let i = 0; i < num; i++){
                    if(!(this.$refs.checkboxGroup.children[i].disabled)){
                        if(!this.$refs.checkboxGroup.children[i].checked){
                            this.$refs.checkboxGroup.children[i].toggle();
                        }
                    }
                }
            }else{
                for(let i = 0; i < num; i++){
                    if(!(this.$refs.checkboxGroup.children[i].disabled)){
                        if(this.$refs.checkboxGroup.children[i].checked){
                            this.$refs.checkboxGroup.children[i].toggle();
                        }
                    }
                }
            }
            
        },
        // 查看详情
        toDetail(taskId, status = -1){
            if(status >= 0){
                this.$store.dispatch('taskType', status);
            }
            this.$router.push({
                name: 'detail',
                params: {
                    taskId: taskId
                }
            })
        },

        // 批量审核
        async batchApproval(actionCode){
            let params = {}
            params.userInfo = localStorage.getItem('userInfo');
            params.taskIds = this.checkList;
            params.note = encodeURI("批量处理");
            params.actionCode = actionCode;
            params.token = localStorage.getItem('userToken');
            let result = await approval(params);
            if(result.code === '200'){
                this.btnDisable = true;
            }
            console.log(result);
        }
    },
    watch: {
        checkList(){
            if(this.checkList.length > 1){
                this.footerBtn = false;
            }else{
                this.footerBtn = true;
            }
            if(this.checkList.length > 0){
                if(this.$refs.hasOwnProperty("disable")){
                    if(this.tasks.length == (this.checkList.length + this.$refs.disable.length)){
                        this.allCheck = true;
                    }else{
                        this.allCheck = false;
                    }
                }else{
                    if(this.tasks.length == this.checkList.length){
                        this.allCheck = true;
                    }else{
                        this.allCheck = false;
                    }
                }
            }
            
        },

        tasks() {
            this.checkList = [];
            if(this.$refs.allCheck.checked){
                this.$refs.allCheck.toggle();
            }
            
        }
    }
}
</script>

<style lang="stylus" scoped>
.tasks
    display flex
    flex-direction column
    padding-bottom 100px
    .panel
        display flex
        justify-content space-between
        padding 5px 0px 5px 5px
        border-bottom 1px solid #f0f0f0
        .panel-main
            display flex
            .panel-checkbox
                display flex
                align-items center
            .panel-content
                display flex
                flex-direction column
                margin-left 5px
                h1
                    font-size 12px
                    color #000
                    font-weight 500
                    line-height 20px
                    margin-bottom 5px
                span
                    font-size 12px
                    color #ccc
        .panel-tag
            width 50px
            margin-left 5px
    .footer
        width 100%
        height 30px
        padding 5px
        box-sizing border-box
        background-color #F1F3F4
        border-top 1px solid #f0f0f0
        display flex
        align-items center
        justify-content space-between
        position fixed
        bottom 50px
        color #f0f0f0
        font-size 12px

</style>