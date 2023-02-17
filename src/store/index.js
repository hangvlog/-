import Vue from 'vue';
import Vuex from 'vuex';

import home from './Home'
import search from './Search';
// 使用插件
Vue.use(Vuex)
    // 存储数据
const state = {
        // count: 1
    }
    // 修改state
const mutations = {
        // AddCount(state) {
        //     state.count += 1;
        // }
    }
    // 处理异步
const actions = {
        // addCount({ commit }) {
        //     commit('AddCount')
        // }
    }
    // 理解为计算属性
const getters = {}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        home,
        search,
    }
})