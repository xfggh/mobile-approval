<template>
    <div class="msg">
        <Panel :task="task" v-for="(task, key) in tasks" :key="key" />
    </div>
</template>

<script>
import Panel from './../../components/Panel';
export default {
    name: "Msg",
    components: {
        Panel
    },
    data(){
        return{
            tasks: [
                {
                    title: "张三",
                    desc: "张三的报销单"
                },
                {
                    title: "李四",
                    desc: "李四的报销单"
                },
                {
                    title: "王五",
                    desc: "王五的报销单"
                }
            ]
        }
    },
}
</script>

<style lang="stylus" scoped>
.msg
    width 100%
</style>