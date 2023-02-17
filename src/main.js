import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
    // 全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import CarouselIndex from '@/components/Carousel/CarouselIndex.vue'
Vue.component(TypeNav.name, TypeNav)
Vue.component(CarouselIndex.name, CarouselIndex)
    // 引入路由
import router from '@/router'
// 引入Vuex
import store from '@/store'
// import { Mock } from 'mockjs'
import '@/moke/mokeServe'
// import { reqCategoryList } from '@/api'
// reqCategoryList();
import 'swiper/css/swiper.css'

new Vue({
    render: h => h(App),
    // 配置全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
    // 注册路由
    router,
    store,
}).$mount('#app')