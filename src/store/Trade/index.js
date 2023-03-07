import { reqGetUserAddressList, reqShopInfo, reqSubmitInfo } from '@/api'
const state = {
  // testList: []
  userAddressList: [],
  shopInfo: {},
}
const mutations = {
  GETUSERADRESSLIST (state, data) {
    state.userAddressList = data
  },
  GETSHOPINFO (state, data) {
    state.shopInfo = data
  }
}
const actions = {
  async getUserAddressList ({ commit }) {
    let result = await reqGetUserAddressList()
    console.log(result);
    if (result.code == 200) {
      commit('GETUSERADRESSLIST', result.data)
    }
  },
  async getShopInfo ({ commit }) {
    let result = await reqShopInfo()
    // console.log(result, 'shopInfo');
    if (result.code == 200) {
      commit('GETSHOPINFO', result.data)
    }
  },
  async submitInfo ({ commit }, { tradeNo, data }) {
    let result = await reqSubmitInfo(tradeNo, data)
    console.log(result, 'submitInfo');
  }


}
export default {
  state,
  mutations,
  actions,
}