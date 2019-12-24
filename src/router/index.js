import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Msg from './../pages/Msg/Msg'
import Detail from './../pages/Msg/Detail'
import Submit from './../pages/Submit/Submit'
import Me from './../pages/Me/Me'
import Login from './../pages/Login/Login'

// 3. 输出路由对象
let router =  new VueRouter({
    // 3.1 配置一级路由
    routes: [
        {
            path: '/',
            component: Login,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                showTopBar: false,
                showBtmNav: false
            }
        },
        {
            path: '/msg',
            component: Msg,
            children: [

            ],
            meta: {
                requireAuth: true,
                showTopBar: false,
                showBtmNav: true,
                keepAlive: true // 是否刷新
            }
        },
        {
            path: '/submit',
            component: Submit,
            meta: {
                showTopBar: true,
                showBtmNav: true,
                keepAlive: true
            }
        },
        {
            path: '/me',
            component: Me,
            meta: {
                requireAuth: true,
                showTopBar: true,
                showBtmNav: true
            }
        },
        {
            path: '/detail',
            name: 'detail',
            component: Detail,
            meta: {
                requireAuth: true,
                showTopBar: true,
                showBtmNav: false
            }
        }
    ]
})

router.beforeEach((to, from,  next) => {
    if(to.meta.requireAuth === true){ // 需要登录
        // 判断是否已经登录
        if(localStorage.getItem('userToken') && localStorage.getItem('userToken') !== 'undefined'){
            if(to.path === '/login' || to.path === '/'){
                next('/msg');
            }else{
                next();
            }
            
        }else{
            if(to.path !== '/login'){
                next('/login');
            }else{
                next();
            }
        }
    }else{
        next();
    }
})

export default router;