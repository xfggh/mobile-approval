<template>
    <div class="app">
        <TopBar />
        <router-view></router-view>
        <BtmNav />
    </div>
</template>

<script>
//import Login from "./components/Login/Login"
import BtmNav from "./components/BtmNav"
import TopBar from "./components/TopBar"
export default {
    name: "App",
    components: {
        BtmNav,
        TopBar
    }
}
</script>

<style lang="stylus" scoped>
.app
    width 100%
    height 100%
</style>