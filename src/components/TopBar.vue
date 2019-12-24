<template>
    <div class="top-bar">
        <van-nav-bar
            :title="this.$store.state.headerTitle.text"
            left-text="返回"
            right-text="按钮"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
            fixed
        >

        </van-nav-bar>
    </div>
</template>

<script>
export default {
    name: "TopBar",
    methods: {
        onClickLeft(){
            console.log('返回');
        },
        onClickRight(){
            console.log('按钮');
        }
    },
    mounted(){

    }
}
</script>

<style lang="stylus" scoped>

</style>