import Vue from 'vue'
import App from './App'
// 引入Vuex
import store from './store'
// 引入vue-router路由
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui';
// 注册
Vue.use(ElementUI);
// 引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入封装的axios
import myaxios from "./assets/js/myaxios"
// 注册
Vue.use(myaxios)
// 引入全局样式
import './assets/css/index.css'

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
