import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

import Msg from "./../pages/Msg/Msg"
import Search from "./../pages/Search/Search"
import Me from "./../pages/Me/Me"

// 3. 输出路由对象
export default new VueRouter({
    // 3.1 配置一级路由
    routes: [
        {
            path: '/msg',
            component: Msg,
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/me',
            component: Me
        },
        {
            path: '/',
            component: Msg
        },

    ]
})
