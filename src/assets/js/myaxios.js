// 导入vue
import Vue from 'vue'
// 引入axios
import axios from "axios"
// 创建对象
var myaxios = {}
// 添加install方法
myaxios.install= function(Vue){
    // 统一设置请求的 API
    axios.defaults.baseURL = 'http://api.wxtao.com.cn/api_v2/'
    // 给vue实例对象添加方法
    Vue.prototype.$http = axios
}
// 对象暴露出去
export default myaxios