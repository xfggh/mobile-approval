<template>
    <div class="btm-nav">
        <van-tabbar v-model="active">
            <van-tabbar-item to="/msg">
                <span>待办</span>
                <img slot="icon" slot-scope="props" 
                    :src="props.active ? msg_icon.active : msg_icon.inactive">
            </van-tabbar-item>
            <van-tabbar-item to="/submit">
                <span>发起</span>
                <img slot="icon" slot-scope="props" 
                    :src="props.active ? search_icon.active : search_icon.inactive">
            </van-tabbar-item>
            <van-tabbar-item to="/me">
                <span>我的</span>
                <img slot="icon" slot-scope="props" 
                    :src="props.active ? me_icon.active : me_icon.inactive">
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>

export default {
    name: "BtmNav",
    data() {
        return {
            active: 0,
            msg_icon: {
                active: require('@/assets/btmnav/msg-a.png'),
                inactive: require('@/assets/btmnav/msg.png')
            },
            search_icon: {
                active: require('@/assets/btmnav/submit-a.png'),
                inactive: require('@/assets/btmnav/submit.png')
            },
            me_icon: {
                active: require('@/assets/btmnav/me-a.png'),
                inactive: require('@/assets/btmnav/me.png')
            }
        }
    },
    mounted(){
        this._getActive(this.$route.path)
    },
    methods: {
        _getActive(path){
            switch (path) {
                case '/msg':
                    this.active = 0;
                    break;
                case '/submit':
                    this.active = 1;
                    break;
                case '/me':
                    this.active = 2;
                    break;
                default:
                    this.active = 0;
                    break;
            }
        }
    },
    watch: {
        $route(to){
            this._getActive(to.path);
        }
    },
}
</script>

<style lang="stylus" scoped>

</style>