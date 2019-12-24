import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入路由
import router from './router/index'

// 引入 vant-ui
import './plugins/vant'

// 引入 vuex
import store from './store/index'

// 引入 全局修改 vant-ui 样式
import './../src/common/css/resetvantui.css'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
