// 引入插件
import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入路由配置信息
import routes from './routes';
// 使用插件
Vue.use(VueRouter);



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
    // mode: 'history',
    routes,
    // 滚动行为，参考vue官网
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})