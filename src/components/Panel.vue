<template>
    <div class="panel">
        <div class="panel-header">
            <h1>{{ task.title }}</h1>
            <span>{{ task.desc }}</span>
        </div>
        <!-- <div class="panel-content">
            张三提交的单据，等待你的审核
        </div> -->
        <div class="panel-bottom">
            <Button type="danger" size="small">驳回</Button>
            <Button type="info" size="small">核准</Button>
        </div>
    </div>
</template>

<script>
import { Button } from 'vant'
export default {
    name: "Panel",
    components: {
        Button
    },
    props: {
        task: Object
    }
}
</script>

<style lang="stylus" scoped>
.panel
    display flex
    flex-direction column
    border-bottom 1px solid #f0f0f0
    padding 5px 0px 5px 16px
    .panel-header
        border-bottom 1px solid #f0f0f0
        padding 0 0 5px
        h1
            font-size 14px
            font-weight bold
            margin 5px 0
        span
            font-size 14px
            color #969799
            margin 5px 0
    .panel-bottom
        display flex
        justify-content flex-end
        padding 5px 16px 0 0
        Button
            margin-left 10px
</style>