import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import store from '../store/index'
import router from '../router'

// 不显示加载框路由
const noGifArr = [
  '/lottery/money',
  '/mine/eyStoreTradingCenter/getPageList',
  '/balanceRecord',
  '/mineRecord',
  '/recharge/getRecharge',
  '/extract/getExtract',
  '/recharge/addCash',
  '/mine/eyStoreTradingCenter/getTradingCenterByAccount',
  '/sign/list',
  '/article/list',
  '/user/edit',
  '/order/buyQuantity',
  '/spread/banner'
]

const service = axios.create({
  // api的base_url
  //baseURL: 'http://127.0.0.1:8009/api', // 本地环境
  baseURL: 'https://api.hlcw.vip/api', // 正式环境
  // baseURL: 'http://192.168.1.103:8009/api', // 本地
  // baseURL: 'https://api.hlcw.top/api', // hlcw备份项目
  // 请求超时时间
  timeout: 10000
})

service.interceptors.request.use(config => {
  // 不显示加载动画
  if (noGifArr.indexOf(config.url) < 0) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0,
      overlay: true
    })
  }

  config.headers.post['Content-Type'] = 'application/json'
  config.method === 'post' ? config.data = qs.parse({ ...config.data }) : config.params = { ...config.params }
  if (store.state.userInfo) {
    config.headers['Authorization'] = 'Bearer ' + store.state.userInfo.token
  }
  // config.headers['x-token'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyYW5kb21LZXkiOiJnN2ttMnUiLCJzdWIiOiIxMjk1OSIsIm9pZCI6MjM4OCwiZXhwIjoxNTk3ODg2MTc3LCJpYXQiOjE1OTc2MjY5NzcsInVzZXJuYW1lIjoiMTU1ODA5ODk2MTcifQ.y__DrsewwOzEXqYKpA7VR-a8_HHuZ5C-e9gW7IQ2_RTKJxCnwOByhtklbF55hc8mkPLy1hHwcYygznvckE4qzA'

  return config
}, error => {
  Toast.fail(error)
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  Toast.clear()
  // 这里根据后端提供的数据进行对应的处理
  if (response.data.status === 200) {
    return response.data
  } else if (response.data.status === 5107) {
    Toast({
      message: '登录过期，请重新登录!',
      icon: 'fail',
      forbidClick: true,
      overlay: true
    })
    setTimeout(() => {
      router.replace(
        {
          path: '/login'
        }
      )
    }, 1000)
  } else if (response.data.status === 401) {
    Toast({
      message: '登录过期，请重新登录!',
      icon: 'fail',
      forbidClick: true,
      overlay: true
    })
    setTimeout(() => {
      router.replace(
        {
          path: '/login'
        }
      )
    }, 1000)
  } else {
    // 常规错误处理
    Toast.fail(response.data.msg)
  }
},
// 响应错误处理
error => {
  Toast.clear()
  console.log('error')
  console.log(error)
  console.log(JSON.stringify(error))
  let text = JSON.parse(JSON.stringify(error)).response.status === 404 ? '404' : '网络异常，请重试'
  Toast.fail(text)
  return Promise.reject(error)
})

export default service
