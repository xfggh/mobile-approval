<template>
    <div class="app">
        <!-- <TopBar v-show="$route.meta.showTopBar" /> -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <BtmNav v-show="$route.meta.showBtmNav" />
    </div>
</template>

<script>
import BtmNav from "./components/BtmNav"
// import TopBar from "./components/TopBar"
export default {
    name: "App",
    components: {
        BtmNav,
    }
}
</script>

<style lang="stylus" scoped>
.app
    width 100%
    height 100%
    box-sizing border-box
</style>