import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'

Vue.config.productionTip = true // 生产环境改成 false
Vue.use(ElementUI) // 挂载全局 e-ui
Vue.prototype.$http = axios // 设置全局 axios,

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/' // 设置默认请求地址
// axios 拦截器，给请求头带上 token
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
