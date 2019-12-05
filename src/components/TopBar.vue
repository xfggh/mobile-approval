<template>
    <div class="top-bar">
        <nav-bar title="待办消息" left-text="返回" left-arrow>
            <icon name="search" slot="right" />
        </nav-bar>
    </div>
</template>

<script>
import { NavBar, Icon } from 'vant';
export default {
    name: "TopBar",
    components: {
        NavBar,
        Icon
    }
}
</script>

<style lang="stylus" scoped>

</style>