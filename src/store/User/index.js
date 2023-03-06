import { reqGetCode, reqSubmitRegister, reqLogin, reqUserInfo, reqLogOut } from '@/api'
const state = {
  code: '',
  token: localStorage.getItem('userToken'),
  userInfo: {}
}
const mutations = {
  GETCODE (state, code) {
    state.code = code
  },
  CHANGETOKEN (state, token) {
    state.token = token
  },
  CHANGEUSERINFO (state, userInfo) {
    state.userInfo = userInfo
  },
  LOGOUT (state) {
    state.token = undefined
    state.userInfo = undefined
    localStorage.removeItem('userToken')
  }
}
const actions = {
  // 验证码
  async getCode ({ commit }, phone) {
    let result = await reqGetCode(phone)
    // console.log(result);
    if (result.code == 200) {
      // return result.data
      commit('GETCODE', result.data)
    } else {
      return Promise.reject(new Error('Error'))
    }
  },
  // 申请账号
  async registerUser ({ commit }, user) {
    let result = await reqSubmitRegister(user)
    if (result.code == 200) {
      return 'ok'
    } else {
      return 'error'
    }
  },
  // 登录
  async loginUser ({ commit }, user) {
    let result = await reqLogin(user)
    // console.log(result)
    if (result.code == 200) {
      commit('CHANGETOKEN', result.data.token)
      localStorage.setItem('userToken', result.data.token)
    }
  },
  //获取用户信息
  async getUserInfo ({ commit }) {
    let result = await reqUserInfo()
    console.log(result, 'getUserInfo');
    if (result.code == 200) {
      commit('CHANGEUSERINFO', result.data)
    } else {
      return 'error'
    }
  },

  //退出登录
  async logOut ({ commit }) {
    // alert('logOut')
    let result = await reqLogOut();
    console.log(result, 'logOut');
    if (result.code == 200) {
      commit('LOGOUT')
      return 'success'
    } else {
      return 'error'
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
}