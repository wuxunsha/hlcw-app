import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}
const state = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')),
  isLogin: localStorage.getItem('isLogin')
}
// getters 只会依赖 state 中的成员去更新
const getters = {
  userName: (state) => state.user_name,
  isLogin: (state) => state.isLogin
}

const mutations = {
  handleUserName: (state, userInfo) => {
    state.userInfo = userInfo
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  },
  isLogin (state, status) {
    state.isLogin = status
    localStorage.setItem('isLogin', status)
  },
  LoginOut (state) {
    localStorage.clear()
    state.userInfo = {}
    state.isLogin = false
  }
}

const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})

export default store
