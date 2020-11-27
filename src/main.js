// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store/index'
import {
  Toast,
  Dialog
} from 'vant'
import './utils/registerVant'
import 'vant/lib/index.css'
import './assets/font/iconfont.css'
import 'lib-flexible/flexible'

import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.axios = axios
Vue.prototype.$video = Video

Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Vuex)

Vue.config.productionTip = false

// 配置html plus 环境
document.addEventListener('plusready', function () {
  // initVue()
  // 设置一个全局plusready状态
  // plus.navigator.setStatusBarBackground('#FFFFFF');
  // plus.navigator.setStatusBarStyle('light');
  // 监听返回按键
  let now = false
  let time = null
  plus.key.addEventListener('backbutton', function () {
    // console.log('backbutton')
    let canQuit = {
      'home': true,
      'machine': true,
      'transaction': true,
      'pet': true,
      'mine': true
    }
    let url = window.location.href
    var pathUrl = url.substr(url.lastIndexOf('/') + 1)
    // console.log(pathUrl)
    if (canQuit[pathUrl] || pathUrl === '') {
      // console.log("plus.runtime.quit()")
      time = null
      if (now) {
        now = false
        plus.runtime.quit()
      } else {
        now = true
        plus.nativeUI.toast('再按一次退出', {
          duration: 'short'
        })
        time = setTimeout(() => {
          now = false
        }, 1000)
      }
      // 如果是内页则执行路由返回操作
    } else {
      // console.log("router.go(-1)")
      // router.go(-1);
      window.history.go(-1)
    }
  })
})

// 不需要跳转登录路由
router.beforeEach((to, from, next) => {
  let isLogin = ''
  if (store.state.userInfo) {
    isLogin = store.state.userInfo.token
  }
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (isLogin) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
