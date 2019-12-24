<template>
    <div class="vant-dialog">
        <van-dialog
            v-model="show"
            :title="title"
            show-cancel-button
        >
            <van-field placeholder="请输入审批意见"></van-field>
        </van-dialog>
    </div>
</template>

<script>
export default {
    name: "VantDialog",
    data(){
        return {
            show: false,
            title: ""
        }
    },
    props: {

    },
    methods: {
        isShow(text){
            this.show = !this.show;
            this.title = text;
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>