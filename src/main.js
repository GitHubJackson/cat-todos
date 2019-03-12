// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

Vue.prototype.$http = Axios
Vue.use(element) // Vue全局使用
Vue.config.productionTip = false

// 跳转拦截
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('demo-token')
  // console.log(token)
  if (to.path === '/') {
    if (token !== 'null' && token !== null) {
      // console.log(Vue.prototype.$http.defaults.headers.common['Authorization'])
      next({ path: '/todolist' }) // 有token则转向todolist
    }
    next() // 否则跳转回登录页
  } else {
    if (token !== 'null' && token !== null) {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token // 全局设定header的token验证，注意Bearer后有个空格
      next() // 正常转向
    } else {
      next({ path: '/' }) // 否则跳转回登录页
    }
  }
})
// Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token // 全局设定header的token验证，注意Bearer后有个空格
// const token = sessionStorage.getItem('token')
// if (token) {
//   console.log(token)
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
