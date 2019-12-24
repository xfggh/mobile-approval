<template>
    <div class="submit">
        <van-tabs type="card" color="#1296DB" @click="_getTaskList">
            <van-tab title="未审批">
                <Panel :tasks="tasks" />
            </van-tab>
            <van-tab title="审批进行中">
                <Panel :tasks="tasks" />
            </van-tab>
            <van-tab title="审批完成">
                <Panel :tasks="tasks" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Panel from './../../components/Panel'
import { getTaskList } from './../../api/index'
export default {
    name: "Submit",
    components: {
        Panel
    },
    data(){
        return {
            tasks: []
        }
    },
    mounted(){
        this._getTaskList(0)
    },
    methods: {
        // 获取任务列表
        async _getTaskList(taskType){
            let params = {};
            params.token = localStorage.getItem('userToken');
            params.userInfo = localStorage.getItem('userInfo');
            params.taskType = taskType+2;
            this.$store.dispatch('taskType', taskType+2);
            let result = await getTaskList(params);
            this.tasks = result.data;
            console.log(result);
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>