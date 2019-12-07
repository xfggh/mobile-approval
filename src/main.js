import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入路由
import router from './router/index';

// 引入 vant-ui
import {
  Button
} from 'vant'
Vue.use(Button);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
