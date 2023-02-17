import { reqGetSearchInfo } from '@/api'
const state = {
        searchInfo: {}
    }
    // 修改state
const mutations = {
        GETSEARCHINFO(state, searchInfo) {
            state.searchInfo = searchInfo
        }
    }
    // 处理异步
const actions = {
        async getSearchInfo({ commit }, params = {}) {
            let result = await reqGetSearchInfo(params)
            if (result.code == 200) {
                commit('GETSEARCHINFO', result.data)
                    // console.log(result.data);
            }
        }
    }
    // 理解为计算属性
const getters = {
    // state:当前仓库的state
    goodsList(state) {
        return state.searchInfo.goodsList || []
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList || []
    },
    attrsList(state) {
        return state.searchInfo.attrsList || []
    }

}
export default {
    state,
    mutations,
    actions,
    getters,
}