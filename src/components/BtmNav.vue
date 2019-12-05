<template>
    <div class="btm-nav">
        <tabbar v-model="act">
            <tabbar-item :info="info" v-for="(tabBar, key) in tabBars" :key="key"
            @click="switchTo(tabBar.url)"
            >
                <span>{{tabBar.title}}</span>
                <img 
                    slot="icon"
                    :src="$route.path.includes(tabBar.url) ? tabBar.active : tabBar.inactive"
                >
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";

export default {
    act: 0,
    name: "BtmNav",
    components: {
        Tabbar,
        TabbarItem
    },
    mounted(){
        this.act = ['/msg','/search','/me'].indexOf(this.$route.path);
    },
    data() {
        return {
            act: 0,
            info: 2,
            tabBars: [
                {
                    url: "/msg",
                    title: "待办",
                    active: require("./../assets/icon/msg-a.png"),
                    inactive: require("./../assets/icon/msg.png")

                },
                {
                    url: "/search",
                    title: "搜索",
                    active: require("./../assets/icon/search-a.png"),
                    inactive: require("./../assets/icon/search.png")
                },
                {
                    url: "/me",
                    title: "我的",
                    active: require("./../assets/icon/me-a.png"),
                    inactive: require("./../assets/icon/me.png")
                }
            ]
            
        }
    },
    methods: {
        switchTo(path){
            this.$router.replace(path);  // 跳转
        }
    },
    watch:{
        $route(to){
            this.act = ['/msg','/search','/me'].indexOf(to.path);
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>