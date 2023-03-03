import { reqGoodsInfo, reqAddToShopCart } from "@/api"
const state = {
    goodsInfo: {},
}
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }

}
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        // console.log('调用');ok
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            // console.log('666');
            commit("GETGOODSINFO", result.data)
        }
    },
    async addOrUpdateToShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddToShopCart(skuId, skuNum)
            //     if (result.code == 200) { console.log(result); }
            // console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('Unexpected'))
        }
    }
}
const getters = {
    categoryView: state => state.goodsInfo.categoryView || {},
    skuInfo: state => state.goodsInfo.skuInfo || {},
    spuSaleAttrList: state => state.goodsInfo.spuSaleAttrList || [],
}
export default {
    state,
    mutations,
    actions,
    getters,
}