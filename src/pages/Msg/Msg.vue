<template>
    <div class="msg">
        <!-- <van-nav-bar title="待办"></van-nav-bar> -->
        <div class="msg-content">
            <!-- <van-tabs type="card" color="#1296DB" @click="_getTaskList">
                <van-tab title="未审批">
                    <Panel :actFlag="true" :tasks="tasks" @showDialog="showDialog" />
                </van-tab>
                <van-tab title="审批完成">
                    <Panel :actFlag="false" :tasks="tasks" @showDialog="showDialog" />
                </van-tab>
            </van-tabs> -->
            <div class="content-header">
                <van-dropdown-menu>
                    <van-dropdown-item @change="_getTaskList" v-model="value" :options="option" />
                    <van-dropdown-item title="筛选" ref="item">
                        <van-cell-group>
                            <van-field
                                label="单据名称"
                                right-icon="question-o"
                            />

                            <van-field
                                label="单据类型"
                            />
                        </van-cell-group>
                        <van-button block type="info">确认</van-button>
                    </van-dropdown-item>
                </van-dropdown-menu>
            </div>
            <div class="content-panel">
                <Panel :actFlag="actFlag" :tasks="tasks" @showDialog="showDialog" />
            </div>

            
        </div>
        <van-dialog
            v-model="dialogShow"
            :title="dialogTitle"
            show-cancel-button
            @confirm="approval()"
        >
            <van-field placeholder="请输入审批意见" v-model="note"></van-field>
        </van-dialog>
        <!-- <VantDialog ref="child" @click="isApprove" /> -->
    </div>
</template>

<script>
import Panel from './../../components/Panel'
// import VantDialog from './../../components/Vant/VantDialog'
import { getTaskList, approval } from './../../api/index'
export default {
    name: "Msg",
    components: {
        Panel,
        // VantDialog
    },
    data(){
        return{
            tasks: [],
            dialogShow: false,
            dialogTitle: '',
            taskId: '',
            note: '', // 审批意见
            actFlag: false, // 审批动作

            value: 0,
            value2: 'a',
            option: [
                { text: '全部', value: -1 },
                { text: '待审批', value: 0 },
                { text: '审批完成', value: 1 },
            ]
        }
    },
    mounted(){
        // 标题
        //this.$store.dispatch('headerTitle', '待办');
        this._getTaskList(0);
    },
    methods: {
        // 获取任务列表
        async _getTaskList(taskType){
            if(taskType === 1){
                this.actFlag = false;
            }else{
                this.actFlag = true;
            }
            let params = {};
            params.token = localStorage.getItem('userToken');
            params.userInfo = localStorage.getItem('userInfo');
            params.taskType = taskType;
            // 获取 单据详情 时需要 taskType, 存到 vuex中
            this.$store.dispatch('taskType', taskType);
            let result = await getTaskList(params);
            if(result.data){
                this.tasks = result.data.reverse();
            }
            console.log(result);
        },
        // 显示弹框
        showDialog(text, taskId, actFlag){
            // 调用 子组件 方法
            // this.$refs.child.isShow(text);
            this.dialogShow = !this.dialogShow;
            this.dialogTitle = text;
            this.taskId = taskId;
            this.actFlag = actFlag;
            //console.log(text, taskId);
        },
        // 审核/驳回
        async approval(){
            console.log(1111);
            let params = {};
            params.token = localStorage.getItem('userToken');
            params.userInfo = localStorage.getItem('userInfo');
            params.taskId = this.taskId;
            params.actionCode = this.actFlag;
            params.note = encodeURI(this.note);
            let result = await approval(params);
            console.log(result);
        }

    }
}
</script>

<style lang="stylus" scoped>
.msg
    width 100%
    height 100%
    padding-top 50px
    box-sizing border-box
    .msg-content
        .content-header
            width 100%
            position fixed
            top 0
            z-index 2
        .content-panel
            border-top 5px solid #f0f0f0
</style>