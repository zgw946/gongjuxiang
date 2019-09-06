import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../components/home/home.vue');
const login = () => import('../components/login/login.vue');
const treasure = () => import('../components/treasure/treasure.vue');
const treasure_main = () => import('../components/treasure_main/treasure_main.vue');
const register = () => import('../components/register/register.vue');

// 防止同窗口访问报错
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    // 当请求 根目录 重定向到 /home 中
    { path: '/', redirect: '/home' }, // 重定向
    { path: '/home', name: 'home', component: Home },
    { path: '/login', name: 'login', component: login },
    { path: '/register', name: 'register', component: register },
    {
      path: '/treasure', name: 'treasure', component: treasure,
      children: [
        { path: '/treasure_main', name: 'treasure_main', component: treasure_main}
      ]
    }
  ]
})
