<template>
    <div class="detail">
        <van-nav-bar
            :title="billtypename"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
            fixed
        >
            <van-icon name="ellipsis" slot="right" />
        </van-nav-bar>
        <div class="detail-head">
            <van-cell-group title="表头">
                <van-field v-for="(head, key) in heads" :key="key"
                    :value="head[1]"
                    :label="head[0]"
                    disabled
                />
            </van-cell-group>
        </div>
        <div class="detail-body">
            <van-collapse v-model="activeNames">
                <van-collapse-item title="行明细" name="1">
                    <van-cell-group :title="'行' + (key+1).toString()" v-for="(body, key) in bodys" :key="key">
                        <van-field v-for="(item, key1) in body" :key="key1"
                            :value="item[1]"
                            :label="item[0]"
                            disabled
                        />
                    </van-cell-group>
                </van-collapse-item>
            </van-collapse>
        </div>

        <!-- 审批流程 -->
        <div class="detail-flow">
            <h1>审批流程</h1>
            <van-loading size="24px" vertical v-show="flowLoading">加载中...</van-loading>
            <van-steps direction="vertical" :active="0" inactive-icon="success">
                <van-step v-for="(item, key) in flowHistory" :key="key">
                    <h3>
                        {{ item.persons}}
                        <span>{{ item.unittype }}</span>
                        <!-- <van-tag plain type="primary">{{ item.unittype }}</van-tag> -->
                    </h3>
                    <span class="flow-advice">{{ (item.actionname) ? (item.actionname) : ""}} {{(item.advice) ? ("：" + item.advice) : ""}}</span>
                    <p>{{ item.time }}</p>
                </van-step>
            </van-steps>
        </div>

        <div class="footer-btn" v-show="taskAction.length > 0">
            <!-- <van-button 
                    type="info" 
                    size="small"
                    @click="approvalDialog(item.name, item.actflag)"
                    v-for="(item, key) in taskAction" :key="key">
                {{ item.name }}
            </van-button> -->
            <div class="btn"  v-for="(item, key) in taskAction" :key="key">
                <van-icon v-if="item.name === '不批准'" color="#FF6666" name="close" />
                <van-icon v-if="item.name === '批准'" color="#07C160" name="passed" />
                <van-icon v-if="item.name === '驳回'" color="#FF976A" name="warning-o" />
                <button :disabled="btnDisable" :value="item.name" @click="approvalDialog(item.name, item.actflag)">{{ item.name }}</button>
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

        <van-action-sheet
            v-model="sheetShow"
            :actions="actions"
            cancel-text="取消"
            @select="sheetSelect"
        />

        <van-image-preview
            v-model="flowChartShow"
            :images="flowChart"
        >
        </van-image-preview>
        
    </div>
</template>

<script>
import { getTaskBill, approval, getFlowChart, getApproveDetail } from './../../api/index'
export default {
    name: "Detail",
    data(){
        return {
            activeNames: [],
            billtypename: '', // 单据名称
            heads: [
                {title: '单据类型', value: '261x'}
            ],
            bodys: [],
            taskAction: [],
            taskId: "",
            note: '', // 审批意见
            actFlag: -1, // 动作类型
            dialogShow: false,
            dialogTitle: '',
            sheetShow: false,
            actions: [
                { name: '审批流程' },
                { name: '附件' },
            ],
            flowChartShow: false,
            flowChart: [],
            flowHistory: [],
            flowLoading: true,
            btnDisable: false
        }
    },
    components: {
    },
    mounted(){
        // 获得路由中的 taskId
        this.taskId = this.$route.params.taskId;
        this._getTaskBill(this.taskId)
    },
    methods: {
        // 获得 单据详情页
        async _getTaskBill(taskId){
            let params = {}
            params.userInfo = localStorage.getItem('userInfo');
            params.taskId = taskId;
            params.token = localStorage.getItem('userToken');
            params.taskType = this.$store.state.taskType;
            let result = await getTaskBill(params);
            console.log(result);
            
            let data = result.data.taskbill;
            
            this.billtypename = result.data.billtypename;
            let head = data.head[0].tabContent.billItemData;
            let body = data.body[0].tabContent;
            let bodyArr = [];
            body.forEach(ele => {
                let billItem = ele.billItemData;
                let tempArr = [];
                billItem.forEach(e => {
                    let arr = [];
                    for(var i in e) {
                        if(typeof(e[i]) != 'object'){
                            arr.push(e[i]);
                        }else{
                            if(e[i].millis){
                                arr.push(e[i].millis);
                            }else{
                                arr.push("暂时")
                            }
                        }
                    }
                    tempArr.push(arr);
                })
                bodyArr.push(tempArr);
            })
            this.bodys = bodyArr;

            let headArr = [];
            head.forEach(ele => {
                let arr = [];
                for(var i in ele) {
                    if(typeof(ele[i]) != 'object'){
                        arr.push(ele[i]);
                    }else{
                        if(ele[i].millis){
                            arr.push(ele[i].millis);
                        }else{
                            arr.push("暂时")
                        }
                    }
                }
                headArr.push(arr);
            });
            this.heads = headArr;
            
            if(result.data.taskAction){
                this.taskAction = result.data.taskAction.reverse();
            }

            // 获取审批流程
            if(result){
                let flowRes = await getApproveDetail(params);
                let flowArr = [];
                let flowData = flowRes.data;
                console.log(flowData);
                flowData.forEach(e => {
                    let arr = {};
                    let personList = e.personlist;
                    let persons = [];
                    for(let i = 0; i < personList.length; i++){
                        persons[i] = personList[i].name;
                    }
                    arr.persons = persons.join(',');
                    if(e.unittype){
                        arr.unittype = this._getUnittype(e.unittype);
                    }
                    if(e.time){
                        arr.time = e.time;
                    }
                    if(e.actionname){
                        arr.actionname = e.actionname;
                    }
                    if(typeof(e.advice) == 'string'){
                        arr.advice = e.advice;
                    }
                    flowArr.unshift(arr);
                })
                this.flowHistory = flowArr;
                this.flowLoading = false;
            }
        },
        _getUnittype(type){
            let unittype = "";
            switch (type) {
                case "submit":
                    unittype = '提交单据'
                    break;
                case "handling":
                    unittype = '正在处理'
                    break;
                case "solved":
                    unittype = '处理完成'
                    break;
                case "final":
                    unittype = '处理完成,流程结束'
                    break;
                default:
                    break;
            }
            return unittype;
        },
        _getApproveDetail(){

        },
        // header
        onClickLeft() {
            this.$router.back();
        },
        onClickRight() {
            // 弹框
            this.sheetShow = true;
        },
        async _getFlowChart(){
            let params = {}
            params.userInfo = localStorage.getItem('userInfo');
            params.taskId = this.taskId;
            params.taskType = this.$store.state.taskType;
            params.actionCode = this.actFlag;
            params.token = localStorage.getItem('userToken');
            let result = await getFlowChart(params);
            console.log(result);
            let data = result.data;
            let dataStr = this._arrayBufferToBase64(data);
            this.flowChart.push('data:image/png;base64,'+dataStr)
        },
        _arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = new Uint8Array( buffer );
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode( bytes[ i ] );
            }
            return window.btoa( binary );
        },
        // ...操作
        sheetSelect(item, index){
            this.sheetShow = false;
            console.log(index);
            if(index === 0){
                this._getFlowChart();
                this.flowChartShow = true;
            }
        },
        // 审批意见
        approvalDialog(name, actFlag){
            this.note = '';
            this.dialogTitle = name;
            this.actFlag = actFlag;
            this.dialogShow = !this.dialogShow;
        },
        // 审核
        async approval(){
            let params = {}
            params.userInfo = localStorage.getItem('userInfo');
            params.taskIds = [this.taskId];
            params.note = encodeURI(this.note);
            params.actionCode = this.actFlag;
            params.token = localStorage.getItem('userToken');
            let result = await approval(params);
            if(result.code === '200'){
                this.btnDisable = true;
            }
            console.log(result);
        }
    }
}
</script>

<style lang="stylus" scoped>
.detail
    width 100%
    padding-bottom 50px
    box-sizing border-box
    .detail-body
        margin 10px 0;
        border-top 5px solid #f0f0f0
        border-bottom 5px solid #f0f0f0
    .detail-flow
        background-color #fff
        padding-top 5px
        h3
            display flex
            justify-content space-between
            span
                font-size 12px
        .flow-advice
            font-size 12px
        p
            font-size 12px
        h1
            font-size 12px
            font-weight bolder
            margin 10px
    .footer-btn
        z-index 2
        width 100%
        padding 10px 10px
        box-sizing border-box
        position fixed
        background-color #F1F3F4
        bottom 0
        display flex
        justify-content space-between
        .btn
            display flex
            justify-content center
            align-items center
        Button
            border none
            font-size 14px
            background-color transparent

            
    
        
</style>