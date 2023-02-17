// 引入插件
import Vue from 'vue';
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import HomeIndexVue from '@/views/Home/HomeIndex.vue';
import LoginIndexVue from '@/views/Login/LoginIndex.vue';
import SearchIndexVue from '@/views/Search/SearchIndex.vue';
import RegisterIndexVue from '@/views/Register/RegisterIndex.vue';

// 重写push|replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, resolve, reject) {
    // 如果成功与失败的回调函数都传了
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    // 如果成功与失败的回调函数都传了
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
}

// 配置路由
export default new VueRouter({
    routes: [{
            path: '/home',
            component: HomeIndexVue,
            meta: {
                isShown: true,
                // 路由方法解决三级导航展示
                // isShoppingShown: true
            },
        },
        {
            path: '/login',
            component: LoginIndexVue,
            meta: { isShown: false },
        },
        {
            path: '/register',
            component: RegisterIndexVue,
            meta: { isShown: true },
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: SearchIndexVue,
            meta: { isShown: true },
        },
        // 重定向
        {
            path: '*',
            // component: HomeIndexVue
            redirect: '/home'
        }
    ]
})