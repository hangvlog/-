import { reqCartList, reqDeleteCart } from '@/api'
// import {addOrUpdateToShopCart} from '@/'
const state = {
    cartList: [],
}
const mutations = {
    GETCARTLIST (state, data) {
        state.cartList = data;
    }
}
const actions = {
    async getCartList ({ commit }) {
        let result = await reqCartList();
        // console.log(result);
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // async addGoods({ commit }) {
    //     let result = await reqCartList();
    // }
    async deleteCartById (skuId) {
        let result = await reqDeleteCart(skuId);
        // console.log(result);
        if (result.code == 200) {
            // commit("DELETECART")
            return '移除产品ok'
        } else {
            return Promise.reject(new Error('移除产品失败'))
        }
    }
}
const getters = {
    cartList (state) {
        return state.cartList[0] || {};
    },
    // cartInfoList(state) {
    //     return state.cartList[0].cartInfoList || [];
    // }
}
export default {
    state,
    mutations,
    actions,
    getters,
}